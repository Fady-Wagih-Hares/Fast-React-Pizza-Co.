import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getTotalCartPriceOfPizzas,
  getTotalCartQuantityOfPizzas,
} from "./cartSlice";
import { formatCurrency } from "../../utilities/helpers";

function CartOverview() {
  // redux recommends that to calculate the values inside the selectors not inside our components also redux recommends that takes the function selector and place it in own slice  => good practice
  const totalCartQuantityOfPizzas = useSelector(getTotalCartQuantityOfPizzas);
  const totalCartPriceOfPizzas = useSelector(getTotalCartPriceOfPizzas);
  if (!totalCartQuantityOfPizzas) return null;

  return (
    <div className="flex items-center justify-between gap-4 bg-stone-800 px-4 py-4 text-xs text-stone-200 uppercase sm:px-6 sm:text-sm md:text-base lg:px-8">
      <p className="space-x-3 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalCartQuantityOfPizzas} pizzas</span>
        <span>{formatCurrency(totalCartPriceOfPizzas)}</span>
      </p>
      <Link
        to="/cart"
        className="shrink-0 transition-colors duration-300 hover:text-yellow-400"
      >
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
