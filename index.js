const express = require("express");
const gd = require("gamedig");
const config = require("./config.json");

const app = express();

const port = config.port;

const fs = require('fs');

const {marked} = require('marked');

app.get('/info', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="https://www.gametracker.ro">gametracker</a>`);
});

app.get("/", (req, res) => {
    const game = req.query.game;
    const ip = req.query.ip;
    const port = req.query.port;

    gd.query({
        type: game,
        host: ip,
        port: port,
        maxAttempts: 3
    }).then(jawab => {
        res.send(jawab);
    }).catch(error => {
        res.send({
            status: 404,
            error: error.message
        });
    })
})

app.listen(port, () => {
    console.log("Ready on port " + port);
})
