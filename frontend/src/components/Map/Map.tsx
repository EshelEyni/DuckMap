import { FC, useEffect, useState } from "react";
import { Duck } from "../../../../shared/types/system";
import { createMap } from "./createMap";
import { updateVectorLayer } from "./updateVectorLayer";
import { Map as OpenLayersMap } from "ol";

type MapProps = {
  ducks: Duck[];
};

const Map: FC<MapProps> = ({ ducks }) => {
  const [map, setMap] = useState<OpenLayersMap | null>(null);

  useEffect(() => {
    const mapInstance = createMap("map");
    setMap(mapInstance);

    return () => {
      mapInstance.setTarget(undefined);
    };
  }, []);

  useEffect(() => {
    if (!map) return;
    updateVectorLayer(map, ducks);
  }, [ducks, map]);

  return <div id="map" className="w-full h-[500px] md:h-[750px]" />;
};

export default Map;
