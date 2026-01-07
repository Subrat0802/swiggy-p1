

export type UserLocation = {
    lat: string,
    lon: string
}

export const getCurrentLocation = (): Promise<UserLocation> => {
    return new Promise((resolve, reject) => {
        if(!navigator.geolocation){
            reject(new Error("Geological not supported"))
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude.toString(),
                    lon: position.coords.longitude.toString()
                });
            },
            (error) => {
                reject(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        )
    })
    
}