import {Request, Response, Router} from "express";
import {getSupplySummary, postSupply} from "../controllers/supply.controller";
import {getPong} from "../controllers/ping.controller";

export const routes: Router = Router()

routes.get('/', (req: Request, res: Response) => {
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
routes.get('/ping', getPong)
routes.post('/supply', postSupply)
routes.get('/supply/summary', getSupplySummary)
