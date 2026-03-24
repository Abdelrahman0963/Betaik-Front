"use client";

import { GoogleMap, LoadScript, Marker, Polygon, DrawingManager } from "@react-google-maps/api";
import { useCallback, useRef } from "react";

type LatLng = {
    lat: number;
    lng: number;
};

type Props = {
    location: LatLng;
    markers: LatLng[];
    polygon?: LatLng[];
    isDrawingMode?: boolean;
    onPolygonComplete?: (paths: LatLng[]) => void;
};

export default function LocationMap({ location, markers, polygon, isDrawingMode, onPolygonComplete }: Props) {
    const mapRef = useRef<google.maps.Map | null>(null);

    const handlePolygonComplete = useCallback((poly: google.maps.Polygon) => {
        if (!onPolygonComplete) return;

        const path = poly.getPath();
        const coords: LatLng[] = [];
        for (let i = 0; i < path.getLength(); i++) {
            coords.push({
                lat: path.getAt(i).lat(),
                lng: path.getAt(i).lng()
            });
        }

        poly.setMap(null); // Remove the drawing overlay to let the state-driven Polygon take over
        onPolygonComplete(coords);
    }, [onPolygonComplete]);

    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!} libraries={["drawing"]}>
            <GoogleMap
                mapContainerStyle={{
                    width: "100%",
                    height: "100%",
                }}
                center={location}
                zoom={15}
                onLoad={(map) => { mapRef.current = map; }}
            >
                {/* Markers */}
                {(markers || []).map((marker, index) => (
                    <Marker key={index} position={marker} />
                ))}

                {/* Main Selected Polygon */}
                {polygon && polygon.length > 0 && (
                    <Polygon
                        paths={polygon}
                        options={{
                            fillColor: "#155DFC",
                            fillOpacity: 0.25,
                            strokeColor: "#155DFC",
                            strokeOpacity: 1,
                            strokeWeight: 2,
                        }}
                    />
                )}

                {/* Drawing Mode Override */}
                {isDrawingMode && (
                    <DrawingManager
                        onLoad={drawingManager => {
                            console.log(drawingManager)
                        }}
                        onPolygonComplete={handlePolygonComplete}
                        options={{
                            drawingControl: true,
                            drawingControlOptions: {
                                position: window.google?.maps?.ControlPosition?.TOP_CENTER || 2,
                                drawingModes: [
                                    window.google?.maps?.drawing?.OverlayType?.POLYGON || 'polygon' as any
                                ],
                            },
                            polygonOptions: {
                                fillColor: "#155DFC",
                                fillOpacity: 0.25,
                                strokeColor: "#155DFC",
                                strokeOpacity: 1,
                                strokeWeight: 2,
                                editable: false,
                                zIndex: 1,
                            },
                        }}
                    />
                )}
            </GoogleMap>
        </LoadScript>
    );
}