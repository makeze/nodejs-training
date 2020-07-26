const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWFrc3VkaWsiLCJhIjoiY2tkMzJtYXE5MDJuZTJ5cW0xMzU3NTMwYyJ9.szUltI_oZLMPgKMapLmdXw&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Geocode: Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Geocode: Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode