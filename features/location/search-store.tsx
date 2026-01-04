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

            const MarkerCustom = (code:string) => {
                let ImageSrc = ''
                if(code.includes('병원')) {
                    ImageSrc = '/images/hospital-marker.svg'
                } else if(code.includes('관상어') || code.includes('수족관') || code.includes('열대어')) {
                    ImageSrc = '/images/fish-location.svg'
                } else {
                    ImageSrc = '/images/search-marker.svg'
                }
                const ImageSize = new kakao.maps.Size(43,52)
                const MarkerImage = new kakao.maps.MarkerImage(ImageSrc,ImageSize)

                return MarkerImage
            }

            data.forEach((place) => {

                const marker = new kakao.maps.Marker({
                    map,
                    position: new kakao.maps.LatLng(
                        Number(place.y),
                        Number(place.x)
                    ),
                    image: MarkerCustom(place.category_name)
                })
            })

            useLocationStore.getState().setSearchResult(data)
            useLocationStore.getState().setSearchState(true)
        },
        {
            location: map.getCenter(),
            radius: 5000, // 3km
        }
    )
}
