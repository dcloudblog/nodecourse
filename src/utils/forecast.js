const request = require('postman-request')

const forecast = (lat, lon, units, callback) => {
    const weatherstack_access_key = 'dcde15533606817d398ba21dc131bf66';

    // Current Weather API Endpoint
    const url = `http://api.weatherstack.com/current?access_key=${weatherstack_access_key}&query=${lat},${lon}&units=${units}`
    
    request({ url, json: true }, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback('Error in the Query Parameter', undefined)
        } else {
            callback(undefined, body.current)
        }
    })    
}

module.exports = forecast;