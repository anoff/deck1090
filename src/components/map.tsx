"use client"

import React from 'react';
import DeckGL from '@deck.gl/react';
import {LineLayer} from "@deck.gl/layers"
import { MapViewState } from '@deck.gl/core';
import { Map } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const INITIAL_VIEW_STATE: MapViewState = {
    longitude: 5.2016,
    latitude: 52.6895,
    zoom: 4
};

type DataType = {
    start: [longitude: number, latitude: number, height: number];
    end: [longitude: number, latitude: number, height: number];
};

const LocationAggregatorMap = () => {


    return (
        <DeckGL
            initialViewState={INITIAL_VIEW_STATE}
            controller
        >
            <LineLayer
                id="line-layer"
                data="/data.json"
                getSourcePosition={(d: DataType) => d.start}
                getTargetPosition={(d: DataType) => d.end} />

            <Map
                initialViewState={{
                    longitude: -100,
                    latitude: 40,
                    zoom: 3.5
                }}
                style={{ width: 600, height: 400 }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={MAPBOX_TOKEN}
            />;

        </DeckGL>
    )
};

export default LocationAggregatorMap;