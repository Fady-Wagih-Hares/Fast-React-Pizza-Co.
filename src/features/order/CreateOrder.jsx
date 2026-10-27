// import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  clearEntireCart,
  getCart,
  getTotalCartPriceOfPizzas,
} from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utilities/helpers";
import { useState } from "react";

import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const {
    userName,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isSubmitting = navigation.state === "submitting";
  const isLoadingAddress = addressStatus === "loading";
  // it is for any data not just the errors | in this case it will return some errors that we can display in the UI
  const formErrors = useActionData();
  // you should not call the selector function the redux will call it with itself
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPriceOfPizzas);
  const dispatch = useDispatch();
  const totalPriorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  if (!cart.length) return <EmptyCart />;

  const totalPrice = totalCartPrice + totalPriorityPrice;
  // console.log(address);
  // 1. create form
  // 2. create action
  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8">
      <h2 className="mb-8 text-xl font-semibold sm:text-2xl">Ready to order? Let's go!</h2>
      {/* this component from react router  | we do post request to create a new order  | u can use patch and delete  the only method that u can not use it i GET
      ==========
      action => u need to write the path that form will submitted to => it is not necessary because react router   by default will match it with the closest route
      */}
      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:shrink-0 sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input w-full"
            defaultValue={userName}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:shrink-0 sm:basis-40">Phone number</label>
          <div className="min-w-0 grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:shrink-0 sm:basis-40">Address</label>

          <div className="relative min-w-0 grow">
            <input
              type="text"
              name="address"
              required
              disabled={isLoadingAddress}
              defaultValue={address}
              className="input w-full pr-28 md:pr-32"
            />

            {!position.latitude && !position.longitude && (
              <span className="absolute top-[3px] right-[3px] z-10 md:top-[5px] md:right-[5px]">
                <Button
                  type="small"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                  disabled={isLoadingAddress}
                >
                  Get Position
                </Button>
              </span>
            )}

            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-4 sm:gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 shrink-0 accent-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Placing Order...."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
// when the form submitted the react behind the sene will get the request and then we pass it into action function
export async function action({ request }) {
  // formData is a regular web API is provided by browser
  const formData = await request.formData();
  // covert it into an object
  // console.log(formData);
  // this is some standard that we need to follow
  const data = Object.fromEntries(formData);
  // console.log(data);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  // console.log(order);
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please Give Us Your Correct Phone Number. We Might Need It To Contact You.";
  if (Object.keys(errors).length > 0) return errors;
  // if everything is okay create new order and redirect
  const newOrder = await createOrder(order);
  // create a new response || or request ==> search for that
  // do not overuse the import store like this it just a trick => it deactivate some redux performance on this page so do not overuse it
  store.dispatch(clearEntireCart());
  // specify the new URL
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
