"use client";

import { Map, MapMarker, MarkerContent, MarkerTooltip } from "@/components/ui/mapcn-marker-tooltip";
import locations from "@/data/locations.json";

/**
 * Renders the Victoria location map. Markers are driven entirely by
 * `data/locations.json` — add an entry there and it shows up here.
 */
export default function MapCanvas() {
  return (
    <Map
      theme="light"
      center={[locations.center.lng, locations.center.lat]}
      zoom={locations.zoom}
    >
      {locations.points.map((point) => (
        <MapMarker key={point.id} longitude={point.lng} latitude={point.lat}>
          <MarkerContent>
            <div className="size-3.5 rounded-full border-2 border-white bg-black shadow-md transition-transform duration-200 hover:scale-125" />
          </MarkerContent>
          <MarkerTooltip>{point.name}</MarkerTooltip>
        </MapMarker>
      ))}
    </Map>
  );
}
