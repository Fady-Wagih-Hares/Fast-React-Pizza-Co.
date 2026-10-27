import LinkButton from "../../ui/LinkButton";

// import { Link } from "react-router-dom";
function EmptyCart() {
  return (
    <div className="px-4 py-3 sm:px-6 sm:py-6">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="mt-7 font-semibold sm:text-lg">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
