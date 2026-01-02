export function searchNearbyStores(
    map: kakao.maps.Map,
    keyword: any
) {
    const places = new kakao.maps.services.Places()
    places.keywordSearch(
        keyword,
        (data, status) => {
            if (status !== kakao.maps.services.Status.OK) return
            data.forEach((place) => {
                const marker = new kakao.maps.Marker({
                map,
                    position: new kakao.maps.LatLng(
                        Number(place.y),
                        Number(place.x)
                    ),
                })
            })
        },
        {
            location: map.getCenter(),
            radius: 3000, // 3km
        }
    )
}
