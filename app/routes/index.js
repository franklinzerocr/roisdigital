module.exports = (router) => {
    require('./home')(router)
    require('./coming-soon')(router)
    require('./dead-link')(router)
}