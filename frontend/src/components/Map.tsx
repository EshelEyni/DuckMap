import { FC, useEffect } from "react";
import { Feature, Map as OpenLayersMap, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { XYZ } from "ol/source";
import "ol/ol.css";
import { fromLonLat } from "ol/proj";
import { Point } from "ol/geom";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import { Duck } from "../../../shared/types/system";
import duckSVG from "/assets/duck.svg";

type MapProps = {
  ducks: Duck[];
};

const Map: FC<MapProps> = ({ ducks }) => {
  useEffect(() => {
    const urbanLayer = new TileLayer({
      source: new XYZ({
        url: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZXNoZWxlaW5pIiwiYSI6ImNseHJzZGwzNDB5ZTIybHF3ZGJ5Zmc4N3EifQ.eQFzEILePE27uFcgg8zJVw`,
        tileSize: 250,
      }),
    });

    const map = new OpenLayersMap({
      target: "map",
      layers: [urbanLayer],
      view: new View({
        center: fromLonLat([34.794758, 32.07576]),
        zoom: 6,
      }),
    });

    const iconStyleFunction = () => {
      const zoom = map.getView().getZoom() || 0;
      const scale = Math.min(1, 0.005 * zoom);

      return new Style({
        image: new Icon({
          src: duckSVG,
          scale: scale,
          anchor: [0.5, 0.5],
          anchorXUnits: "fraction",
          anchorYUnits: "fraction",
        }),
      });
    };

    if (ducks && ducks.length > 0) {
      const features = ducks.map(s => {
        const feature = new Feature({
          geometry: new Point(fromLonLat([s.coords.lng, s.coords.lat])),
          name: s.name,
        });
        return feature;
      });

      const vectorSource = new VectorSource({
        features: features,
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: iconStyleFunction,
      });

      map.addLayer(vectorLayer);
    }

    return () => {
      map.setTarget(undefined);
    };
  }, [ducks]);

  return (
    <div
      id="map"
      className="w-full h-[300px] sm:h-[400px] md:h-[750px] lg:h-[1000px]"
    />
  );
};

export default Map;
