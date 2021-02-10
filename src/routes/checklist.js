const express = require('express');
const Checklist = require('../models/checklist');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const checklists = await Checklist.find({});
        res.status(200).json(checklists);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const checklist = await Checklist.create({ name });
        res.status(200).json(checklist);
    } catch (error) {
        res.status(422).json(error);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const checklist = await Checklist.findById(req.params.id);
        res.status(200).json(checklist);
    } catch (error) {
        res.status(422).json(error);
    }
})

router.put('/:id', async (req, res) => {
    const { name } = req.body;
    try {
        const checklist = await Checklist.findByIdAndUpdate(req.params.id, { name }, { new: true });
        res.status(200).json(checklist);
    } catch (error) {
        res.status(422).json(error);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const checklist = await Checklist.findByIdAndRemove(req.params.id);
        res.status(200).json(checklist);
    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router;