"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupplySummary = exports.postSupply = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const data = [
    {
        nbSupplies: 0,
        totalNbProducts: 0,
        totalPurchasePrice: 0
    }
];
function postSupply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { supplyId, products } = req.body;
        const getCatalog = yield (0, node_fetch_1.default)(`${process.env.CATALOG}/products`, { method: "GET" })
            .then(response => response.json())
            .then(response2 => response2)
            .catch(err => console.error(err));
        function updateProductStock(productId, quantity, status) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield (0, node_fetch_1.default)(`${process.env.STOCK}/stock/${productId}/movement`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ productId, quantity, status })
                });
            });
        }
        function createProduct(ean, name, description, price) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield (0, node_fetch_1.default)(`${process.env.STOCK}/product/`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ean, name, description, price })
                });
            });
        }
        if (!!products.length) {
            products.forEach((product) => {
                if (getCatalog.some(productCat => productCat.ean === product.ean)) {
                    const productCat = getCatalog.find(productCat => productCat.ean === product.ean);
                    console.log("----- UPDATE -----");
                    updateProductStock(productCat["_id"], product.quantity, "Supply")
                        .then(response => {
                        res.status(204);
                        res.send(response);
                    })
                        .catch(err => {
                        res.status(400);
                        res.send(err);
                    });
                }
                else {
                    console.log("----- CREATE -----");
                    createProduct(product.ean, product.name, product.description, product.purchasePricePerUnit)
                        .then(response => console.log(response))
                        .catch(err => console.error(err));
                    res.status(204);
                    res.send();
                }
            });
        }
        else {
            console.error("Error");
            res.status(400);
            res.send();
        }
    });
}
exports.postSupply = postSupply;
function getSupplySummary(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("good");
        res.status(201);
        res.json(data);
    });
}
exports.getSupplySummary = getSupplySummary;
//# sourceMappingURL=supply.controller.js.map