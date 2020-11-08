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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(14);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

Nova.booting(function (Vue, router, store) {
  router.addRoutes([{
    name: 'fav-creation',
    path: '/fav-creation',
    component: __webpack_require__(3)
  }]);
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(4)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(9)
/* template */
var __vue_template__ = __webpack_require__(13)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/Tool.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-68ff5483", Component.options)
  } else {
    hotAPI.reload("data-v-68ff5483", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("6e5db1d0", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-68ff5483\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Tool.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-68ff5483\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Tool.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* Scoped Styles */\n", ""]);

// exports


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(8)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Fav_FavCreationForm_vue__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Fav_FavCreationForm_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Fav_FavCreationForm_vue__);
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        FavCreationForm: __WEBPACK_IMPORTED_MODULE_0__Fav_FavCreationForm_vue___default.a
    },

    mounted: function mounted() {
        //
    }
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(11)
/* template */
var __vue_template__ = __webpack_require__(12)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/Fav/FavCreationForm.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1a398e62", Component.options)
  } else {
    hotAPI.reload("data-v-1a398e62", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'FavCreationForm',

    data: function data() {
        return {
            form: {
                url: {
                    value: '',
                    touched: false
                },
                publishedAt: {
                    value: '',
                    touched: false
                },
                user: {
                    value: '',
                    display: '',
                    touched: false
                }
            },

            userSearch: '',
            availableUsers: []
        };
    },


    computed: {
        invalidUrl: function invalidUrl() {
            var url = this.form.url;
            return url.value === '' || !url.value.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);
        },
        invalidPublishedAt: function invalidPublishedAt() {
            var publishedAt = this.form.publishedAt;
            return publishedAt.value === '' || !publishedAt.value.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/);
        },
        invalidUser: function invalidUser() {
            var user = this.form.user;
            return user.value === '';
        }
    },

    methods: {
        handleSubmit: function handleSubmit() {
            var url = this.form.url.value;
            var publishedAt = this.form.publishedAt.value;
            var user = this.form.user.value;

            Nova.request().post('/nova-api/favs', {
                url: url, publishedAt: publishedAt, user: user
            }).then(function (_) {
                Nova.success('Created');
            }).catch(function (_) {
                Nova.error('Error');
            });

            this.resetForm();
        },
        handleSearchUser: function handleSearchUser() {
            var _this = this;

            if (this.userSearch === '') return this.availableUsers = [];
            Nova.request().get('/nova-api/favs/associatable/user', {
                params: {
                    search: this.userSearch,
                    first: false,
                    withTrashed: false,
                    viaResource: '',
                    viaResourceId: ''
                }
            }).then(function (res) {
                if (_this.userSearch === '') return;
                _this.availableUsers = res.data.resources;
            }).catch(function (_) {
                Nova.error('Error searching for user');
            });
        },
        selectUser: function selectUser(availableUser) {
            this.form.user.value = availableUser.value;
            this.form.user.display = availableUser.display;
            this.availableUsers = [];
            this.userSearch = '';
        },
        resetForm: function resetForm() {
            this.form = {
                url: {
                    value: '',
                    valid: true
                },
                publishedAt: {
                    value: '',
                    valid: true
                },
                user: {
                    value: '',
                    valid: true,
                    display: ''
                }
            };
        }
    }
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("h2", { staticClass: "my-3" }, [_vm._v("Create Fav")]),
    _vm._v(" "),
    _c(
      "form",
      {
        on: {
          submit: function($event) {
            $event.preventDefault()
            return _vm.handleSubmit($event)
          }
        }
      },
      [
        _c("div", { staticClass: "card" }, [
          _c("div", { staticClass: "flex border-b border-40" }, [
            _c("div", { staticClass: "w-1/5 px-8 py-6" }, [
              _c(
                "label",
                {
                  staticClass: "inline-block text-80 pt-2 leading-tight",
                  class: {
                    "text-danger":
                      _vm.invalidUrl &&
                      _vm.form.url.touched &&
                      _vm.form.url.value !== ""
                  },
                  attrs: { for: "url" }
                },
                [_vm._v("\n                        Url\n                    ")]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "py-6 px-8 w-1/2" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.form.url.value,
                    expression: "form.url.value"
                  }
                ],
                staticClass:
                  "w-full form-control form-input form-input-bordered",
                attrs: { id: "url", type: "text", placeholder: "Url" },
                domProps: { value: _vm.form.url.value },
                on: {
                  blur: function($event) {
                    _vm.form.url.touched = true
                  },
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.form.url, "value", $event.target.value)
                  }
                }
              }),
              _vm._v(" "),
              _vm.invalidUrl &&
              _vm.form.url.touched &&
              _vm.form.url.value !== ""
                ? _c("span", { staticClass: "mt-2 text-danger" }, [
                    _vm._v("Please enter a valid URL.")
                  ])
                : _vm._e()
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "flex border-b border-40" }, [
            _c("div", { staticClass: "w-1/5 px-8 py-6" }, [
              _c(
                "label",
                {
                  staticClass: "inline-block text-80 pt-2 leading-tight",
                  class: {
                    "text-danger":
                      _vm.invalidPublishedAt &&
                      _vm.form.publishedAt.touched &&
                      _vm.form.publishedAt.value !== ""
                  },
                  attrs: { for: "PublishedAt" }
                },
                [
                  _vm._v(
                    "\n                        Published At\n                    "
                  )
                ]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "py-6 px-8 w-1/2" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.form.publishedAt.value,
                    expression: "form.publishedAt.value"
                  }
                ],
                staticClass:
                  "w-full form-control form-input form-input-bordered",
                attrs: {
                  id: "publishedAt",
                  type: "date",
                  placeholder: "publishedAt"
                },
                domProps: { value: _vm.form.publishedAt.value },
                on: {
                  blur: function($event) {
                    _vm.form.publishedAt.touched = true
                  },
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.form.publishedAt, "value", $event.target.value)
                  }
                }
              }),
              _vm._v(" "),
              _vm.invalidPublishedAt &&
              _vm.form.publishedAt.touched &&
              _vm.form.publishedAt.value !== ""
                ? _c("span", { staticClass: "mt-2 text-danger" }, [
                    _vm._v("Please enter a valid date yyyy-mm-dd.")
                  ])
                : _vm._e()
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "flex border-b border-40" }, [
            _c("div", { staticClass: "w-1/5 px-8 py-6" }, [
              _c(
                "label",
                {
                  staticClass: "inline-block text-80 pt-2 leading-tight",
                  class: {
                    "text-danger":
                      _vm.invalidUser &&
                      _vm.form.user.touched &&
                      _vm.form.user.value !== ""
                  },
                  attrs: { for: "user_id" }
                },
                [_vm._v("\n                        User\n                    ")]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "py-6 px-8 w-1/2" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.form.user.display,
                    expression: "form.user.display"
                  }
                ],
                staticClass:
                  "w-full form-control form-input form-input-bordered",
                attrs: {
                  readonly: "",
                  id: "user_id",
                  type: "text",
                  placeholder: "User"
                },
                domProps: { value: _vm.form.user.display },
                on: {
                  blur: function($event) {
                    _vm.form.user.touched = true
                  },
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.form.user, "display", $event.target.value)
                  }
                }
              }),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "form-input px-0 border border-60 pin-t pin-l my-1 overflow-hidden",
                  staticStyle: { width: "100%" }
                },
                [
                  _c("div", { staticClass: "p-2 bg-grey-300" }, [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.userSearch,
                          expression: "userSearch"
                        }
                      ],
                      staticClass:
                        "outline-none search-input-input w-full px-2 py-1.5 text-sm leading-normal bg-white rounded",
                      attrs: {
                        type: "text",
                        placeholder: "Search",
                        spellcheck: "false"
                      },
                      domProps: { value: _vm.userSearch },
                      on: {
                        input: [
                          function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.userSearch = $event.target.value
                          },
                          _vm.handleSearchUser
                        ],
                        blur: function($event) {
                          _vm.form.user.touched = true
                        }
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass:
                        "search-input-options relative overflow-y-scroll scrolling-touch text-sm",
                      staticStyle: { "max-height": "155px" },
                      attrs: { tabindex: "-1" }
                    },
                    [
                      _vm.availableUsers.length
                        ? _c(
                            "div",
                            _vm._l(_vm.availableUsers, function(user) {
                              return _c(
                                "div",
                                {
                                  key: user.value,
                                  staticClass:
                                    "px-4 py-2 cursor-pointer search-input-item-0 text-white",
                                  on: {
                                    click: function($event) {
                                      return _vm.selectUser(user)
                                    }
                                  }
                                },
                                [
                                  _c(
                                    "div",
                                    { staticClass: "flex items-center" },
                                    [
                                      _c("div", { staticClass: "mr-3" }, [
                                        _c("img", {
                                          staticClass:
                                            "w-8 h-8 rounded-full block",
                                          attrs: { src: user.avatar }
                                        })
                                      ]),
                                      _vm._v(" "),
                                      _c("div", [
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "text-sm font-semibold leading-5 text-90"
                                          },
                                          [
                                            _vm._v(
                                              "\n                                                " +
                                                _vm._s(user.display) +
                                                "\n                                            "
                                            )
                                          ]
                                        )
                                      ])
                                    ]
                                  )
                                ]
                              )
                            }),
                            0
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.availableUsers.length === 0 && this.userSearch !== ""
                        ? _c("div", [_vm._m(0)])
                        : _vm._e()
                    ]
                  )
                ]
              ),
              _vm._v(" "),
              _vm.invalidUser &&
              _vm.form.user.touched &&
              _vm.form.user.value !== ""
                ? _c("span", { staticClass: "mt-2 text-danger" }, [
                    _vm._v("Please select a valid user.")
                  ])
                : _vm._e()
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "flex justify-content-end mt-3" }, [
          _c(
            "button",
            {
              staticClass:
                "btn btn-default btn-primary inline-flex items-center relative",
              attrs: {
                disabled:
                  _vm.invalidUrl || _vm.invalidPublishedAt || _vm.invalidUser,
                type: "submit"
              }
            },
            [_vm._v("\n                Create Fav\n            ")]
          )
        ])
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      {
        staticClass: "px-4 py-2 cursor-pointer search-input-item-0 text-white"
      },
      [
        _c("div", { staticClass: "flex items-center" }, [
          _c("div", [
            _c(
              "div",
              {
                staticClass:
                  "text-sm font-semibold leading-5 text-90 text-danger"
              },
              [
                _vm._v(
                  "\n                                                There is no user exist.\n                                            "
                )
              ]
            )
          ])
        ])
      ]
    )
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1a398e62", module.exports)
  }
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [_c("h1", [_vm._v("Favs")]), _vm._v(" "), _c("FavCreationForm")],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-68ff5483", module.exports)
  }
}

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);