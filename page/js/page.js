(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _localStorage$getItem;

/**
 * Page theme selector
 */
const defaultTheme = "Sandstone"
let templateSelector = document.querySelector("#template-selector");
let currentTheme = (_localStorage$getItem = localStorage.getItem("theme")) !== null && _localStorage$getItem !== void 0 ? _localStorage$getItem : defaultTheme;
let defaultDarkMode = true;

if (templateSelector) {
  var _ref;

  const builtIn = ["Bootstrap", "Sandstone"];
  fetch("https://bootswatch.com/api/5.json").then(response => response.json()).then(data => load(data));

  function load(data) {
    const themes = data.themes;
    themes.forEach((value, index) => {
      if (builtIn.indexOf(value.name) > -1) {
        return;
      }

      const option = document.createElement("option");
      option.value = value.name;
      option.text = value.name;
      templateSelector.append(option);
    });
    templateSelector.value = currentTheme;
  }

  function getTemplateCss(theme) {
    if (builtIn.indexOf(theme) > -1) {
      return `css/bootstrap-${theme.toLowerCase()}.min.css`;
    }

    return `https://bootswatch.com/5/${theme.toLowerCase()}/bootstrap.min.css`;
  }

  let darkSelector = document.querySelector("#page-dark");
  let baseStylesheet = document.querySelector("#base-stylesheet");
  let darkStylesheet = document.querySelector("#dark-stylesheet");

  function setTheme(theme, isDark) {
    baseStylesheet.setAttribute("href", getTemplateCss(theme));
    darkStylesheet.disabled = !isDark;
    localStorage.setItem("theme", theme);
    localStorage.setItem("dark", isDark);
    templateSelector.value = theme;
    darkSelector.checked = isDark;
  }

  setTheme(currentTheme, (_ref = localStorage.getItem("dark") === "true") !== null && _ref !== void 0 ? _ref : defaultDarkMode);

  function setThemeFromControls() {
    setTheme(templateSelector.value, darkSelector.checked);
  }

  templateSelector.addEventListener("change", setThemeFromControls);
  darkSelector.addEventListener("change", setThemeFromControls);
}

},{}]},{},[1]);
