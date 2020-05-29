const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')  
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express Config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'SC19'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'SC19'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'This is the help message',
        title: 'Help',
        name: 'SC19'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
     }
     geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if(error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
    
            if(error){  
                return res.send({ error })
            }

            res.send({
                location,
                address: req.query.address,
                forecast: forecastData 
            })
        })
    })


})

app.get('/help/*', (req, res) => {
    res.render('errors', {
        error: 'Help article not found',
        title: '404',
        name: 'SC19'
    })
})

app.get('*', (req, res) => {
    res.render('errors', {
        error: 'Error 404: Page Not Found',
        title: '404',
        name: 'SC19'
    })
})

app.listen(port, () => {
    console.log('Server is up on port.'+port)
})