import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Error from "./ui/Error";
// as key word it will rename the named export
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import Order, { loader as orderLoader } from "./features/order/Order";
import { action as updateOrderAction } from "./features/order/UpdateOrder";
import AppLayout from "./ui/AppLayout";
// passing an array of object that each object is a route
// this is necessary for react router v6 because of data loading (data fetching) the old one is fine but u can not submit data as a form or load data or read data

// actions is all about mutate data or write data  => state that store on some server | manage some remote server state using action functions and forms and wire up to routes as loader

// imperative way
const router = createBrowserRouter([
  {
    // layout route
    element: <AppLayout />,
    // handle errors
    errorElement: <Error />,
    // making nested routes (connect the appLayout with react router)
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        errorElement: <Error />,
        loader: menuLoader,
      },
      {
        path: "/cart",
        element: <Cart />,
      },

      {
        path: "order/new",
        element: <CreateOrder />,
        // whenever there is submission on this route that action will executes
        action: createOrderAction,
      },
      {
        // :orderId => that is params which is exist in the URL and  its able us to search for things with ids
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        // see an error inside the actual layout
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
]);
/*
  fetching data with react router => loaders
1. create loader
2. provide the loader
3. provide the data to the page
4. place the loader  in a certain page inside the file of that page => if u need to load the data in specific component go to it and create the loader in it 
*/
const App = () => {
  // feature based structure files ==> for big projects
  // ui folder => reusable component for ui ==> presentational components | do not have any side Effects
  // services => for reusable code for interacting with the API
  // utilities => helper function that we can reuse for multiple places => stateless helper function do not create any side effect
  //  u can create more => reusable (hooks , contexts , pages)
  return <RouterProvider router={router} />;
};
export default App;
