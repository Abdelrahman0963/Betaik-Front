"use client";

import React, { useState, useRef } from "react";
import { GoogleMap, LoadScript, DrawingManager, Polygon } from "@react-google-maps/api";
import axios from "axios";

const containerStyle = { width: "100%", height: "500px", border: "1px solid #ccc", borderRadius: "10px" };
const center = { lat: 30.0444, lng: 31.2357 };

export default function MapWithDrawing() {
    const [polygons, setPolygons] = useState<google.maps.LatLngLiteral[][]>([]);
    const [drawingOptions, setDrawingOptions] = useState<google.maps.drawing.DrawingManagerOptions | null>(null);
    const mapRef = useRef<google.maps.Map | null>(null);

    const onLoad = (map: google.maps.Map) => {
        mapRef.current = map;

        // هنا google متاح، نحط الخيارات
        setDrawingOptions({
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [google.maps.drawing.OverlayType.POLYGON],
            },
            polygonOptions: {
                fillColor: "#2196F3",
                fillOpacity: 0.3,
                strokeWeight: 2,
                strokeColor: "#2196F3",
                clickable: true,
                editable: true,
            },
        });
    };

    const onPolygonComplete = (polygon: google.maps.Polygon) => {
        const path = polygon.getPath().getArray().map(p => ({ lat: p.lat(), lng: p.lng() }));
        setPolygons(prev => [...prev, path]);
        console.log("Polygon coordinates:", path);
    };

    const handleSubmit = async () => {
        try {
            alert("Saved successfully!")
            console.log("Saved successfully!" + polygons);
        } catch (error) {
            console.error(error);
            alert("Failed to save polygon");
        }
    };

    return (
        <div className="relative w-full rounded-md">
            <LoadScript id="google-maps-script" googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!} libraries={["drawing"]}>
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12} onLoad={onLoad}>
                    {drawingOptions && <DrawingManager onPolygonComplete={onPolygonComplete} options={drawingOptions} />}
                    {polygons.map((path, i) => (
                        <Polygon
                            key={i}
                            paths={path}
                            options={{ fillColor: "#FF5722", fillOpacity: 0.2, strokeColor: "#FF5722", strokeWeight: 2, editable: true }}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>
        </div>
    );
}