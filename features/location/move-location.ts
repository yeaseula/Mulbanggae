
export function MoveLocation (
    map : kakao.maps.Map | null,
    placex: string,
    placey: string
) {
    if(!map) return
    const lng = Number(placex)
    const lat = Number(placey)

    const moveLatLng = new window.kakao.maps.LatLng(lat, lng)

    map.setLevel(3, { animate: true })
    setTimeout(()=>{
        map.panTo(moveLatLng)
    },100)
}