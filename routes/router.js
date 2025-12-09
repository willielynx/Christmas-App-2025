const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 3000
const axios = require('axios')

const {paginationResults, buildProgramArr} = require('../helpers/pagination')

router.get('/', (req, res)=> {
    res.render('pages/home', {
        title: 'Christmas-App Home',
        name: "William's Christmas Program App"
    })
})

router.get('/actor-form', (req, res)=> {
    res.render('pages/actorForm', {
        title: 'Actor Form',
        name: 'Actor Form'
    })
})

router.get('/actors', (req, res)=> {

    const url = 'http://localhost:3000/api/actor'

    const pageData = paginationResults(req)
    let actorArr = []



    axios.get(url).then(resp => {

        const programArrData = buildProgramArr(resp.data, actorArr, pageData.startIdx, pageData.endIdx, pageData.page)

        res.render('./pages/actor', {
            title: 'Actors',
            name: 'Actors',
            data: programArrData.arr,
            prev: programArrData.prev,
            next: programArrData.next
        })
    })
})

router.get('/directors', (req, res)=> {

    const url = 'http://localhost:3000/api/director'

    const pageData = paginationResults(req)
    let directorArr = []

    axios.get(url).then(resp=> {

        const directorArrData = buildProgramArr(resp.data, directorArr, pageData.startIdx, pageData.endIdx, pageData.page)

        res.render('./pages/director', {
            title: 'Directors',
            name: 'Directors',
            data: directorArrData.arr,
            prev: directorArrData.prev,
            next: directorArrData.next
        })
    })
})

router.get('/producers', (req, res)=> {

    const url = 'http://localhost:3000/api/producer'

    const pageData = paginationResults(req)
    let producerArr = []

    axios.get(url).then(resp=> {

        const producerArrData = buildProgramArr(resp.data, producerArr, pageData.startIdx, pageData.endIdx, pageData.page)

        res.render('./pages/producer', {
            title: 'Production Companies',
            name: 'Production Companies',
            data: producerArrData.arr,
            prev: producerArrData.prev,
            next: producerArrData.next
        })
    })
})

router.get('/streaming_platform', (req, res)=> {

    const url = 'http://localhost:3000/api/streaming_platform'

    const pageData = paginationResults(req)
    let streaming_platformArr = []


    axios.get(url).then(resp=> {
        
        const streamingArrData = buildProgramArr(resp.data, streaming_platformArr, pageData.startIdx, pageData.endIdx, pageData.page)
        

        res.render('./pages/streaming_platform', {
            title: 'Streaming Platforms',
            name: 'Streaming Platforms',
            data: streamingArrData.arr,
            prev: streamingArrData.prev,
            next: streamingArrData.next
        })
    })
})

router.get('/programs', (req, res)=> {

    const url = 'http://localhost:3000/api/program'

    const pageData = paginationResults(req)
    let programArr = []

    axios.get(url).then(resp=> {

        const programArrData = buildProgramArr(resp.data, programArr, pageData.startIdx, pageData.endIdx, pageData.page)

        res.render('./pages/program', {
            title: 'Programs',
            name: 'Programs',
            data: programArrData.arr,
            prev: programArrData.prev,
            next: programArrData.next
        })
    })
})




// ROOT
router.get('/api', (req, res)=> {
    res.json({
        'Actors':`http://localhost:${PORT}/api/actor`,
        'Directors': `http://localhost:${PORT}/api/director`,
        'Producer': `http://localhost:${PORT}/api/producer`,
        'Streaming_Platform': `http://localhost:${PORT}/api/streaming_platform`,
        'Program': `http://localhost:${PORT}/api/program`
    })
})

const endpoints = [
    'actor',
    'director',
    'producer',
    'program',
    'streaming_platform'
]

endpoints.forEach(endpoint => {
    router.use(`/api/${endpoint}`, require(`./api/${endpoint}Routes`))
})


router.use((req, res, next)=> {
    res.status(404)
    .render('pages/error', {
        title: '404 Error',
        name: '404 Error. Page not found'
    })
})






module.exports = router