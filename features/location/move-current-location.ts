

import { getCurrentPosition } from "./get-current-position"
import { useLocationStore } from "@/store/locationstore"

export async function moveToCurrentLocation(map: kakao.maps.Map):Promise<void> {

    const mymarker = useLocationStore.getState().markers

    if(mymarker) return

    try {
        const pos = await getCurrentPosition()
        const { latitude, longitude } = pos.coords

        const latlng = new window.kakao.maps.LatLng(latitude, longitude)
        map.setCenter(latlng)

        const ImageSrc = '/images/my-marker.svg'
        const ImageSize = new kakao.maps.Size(48,62)
        const MarkerImage = new kakao.maps.MarkerImage(ImageSrc,ImageSize)

        const myMarker = new window.kakao.maps.Marker({
            map,
            position: latlng,
            image: MarkerImage
        })

        useLocationStore.getState().setMarkers(myMarker)

    } catch {
        // 실패해도 시 기본위치 유지
    }
}
