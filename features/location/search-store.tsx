import { useLocationStore } from "@/store/locationstore"

export function searchStores(
    map: kakao.maps.Map,
    keyword: any
) {
    const places = new kakao.maps.services.Places()
    places.keywordSearch(
        keyword,
        (data, status) => {
            if (status !== kakao.maps.services.Status.OK) return
            console.log(status)
            console.log('-----------🚫🚫🚫🚫')
            console.log(data)
            useLocationStore.getState().setSearchResult(data)
        },
        {
            location: map.getCenter(),
            radius: 5000, // 3km
        }
    )
}
