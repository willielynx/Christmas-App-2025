const daoCommon = require('./common/daoCommon')

const actorDao = {
    ...daoCommon,
    ...require('./api/actorDao')
}

const directorDao = {
    ...daoCommon,
    ...require('./api/directorDao')
}

const producerDao = {
    ...daoCommon,
    ...require('./api/producerDao')
}

const streaming_platformDao = {
    ...daoCommon,
    ...require('./api/streaming_platformDao')
}

const programDao = {
    ...daoCommon,
    ...require('./api/programDao')
}

module.exports = {
    actorDao,
    directorDao,
    producerDao,
    streaming_platformDao,
    programDao
}