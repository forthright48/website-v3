const assert = require('chai').assert;
const world = require('forthright48/world');
const path = require('path');
const request = require('superagent');

const rootPath = world.rootPath;
const filePath = path.join(rootPath, './index.js');
const baseurl = 'http://localhost:1234';

let server;
let app;

describe('index.js', function() {
  before(function(done) {
    ({
      server,
      app
    } = require(filePath));

    const port = 1234; //app.get('port') is not used since it conflicts with running server
    server.listen(port, function(err) {
      done(err);
    });
  });

  it('should be running on port 8000', function() {
    assert.equal(app.get('port'), 8000, 'Port is not set to 8000');
  });

  it('should be using pug as view engine', function() {
    assert.equal(app.get('view engine'), 'pug', 'view engine should be pug');
  });

  it('should be using /views as render folder', function() {
    assert.equal(app.get('views'), path.join(rootPath, './views'), 'views should be in root/views folder');
  });

  it('should have /public as public directory', function(done) {
    request
      .get(`${baseurl}/public/test.txt`)
      .end(function(err, res) {
        if (err) done(err);
        assert.equal(res.text, 'working\n', 'There should be a test.txt file in root/public folder and it should be public');
        done();
      });
  });

  after(function(done) {
    server.close(done);
  });
});
