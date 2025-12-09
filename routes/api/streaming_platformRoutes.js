const express = require('express')
const router = express.Router()
const axios = require('axios')

const { streaming_platformDao: dao } = require('../../daos/dao')

router.get('/', (req, res)=> {
    dao.findAll(res, dao.table)
})

router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

router.get('/count', (req, res)=> {
    dao.countAll(res, dao.table)
})

router.get('/production', (req, res)=> {
    dao.streamingProduction(res, dao.table)
})

router.get('/programs', (req, res)=> {
    dao.programsOnStreaming(res, dao.table)
})

router.get('/search/:column/:query',(req, res)=> {
    dao.search(res, dao.table, req.params.column, req.params.query)
})

router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

router.post('/create', (req, res) => {
    dao.create(req, res, dao.table)
})

router.patch('/update/:id', (req, res)=> {
    dao.update(req, res, dao.table)
})

module.exports = router