var Endpoint = function (id, latency, caches, requests) {
  this.id = id;
  this.latency = latency;
  this.caches = caches || [];
  this.requests = requests || [];
  this.sortRequest = function(){
    this.requests.sort(function(a,b){
      return a.amount > b.amount;
    });
  };
  this.sortCache = function(){
    this.caches.sort(function(a,b){
      return a.latency < b.latency;
    });
  }
  this.allCaches = function(){
    var allCache = [];
    for(var i = 0; i < this.caches.length; i++){
      allCache = allCache.concat(this.caches[i].cache.videos);
    }
    return allCache;
  };
}
module.exports = Endpoint;