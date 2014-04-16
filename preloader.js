;(function(root){
  'use strict';

  var isArray = function(obj){
    return toString.call(obj) === '[object Array]';
  };

  var isFunction = function(obj){
    return typeof obj === 'function';
  };

  var isObject = function(obj) {
    return obj === Object(obj);
  };

  // main function
  var preload = function(imgs, opts){
    // define a log function
    var is_debug = false;
    var log = function(msg){
      if(console && console.log && is_debug) console.log(msg);
    };

    // return if imgs != Array or empty
    if(!imgs || !isArray(imgs) || imgs.length === 0){
      log("imgs is illegal.");
      return;
    }

    // if opts is false or, neither a function or an object, no callbacks.
    if(!opts || (!isFunction(opts) && !isObject(opts))){
      log("opts is illegal.");
      opts = {};
    } else if(isFunction(opts)){
      // if opts is a function, it is assumed to be a done callback.
      log("opts is function.");
      opts = {done: opts};
    }

    is_debug = !!opts.debug;

    // callbacks.
    var success_cb = (opts.success && isFunction(opts.success)) ? opts.success : null;
    var error_cb = (opts.error && isFunction(opts.error)) ? opts.error : null;
    var abort_cb = (opts.abort && isFunction(opts.abort)) ? opts.abort : null;
    var done_cb = (opts.done && isFunction(opts.done)) ? opts.done : null;
    var complete_cb = (opts.complete && isFunction(opts.complete)) ? opts.complete : null;

    // some record variables.
    var num_images = imgs.length;
    var counter = num_images;
    var successes = [];
    var errors = [];
    var aborts = [];

    // utilities
    var indexOfRec = {};
    var indexOf = function(elm){
      // cache
      if(indexOfRec[elm] !== void 0/*undefined*/){
        return indexOfRec[elm];
      }

      // iterate
      for(var i = 0; i<imgs.length; i++){
        if(imgs[i] === elm){
          indexOfRec[elm] = i;
          return i;
        }
      }
      return -1;
    };

    var comparator = function(a, b){
      var index_a = indexOf(a);
      var index_b = indexOf(b);

      return (index_a < index_b) ? -1 :
        (index_a > index_b) ? 1 :
        0;
    };

    // internal callback function
    var onload = function(e){
      var src = e.currentTarget.src;
      successes.push(src);
      log("load: "+src);
      if(success_cb) success_cb(src);
      isDone();
      isComplete();
    };

    var onerror = function(e){
      var src = e.currentTarget.src;
      errors.push(src);
      log("error: "+src);
      if(error_cb) error_cb(src);
      isDone();
    };

    var onabort = function(e){
      var src = e.currentTarget.src;
      aborts.push(src);
      log("abort: "+src);
      if(abort_cb) abort_cb(src);
      isDone();
    };

    var isDone = function(){
      counter--;
      if(counter === 0 && done_cb){
        log("done.");
        // all done
        // return the cloned array as original order.
        done_cb(successes.concat().sort(comparator),
                errors.concat().sort(comparator),
                aborts.concat().sort(comparator));
      }
    };

    var isComplete = function(){
      if(counter === 0 && successes.length === num_images && complete_cb){
        // all success
        log("complete.");
        // return the cloned original array
        complete_cb(imgs.concat());
      }
    };

    // main part.
    var cache = [];
    for(var i=0; i<imgs.length; i++){
      var img = document.createElement("img");
      img.onload = onload;
      img.onerror = onerror;
      img.onabort = onabort;
      img.src = imgs[i];
      cache.push(img);
    }
  };

  // export
  if( typeof define === 'function' && define.amd ) {
    define(preload);
  } else {
    root.ev_preload = preload;
  }
})(this);
