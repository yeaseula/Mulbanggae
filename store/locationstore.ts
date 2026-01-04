import { create } from "zustand";

type SearchStatus = 'idle' | 'loading' | 'success' | 'empty' | 'error'

interface LocationState {
    searchState: boolean //값을 찾고있는지
    searchStatus: SearchStatus
    searchResult: kakao.maps.services.PlacesSearchResult | null
    error: string | null
    markers: kakao.maps.Marker[] | null
    setSearchState: (value:boolean) => void
    setSearchResult: (data:any) => void
    setMarkers: (value: kakao.maps.Marker[]) => void
    clearMarkers: () => void
}

export const useLocationStore = create<LocationState>((set)=>({
    searchState: false,
    searchStatus: 'idle',
    searchResult: null,
    error: null,
    markers: null,
    setSearchResult: (data) => set({
        searchStatus: data.length === 0 ? 'empty' : 'success',
        searchResult: data ,
        error: null
    }),
    setSearchState: (value)=>set(()=>({ searchState: value })),
    setMarkers: (value) => set(()=>({ markers: value })),
    clearMarkers: () => set(()=>({ markers: null }))
}))