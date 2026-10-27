import { useFetcher } from "react-router-dom";
import Button from "./../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";
const UpdateOrder = ({ order }) => {
  // Updating Data Without Navigation
  const fetcher = useFetcher();
  return (
    // submit the form and revalidate the page
    <fetcher.Form method="PATCH" className="text-right">
      {/* in high interactive apps u probably use some input fields here */}
      <Button type="primary">Make Priority</Button>;
    </fetcher.Form>
  );
};
export default UpdateOrder;

export async function action({ request, params }) {
  // the updated data
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  //   console.log("update");
  return null;
}
