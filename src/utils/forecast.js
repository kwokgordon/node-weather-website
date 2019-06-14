const request = require('request')

const forecast = ({lat, long}, callback) => {
    const url = 'https://api.darksky.net/forecast/d847950e6f86b9c525c7b7a79bc58c56/' + lat + ',' + long + '?units=si'

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback("Unable to connect to Weather service", undefined)
        } else if (body.error) {
            callback("Unable to find location", undefined)
        } else {
            const currently = body.currently
            callback(undefined, body.daily.data[0].summary + "  It is currently " + currently.temperature + " degrees out.  There is a " + currently.precipProbability * 100 + "% chance of rain, and a wind gust of " + currently.windGust)
        }
    })
}

module.exports = forecast