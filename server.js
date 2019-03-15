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

app.use('/files', express.static(`${__dirname}/public`));

app.get('/loaderio-58010fb022efc3e49cdd6a779da2e5f4.txt', (req, res) => {
  res.sendFile(`${__dirname}/public/loaderio-58010fb022efc3e49cdd6a779da2e5f4.txt`);
})

app.use('/api/reviews', proxy({
  target: 'http://ec2-3-90-53-108.compute-1.amazonaws.com'
}));
app.use('/api/related', proxy({
  target: 'http://ec2-54-219-186-15.us-west-1.compute.amazonaws.com'
}));
app.use('/api/products', proxy({
  target: 'http://ec2-54-198-94-221.compute-1.amazonaws.com'
}));
app.use('/api', proxy({
  target: 'http://ec2-54-175-87-50.compute-1.amazonaws.com'
}));

app.get('/:id', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get('*', (req, res) => {
  res.redirect('/1');
})

app.listen(port, () => console.log(`Now listening on port ${port}!`));