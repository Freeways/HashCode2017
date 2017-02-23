var fs = require('fs');
var path = require('path');
var args = process.argv.slice(2);

var Video = require('./video');
var Endpoint = require('./endpoint');
var Cache = require('./cache');
var Request = require('./request');

fs.readFile(path.resolve(__dirname, args[0]), 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  var rows = data.split("\n");
  var controles = rows.shift().split(' ');
  var manifest = {videos: parseInt(controles[0]), endpoints: parseInt(controles[1]), requests: parseInt(controles[2]), caches: parseInt(controles[3]), csize: parseInt(controles[4])}

  var caches = [];
  for (var i = 0; i < manifest.caches; i++) {
    caches.push(new Cache(i, manifest.csize));
  }

  var videos = [];
  var endpoints = [];
  rows.shift().split(' ').forEach(function (size, index) {
    videos.push(new Video(index, size));
  });
  var i = 0;
  var row = rows.shift().split(' ');
  while (row.length === 2) {
    var currentCaches = [];
    for (var j = 0; j < row[1]; j++) {
      var c = rows.shift().split(' ');
      var cidx = caches.map(function (C) {
        return C.id
      }).indexOf(parseInt(c[0]));
      currentCaches.push({cache: caches[cidx], latency: c[1]});
    }
    endpoints.push(new Endpoint(i, row[0], currentCaches, []));
    row = rows.shift().split(' ');
    i++;
  }

  while (row.length === 3) {
    var eidx = endpoints.map(function (E) {
      return E.id
    }).indexOf(parseInt(row[1]));
    var vidx = videos.map(function (M) {
      return M.id
    }).indexOf(parseInt(row[0]));
    var endpoint = endpoints[eidx];
    endpoint.requests.push({video: videos[vidx], amount: row[2]});
    row = rows.shift().split(' ');
  }

  //sort endpoint
  endpoints.sort(function (a, b) {
    function add(a, b) {
      return a.latency + b.latency;
    }
    return a.caches.reduce(add, 0) > b.caches.reduce(add, 0);
  });

  //resolving
  endpoints.forEach(function (endpoint) {
    endpoint.sortRequest();
    endpoint.sortCache();
    var Cached = endpoint.allCaches();
    endpoint.requests.forEach(function (request) {
      if (Cached.map(function (C) {
        return C.id;
      }).indexOf(request.video.id) === -1) {
        for (var i = 0; i < endpoint.caches.length; i++) {
          if (request.video.size < endpoint.caches[i].cache.size) {
            endpoint.caches[i].cache.addVideo(request.video);
            Cached.push(request.video);
            break;
          }
        }
      }
    });
  });

  console.log(caches.length);
  caches.forEach(function (cache) {
    cache.print();
  });

});