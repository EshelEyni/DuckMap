import { useDispatch } from "react-redux";
import "./App.css";
import { AppDispatch } from "./types/app";
import { getDucks } from "./store/slices/duckSlice";
import { useEffect, useState } from "react";
import { useDucks } from "./hooks/useDucks";
import Map from "./components/Map";
import AppFilter from "./components/AppFilter";
import AddDuckForm from "./components/AddDuckForm";

function App() {
  const [viewMode, setViewMode] = useState<"map" | "form">("map");
  const dispatch: AppDispatch = useDispatch();
  const ducks = useDucks();

  useEffect(() => {
    dispatch(getDucks());
  }, [dispatch]);

  return (
    <main>
      <AppFilter viewMode={viewMode} setViewMode={setViewMode} />
      {viewMode === "map" && <Map ducks={ducks} />}
      {viewMode === "form" && <AddDuckForm setViewMode={setViewMode} />}
    </main>
  );
}

export default App;
