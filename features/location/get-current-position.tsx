export function getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
        reject('Geolocation not supported')
        return
        }

        navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        })
    })
}
