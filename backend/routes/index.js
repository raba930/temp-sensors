import Entry from '../models/Entry';
import express from 'express';
import path from 'path';
const router = express.Router();
const appRoot = path.dirname(require.main.filename).replace(/\/bin/, '');

router.get('/', function(req, res) {
    res.sendFile('/public/index.html', { root: appRoot });
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
module.exports = router;

