const { Toy } = require("../models/Toy.model");

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {import("express").NextFunction} next 
 * @returns {Response}
 */

exports.addNewToy = async (req, res, next) => {
    const body = req.body;
    const userId = res.locals.userId;
    try {
        const newToy = new Toy(body);
        newToy.ownerId = userId;
        newToy.id = newToy._id;
        await newToy.save();
        res.status(201).send(newToy);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

exports.getToys = async (req, res, next) => {
    try {
        const {page} = req.query;
        const perPage = 10;
        const skip = (page -1)* perPage;
        const toys = await Toy.find()
            .skip(skip).limit(perPage);
        res.send(toys);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

exports.getToyById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const toy = await Toy.findOne({id}).select("-__v");
        res.send(toy);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

exports.searchToyByCat = async (req, res, next) => {
    try {
        const {page} = req.query;
        const perPage = 10;
        const skip = (page -1)* perPage;
        const { catName } = req.params;
        const toys = await Toy.find({catName})
            .skip(skip).limit(perPage);
        res.send(toys);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}


exports.searchToyByNameOrInfo = async (req, res, next) => {
    try {
        const {page} = req.query;
        const { s } = req.query;
        const perPage = 10;
        const skip = (page -1)* perPage;
        const toys = await Toy.find({ $or: [{ name: s }, { info: s }] })
            .skip(skip).limit(perPage);
        res.send(toys)
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

exports.editToy = async (req, res, next) => {
    try {
        let data = await Toy.findOneAndUpdate({ id: req.params.editId }, req.body,{new:true});
        res.json(data);
    } catch (error) {
        console.log(error);
        next(error)
    }
}

exports.deleteToy = async (req, res, next) => {
    try {
        let data = await Toy.deleteOne({ id: req.params.delId })
        res.json(data)
    } catch (error) {
        console.log(error);
        next(error);
    }
}










// const userId = res.locals.userId;
// const toys = await Toy.find().populate('owerId');