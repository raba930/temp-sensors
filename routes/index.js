import Entry from '../models/Entry';
import express from 'express';
const router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});
router.get('/current', function (req, res) {
    Entry
        .find({}, 'inside outside created_at', (err, data) => {
            if (err) res.status(500).json(err);
            res.json({ entries: data });
        })
        .sort({'_id': -1})
        .limit(100);
});

/// QUICK HACK REMOVE THIS!!!
router.get('/dots/:cnt', function (req, res) {
    Entry
        .find({}, 'inside outside created_at', (err, data) => {
            if (err) res.status(500).json(err);
            res.json({ entries: data });
        })
        .sort({ '_id': -1 })
        .limit(req.params.cnt || 1500);
});
///

module.exports = router;
