/* jshint strict: false */

function myAroundHooks () {
  this.Around(function (runScenario) {

    this.loadTopicGraph();

    runScenario(function (callback) {
      // Now, we can do our "after scenario" stuff:
      setTimeout(function() {
        // Tell Cucumber we're done:
        callback();
      }, 500);
      // console.log('Shutting down...');
    });
  });
}

module.exports = myAroundHooks;
