import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

const AppLayout = () => {
  // create loading indicator
  const navigation = useNavigation();
  // console.log(navigation);
  const isLoading = navigation.state === "loading";
  return (
    <div className="relative grid h-dvh grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}

      <Header />
      {/* render the content of nested routes  by OutLet component*/}
      <div className="overflow-x-hidden overflow-y-auto">
        <main className="mx-auto w-full max-w-3xl pb-6 sm:pb-8 xl:max-w-4xl">
          {/* <h1>Content</h1> */}
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
};
export default AppLayout;
