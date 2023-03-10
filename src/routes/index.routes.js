module.exports = (app) => {
    const ping = require('../controllers/ping.controller')
    const supply = require('../controllers/supply.controller')

    app.get('/', (req, res) => {
        res.status(202)
        res.json({
            names: "BOURG Elisa, VAN DER PUT Florian",
            version: "1.0.0",
            endpoints: {
                GET: [
                    "/ping",
                ],
                POST: [
                    "/supply"
                ]
            }


        })
    })
    app.get('/ping', ping.getPong)
    app.post('/supply', supply.postSupply)

    return app
}
