module.exports = (app) => {
    const ping = require('../controllers/ping.controller')

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })
    app.get('/ping', ping.getPong)

    return app
}
