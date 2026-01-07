
import { useLocationStore } from "@/store/locationstore"

export function MoveLocation (
    map : kakao.maps.Map | null,
    placex: string,
    placey: string,
    markerId: string
) {
    if(!map) return



    console.log(useLocationStore.getState().locationMarkers)

    const lng = Number(placex)
    const lat = Number(placey)

    const moveLatLng = new window.kakao.maps.LatLng(lat, lng)

    map.panTo(moveLatLng)

    useLocationStore.getState().locationMarkers?.forEach((marker)=>{
        if(marker.markerId === markerId) {
            marker.marker.setMap(map)
        } else {
            marker.marker.setMap(null)
        }
    })
}