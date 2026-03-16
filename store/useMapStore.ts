import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type LatLng = {
    lat: number;
    lng: number;
};

export type Dorm = {
    name: string;
    area: string;
    lat: number;
    lng: number;
    polygon: LatLng[];
    image: string;
};

const defaultDorms: Dorm[] = [
    {
        name: "University Heights Dorms",
        area: "Downtown Campus Area",
        lat: 40.7291,
        lng: -73.9965,
        polygon: [
            { lat: 40.7296, lng: -73.9971 },
            { lat: 40.7296, lng: -73.9957 },
            { lat: 40.7287, lng: -73.9957 },
            { lat: 40.7287, lng: -73.9971 },
        ],
        image: "/0bbe65d2f4d689b1621c718572ae6e968ee20476.jpg",
    },
    {
        name: "UCLA University Apartments",
        area: "Los Angeles Campus Area",
        lat: 34.0689,
        lng: -118.4452,
        polygon: [
            { lat: 34.0695, lng: -118.446 },
            { lat: 34.0695, lng: -118.4446 },
            { lat: 34.0683, lng: -118.4446 },
            { lat: 34.0683, lng: -118.446 },
        ],
        image: "/0bbe65d2f4d689b1621c718572ae6e968ee20476.jpg",
    },
];

interface MapState {
    dorms: Dorm[];
    activeDorm: Dorm | null;
    isDrawingMode: boolean;
    location: LatLng;
    addDorm: (dorm: Dorm) => void;
    setActiveDorm: (dorm: Dorm) => void;
    setIsDrawingMode: (isDrawing: boolean) => void;
    setLocation: (loc: LatLng) => void;
}

export const useMapStore = create<MapState>()(
    persist(
        (set) => ({
            dorms: defaultDorms,
            activeDorm: null,
            isDrawingMode: false,
            location: { lat: 40.7291, lng: -73.9965 },
            addDorm: (dorm) => set((state) => ({ 
                dorms: [dorm, ...state.dorms],
                activeDorm: dorm,
                location: { lat: dorm.lat, lng: dorm.lng },
                isDrawingMode: false
            })),
            setActiveDorm: (dorm) => set({ 
                activeDorm: dorm, 
                location: { lat: dorm.lat, lng: dorm.lng } 
            }),
            setIsDrawingMode: (isDrawing) => set({ isDrawingMode: isDrawing }),
            setLocation: (loc) => set({ location: loc }),
        }),
        {
            name: 'beitak-map-storage', // unique name
            partialize: (state) => ({ dorms: state.dorms }), // Only persist dorms to local storage
        }
    )
);
