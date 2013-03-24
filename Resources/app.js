Titanium.UI.setBackgroundColor('#FFF');
var testdata = require('test/testdata');

var topPage = require('topPage');

var feedPage = require('feedPage').createPage(testdata['feedPage']);
// feedPage.open();

var shopPage = require('shopPage').createPage(testdata['shopPage']);
// shopPage.open();

// var test = require('sendAPI');

topPage.open();
