const express = require('express');
const app = express();
const urlData = require('./routes/urls');
const urlRouter = urlData.router;
const DEFAULT_PORT = 5000;


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json({}));

app.use('/urls', urlRouter);

app.get('/:shortUrl', async (req, res) => {
    const fullUrl = await urlData.getFullUrl(req.params.shortUrl);
    if (fullUrl) {
        res.redirect(fullUrl);
    } else {
        res.redirect(`http://localhost:4200`);
    }
});

app.listen(process.env.PORT || DEFAULT_PORT);