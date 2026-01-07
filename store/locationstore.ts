import { create } from "zustand";

type SearchStatus = 'idle' | 'loading' | 'success' | 'empty' | 'error'

export interface LocationMarker {
    markerId : string
    marker : kakao.maps.Marker
}

interface LocationState {
    searchState: boolean //값을 찾고있는지
    setSearchState: (value:boolean) => void

    searchStatus: SearchStatus
    error:  string | null
    setSearch: ()=>void
    setSearchSuccess: (data:kakao.maps.services.PlacesSearchResult) => void
    setSearchError: (message: string) => void

    searchResult: kakao.maps.services.PlacesSearchResult | null

    markers: kakao.maps.Marker | null
    locationMarkers: LocationMarker[] | null
    setMarkers: (value: kakao.maps.Marker) => void
    setLocationMarkers: (value: LocationMarker[]) => void
    clearMarkers: () => void
    clearLocationMarkers: () => void
}

export const useLocationStore = create<LocationState>((set)=>({
    searchState: false,
    setSearchState: (value)=>set(()=>({ searchState: value })),

    searchStatus: 'idle',
    searchResult: null,
    error: null,
    setSearch: ()=>set({ searchStatus: 'loading', error: null }),
    setSearchSuccess: (data:kakao.maps.services.PlacesSearchResult) => set({
        searchStatus: data.length === 0 ? 'empty' : 'success',
        searchResult: data,
        error: null,
    }),
    setSearchError: (message: string) => set({
        searchStatus: 'error',
        error: message,
        searchResult: null
    }),

    markers: null,
    locationMarkers: null,
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