# javascript-library
example javascript library module

* metrics.js  - the library module source
* index.html - includes the library and uses it to access some simple apis 

(1) Including the library, see index.html

<script src='metrics.js'></script>

(2) Accessing the API, see index.html

For simplicity, there are 2 APIs, query(), and write() which simple log some info to the console. You can use Google Chrome Developers Tool to inspect the output

https://developer.chrome.com/devtools

Call the query API:

	metrics.query("select * from cpu");
	
Call the write API:

	metrics.write(
			{ service: 'cpu', 
			  value: 2005, 
		  	tags: [{'tag0': 'australia'}]
	});

Call a private function, which throws an exception to demonstrate that this private function is not visible to the API caller:

	try {
		metrics.myPrivateFunction();
	}
	catch(e) {
		console.log("Error: ", e);
	}

(3) The Library(module), see metrics.js

It is conventional to name the exported library entry point variable to the same name as the Javascript file whenever possible. Libraries are commonly called ‘modules’ in Javascript.

In JavaScript, every function, when invoked, creates a new execution context. Because variables and functions defined within a function may only be accessed inside, but not outside, that context (scope), invoking a function provides an easy way to create privacy, effectively hiding the implementation details, and only exposing the API. This is how we create a module, or library in JavaScript using an Immediately Invoked Function Expression (IIFE):

(function(window){
…. the privately scoped context, the module private implementation goes here
})(window); 

NOTE:
* the function is executed immediately when it is loaded in the script, allowing for module initialization phase prior to using it 
* the passed in window is a global variable defined by the browser. Our module is attached to the window object
* the MetricsImplementation function acts as a singleton, its initialized once:

 function MetricsImplementation(){
    var impl = {};

And we ensure that it isn’t initialized again:

  if (typeof(window.metrics) === 'undefined'){
    window.metrics = MetricsImplementation();
  }

The module implementation is returned by the function and set to the window.metrics variable above in ‘browser public(global) state:

 return impl;

Public functions, the Module's API, are attached to our exported module variable impl:

    // Metrics Library Public interface 
    impl.query = function(q) {
		...
    };

    impl.write = function(metric) {
		….
    };

Private functions are not exposed in the API, but are available to be used by the API implementations:

 function myPrivateFunction() {
      console.log("... private ....")
    }

There are much more rich Javascript frameworks like React, VueJS and Angular. This frameworks are also built upon JavaScript principals like function scoping to abstract libraries as easily usable APIs. There are also conventions for packaging modules like CommonJS and AMD that follow this similar IIFE pattern.
