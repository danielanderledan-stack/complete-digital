"use client";

import dynamic from "next/dynamic";

// MapLibre touches the DOM at module scope, so it must never render on the
// server. Loading the canvas via a client-only dynamic import keeps the build
// (and SSR) clean while the map hydrates purely on the client.
const MapCanvas = dynamic(() => import("./map-canvas"), { ssr: false });

export function LocationMap() {
  return <MapCanvas />;
}
