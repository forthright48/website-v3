const express = require('express');
const world = require('forthright48/world');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const rootPath = world.rootPath;

app.set('port', 8000);
app.set('view engine', 'pug');
app.set('views', path.join(rootPath, './views'));

app.use('/', express.static(path.join(rootPath, '/public')));
app.use('/public/css', express.static(path.join(rootPath, '/node_modules/@forthright48/simplecss/src')));

app.get('/', getHome);
app.get('/intro', getIntro);
app.get('/findme', getFindMe);
app.get('/cv', getCV);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('*', function(req, res) {
  return res.status(404).send('Page not found\n');
});

if (require.main === module) {
  server.listen(app.get('port'), function() {
    console.log(`Server running at port ${app.get('port')}`);
  });
} else {
  module.exports = {
    server,
    app
  };
}

/*******************************************
Implementation
*******************************************/

function getHome(req, res) {
  return res.render('home');
}

function getIntro(req, res) {
  return res.render('intro');
}

function getFindMe(req, res) {
  return res.render('findme');
}

function getCV(req, res) {
  return res.render('cv');
}
