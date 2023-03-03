module.exports = (app) => {
    const ping = require('../controllers/ping.controller')
    const supply = require ('../controllers/supply.controller')

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })
    app.get('/ping', ping.getPong)
    app.post('/supply', supply.postSupply)

    return app
}
