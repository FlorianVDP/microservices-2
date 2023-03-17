"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const supply_controller_1 = require("../controllers/supply.controller");
const ping_controller_1 = require("../controllers/ping.controller");
exports.routes = (0, express_1.default)();
exports.routes.get('/', (req, res) => {
    res.status(202);
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
    });
});
exports.routes.get('/ping', ping_controller_1.getPong);
exports.routes.post('/supply', supply_controller_1.postSupply);
exports.routes.get('/supply/summary', supply_controller_1.getSupplySummary);
//# sourceMappingURL=index.routes.js.map