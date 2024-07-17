import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { AppDispatch } from "./types/app";
import { getDucks } from "./store/slices/duckSlice";
import { useEffect } from "react";
import Map from "./components/Map/Map";
import AppFilter from "./components/AppFilter";
import AddDuckForm from "./components/AddDuckForm/AddDuckForm";
import { selectDucks } from "./store/selectors/duckSelector";
import { selectViewMode } from "./store/selectors/viewSelector";

function App() {
  const dispatch: AppDispatch = useDispatch();
  const ducks = useSelector(selectDucks);
  const viewMode = useSelector(selectViewMode);

  useEffect(() => {
    dispatch(getDucks());
  }, [dispatch]);

  return (
    <main>
      <AppFilter />
      {viewMode === "map" && <Map ducks={ducks} />}
      {viewMode === "form" && <AddDuckForm />}
    </main>
  );
}

export default App;
