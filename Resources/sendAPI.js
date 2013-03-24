var pageFactory = {
    shopPage: require('shopPage'),
    feedPage: require('feedPage')
};
var testdata = require('test/testdata');

var host = "http://***";
var ret = {
    sendRequest: function (path, target) {
	var xhr = Ti.Network.createHTTPClient();
	xhr.open('GET', 'http://api.twitter.com/1/statuses/user_timeline/masason.json'); // twitter sample
	xhr.onload = function (e) {
	    var res = JSON.parse(xhr.responseText);
// 	    Ti.API.info("in onload" + JSON.stringify(res[0]));
	    Ti.API.info("target: " + target);
	var osname = Ti.Platform.osname;
	    if (osname === 'iphone' || osname === 'ipad') {
		pageFactory[target].createPage(testdata[target]).open({transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
	    }
	    else{
		pageFactory[target].createPage(testdata[target]).open();
	    }
	};
	xhr.onreadystatechange = function (e) {
	    if (xhr.readyState == 4 && xhr.status) {
//		Ti.API.info("in readystatechange" + JSON.stringify(xhr.responseText));
		Ti.API.info(responseText);
// 		shopPageFactory.createShopPage(testdata);
	    }
	};
	xhr.onerror = function (e) {
	    Ti.APi.info(e);
	    pageFactory[target].createPage(testdata[target]).open();
	};
	xhr.onsendstream = function (e) {
	    Ti.API.info(e.progress);
	};
	xhr.ondatastream = function (e) {
	    Ti.API.info(e.progress);
	};
	Ti.API.info("in send request");
	xhr.send();
    }
};

exports = ret;
