const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=1&access_token=pk.eyJ1Ijoia3dva2dvcmRvbiIsImEiOiJjandtbjdmeXEwMnl0M3luc3NjZGE1ZHhkIn0.95gBNtW-3mn14vKEL4MK2w'

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback("Unable to connect to GeoCode service", undefined)
        } else if (body.message || body.features.length === 0) {
            callback("Unable to find GeoCode", undefined)
        } else {
            const features = body.features
            const lat = features[0].center[1]
            const long = features[0].center[0]
            const location = features[0].place_name
            callback(undefined, {
                lat, long, location
            })
        }
    })
}

module.exports = geocode