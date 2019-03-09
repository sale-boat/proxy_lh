require('newrelic');
const express = require('express');
const cors = require('cors');
const proxy = require('http-proxy-middleware')
const compression = require('compression');
const path = require('path');
const favicon = require('serve-favicon')

const app = express();
const port = 8080;

app.use(cors());

app.use(compression());

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// app.use('/files', express.static(`${__dirname}/public`));

app.use('/api/reviews', proxy({
  target: 'http://localhost:3008'
}));

app.get('/:id', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get('*', (req, res) => {
  res.redirect('/1');
})

app.listen(port, () => console.log(`Now listening on port ${port}!`));