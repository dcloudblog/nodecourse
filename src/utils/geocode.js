const request = require('postman-request')


// Geocoding service - taking an address and converting into Lat, Lon
const geocode = (address, callback) => {
    const geoToken = 'pk.eyJ1IjoiZHN0ZWVkNzciLCJhIjoiY2s5bXo3NnV0MTN4cjNsbWl4MWprMTU2cCJ9.d82qR8q6ekKljlUbC4hhQQ'
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${geoToken}`
    
    request({ url, json: true }, (error, { body }) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Error in the Geocoding Query Parameter', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            } )
        }
    })
}

module.exports = geocode;