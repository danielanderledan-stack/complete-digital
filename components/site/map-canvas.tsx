"use client";

import { useEffect } from "react";
import type { Map as MapLibreMap } from "maplibre-gl";
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerTooltip,
  useMap,
} from "@/components/ui/mapcn-marker-tooltip";
import locations from "@/data/locations.json";

/**
 * Recolors the basemap to a pure-black canvas with white lines.
 * Runs whenever the map style (re)loads.
 */
function MapThemer() {
  const { map, isLoaded } = useMap();

  useEffect(() => {
    if (!map) return;

    const paint = () => {
      const style = map.getStyle();
      if (!style?.layers) return;
      for (const layer of style.layers) {
        try {
          if (layer.type === "background") {
            map.setPaintProperty(layer.id, "background-color", "#000000");
          } else if (layer.type === "fill") {
            map.setPaintProperty(layer.id, "fill-color", "#000000");
          } else if (layer.type === "line") {
            map.setPaintProperty(layer.id, "line-color", "#ffffff");
          } else if (layer.type === "symbol") {
            map.setPaintProperty(layer.id, "text-color", "#ffffff");
            map.setPaintProperty(layer.id, "text-halo-color", "#000000");
          }
        } catch {
          // not every layer supports every paint property — ignore
        }
      }
    };

    map.on("style.load", paint);
    if (map.isStyleLoaded()) paint();
    return () => {
      map.off("style.load", paint);
    };
  }, [map, isLoaded]);

  return null;
}

/**
 * Renders the Victoria location map. Markers are driven entirely by
 * `data/locations.json` — add an entry there and it shows up here.
 */
export default function MapCanvas() {
  return (
    <Map
      theme="dark"
      center={[locations.center.lng, locations.center.lat]}
      zoom={locations.zoom}
    >
      <MapThemer />
      {locations.points.map((point) => (
        <MapMarker key={point.id} longitude={point.lng} latitude={point.lat}>
          <MarkerContent>
            <div className="size-3.5 rounded-full border-2 border-white bg-red-500 shadow-md transition-transform duration-200 hover:scale-125" />
          </MarkerContent>
          <MarkerTooltip>{point.name}</MarkerTooltip>
        </MapMarker>
      ))}
    </Map>
  );
}
