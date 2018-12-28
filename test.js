const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs')
const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
require('jsdom-global')()

// start testing!
require('./test/init.js')
require('./test/basic.js')
