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
            return data
        },
        {
            location: map.getCenter(),
            radius: 5000, // 3km
        }
    )
}
