import { useDispatch } from "react-redux";
import "./App.css";
import { AppDispatch } from "./types/app";
import { getDucks } from "./store/slices/duckSlice";
import { useEffect } from "react";
import { useDucks } from "./hooks/useDucks";
import { Map } from "./components/Map";

function App() {
  const dispatch: AppDispatch = useDispatch();
  const ducks = useDucks();
  console.log(ducks);

  useEffect(() => {
    dispatch(getDucks());
  }, [dispatch]);

  return (
    <main>
      <Map ducks={ducks} />
    </main>
  );
}

export default App;
