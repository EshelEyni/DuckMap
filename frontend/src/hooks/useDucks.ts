import { useSelector } from "react-redux";
import { selectDucks } from "../store/selectors/duckSelector";

export function useDucks() {
  const ducks = useSelector(selectDucks);

  return ducks;
}
