import { formatCurrency } from "./../../utilities/helpers";
import Button from "./../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentPizzaById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentPizzaById(id));
  const isInCart = currentQuantity > 0;
  // console.log(currentQuantity);
  const handleAddToCart = () => {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  };
  return (
    <li className="flex gap-3 py-3 sm:gap-4">
      <img
        src={imageUrl}
        alt={name}
        className={`h-20 w-20 shrink-0 rounded-md object-cover sm:h-24 sm:w-24 md:h-28 md:w-28 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex min-w-0 grow flex-col pt-0.5">
        <p className="pb-1 font-medium">{name}</p>
        <p className="text-sm text-stone-500 capitalize italic">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-2 text-sm">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="inline-block text-sm font-medium text-stone-500 uppercase">
              Sold out
            </p>
          )}
          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-6 md:gap-8">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          )}
          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add To Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
