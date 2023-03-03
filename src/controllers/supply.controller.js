const fetch = require('node-fetch')

exports.postSupply = async (req, res) => {
    const {supplyId, products} = req.query
    const getCatalog = await fetch(`${process.env.CATALOG}/products`, {method: "GET"})
        .then(response => response.json())
        .catch(err => console.error(err))
    res.json(getCatalog)
}
