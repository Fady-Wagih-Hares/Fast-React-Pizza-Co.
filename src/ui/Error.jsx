import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error() {
  // get the error that occurred
  const error = useRouteError();
  console.log(error);
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <h1 className="mb-3 text-xl font-semibold sm:text-2xl">
        Something went wrong 😢
      </h1>
      <p className="mb-6 rounded-md bg-red-100 p-3 text-sm break-words text-red-700 sm:text-base">
        {error.data || error.message}
      </p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
