var testdata = require('test/testdata');

exports.createPage = function (data) {
    var tabGroup = Ti.UI.createTabGroup(); // tg
    var feedPageWin = Ti.UI.createWindow(); // win
    var feedPageTab = Ti.UI.createTab({ // tab
	window: feedPageWin,
	title: "Feed List"
    });
    // content
    var feedTable = Ti.UI.createTableView();

    feedPageWin.add(feedTable);

    var backButton = Ti.UI.createButton({
	title: 'Back'
    });

    Ti.API.info(Ti.Platform.displayCaps.platformWidth);
    
    backButton.addEventListener('click', function () {
	tabGroup.close({transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
    });

    feedPageWin.leftNavButton = backButton;

    var search = Ti.UI.createSearchBar({
	width: 150,
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
    });

    search.addEventListener('click', function (e) {
	require('sendAPI').sendRequest(e.value, 'feedPage');
    });

    feedPageWin.titleControl = search;

    for (var i = 0; i < data.length; i++) {
	var row = Ti.UI.createTableViewRow();
	row.hight = 120;
	row.shopName = data[i].username;
	row.add(Ti.UI.createLabel({
	    text: data[i].username,
	    top: 8,
	    left: 64,
	    height: 16
	}));
	row.add(Ti.UI.createLabel({
	    text: data[i].text,
	    top: 32,
	    left: 64,
	    width: 256,
	    height: 'auto'
	}));
	row.add(Ti.UI.createImageView({
	    top: 8,
	    left: 8,
	    width: 48,
	    height: 48
	}));
	row.addEventListener('click', function () {
	    Ti.API.info(this.shopName);
	    require('sendAPI').sendRequest(null, 'shopPage');
	});
	feedTable.appendRow(row);
    }

    feedPageWin.add(feedTable);
    feedPageWin.tabBarHidden = true;
    tabGroup.addTab(feedPageTab);

    return tabGroup;
};
