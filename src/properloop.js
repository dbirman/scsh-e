Skip to content
Personal Open source Business Explore
Sign upSign inPricingBlogSupport
This repository
Search
 Watch 0  Star 12  Fork 2 hunterloftis/ludumstar
 Code  Issues 0  Pull requests 0  Pulse  Graphs
Branch: master Find file Copy pathludumstar/lib/loop/loop.js
c341d7d  on Dec 6, 2014
@hunterloftis hunterloftis running the game server-side
1 contributor
RawBlameHistory     40 lines (31 sloc)  767 Bytes
var raf = require('raf');
var present = require('present');

module.exports = Loop;

function Loop(fps) {
  this.fps = fps;
  this.simTicks = 1000 / fps;
}

Loop.prototype.start = function(simulateFn, renderFn) {
  var timeBuffer = 0;
  var lastTime = 0;
  var simTicks = this.simTicks;
  var simSeconds = simTicks / 1000;
  var requestAnimationFrame = this.raf;
  var perfNow = this.now;

  raf(frame);

  function frame() {
    var now = present();
    var ticks = now - lastTime;

    if (ticks > 100) ticks = 0;
    timeBuffer += ticks;

    if (timeBuffer >= simTicks) {
      while (timeBuffer >= simTicks) {
        simulateFn(simSeconds);
        timeBuffer -= simTicks;
      }
      renderFn(ticks / 1000);
    }

    lastTime = now;
    raf(frame);
  }
};
Contact GitHub API Training Shop Blog About
© 2016 GitHub, Inc. Terms Privacy Security Status Help