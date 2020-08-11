/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var runtime = function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.

  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }

  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.

    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.

  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.


  var IteratorPrototype = {};

  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  }; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.


  exports.awrap = function (arg) {
    return {
      __await: arg
    };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    } // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).


    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };

  exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.

  exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        } // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;

        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);

          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);

        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted; // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.

          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  } // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.


  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    } // The delegate iterator is finished, so forget it and continue with
    // the outer generator.


    context.delegate = null;
    return ContinueSentinel;
  } // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.


  defineIteratorMethods(Gp);
  define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse(); // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.

    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      } // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.


      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;
          return next;
        };

        return next.next = next;
      }
    } // Return an iterator with no values.


    return {
      next: doneResult
    };
  }

  exports.values = values;

  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0; // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.

      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined;
      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function stop() {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;

      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      } // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.


      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  }; // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.

  return exports;
}( // If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
( false ? undefined : _typeof(module)) === "object" ? module.exports : {});

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (module) {
  if (!module.webpackPolyfill) {
    module.deprecate = function () {};

    module.paths = []; // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function get() {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function get() {
        return module.i;
      }
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),

/***/ "./src/factories/gameboard.js":
/*!************************************!*\
  !*** ./src/factories/gameboard.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ships */ "./src/factories/ships.js");


var Gameboard = function Gameboard(boardId) {
  var shipArray = [];
  var boardArray = Array(100);

  function placeShip(coords) {
    var isAlreadyOccupied = false;
    coords.forEach(function (coord) {
      if (boardArray[coord]) {
        isAlreadyOccupied = true;
      }

      ;
    });

    if (!isAlreadyOccupied) {
      var id = shipArray.length + 1;
      var newShip = Object(_ships__WEBPACK_IMPORTED_MODULE_0__["default"])(id, coords);
      shipArray.push(newShip);
      coords.forEach(function (coord) {
        return boardArray[coord] = id;
      });
    }

    ;
  }

  ;

  function receiveAttack(coord) {
    if (boardArray[coord] === "miss" || boardArray[coord] === "hit") {
      return;
    } else if (boardArray[coord] === undefined) {
      boardArray[coord] = "miss";
    } else {
      var hitShip = shipArray[boardArray[coord] - 1];
      hitShip.hit(coord);
      boardArray[coord] = "hit";
    }
  }

  ;

  function allShipsSunk() {
    return shipArray.map(function (ship) {
      return ship.isSunk();
    }).every(function (isSunk) {
      return isSunk === true;
    });
  }

  ;
  return {
    boardId: boardId,
    boardArray: boardArray,
    shipArray: shipArray,
    placeShip: placeShip,
    receiveAttack: receiveAttack,
    allShipsSunk: allShipsSunk
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Gameboard);

/***/ }),

/***/ "./src/factories/player.js":
/*!*********************************!*\
  !*** ./src/factories/player.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Player = function Player() {
  var isTurn = true;

  function setTurn(bool) {
    isTurn = bool;
  }

  ;

  function getTurn() {
    return isTurn;
  }

  ;

  function attack(enemyBoard, coord) {
    if (isTurn) {
      enemyBoard.receiveAttack(coord);
    }

    ;
  }

  ;

  function randomAttack(enemyBoard) {
    if (isTurn) {
      var coord = Math.floor(Math.random() * 100);

      while (enemyBoard.boardArray[coord] === "miss" || enemyBoard.boardArray[coord] === "hit") {
        coord = Math.floor(Math.random() * 100);
      }

      enemyBoard.receiveAttack(coord);
    }
  }

  return {
    getTurn: getTurn,
    setTurn: setTurn,
    attack: attack,
    randomAttack: randomAttack
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Player);

/***/ }),

/***/ "./src/factories/randomShipArray.js":
/*!******************************************!*\
  !*** ./src/factories/randomShipArray.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var randomShipArray = function randomShipArray() {
  var newShip = function newShip(length) {
    return {
      orientation: randomOrient(),
      length: length
    };
  };

  var randomOrient = function randomOrient() {
    var flip = Math.round(Math.random());
    return flip === 0 ? "h" : "v";
  }; // define number and lengths of ships


  var shipClasses = [5, 4, 3, 3, 2];
  var fleet = shipClasses.map(function (length) {
    return newShip(length);
  }); // generate position array

  var grid = Array(100).fill(null);
  var randomFleetPosition = [];
  fleet.forEach(function (ship) {
    var isNotClear = true;
    var coordsNotValid = true;
    var newShip;

    while (isNotClear || coordsNotValid) {
      coordsNotValid = true;
      newShip = []; // generate ship coordinates

      var randomCoordinates = Math.floor(Math.random() * 100);

      for (var i = 0; i < ship.length; i++) {
        if (ship.orientation === "h") {
          newShip.push(randomCoordinates + i);
        } else if (ship.orientation === "v") {
          newShip.push(randomCoordinates + i * 10);
        }

        ;
      }

      ; // check if valid (within grid, does not wrap around grid)

      var withinGrid = newShip.every(function (square) {
        return square < 100;
      });
      var modArr = newShip.map(function (square) {
        return square % 10;
      });
      var sortArr = newShip.map(function (square) {
        return square % 10;
      }).sort();
      var noWrap = JSON.stringify(modArr) === JSON.stringify(sortArr);
      coordsNotValid = !(withinGrid && noWrap); // check coordinates do not overlap with other ships

      isNotClear = !newShip.map(function (coord) {
        return grid[coord] === null;
      }).every(function (square) {
        return square;
      });
    }

    ; // mark ships on internal grid

    newShip.forEach(function (square) {
      return grid[square] = "x";
    });
    randomFleetPosition.push(newShip);
  });
  return randomFleetPosition;
};

/* harmony default export */ __webpack_exports__["default"] = (randomShipArray);

/***/ }),

/***/ "./src/factories/ships.js":
/*!********************************!*\
  !*** ./src/factories/ships.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Ship = function Ship(id, position) {
  var hits = [];

  function hit(pos) {
    if (position.includes(pos)) {
      hits.push(pos);
    }

    ;
  }

  ;

  function isSunk() {
    return hits.length === position.length ? true : false;
  }

  ;
  return {
    id: id,
    length: position.length,
    hits: hits,
    hit: hit,
    isSunk: isSunk
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Ship);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _factories_player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factories/player */ "./src/factories/player.js");
/* harmony import */ var _factories_gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factories/gameboard */ "./src/factories/gameboard.js");
/* harmony import */ var _factories_randomShipArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./factories/randomShipArray */ "./src/factories/randomShipArray.js");
/* harmony import */ var _ui_setShipArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui/setShipArray */ "./src/ui/setShipArray.js");
/* harmony import */ var _ui_gameplay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui/gameplay */ "./src/ui/gameplay.js");
/* harmony import */ var _ui_render__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ui/render */ "./src/ui/render.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_6__);







var renderBoard = Object(_ui_render__WEBPACK_IMPORTED_MODULE_5__["default"])(); // same button used to start / reset game

var btn = document.getElementById("gameBtn");

var setupGame = function setupGame() {
  var player1 = Object(_factories_player__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var player2 = Object(_factories_player__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var p1Board = Object(_factories_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])("p1Board");
  var p2Board = Object(_factories_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])("p2Board");
  var p1Ships = Object(_factories_randomShipArray__WEBPACK_IMPORTED_MODULE_2__["default"])();
  var p2Ships = Object(_factories_randomShipArray__WEBPACK_IMPORTED_MODULE_2__["default"])(); // let p1Ships = [
  //   [0,1,2,3,4],
  //   [60, 70, 80, 90],
  //   [7,8,9],
  //   [79,89,99],
  //   [28,29]
  // ]

  p2Ships.forEach(function (ship) {
    return p2Board.placeShip(ship);
  });
  renderBoard.initializeBoards();
  renderBoard.makeDraggableShips(p1Ships);

  btn.onclick = function () {
    Object(_ui_setShipArray__WEBPACK_IMPORTED_MODULE_3__["default"])(p1Board);
    renderBoard.clearDraggableShips(p1Ships);
    btn.textContent = "Reset Game";
    renderBoard.message("");
    playGame(player1, player2, p1Board, p2Board);
  };
};

var playGame = function playGame(player1, player2, p1Board, p2Board) {
  btn.onclick = function () {
    btn.textContent = "Play Game";
    renderBoard.message("Place Ships (dbl click to rotate)");
    setupGame();
  };

  Object(_ui_gameplay__WEBPACK_IMPORTED_MODULE_4__["default"])(player1, player2, p1Board, p2Board);
};

setupGame();

/***/ }),

/***/ "./src/ui/dragHandlers.js":
/*!********************************!*\
  !*** ./src/ui/dragHandlers.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var dragHandlers = function dragHandlers() {
  // draggable ships comprised of unit squares
  // ship square ids based on board square location they are covering
  var handleMouseEnter = function handleMouseEnter(e) {
    var square = document.getElementById(e.target.id);
    var parent = square.parentNode; // get mouse location, main ship marker location

    var currentMousePosition = Number(e.target.id.match(/^((?!sh).)+/g)[0].slice(8));
    var shipBow = Number(parent.id.match(/^((?!offset\d+).)+/)[0].slice(8));
    var offset = currentMousePosition - shipBow;

    if (parent.id.includes("offset")) {
      parent.id = parent.id.match(/^((?!offset\d+).)+/)[0] + "offset".concat(offset);
    } else {
      parent.id = parent.id + "offset".concat(offset);
    }

    ;
  };

  var handleDragStart = function handleDragStart(e) {
    e.target.style.opacity = "0.4";
    e.dataTransfer.setData("shipId", e.target.id.match(/^((?!offset\d+).)+/)[0]);
    e.dataTransfer.setData("length", Number(e.target.id.slice(6, 7)));
    e.dataTransfer.setData("orientation", e.target.id.slice(7, 8));
    e.dataTransfer.setData("location", Number(e.target.id.slice(8)));
    e.dataTransfer.setData("offset", Number(e.target.id.match(/offset\d+/g)[0].slice(6)));
    e.target.id = e.target.id.match(/^((?!offset\d+).)+/)[0];
  };

  var handleDragOver = function handleDragOver(e) {
    if (e.preventDefault()) {
      e.preventDefault();
    }

    ;
    return false;
  };

  function handleDragEnter(e) {}

  ;

  function handleDragLeave(e) {}

  ;

  var handleDrop = function handleDrop(e) {
    e.preventDefault();
    var draggedId = e.dataTransfer.getData("shipId");
    var dragged = document.getElementById(draggedId); // check dragged ship doesnt overlap with another ship (except itself)

    var orientation = e.dataTransfer.getData("orientation");
    var offset = e.dataTransfer.getData("offset");
    var current = e.target.id.match(/^((?!sh).)+/g)[0];
    var spot = Number(current.slice(8));
    var offsetValue = current.slice(0, 8) + (spot - Number(offset)); // const dropArea = document.getElementById(e.target.id.match(/^((?!sh).)+/g));

    var dropArea = document.getElementById(offsetValue);

    var squares = _toConsumableArray(dragged.childNodes);

    var currSqs = squares.map(function (sq) {
      return sq.id;
    });
    var possSqs = squares.map(function (sq, index) {
      return orientation === "h" ? "p1Board-".concat(Number(dropArea.id.slice(8)) + index, "sh") : "p1Board-".concat(Number(dropArea.id.slice(8)) + index * 10, "sh");
    });
    var noOverlap = possSqs.map(function (sq) {
      return document.getElementById(sq) === null || currSqs.includes(sq);
    }).every(function (el) {
      return el;
    }); // check if dragged ship remains on the grid

    var squareIds = possSqs.map(function (sq) {
      return Number(sq.match(/^((?!sh).)+/g)[0].slice(8));
    });
    var withinGrid = squareIds.every(function (el) {
      return el < 100 && el >= 0;
    });
    var modArr = squareIds.map(function (el) {
      return el % 10;
    });
    var sortArr = squareIds.map(function (el) {
      return el % 10;
    }).sort();
    var noWrap = JSON.stringify(modArr) === JSON.stringify(sortArr);
    var newCoordsValid = withinGrid && noWrap; // do not append if dropping on current square or does not meet above conditions

    var location = e.dataTransfer.getData("location");

    if (e.target.id !== "p1Board-".concat(location) && newCoordsValid && noOverlap) {
      dropArea.appendChild(dragged); // rename ship id/square id's based on new location

      dragged.id = dragged.id.slice(0, 8) + Number(dropArea.id.slice(8));
      squares.forEach(function (sq, index) {
        return sq.id = possSqs[index];
      });
    }

    ;
  };

  var handleDragEnd = function handleDragEnd(e) {
    e.target.style.opacity = "1";
  };

  return {
    handleMouseEnter: handleMouseEnter,
    handleDragStart: handleDragStart,
    handleDragOver: handleDragOver,
    handleDragEnter: handleDragEnter,
    handleDragLeave: handleDragLeave,
    handleDrop: handleDrop,
    handleDragEnd: handleDragEnd
  };
};

/* harmony default export */ __webpack_exports__["default"] = (dragHandlers);

/***/ }),

/***/ "./src/ui/gameplay.js":
/*!****************************!*\
  !*** ./src/ui/gameplay.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ "./src/ui/render.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var gameplay = function gameplay(player1, player2, p1Board, p2Board) {
  var coordinates;
  var renderBoard = Object(_render__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var compHits = {
    checkOtherEnd: false,
    chasingSequence: false,
    hitSniffing: false,
    origHit: -1,
    offset: 0,
    hits: []
  };
  player1.setTurn(true);
  player2.setTurn(false);

  var isThereWinner = function isThereWinner() {
    if (p1Board.allShipsSunk()) {
      renderBoard.message("player2 won the game!");
      return "player2";
    } else if (p2Board.allShipsSunk()) {
      renderBoard.message("player1 won the game!");
      return "player1";
    } else {
      return false;
    }

    ;
  };

  var wait = function wait(ms) {
    return new Promise(function (res, rej) {
      setTimeout(function () {
        res(ms);
      }, ms);
    });
  };

  var isValidCoordinates = function isValidCoordinates(coordinate) {
    var lastHit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : compHits.hits[compHits.hits.length - 1].coord;
    var isInGrid = coordinate < 100 && coordinate >= 0;
    var square = p1Board.boardArray[coordinate];
    var isEmpty = square !== "hit" && square !== "miss";
    var notWrapGridLeft = !(lastHit % 10 === 0 && coordinates === lastHit - 1);
    var notWrapGridRight = !(lastHit % 10 === 9 && coordinates === lastHit + 1);
    return isInGrid && isEmpty && notWrapGridRight && notWrapGridLeft;
  };

  var createHitObject = function createHitObject(coordinates) {
    var initialNeighbors = [coordinates - 10, coordinates + 1, coordinates + 10, coordinates - 1];

    var checkNeighbors = function checkNeighbors() {
      return initialNeighbors.map(function (coordinate) {
        return isValidCoordinates(coordinate, coordinates) ? coordinate : "";
      }).filter(function (coordinate) {
        return coordinate !== "";
      });
    };

    return {
      coord: coordinates,
      neighbors: checkNeighbors()
    };
  };

  function playRound(_x) {
    return _playRound.apply(this, arguments);
  }

  function _playRound() {
    _playRound = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
      var checkOtherEnd, chasingSequence, randomNeighbor, neighborLength, hitSniffing, useRandomCoordinates;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (isThereWinner()) {
                _context.next = 35;
                break;
              }

              coordinates = Number(event.target.id.slice(8)); // ignore previous moves

              if (!(p2Board.boardArray[coordinates] === "miss" || p2Board.boardArray[coordinates] === "hit")) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return");

            case 4:
              ;
              player1.attack(p2Board, coordinates);
              renderBoard.update(p2Board); // skip p2 computer turn if p1 gets hit

              if (!(p2Board.boardArray[coordinates] === "hit")) {
                _context.next = 10;
                break;
              }

              isThereWinner();
              return _context.abrupt("return");

            case 10:
              ;
              player1.setTurn(false);
              player2.setTurn(true); // computer player 2 gameplay
              // four states:
              // 1. looking for hit (random move)
              // 2. sniffing around neighboring cells to link sequence of hits
              // 3. moving down the line sequence of hits
              // 4. if hit end of grid/miss, check the other end of the sequence start

              checkOtherEnd = function checkOtherEnd() {
                coordinates = compHits.origHit - compHits.offset;

                if (isValidCoordinates(coordinates)) {
                  player2.attack(p1Board, coordinates);

                  if (p1Board.boardArray[coordinates] === "hit") {
                    compHits.hits.push(createHitObject(coordinates));
                    compHits.checkOtherEnd = false;
                    compHits.chasingSequence = true;
                    compHits.offset = -compHits.offset;
                  } else {
                    // miss
                    compHits.checkOtherEnd = false;
                    compHits.offset = 0;
                  }

                  ;
                } else {
                  // not valid coordinates
                  compHits.checkOtherEnd = false;
                  useRandomCoordinates();
                }

                ;
              };

              chasingSequence = function chasingSequence() {
                coordinates = compHits.hits[compHits.hits.length - 1].coord + compHits.offset;

                if (isValidCoordinates(coordinates)) {
                  player2.attack(p1Board, coordinates);

                  if (p1Board.boardArray[coordinates] === "hit") {
                    compHits.hits.push(createHitObject(coordinates));
                  } else {
                    // miss
                    compHits.chasingSequence = false;
                    compHits.checkOtherEnd = true;
                  }

                  ;
                } else {
                  // invalid coordinates - check other end
                  coordinates = compHits.origHit - compHits.offset;

                  if (isValidCoordinates(coordinates)) {
                    player2.attack(p1Board, coordinates);

                    if (p1Board.boardArray[coordinates] === "hit") {
                      compHits.hits.push(createHitObject(coordinates));
                      compHits.offset = -compHits.offset;
                    } else {
                      // miss
                      compHits.chasingSequence = false;
                      compHits.checkOtherEnd = false;
                    }

                    ;
                  } else {
                    // both ends checked/invalid so go random
                    compHits.chasingSequence = false;
                    useRandomCoordinates();
                  }

                  ;
                }

                ;
              };

              hitSniffing = function hitSniffing() {
                neighborLength = compHits.hits[compHits.hits.length - 1].neighbors.length;
                randomNeighbor = Math.floor(Math.random() * neighborLength);
                coordinates = compHits.hits[compHits.hits.length - 1].neighbors[randomNeighbor];
                player2.attack(p1Board, coordinates);

                if (p1Board.boardArray[coordinates] === "hit") {
                  compHits.hits.push(createHitObject(coordinates));
                  compHits.chasingSequence = true;
                  compHits.hitSniffing = false;
                  compHits.offset = compHits.hits[compHits.hits.length - 1].coord - compHits.hits[compHits.hits.length - 2].coord;
                } else {
                  // miss
                  compHits.hits[compHits.hits.length - 1].neighbors = compHits.hits[compHits.hits.length - 1].neighbors.filter(function (neighbor) {
                    return neighbor !== coordinates;
                  });
                }

                ;
              };

              useRandomCoordinates = function useRandomCoordinates() {
                coordinates = Math.floor(Math.random() * 100);

                while (!isValidCoordinates(coordinates, -1)) {
                  coordinates = Math.floor(Math.random() * 100);
                }

                ;
                player2.attack(p1Board, coordinates);

                if (p1Board.boardArray[coordinates] === "hit") {
                  compHits.hits.push(createHitObject(coordinates));
                  compHits.hitSniffing = true;
                  compHits.origHit = coordinates;
                }

                ;
              };

              if (compHits.checkOtherEnd) {
                checkOtherEnd();
              } else if (compHits.chasingSequence) {
                chasingSequence();
              } else if (compHits.hitSniffing) {
                hitSniffing();
              } else {
                useRandomCoordinates();
              }

              ;
              _context.next = 21;
              return wait(500);

            case 21:
              renderBoard.update(p1Board);
              isThereWinner(); // skip p1's turn if getting hits

            case 23:
              if (!(p1Board.boardArray[coordinates] === "hit")) {
                _context.next = 32;
                break;
              }

              if (compHits.checkOtherEnd) {
                checkOtherEnd();
              } else if (compHits.chasingSequence) {
                chasingSequence();
              } else if (compHits.hitSniffing) {
                hitSniffing();
              } else {
                useRandomCoordinates();
              }

              ;
              _context.next = 28;
              return wait(500);

            case 28:
              renderBoard.update(p1Board);
              isThereWinner();
              _context.next = 23;
              break;

            case 32:
              ;
              player1.setTurn(true);
              player2.setTurn(false);

            case 35:
              ;

            case 36:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _playRound.apply(this, arguments);
  }

  ; // set up board to kick off gameplay

  var board = document.getElementById("p2Board");
  board.onclick = playRound;
};

/* harmony default export */ __webpack_exports__["default"] = (gameplay);

/***/ }),

/***/ "./src/ui/render.js":
/*!**************************!*\
  !*** ./src/ui/render.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dragHandlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dragHandlers */ "./src/ui/dragHandlers.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var render = function render() {
  var initializeBoards = function initializeBoards() {
    var playerOneBoard = document.getElementById("p1Board");
    var playerTwoBoard = document.getElementById("p2Board");
    playerOneBoard.innerHTML = "";
    playerTwoBoard.innerHTML = "";

    for (var i = 0; i < 100; i++) {
      var newDiv1 = document.createElement("div");
      var newDiv2 = document.createElement("div");
      newDiv1.id = "p1Board-" + i;
      newDiv1.classList.add("square");
      newDiv1.ondrop = Object(_dragHandlers__WEBPACK_IMPORTED_MODULE_0__["default"])().handleDrop;
      newDiv1.ondragover = Object(_dragHandlers__WEBPACK_IMPORTED_MODULE_0__["default"])().handleDragOver;
      newDiv1.ondragenter = Object(_dragHandlers__WEBPACK_IMPORTED_MODULE_0__["default"])().handleDragEnter;
      newDiv1.ondragleave = Object(_dragHandlers__WEBPACK_IMPORTED_MODULE_0__["default"])().handleDragLeave;
      newDiv1.ondragend = Object(_dragHandlers__WEBPACK_IMPORTED_MODULE_0__["default"])().handleDragEnd;
      newDiv2.id = "p2Board-" + i;
      newDiv2.classList.add("empty", "square");
      playerOneBoard.appendChild(newDiv1);
      playerTwoBoard.appendChild(newDiv2);
    }

    ;
  };

  var update = function update(board) {
    board.boardArray.forEach(function (sq, index) {
      var square = document.getElementById("".concat(board.boardId, "-").concat(index));

      if (sq === "miss") {
        square.classList.add("miss");
        square.textContent = "\u2022";
      } else if (sq === "hit") {
        square.classList.add("hit");
        square.textContent = "+";
      }
    });
  };

  var makeDraggableShips = function makeDraggableShips(shipArray) {
    shipArray.forEach(function (ship, index) {
      var orientation = ship[1] - ship[0] === 1 ? "h" : "v";
      var newShip = document.createElement("div");

      for (var i = 0; i < ship.length; i++) {
        var newDiv = document.createElement("div");
        newDiv.classList.add("square");
        newDiv.id = "p1Board-".concat(ship[i], "sh");
        newDiv.onmouseenter = Object(_dragHandlers__WEBPACK_IMPORTED_MODULE_0__["default"])().handleMouseEnter;
        newShip.appendChild(newDiv);
      }

      ;
      newShip.classList.add("dragMe");
      newShip.id = "ship".concat(index, "-").concat(ship.length).concat(orientation).concat(ship[0]);
      newShip.setAttribute("draggable", "true");
      newShip.style.display = "grid";
      newShip.style.gridGap = "1px";

      if (orientation === "h") {
        newShip.style.height = "27px";
        newShip.style.width = "".concat(ship.length * 26, "px");
        newShip.style.gridTemplateColumns = "repeat(".concat(ship.length, ", 25px)");
      } else if (orientation === "v") {
        newShip.style.height = "".concat(ship.length * 26, "px");
        newShip.style.width = "27px";
        newShip.style.gridTemplateRows = "repeat(".concat(ship.length, ", 25px)");
      }

      ;
      newShip.ondragstart = Object(_dragHandlers__WEBPACK_IMPORTED_MODULE_0__["default"])().handleDragStart;
      newShip.ondblclick = rotateShip;
      var position = document.getElementById("p1Board-".concat(ship[0]));
      position.appendChild(newShip);
    });
  };

  var clearDraggableShips = function clearDraggableShips() {
    var draggableShips = document.querySelectorAll(".dragMe");
    draggableShips.forEach(function (ship) {
      var parentDiv = ship.parentNode;
      parentDiv.innerHTML = "";
    });
  };

  var isLegalRotation = function isLegalRotation(coords) {
    var withinGrid = coords.every(function (el) {
      return el < 100;
    });
    var modArr = coords.map(function (el) {
      return el % 10;
    });
    var sortArr = coords.map(function (el) {
      return el % 10;
    }).sort();
    var noWrap = JSON.stringify(modArr) === JSON.stringify(sortArr);
    var newCoordsValid = withinGrid && noWrap;
    var noOverlap = coords.map(function (id, ind) {
      return ind !== 0 ? "p1Board-".concat(id, "sh") : "";
    }).map(function (sq) {
      return document.getElementById(sq) === null;
    }).every(function (el) {
      return el;
    });
    return newCoordsValid && noOverlap;
  };

  var rotateShip = function rotateShip(e) {
    var id = e.target.parentNode.id; // let id = e.target.id;

    var ship = document.getElementById(id);
    var length = id.slice(6, 7);
    var orient = id.slice(7, 8);
    var loc = Number(id.match(/^((?!offset\d+).)+/g)[0].slice(8));

    var squares = _toConsumableArray(ship.childNodes);

    var possSqs;
    var params = {
      height: orient === "h" ? "".concat(length * 26, "px") : "27px",
      width: orient === "h" ? "27px" : "".concat(length * 26, "px"),
      gridRows: orient === "h" ? "repeat(".concat(length, ", 25px)") : "",
      gridCols: orient === "h" ? "" : "repeat(".concat(length, ", 25px)"),
      newOrient: orient === "h" ? "v" : "h",
      factor: orient === "h" ? 10 : 1
    };
    possSqs = squares.map(function (sq, index) {
      return loc + index * params.factor;
    });

    if (isLegalRotation(possSqs)) {
      ship.style.height = params.height;
      ship.style.width = params.width;
      ship.style.gridTemplateRows = params.gridRows;
      ship.style.gridTemplateColumns = params.gridCols;
      ship.id = ship.id.slice(0, 7) + params.newOrient + ship.id.slice(8);
      squares.forEach(function (sq, index) {
        sq.id = "p1Board-".concat(loc + index * params.factor, "sh");
      });
    }

    ;
  };

  var message = function message(msg) {
    var message = document.getElementById("message");
    message.textContent = msg;
  };

  return {
    initializeBoards: initializeBoards,
    update: update,
    makeDraggableShips: makeDraggableShips,
    clearDraggableShips: clearDraggableShips,
    rotateShip: rotateShip,
    message: message
  };
};

/* harmony default export */ __webpack_exports__["default"] = (render);

/***/ }),

/***/ "./src/ui/setShipArray.js":
/*!********************************!*\
  !*** ./src/ui/setShipArray.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var setShipArray = function setShipArray(board) {
  // get location of all ships/ship squares from rendered board
  var ships = document.querySelectorAll(".dragMe");
  var finalShips = [];
  ships.forEach(function (ship) {
    var shipArray = [];
    var shipLength = ship.id.slice(6, 7);
    var shipOrient = ship.id.slice(7, 8);
    var shipLocation = Number(ship.id.match(/^((?!offset\d+).)+/g)[0].slice(8));

    for (var i = 0; i < shipLength; i++) {
      shipOrient === "h" ? shipArray.push(shipLocation + i) : shipArray.push(shipLocation + i * 10);
    }

    ;
    finalShips.push(shipArray);
  }); // add final ship locations to gameboard

  finalShips.forEach(function (ship) {
    return board.placeShip(ship);
  });
  board.boardArray.forEach(function (boardSquare, index) {
    var renderedSquare = document.getElementById("p1Board-".concat(index));

    if (typeof boardSquare === "number") {
      renderedSquare.classList.add("ship");
    }

    ;
  });
};

/* harmony default export */ __webpack_exports__["default"] = (setShipArray);

/***/ })

/******/ });
//# sourceMappingURL=main.js.map