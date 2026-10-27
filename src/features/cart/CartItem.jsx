// import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utilities/helpers";
import { getCurrentPizzaById } from "./cartSlice";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentPizzaById(pizzaId));
  return (
    <li className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <p className="min-w-0 break-words">
        {quantity}&times; {name}
      </p>
      <div className="flex shrink-0 items-center gap-3 sm:gap-6">
        <p className="mr-auto text-sm font-bold sm:mr-0">
          {formatCurrency(totalPrice)}
        </p>
        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
