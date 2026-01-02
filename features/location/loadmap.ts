export function loadKakaoMap(): Promise<void> {
    return new Promise((resolve) => {
        if (window.kakao) {
            resolve()
            return
        }

        const script = document.createElement('script')
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`
        script.async = true

        script.onload = () => {
            window.kakao.maps.load(() => resolve())
        }

        document.head.appendChild(script)
    })
}
