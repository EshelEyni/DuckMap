import { Map as OpenLayersMap, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { XYZ } from "ol/source";
import "ol/ol.css";
import { fromLonLat } from "ol/proj";

export const createMap = (target: string) => {
  const urbanLayer = new TileLayer({
    source: new XYZ({
      url: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZXNoZWxlaW5pIiwiYSI6ImNseHJzZGwzNDB5ZTIybHF3ZGJ5Zmc4N3EifQ.eQFzEILePE27uFcgg8zJVw`,
      tileSize: 250,
    }),
  });

  const map = new OpenLayersMap({
    target: target,
    layers: [urbanLayer],
    view: new View({
      center: fromLonLat([34.794758, 32.07576]),
      zoom: 6,
    }),
  });

  return map;
};
