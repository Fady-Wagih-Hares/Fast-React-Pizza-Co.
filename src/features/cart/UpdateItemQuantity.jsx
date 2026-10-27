import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

const UpdateItemQuantity = ({ pizzaId, currentQuantity }) => {
  const dispatch = useDispatch();
  const handleIncrease = () => {
    dispatch(increaseItemQuantity(pizzaId));
  };
  const handleDecrease = () => {
    dispatch(decreaseItemQuantity(pizzaId));
  };
  return (
    <div className="flex shrink-0 items-center gap-2 md:gap-3">
      <Button type="round" onClick={handleDecrease}>
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button type="round" onClick={handleIncrease}>
        +
      </Button>
    </div>
  );
};
export default UpdateItemQuantity;
