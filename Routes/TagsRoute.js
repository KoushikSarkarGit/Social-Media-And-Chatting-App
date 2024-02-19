const express = require('express');
const { valtokenchecker, extractIdFromToken } = require('../Middlewares/Encryptiontools');
const { getTrendingTags } = require('../Controllers/TagsController');

const router = express.Router();



router.get('/get-trending-tags/:page', getTrendingTags)


module.exports = router