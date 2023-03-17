import fetch from "node-fetch"
import type {SupplyInputDto, SupplySummaryDto} from "../models/supply.model";
import {Request, Response} from "express";

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
        .then((response: any) => {
            console.log('response', response)
            return response.json()
        })
        .then((response2: any) => response2)
        .catch((err: any) => console.error("getCatalogError", err))

    console.log('getCatalog', getCatalog)

    async function getCatalogTest() {
        await fetch(`${process.env.CATALOG}/products`, {method: "GET"})
    }

    getCatalogTest()
        .then(res => console.log('res', res))

    async function updateProductStock(productId: string, quantity: number, status: 'Supply' | 'Reserve' | 'Removal'): Promise<any> {
        return await fetch(`${process.env.STOCK}/stock/${productId}/movement`,
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({productId, quantity, status})
            }
        )
    }

    async function createProduct(ean: string, name: string, description: string, price: number): Promise<any> {
        return await fetch(`${process.env.STOCK}/product/`,
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ean, name, description, price})
            }
        )
    }

    if (!!products.length && getCatalog) {
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
    res.status(201)
    res.json(data)
}

