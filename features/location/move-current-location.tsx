import { getCurrentPosition } from "./get-current-position"
export async function moveToCurrentLocation(map: kakao.maps.Map) {
    try {
        const pos = await getCurrentPosition()
        const { latitude, longitude } = pos.coords

        const latlng = new window.kakao.maps.LatLng(latitude, longitude)
        map.setCenter(latlng)

        new window.kakao.maps.Marker({
        map,
        position: latlng,
        })
    } catch {
        // 실패해도 시 기본위치 유지
    }
}
