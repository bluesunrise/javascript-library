(function(window){
 'use strict';

  // This function will contain all exported library
  function MetricsImplementation(){
    var impl = {};

    // Metrics Library Public interface 
    impl.query = function(q) {
        console.log("querying metrics here ...");
    };

    impl.write = function(metric) {
        console.log("writing one metric here ...", JSON.stringify(metric));
        myPrivateFunction();
    };

    // Private implementation
    function myPrivateFunction() {
      console.log("... private ....")
    }
    return impl;
  }
  // make our library excessible to the outside, check not to include it twice
  if(typeof(window.metrics) === 'undefined'){
    window.metrics = MetricsImplementation();
  }
})(window); 

