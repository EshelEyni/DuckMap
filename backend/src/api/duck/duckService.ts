import { addItem, getData } from "../../services/dataService";
import { Duck } from "types/system";

async function query() {
  const ducks: Duck[] = await getData();
  return ducks;
}

async function create(duck: Duck) {
  return await addItem(duck);
}

export default {
  query,
  create,
};
