const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Gordon Kwok'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Gordon Kwok'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Gordon Kwok',
        helpMsg: 'Need Help'
    })
})

app.get('/weather', (req, res) => {
    const { address } = req.query

    if (!address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(address, (error, geocodeData) => {
        if (error) {
            return res.send({ error })
        }

        forecast(geocodeData, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location: geocodeData.location,
                address
            })
        
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404 - Help Artical Not Found',
        name: 'Gordon Kwok',
        errorMessage: 'Help articale not found'
    })
})

app.get('/*', (req, res) => {
    res.render('error', {
        title: '404 - Error',
        name: 'Gordon Kwok',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
