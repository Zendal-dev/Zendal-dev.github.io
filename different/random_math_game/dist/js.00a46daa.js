// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/custom-event-polyfill/custom-event-polyfill.js":[function(require,module,exports) {
// Polyfill for creating CustomEvents on IE9/10/11

// code pulled from:
// https://github.com/d4tocchini/customevent-polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill

try {
    var ce = new window.CustomEvent('test');
    ce.preventDefault();
    if (ce.defaultPrevented !== true) {
        // IE has problems with .preventDefault() on custom events
        // http://stackoverflow.com/questions/23349191
        throw new Error('Could not prevent default');
    }
} catch(e) {
  var CustomEvent = function(event, params) {
    var evt, origPrevent;
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    };

    evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    origPrevent = evt.preventDefault;
    evt.preventDefault = function () {
      origPrevent.call(this);
      try {
        Object.defineProperty(this, 'defaultPrevented', {
          get: function () {
            return true;
          }
        });
      } catch(e) {
        this.defaultPrevented = true;
      }
    };
    return evt;
  };

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent; // expose definition to window
}

},{}],"../node_modules/custom-select/build/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * custom-select
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * A lightweight JS script for custom select creation.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Needs no dependencies.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * v0.0.1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * (https://github.com/custom-select/custom-select)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Copyright (c) 2016 Gionatan Lombardi & Marco Nucara
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * MIT License
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

exports.default = customSelect;

require('custom-event-polyfill');

var defaultParams = {
  containerClass: 'custom-select-container',
  openerClass: 'custom-select-opener',
  panelClass: 'custom-select-panel',
  optionClass: 'custom-select-option',
  optgroupClass: 'custom-select-optgroup',
  isSelectedClass: 'is-selected',
  hasFocusClass: 'has-focus',
  isDisabledClass: 'is-disabled',
  isOpenClass: 'is-open'
};

function builder(el, builderParams) {
  var containerClass = 'customSelect';
  var isOpen = false;
  var uId = '';
  var select = el;
  var container = void 0;
  var opener = void 0;
  var focusedElement = void 0;
  var selectedElement = void 0;
  var panel = void 0;
  var currLabel = void 0;

  var resetSearchTimeout = void 0;
  var searchKey = '';

  //
  // Inner Functions
  //

  // Sets the focused element with the neccessary classes substitutions
  function setFocusedElement(cstOption) {
    if (focusedElement) {
      focusedElement.classList.remove(builderParams.hasFocusClass);
    }
    if (typeof cstOption !== 'undefined') {
      focusedElement = cstOption;
      focusedElement.classList.add(builderParams.hasFocusClass);
      // Offset update: checks if the focused element is in the visible part of the panelClass
      // if not dispatches a custom event
      if (isOpen) {
        if (cstOption.offsetTop < cstOption.offsetParent.scrollTop || cstOption.offsetTop > cstOption.offsetParent.scrollTop + cstOption.offsetParent.clientHeight - cstOption.clientHeight) {
          cstOption.dispatchEvent(new CustomEvent('custom-select:focus-outside-panel', { bubbles: true }));
        }
      }
    } else {
      focusedElement = undefined;
    }
  }

  // Reassigns the focused and selected custom option
  // Updates the opener text
  // IMPORTANT: the setSelectedElement function doesn't change the select value!
  function setSelectedElement(cstOption) {
    if (selectedElement) {
      selectedElement.classList.remove(builderParams.isSelectedClass);
      selectedElement.removeAttribute('id');
      opener.removeAttribute('aria-activedescendant');
    }
    if (typeof cstOption !== 'undefined') {
      cstOption.classList.add(builderParams.isSelectedClass);
      cstOption.setAttribute('id', containerClass + '-' + uId + '-selectedOption');
      opener.setAttribute('aria-activedescendant', containerClass + '-' + uId + '-selectedOption');
      selectedElement = cstOption;
      opener.children[0].textContent = selectedElement.customSelectOriginalOption.text;
    } else {
      selectedElement = undefined;
      opener.children[0].textContent = '';
    }
    setFocusedElement(cstOption);
  }

  function setValue(value) {
    // Gets the option with the provided value
    var toSelect = select.querySelector('option[value=\'' + value + '\']');
    // If no option has the provided value get the first
    if (!toSelect) {
      var _select$options = _slicedToArray(select.options, 1);

      toSelect = _select$options[0];
    }
    // The option with the provided value becomes the selected one
    // And changes the select current value
    toSelect.selected = true;

    setSelectedElement(select.options[select.selectedIndex].customSelectCstOption);
  }

  function moveFocuesedElement(direction) {
    // Get all the .custom-select-options
    // Get the index of the current focused one
    var currentFocusedIndex = [].indexOf.call(select.options, focusedElement.customSelectOriginalOption);
    // If the next or prev custom option exist
    // Sets it as the new focused one
    if (select.options[currentFocusedIndex + direction]) {
      setFocusedElement(select.options[currentFocusedIndex + direction].customSelectCstOption);
    }
  }

  // Open/Close function (toggle)
  function open(bool) {
    // Open
    if (bool || typeof bool === 'undefined') {
      // If present closes an opened instance of the plugin
      // Only one at time can be open
      var openedCustomSelect = document.querySelector('.' + containerClass + '.' + builderParams.isOpenClass);
      if (openedCustomSelect) {
        openedCustomSelect.customSelect.open = false;
      }

      // Opens only the clicked one
      container.classList.add(builderParams.isOpenClass);

      // aria-expanded update
      container.classList.add(builderParams.isOpenClass);
      opener.setAttribute('aria-expanded', 'true');

      // Updates the scrollTop position of the panel in relation with the focused option
      if (selectedElement) {
        panel.scrollTop = selectedElement.offsetTop;
      }

      // Dispatches the custom event open
      container.dispatchEvent(new CustomEvent('custom-select:open'));

      // Sets the global state
      isOpen = true;

      // Close
    } else {
      // Removes the css classes
      container.classList.remove(builderParams.isOpenClass);

      // aria-expanded update
      opener.setAttribute('aria-expanded', 'false');

      // Sets the global state
      isOpen = false;

      // When closing the panel the focused custom option must be the selected one
      setFocusedElement(selectedElement);

      // Dispatches the custom event close
      container.dispatchEvent(new CustomEvent('custom-select:close'));
    }
    return isOpen;
  }

  function clickEvent(e) {
    // Opener click
    if (e.target === opener || opener.contains(e.target)) {
      if (isOpen) {
        open(false);
      } else {
        open();
      }
      // Custom Option click
    } else if (e.target.classList && e.target.classList.contains(builderParams.optionClass) && panel.contains(e.target)) {
      setSelectedElement(e.target);
      // Sets the corrisponding select's option to selected updating the select's value too
      selectedElement.customSelectOriginalOption.selected = true;
      open(false);
      // Triggers the native change event of the select
      select.dispatchEvent(new CustomEvent('change'));
      // click on label or select (click on label corrispond to select click)
    } else if (e.target === select) {
      // if the original select is focusable (for any external reason) let the focus
      // else trigger the focus on opener
      if (opener !== document.activeElement && select !== document.activeElement) {
        opener.focus();
      }
      // Click outside the container closes the panel
    } else if (isOpen && !container.contains(e.target)) {
      open(false);
    }
  }

  function mouseoverEvent(e) {
    // On mouse move over and options it bacames the focused one
    if (e.target.classList && e.target.classList.contains(builderParams.optionClass)) {
      setFocusedElement(e.target);
    }
  }

  function keydownEvent(e) {
    if (!isOpen) {
      // On "Arrow down", "Arrow up" and "Space" keys opens the panel
      if (e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 32) {
        open();
      }
    } else {
      switch (e.keyCode) {
        case 13:
        case 32:
          // On "Enter" or "Space" selects the focused element as the selected one
          setSelectedElement(focusedElement);
          // Sets the corrisponding select's option to selected updating the select's value too
          selectedElement.customSelectOriginalOption.selected = true;
          // Triggers the native change event of the select
          select.dispatchEvent(new CustomEvent('change'));
          open(false);
          break;
        case 27:
          // On "Escape" closes the panel
          open(false);
          break;

        case 38:
          // On "Arrow up" set focus to the prev option if present
          moveFocuesedElement(-1);
          break;
        case 40:
          // On "Arrow down" set focus to the next option if present
          moveFocuesedElement(+1);
          break;
        default:
          // search in panel (autocomplete)
          if (e.keyCode >= 48 && e.keyCode <= 90) {
            // clear existing reset timeout
            if (resetSearchTimeout) {
              clearTimeout(resetSearchTimeout);
            }

            // reset timeout for empty search key
            resetSearchTimeout = setTimeout(function () {
              searchKey = '';
            }, 1500);

            // update search keyword appending the current key
            searchKey += String.fromCharCode(e.keyCode);

            // search the element
            for (var i = 0, l = select.options.length; i < l; i++) {
              // removed cause not supported by IE:
              // if (options[i].text.startsWith(searchKey))
              if (select.options[i].text.toUpperCase().substr(0, searchKey.length) === searchKey) {
                setFocusedElement(select.options[i].customSelectCstOption);
                break;
              }
            }
          }
          break;
      }
    }
  }

  function changeEvent() {
    var index = select.selectedIndex;
    var element = index === -1 ? undefined : select.options[index].customSelectCstOption;

    setSelectedElement(element);
  }

  // When the option is outside the visible part of the opened panel, updates the scrollTop position
  // This is the default behaviour
  // To block it the plugin user must
  // add a "custom-select:focus-outside-panel" eventListener on the panel
  // with useCapture set to true
  // and stopPropagation
  function scrollToFocused(e) {
    var currPanel = e.currentTarget;
    var currOption = e.target;
    // Up
    if (currOption.offsetTop < currPanel.scrollTop) {
      currPanel.scrollTop = currOption.offsetTop;
      // Down
    } else {
      currPanel.scrollTop = currOption.offsetTop + currOption.clientHeight - currPanel.clientHeight;
    }
  }

  function addEvents() {
    document.addEventListener('click', clickEvent);
    panel.addEventListener('mouseover', mouseoverEvent);
    panel.addEventListener('custom-select:focus-outside-panel', scrollToFocused);
    select.addEventListener('change', changeEvent);
    container.addEventListener('keydown', keydownEvent);
  }

  function removeEvents() {
    document.removeEventListener('click', clickEvent);
    panel.removeEventListener('mouseover', mouseoverEvent);
    panel.removeEventListener('custom-select:focus-outside-panel', scrollToFocused);
    select.removeEventListener('change', changeEvent);
    container.removeEventListener('keydown', keydownEvent);
  }

  function disabled(bool) {
    if (bool && !select.disabled) {
      container.classList.add(builderParams.isDisabledClass);
      select.disabled = true;
      opener.removeAttribute('tabindex');
      container.dispatchEvent(new CustomEvent('custom-select:disabled'));
      removeEvents();
    } else if (!bool && select.disabled) {
      container.classList.remove(builderParams.isDisabledClass);
      select.disabled = false;
      opener.setAttribute('tabindex', '0');
      container.dispatchEvent(new CustomEvent('custom-select:enabled'));
      addEvents();
    }
  }

  // Form a given select children DOM tree (options and optgroup),
  // Creates the corresponding custom HTMLElements list (divs with different classes and attributes)
  function parseMarkup(children) {
    var nodeList = children;
    var cstList = [];

    if (typeof nodeList.length === 'undefined') {
      throw new TypeError('Invalid Argument');
    }

    for (var i = 0, li = nodeList.length; i < li; i++) {
      if (nodeList[i] instanceof HTMLElement && nodeList[i].tagName.toUpperCase() === 'OPTGROUP') {
        var cstOptgroup = document.createElement('div');
        cstOptgroup.classList.add(builderParams.optgroupClass);
        cstOptgroup.setAttribute('data-label', nodeList[i].label);

        // IMPORTANT: Stores in a property of the created custom option group
        // a hook to the the corrisponding select's option group
        cstOptgroup.customSelectOriginalOptgroup = nodeList[i];

        // IMPORTANT: Stores in a property of select's option group
        // a hook to the created custom option group
        nodeList[i].customSelectCstOptgroup = cstOptgroup;

        var subNodes = parseMarkup(nodeList[i].children);
        for (var j = 0, lj = subNodes.length; j < lj; j++) {
          cstOptgroup.appendChild(subNodes[j]);
        }

        cstList.push(cstOptgroup);
      } else if (nodeList[i] instanceof HTMLElement && nodeList[i].tagName.toUpperCase() === 'OPTION') {
        var cstOption = document.createElement('div');
        cstOption.classList.add(builderParams.optionClass);
        cstOption.textContent = nodeList[i].text;
        cstOption.setAttribute('data-value', nodeList[i].value);
        cstOption.setAttribute('role', 'option');

        // IMPORTANT: Stores in a property of the created custom option
        // a hook to the the corrisponding select's option
        cstOption.customSelectOriginalOption = nodeList[i];

        // IMPORTANT: Stores in a property of select's option
        // a hook to the created custom option
        nodeList[i].customSelectCstOption = cstOption;

        // If the select's option is selected
        if (nodeList[i].selected) {
          setSelectedElement(cstOption);
        }
        cstList.push(cstOption);
      } else {
        throw new TypeError('Invalid Argument');
      }
    }
    return cstList;
  }

  function _append(nodePar, appendIntoOriginal, targetPar) {
    var target = void 0;
    if (typeof targetPar === 'undefined' || targetPar === select) {
      target = panel;
    } else if (targetPar instanceof HTMLElement && targetPar.tagName.toUpperCase() === 'OPTGROUP' && select.contains(targetPar)) {
      target = targetPar.customSelectCstOptgroup;
    } else {
      throw new TypeError('Invalid Argument');
    }

    // If the node provided is a single HTMLElement it is stored in an array
    var node = nodePar instanceof HTMLElement ? [nodePar] : nodePar;

    // Injects the options|optgroup in the select
    if (appendIntoOriginal) {
      for (var i = 0, l = node.length; i < l; i++) {
        if (target === panel) {
          select.appendChild(node[i]);
        } else {
          target.customSelectOriginalOptgroup.appendChild(node[i]);
        }
      }
    }

    // The custom markup to append
    var markupToInsert = parseMarkup(node);

    // Injects the created DOM content in the panel
    for (var _i = 0, _l = markupToInsert.length; _i < _l; _i++) {
      target.appendChild(markupToInsert[_i]);
    }

    return node;
  }

  function _insertBefore(node, targetPar) {
    var target = void 0;
    if (targetPar instanceof HTMLElement && targetPar.tagName.toUpperCase() === 'OPTION' && select.contains(targetPar)) {
      target = targetPar.customSelectCstOption;
    } else if (targetPar instanceof HTMLElement && targetPar.tagName.toUpperCase() === 'OPTGROUP' && select.contains(targetPar)) {
      target = targetPar.customSelectCstOptgroup;
    } else {
      throw new TypeError('Invalid Argument');
    }

    // The custom markup to append
    var markupToInsert = parseMarkup(node.length ? node : [node]);

    target.parentNode.insertBefore(markupToInsert[0], target);

    // Injects the option or optgroup node in the original select and returns the injected node
    return targetPar.parentNode.insertBefore(node.length ? node[0] : node, targetPar);
  }

  function remove(node) {
    var cstNode = void 0;
    if (node instanceof HTMLElement && node.tagName.toUpperCase() === 'OPTION' && select.contains(node)) {
      cstNode = node.customSelectCstOption;
    } else if (node instanceof HTMLElement && node.tagName.toUpperCase() === 'OPTGROUP' && select.contains(node)) {
      cstNode = node.customSelectCstOptgroup;
    } else {
      throw new TypeError('Invalid Argument');
    }
    cstNode.parentNode.removeChild(cstNode);
    var removedNode = node.parentNode.removeChild(node);
    changeEvent();
    return removedNode;
  }

  function empty() {
    var removed = [];
    while (select.children.length) {
      panel.removeChild(panel.children[0]);
      removed.push(select.removeChild(select.children[0]));
    }
    setSelectedElement();
    return removed;
  }

  function destroy() {
    for (var i = 0, l = select.options.length; i < l; i++) {
      delete select.options[i].customSelectCstOption;
    }
    var optGroup = select.getElementsByTagName('optgroup');
    for (var _i2 = 0, _l2 = optGroup.length; _i2 < _l2; _i2++) {
      delete optGroup.customSelectCstOptgroup;
    }

    removeEvents();

    return container.parentNode.replaceChild(select, container);
  }
  //
  // Custom Select DOM tree creation
  //

  // Creates the container/wrapper
  container = document.createElement('div');
  container.classList.add(builderParams.containerClass, containerClass);

  // Creates the opener
  opener = document.createElement('span');
  opener.className = builderParams.openerClass;
  opener.setAttribute('role', 'combobox');
  opener.setAttribute('aria-autocomplete', 'list');
  opener.setAttribute('aria-expanded', 'false');
  opener.innerHTML = '<span>\n   ' + (select.selectedIndex !== -1 ? select.options[select.selectedIndex].text : '') + '\n   </span>';

  // Creates the panel
  // and injects the markup of the select inside
  // with some tag and attributes replacement
  panel = document.createElement('div');
  // Create random id
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 5; i++) {
    uId += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  panel.id = containerClass + '-' + uId + '-panel';
  panel.className = builderParams.panelClass;
  panel.setAttribute('role', 'listbox');
  opener.setAttribute('aria-owns', panel.id);

  _append(select.children, false);

  // Injects the container in the original DOM position of the select
  container.appendChild(opener);
  select.parentNode.replaceChild(container, select);
  container.appendChild(select);
  container.appendChild(panel);

  // ARIA labelledby - label
  if (document.querySelector('label[for="' + select.id + '"]')) {
    currLabel = document.querySelector('label[for="' + select.id + '"]');
  } else if (container.parentNode.tagName.toUpperCase() === 'LABEL') {
    currLabel = container.parentNode;
  }
  if (typeof currLabel !== 'undefined') {
    currLabel.setAttribute('id', containerClass + '-' + uId + '-label');
    opener.setAttribute('aria-labelledby', containerClass + '-' + uId + '-label');
  }

  // Event Init
  if (select.disabled) {
    container.classList.add(builderParams.isDisabledClass);
  } else {
    opener.setAttribute('tabindex', '0');
    select.setAttribute('tabindex', '-1');
    addEvents();
  }

  // Stores the plugin public exposed methods and properties, directly in the container HTMLElement
  container.customSelect = {
    get pluginOptions() {
      return builderParams;
    },
    get open() {
      return isOpen;
    },
    set open(bool) {
      open(bool);
    },
    get disabled() {
      return select.disabled;
    },
    set disabled(bool) {
      disabled(bool);
    },
    get value() {
      return select.value;
    },
    set value(val) {
      setValue(val);
    },
    append: function append(node, target) {
      return _append(node, true, target);
    },
    insertBefore: function insertBefore(node, target) {
      return _insertBefore(node, target);
    },
    remove: remove,
    empty: empty,
    destroy: destroy,
    opener: opener,
    select: select,
    panel: panel,
    container: container
  };

  // Stores the plugin directly in the original select
  select.customSelect = container.customSelect;

  // Returns the plugin instance, with the public exposed methods and properties
  return container.customSelect;
}

function customSelect(element, customParams) {
  // Overrides the default options with the ones provided by the user
  var nodeList = [];
  var selects = [];

  return function init() {
    // The plugin is called on a single HTMLElement
    if (element && element instanceof HTMLElement && element.tagName.toUpperCase() === 'SELECT') {
      nodeList.push(element);
      // The plugin is called on a selector
    } else if (element && typeof element === 'string') {
      var elementsList = document.querySelectorAll(element);
      for (var i = 0, l = elementsList.length; i < l; ++i) {
        if (elementsList[i] instanceof HTMLElement && elementsList[i].tagName.toUpperCase() === 'SELECT') {
          nodeList.push(elementsList[i]);
        }
      }
      // The plugin is called on any HTMLElements list (NodeList, HTMLCollection, Array, etc.)
    } else if (element && element.length) {
      for (var _i3 = 0, _l3 = element.length; _i3 < _l3; ++_i3) {
        if (element[_i3] instanceof HTMLElement && element[_i3].tagName.toUpperCase() === 'SELECT') {
          nodeList.push(element[_i3]);
        }
      }
    }

    // Launches the plugin over every HTMLElement
    // And stores every plugin instance
    for (var _i4 = 0, _l4 = nodeList.length; _i4 < _l4; ++_i4) {
      selects.push(builder(nodeList[_i4], _extends({}, defaultParams, customParams)));
    }

    // Returns all plugin instances
    return selects;
  }();
}


},{"custom-event-polyfill":"../node_modules/custom-event-polyfill/custom-event-polyfill.js"}],"js/customSelect.js":[function(require,module,exports) {
"use strict";

var _customSelect = _interopRequireDefault(require("custom-select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _customSelect.default)(document.querySelectorAll('.setting-panel__select'));
},{"custom-select":"../node_modules/custom-select/build/index.js"}],"js/modules/Game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game = /*#__PURE__*/function () {
  function Game() {
    var _this = this;

    _classCallCheck(this, Game);

    this.countdownField = document.querySelector('.time-left');
    this.expressionField = document.querySelector('.expression');
    this.userSolutionField = document.querySelector('.user-response');
    this.calcBody = document.querySelector('.calc-body');
    this.started = false;
    this.solved = false;
    this.TIMEOUT = 1000 * 20;
    this.maxInt = 0;
    this.correctAnswersCount = 0;
    this.incorrectAnswersCount = 0;
    this.intervalID = null;
    this.trueAnswer = null;
    this.userAnswer = null;
    this.operation = '+';
    this.methods = {
      '+': function _() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            a = _ref.a,
            b = _ref.b;

        return a + b;
      },
      '-': function _() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            a = _ref2.a,
            b = _ref2.b;

        return a - b;
      },
      '*': function _() {
        var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            a = _ref3.a,
            b = _ref3.b;

        return a * b;
      },
      '/': function _() {
        var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            a = _ref4.a,
            b = _ref4.b;

        return a / b;
      }
    };

    this.calcBodyHandlerWrap = function (e) {
      return _this.calcBodyHandler(e);
    };

    this.init();
  }

  _createClass(Game, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      var operatorSelect = document.querySelector('#operation');

      operatorSelect.onchange = function (e) {
        this.operation = e.target.options[e.target.selectedIndex].dataset.operation;
      };

      var startBtn = document.querySelector('.btn-start');
      startBtn.addEventListener('click', function () {
        return _this2.startBtnHandler();
      });
      var resetBtn = document.querySelector('.btn-reset');
      resetBtn.addEventListener('click', function () {
        return _this2.resetBtnHandler();
      });
    }
  }, {
    key: "getRandomInt",
    value: function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
  }, {
    key: "showResultWindow",
    value: function showResultWindow() {
      var correctCount = document.querySelector('.correct-count'),
          wrongCount = document.querySelector('.wrong-count');
      correctCount.textContent = this.correctAnswersCount;
      wrongCount.textContent = this.incorrectAnswersCount;
    }
  }, {
    key: "startBtnHandler",
    value: function startBtnHandler() {
      var _this3 = this;

      if (this.started) return;
      var maxCountField = document.querySelector('#max-value');
      var startTime = Date.now();
      this.started = true;
      this.maxInt = +maxCountField.value; // Обратный отсчет

      this.intervalID = setInterval(function () {
        var time = _this3.TIMEOUT - (Date.now() - startTime);
        _this3.countdownField.textContent = time;

        if (time <= 0) {
          clearInterval(_this3.intervalID);

          _this3.showResultWindow();

          _this3.countdownField.textContent = '0';
        }
      }, 0); // Генерация и вывод рандомного выражения

      this.generateNewGameIteration(); // Клик на любую кнопку

      this.calcBody.addEventListener('click', this.calcBodyHandlerWrap);
    }
  }, {
    key: "generateNewGameIteration",
    value: function generateNewGameIteration() {
      var randomInts = {
        // TODO: Деструктуризация сделана криво. Придумать лучшее решение
        a: this.getRandomInt(this.maxInt),
        b: this.getRandomInt(this.maxInt)
      }; // Вывод сгенерированного выражения

      this.expressionField.textContent = "".concat(randomInts.a, " ").concat(this.operation, " ").concat(randomInts.b); // Запись правильного ответа

      this.trueAnswer = this.methods[this.operation](randomInts);
    }
  }, {
    key: "calcBodyHandler",
    value: function calcBodyHandler(event) {
      var target = event.target;
      var MAX_ANSWER_LENGTH = 6;
      var btnData = target.dataset.btn;
      if (!this.started) return;

      switch (true) {
        case btnData === 'solution':
          this.userSolutionField.textContent = this.trueAnswer;
          this.solved = true;
          break;

        case btnData === 'del' && this.userSolutionField.textContent.length > 0:
          this.userSolutionField.textContent = this.userSolutionField.textContent.slice(0, -1);
          break;

        case btnData === 'num' && this.userSolutionField.textContent.length < MAX_ANSWER_LENGTH:
          this.userSolutionField.textContent += target.textContent;
          break;

        case btnData === 'next' || target.parentElement.dataset.btn === 'next':
          this.generateNewGameIteration();
          break;

        case btnData === 'ok':
          if (this.solved) {
            // может быть защитывать в неправильные ответы
            this.userSolutionField.textContent = '';
            this.generateNewGameIteration();
            this.solved = false;
            break;
          }

          this.userAnswer = +this.userSolutionField.textContent;
          this.okBtnHandler();
          break;
      }
    }
  }, {
    key: "okBtnHandler",
    value: function okBtnHandler() {
      if (this.trueAnswer === this.userAnswer) {
        this.correctAnswersCount++;
        this.userSolutionField.textContent = '';
        this.generateNewGameIteration();
      } else {
        this.incorrectAnswersCount++;
      }
    }
  }, {
    key: "resetBtnHandler",
    value: function resetBtnHandler() {
      this.started = false;
      this.userSolutionField.textContent = '';
      this.expressionField.textContent = '';
      clearInterval(this.intervalID);
      this.countdownField.textContent = '0';
      this.calcBody.removeEventListener('click', this.calcBodyHandlerWrap);
    }
  }]);

  return Game;
}();

var _default = Game;
exports.default = _default;
},{}],"js/index.js":[function(require,module,exports) {
"use strict";

require("./customSelect");

var _Game = _interopRequireDefault(require("./modules/Game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var game = new _Game.default();
});
},{"./customSelect":"js/customSelect.js","./modules/Game":"js/modules/Game.js"}],"../../../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53530" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map