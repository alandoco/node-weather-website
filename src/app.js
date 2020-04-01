const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
//Setting up port from env variable for heroku. Set port to 3000 if running locally
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine
app.set('view engine', 'hbs')
//Views by default should be in the 'views' directory
//This code allows us to change the name of the directory
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Alan Rochford'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Alan Rochford'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        msg: 'This is a help page',
        name: 'Alan Rochford'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    //set lat, long, location to empty obj if no object provided: = {}
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
    
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Alan Rochford'
    })
})

app.get('*', (req,res) =>{
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Alan Rochford'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})