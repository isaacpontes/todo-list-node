const express = require('express');
const Checklist = require('../models/checklist');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const checklists = await Checklist.find({});
        res.status(200).render('checklists/index', { checklists: checklists });
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Error getting checklists.' });
    }
});

router.get('/new', async (req, res) => {
    try {
        const checklist = new Checklist();
        res.status(200).render('checklists/new', { checklist: checklist });
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Error loading form.' });
    }
});

router.post('/', async (req, res) => {
    const { name } = req.body.checklist;
    const checklist = new Checklist({ name });
    try {
        checklist.save();
        res.redirect('/checklists');
    } catch (error) {
        res.status(422).render('/checklists/new', { checklist: { ...checklist, error } });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const checklist = await Checklist.findById(req.params.id).populate('tasks');
        res.status(200).render('checklists/show', { checklist: checklist });
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Error getting checklist.' });
    }
});

router.get('/:id/edit', async (req, res) => {
    try {
        const checklist = await Checklist.findById(req.params.id);
        res.status(200).render('checklists/edit', { checklist: checklist });
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Error loading form.' });
    }
});

router.put('/:id', async (req, res) => {
    const { name } = req.body.checklist;
    const checklist = await Checklist.findById(req.params.id);
    try {
        await checklist.update({ name });
        res.redirect('/checklists');
    } catch (error) {
        const errors = error.errors;
        res.status(422).render('/checklists/edit', { checklist: { ...checklist, error } });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const checklist = await Checklist.findByIdAndRemove(req.params.id);
        res.redirect('/checklists');
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Error deleting checklist.' });
    }
});

module.exports = router;