import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  // get data from loader buy custom hook and we do not need to pass anything the react router already knows the data what we want to pass in this component
  // here we use the render as you fetch strategy (every thing will happen in the same time data loading waterfalls do not exist here which is the cool thing ) | the useEffect follow always a fetch on render approach strategy => render component first => start to fetch the data => (data loading waterfalls) get data and render component in the same time
  const menu = useLoaderData();
  // console.log(menu);
  return (
    <ul className="divide-y divide-stone-200 px-2 sm:px-4 md:px-6">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}
// that is convention to name it loader
export async function loader() {
  // 1. fetch data
  const menu = await getMenu();
  // 2. return it
  return menu;
}
export default Menu;
