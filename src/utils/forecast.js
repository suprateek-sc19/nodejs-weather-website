const request = require('request')

const forecast = (latitide, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=df1469fb2840e827dfbc0fbd2d6a2437&query='+latitide+','+longitude+'&unit=c'

    request({url, json: true},(error, { body }) => {
        if(error){
            callback('Unable to connect to forecast service', undefined)
        } else if(body.error)
        {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,
                'The temperature is ' + body.current.temperature + ' degrees.' 
                +' It feels like '+body.current.feelslike+' degrees. Humidity is '+
                body.current.humidity+'. Precipitation is '+body.current.precip +" Weather description is: "+body.current.weather_descriptions
            )
        }
     })
}

module.exports = forecast