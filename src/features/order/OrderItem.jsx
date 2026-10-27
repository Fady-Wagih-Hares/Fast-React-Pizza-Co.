import { formatCurrency } from "../../utilities/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="space-y-1 py-3">
      <div className="flex items-center justify-between gap-4 text-sm sm:text-base">
        <p className="min-w-0">
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="shrink-0 font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm text-stone-500 capitalize italic">
        {isLoadingIngredients ? "Loading..." : ingredients?.join(" , ")}
      </p>
    </li>
  );
}

export default OrderItem;
