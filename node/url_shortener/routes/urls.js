const router = require('express').Router();
const mongoose = require('mongoose');
const Url = require('../model/url');

mongoose.connect('mongodb://localhost/url', { useNewUrlParser: true, useUnifiedTopology: true });

router.get('/', async (req, res) => {
    const urls = await Url.find().sort({'creationDate': 'desc'});
    res.send({
        response: urls
    });
});

router.post('/minify', async (req, res) => {
    const url = req.body.url;
    await Url.create(
        {
            originalUrl: url,

        }
    );
    res.send(
        {
            response: true
        }
    );
});

async function redirectToMainUrl(url) {
    console.log(url);
    const urlItem = await Url.findOne({
        minifiedUrl: url
    });
    urlItem.count++;
    urlItem.save();
    return urlItem.originalUrl;
}

module.exports = {
    router: router,
    getFullUrl: redirectToMainUrl.bind(this)
};