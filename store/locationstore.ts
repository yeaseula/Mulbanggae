import { create } from "zustand";

type SearchStatus = 'idle' | 'loading' | 'success' | 'empty' | 'error'

export interface LocationMarker {
    markerId : string
    marker : kakao.maps.Marker
}

interface LocationState {
    searchState: boolean //값을 찾고있는지
    searchStatus: SearchStatus
    searchResult: kakao.maps.services.PlacesSearchResult | null
    error: string | null
    markers: kakao.maps.Marker | null
    locationMarkers: LocationMarker[] | null
    setSearchState: (value:boolean) => void
    setSearchResult: (data:any) => void
    setMarkers: (value: kakao.maps.Marker) => void
    setLocationMarkers: (value: LocationMarker[]) => void
    clearMarkers: () => void
    clearLocationMarkers: () => void
}

export const useLocationStore = create<LocationState>((set)=>({
    searchState: false,
    searchStatus: 'idle',
    searchResult: null,
    error: null,
    markers: null,
    locationMarkers: null,
    setSearchResult: (data) => set({
        searchStatus: data.length === 0 ? 'empty' : 'success',
        searchResult: data ,
        error: null
    }),
    setSearchState: (value)=>set(()=>({ searchState: value })),
    setMarkers: (value) => set(()=>({ markers: value })),
    setLocationMarkers: (value) => set(()=>({ locationMarkers: value })),
    clearMarkers: () => set((state)=>{
        if(state.markers) {state.markers.setMap(null)}
        return { markers : null }
    }),
    clearLocationMarkers: () => set((state)=>{
        state.locationMarkers?.forEach((m)=>m.marker.setMap(null))
        return { locationMarkers: null }
    })
}))

interface TransformeState {
    transformState: number,
    setTransform : (val:number) => void
}

export const useTransformStore = create<TransformeState>((set)=>({
    transformState: 0,
    setTransform: (val) => set(()=>({ transformState : val }))
}))