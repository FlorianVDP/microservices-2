const fetch = require('node-fetch')

exports.postSupply = async (req, res) => {
    let {supplyId, products} = req.body
    const getCatalog = await fetch(`${process.env.CATALOG}/products`, {method: "GET"})
        .then(response => response.json())
        .catch(err => console.error(err))

    async function updateProductStock(productId, quantity, status) {
        return await fetch(`${process.env.STOCK}/stock/${productId}/movement`,
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({productId, quantity, status})
            }
        )
    }

    if (!!products.length && !!getCatalog.length) {
        products.forEach((product, index) => {
            getCatalog.forEach(async (productCat, indexCat) => {
                if (product.ean === productCat.ean) {
                    updateProductStock(productCat["_id"], product.quantity, "Supply")
                    res.status(204)
                    res.send()
                } else {
                    // Create product
                }
            })
        })
    } else {

    }
}
