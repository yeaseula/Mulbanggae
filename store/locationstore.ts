import { create } from "zustand";

interface LocationState {
    searchResult: kakao.maps.services.PlacesSearchResult
    setSearchResult: (data:any) => void
}

export const useLocationStore = create<LocationState>((set)=>({
    searchResult: [],
    setSearchResult: (data) => set({ searchResult: data })
}))