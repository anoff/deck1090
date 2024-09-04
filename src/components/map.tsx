"use client"

import React from 'react';
import DeckGL from '@deck.gl/react';
import { LineLayer } from "@deck.gl/layers"
import { MapViewState } from '@deck.gl/core';
import { Map } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ScatterplotLayer } from 'deck.gl';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const INITIAL_VIEW_STATE: MapViewState = {
    longitude: 5.2016,
    latitude: 52.6895,
    zoom: 4
};

type Flight = {
    start: [longitude: number, latitude: number, height: number];
    end: [longitude: number, latitude: number, height: number];
};
type Airport = {
    type: 'major' | 'mid' | 'small';
    name: string;
    abbrev: string; // airport code
    coordinates: [longitude: number, latitude: number];
};


const LocationAggregatorMap = () => {
    const layers = [
        new ScatterplotLayer<Airport>({
          id: 'airports',
          data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/line/airports.json',
          radiusScale: 20,
          getPosition: d => d.coordinates,
          getFillColor: [255, 140, 0],
          getRadius: d => {
            if (d.type.search('major') >= 0) {
              return 100;
            }
            if (d.type.search('small') >= 0) {
              return 30;
            }
            return 60;
          },
          pickable: true
        }),
        new LineLayer<Flight>({
          id: 'flight-paths',
          data: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/line/heathrow-flights.json",
          opacity: 0.8,
          getSourcePosition: d => d.start,
          getTargetPosition: d => d.end,
          getColor: d => {
            const z = d.start[2];
            const r = z / 10000;
            return [255 * (1 - r * 2), 128 * r, 255 * r, 255 * Math.max(0.2, 1 - r)];
          },
          getWidth: 4
        })
      ];
    return (
        <DeckGL
            initialViewState={INITIAL_VIEW_STATE}
            controller
            layers={layers}
        >
            <Map
                initialViewState={{
                    longitude: -100,
                    latitude: 40,
                    zoom: 3.5
                }}
                style={{ width: 600, height: 400 }}
                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapboxAccessToken={MAPBOX_TOKEN}
            />;

        </DeckGL>
    )
};

export default LocationAggregatorMap;