import { loadKakaoMap } from "./loadmap"

export async function InitMap(container: HTMLElement) {

    await loadKakaoMap()

    const map = new window.kakao.maps.Map(container, {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
        level: 5,
    })

    return map
}
