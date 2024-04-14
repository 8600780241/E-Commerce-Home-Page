
const productmodel = require('../Model/productModel')

exports.Getproduct = async (req, res) => {
    try {
        const products = await productmodel.find({});
        res.status(200).send({
            message: "products are get in",
            products
        })
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "products are not get it.",
            error
        })
    }
}

exports.Addproduct = async (req, res) => {
    try {
        const { name, price } = req.body;
        if (!req.file) {
            console.log('No file uploaded');
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const image = req.file.path;
        const data = new productmodel({ name, price, image })
        await data.save();
        return res.status(200).send({
            message: "products successfully added"
        })
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "Unable to add product.",
            error
        })
    }
}

exports.Updateproduct = async (req, res) => {
    try {
        const { name, price } = req.body;
        const newData = { name, price };
        if (req.file) {
            newData.image = req.file.path;
        }
        const data = await productmodel.findByIdAndUpdate(req.params.id, newData)
        return res.status(200).send({
            message: "data updated"
        })
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "getting error while update.",
            error
        })
    }
}

exports.Removeproduct = async (req, res) => {
    try {
        const data = await productmodel.deleteMany(req.params)
        return res.status(200).send({
            "message": "data has deleted",
            data
        })
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "getting error while removing products.",
            error
        })
    }
}

exports.Searchproduct = async (req, res) => {
    try {
        const query = req.query.name;
        const items = await productmodel.find({ $text: { $search: query } });
        // console.log(items)
        return res.status(200).send({
            messsage: "data searched",
            items
        })
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "getting error while searching products.",
            error
        })
    }
}