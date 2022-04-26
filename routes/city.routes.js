const { Router } = require('express');
const config = require('config');
const City = require('../models/City');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/add', auth, async (req, res) => {
    try {
        const { name } = req.body;

        const existing = await City.findOne({ name, owner: req.user.userId });
        
        if (existing) {
            return res.json({ name: existing });
        }

        const city = new City({
            name,
            owner: req.user.userId
        });

        await city.save();
        res.status(201).json({ city });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const cities = await City.find({ owner: req.user.userId });

        res.json(cities);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const {id} = req.params;

        if (!id) {
            res.status(400).json({ message: 'Invalid id, something went wrong' })
        }

        const city = await City.findByIdAndDelete(id);
        return res.json(city);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });   
    }
})

module.exports = router;