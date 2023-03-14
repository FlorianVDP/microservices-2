import fetch from "node-fetch"
import type {Request, Response} from "express";
import type {SupplyInputDto, SupplySummaryDto} from "../models/supply.model";

const data: SupplySummaryDto[] = [
    {
        nbSupplies: 0,
        totalNbProducts: 0,
        totalPurchasePrice: 0
    }
]

export async function postSupply(req: Request, res: Response): Promise<void> {
    let {supplyId, products}: SupplyInputDto = req.body

    const getCatalog: any[] = await fetch(`${process.env.CATALOG}/products`, {method: "GET"})
        .then(response => response.json())
        .then(response2 => response2)
        .catch(err => console.error(err))

    async function updateProductStock(productId, quantity, status): Promise<any> {
        return await fetch(`${process.env.STOCK}/stock/${productId}/movement`,
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({productId, quantity, status})
            }
        )
    }

    async function createProduct(ean, name, description, price): Promise<any> {
        return await fetch(`${process.env.STOCK}/product/`,
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ean, name, description, price})
            }
        )
    }

    if (!!products.length) {
        products.forEach((product) => {
            if (getCatalog.some(productCat => productCat.ean === product.ean)) {
                const productCat = getCatalog.find(productCat => productCat.ean === product.ean)
                console.log("----- UPDATE -----")
                updateProductStock(productCat["_id"], product.quantity, "Supply")
                    .then(response => {
                        res.status(204)
                        res.send(response)
                    })
                    .catch(err => {
                        res.status(400)
                        res.send(err)
                    })
            } else {
                console.log("----- CREATE -----")
                createProduct(product.ean, product.name, product.description, product.purchasePricePerUnit)
                    .then(response => console.log(response))
                    .catch(err => console.error(err))
                res.status(204)
                res.send()
            }
        })
    } else {
        console.error("Error")
        res.status(400)
        res.send()
    }
}

export async function getSupplySummary(req: Request, res: Response): Promise<void> {
    console.log("good")
    res.status(201)
    res.json(data)
}

