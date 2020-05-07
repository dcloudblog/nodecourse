const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('postman-request')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express() 

const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../src/templates/views')
const partialsPath = path.join(__dirname, '../src/templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'David Steed'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'David Steed'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Helping you out.'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.location){
        return res.send({
            error: 'No location in request body.'
        })
    }

    const location = req.query.location
    let data = {};

    geocode(location, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: 'Error geocoding location'
            })
        }
        forecast(latitude, longitude, 'f', (error, { weather_descriptions, temperature, feelslike } = {}) => {
            if (error) {
               return res.send({
                    error: 'Error retrieving forecast.'
                })
            } else {
                res.send({
                    location: location,
                    description: weather_descriptions[0],
                    temperature: temperature,
                    feelslike: feelslike
                })
            }        
        })
    })

})

//all help pages that don't exist
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found!',
        // title: 'Help article not found',
    })
})

//all pages that don't exist that dont fall under a bigger category. 
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found!',
        // title: 'Help article not found',

    })
})

let port = 3000
app.listen(port, () => {
    console.log("server up on port ", port)
})