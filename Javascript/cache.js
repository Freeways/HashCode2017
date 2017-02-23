var Cache = function (id, size, videos) {
  this.id = id;
  this.size = size;
  this.videos = videos || [];
  this.addVideo = function(video){
    this.videos.push(video);
    this.size -= video.size;
  }
  this.print = function(){
    var out = [this.id];
    this.videos.forEach(function(video){
      out.push(video.id);
    })
    console.log(out.join(' '));
  };
}
module.exports = Cache;