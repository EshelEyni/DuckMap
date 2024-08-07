import { Map as OpenLayersMap, Feature } from "ol";
import { Point } from "ol/geom";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import { Duck } from "../../../../shared/types/system";
import duckSVG from "/assets/duck.svg";
import BaseLayer from "ol/layer/Base";

const DUCK_LAYER_ID = "duckLayer";

export const updateVectorLayer = (map: OpenLayersMap, ducks: Duck[]) => {
  const getScale = () => {
    const zoom = map.getView().getZoom() || 0;
    const scale = Math.min(1, 0.005 * zoom);
    return scale;
  };

  const iconStyleFunction = () =>
    new Style({
      image: new Icon({
        src: duckSVG,
        scale: getScale(),
        anchor: [0.5, 0.5],
        anchorXUnits: "fraction",
        anchorYUnits: "fraction",
        opacity: 1,
      }),
    });

  const features = ducks.map(
    d =>
      new Feature({
        geometry: new Point([d.coords.lon, d.coords.lat]),
        name: d.name,
      }),
  );

  features.forEach(f => f.setStyle(iconStyleFunction()));

  if (features.length > 0) {
    const firstFeature = features[0];
    const currentStyle = firstFeature.getStyle();
    if (!(currentStyle instanceof Style)) return;
    const currentImage = currentStyle.getImage();
    if (!currentImage) return;
    currentImage.setOpacity(0.5);
  }

  let duckLayer = map
    .getLayers()
    .getArray()
    .find((layer: BaseLayer) => layer.get("id") === DUCK_LAYER_ID);

  if (duckLayer) {
    const source = (
      duckLayer as VectorLayer<Feature>
    ).getSource() as VectorSource;
    source.clear();
    source.addFeatures(features);
  } else {
    const source = new VectorSource({ features });

    duckLayer = new VectorLayer({ source });
    duckLayer.set("id", DUCK_LAYER_ID);
    map.addLayer(duckLayer);
  }
};
