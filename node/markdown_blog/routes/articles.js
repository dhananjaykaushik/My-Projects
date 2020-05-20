const router = require('express').Router();
const mongoose = require('mongoose');
const Article = require('../model/article');

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true });

router.get('/', async (req, res) => {
    const articles = await Article.find().sort({'creationDate': 'desc'});
    res.send({
        response: articles
    });
});

router.post('/create', async (req, res) => {
    let article = new Article(
        {
            name: req.body.title,
            shortDescription: req.body.description,
            markdown: req.body.markdown
        }
    );
    try {
        article = await article.save();
        res.send({
            response: article
        });
    } catch (e) {
        throw (e);
    }
});

router.post('/delete', async (req, res) => {
    try {
        await Article.deleteOne({_id: req.body.id});
        res.send({
            response: {
                state: true
            }
        });
    } catch (e) {
        throw (e);
    }
});

router.post('/update', async (req, res) => {
    try {
        const article = await Article.findById(req.body.id);
        
        await article.updateOne({
            name: req.body.title,
            shortDescription: req.body.description,
            markdown: req.body.markdown
        });
        
        res.send({
            response: true
        });
    } catch (e) {
        throw (e);
    }
});



module.exports = router;