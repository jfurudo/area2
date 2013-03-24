exports.createPage = function (data) {
    var tabGroup = Ti.UI.createTabGroup();

    // for feed tab
    var shopFeedWin = Ti.UI.createWindow();
    var shopFeedTab = Ti.UI.createTab({
	window: shopFeedWin,
	title: "Now"
    });

    var shopFeed = Ti.UI.createTableView();

    for (var i = 0; i < data.feeds.length; i++) {
	var row = Ti.UI.createTableViewRow();
	row.hight = 500;
	row.add(Ti.UI.createLabel({
	    text: data.feeds[i].username,
	    top: 256,
	    left: 64,
	    backgroundColor: 'green',
	    height: 16
	}));
	row.add(Ti.UI.createLabel({
	    text: data.feeds[i].text,
	    top: 300,
	    left: 64,
	    backgroundColor: 'red',
	    height: 'auto'
	}));
	row.add(Ti.UI.createImageView({
	    top: 8,
	    left: 40,
	    width: 240,
	    height: 240,
	    backgroundColor: 'blue',
	    image: data.picture
	}));
	shopFeed.appendRow(row);
    }

    shopFeedWin.add(shopFeed);

    // for info tab
    var shopPageWin = Ti.UI.createWindow();
    var shopPageTab = Ti.UI.createTab({
	window: shopPageWin,
	title: "Info"
    });

    var shopDetail = Ti.UI.createView({
	backgroundColor: 'blue'
    });

    var shopPic = Ti.UI.createImageView({
	left: 10,
	top: 10,
	width: 80,
	height: 80,
	image: data.picture,
	backgroundColor: 'white'
    });

    var shopName = Ti.UI.createLabel({
	top: 10,
	left: 140,
	height: 20,
	text: data.name,
	font: {fontSize: 24}
    });

    var contact = Ti.UI.createLabel({
	top: 100,
	left: 100,
	text: "URL: " + data.url + "\nTEL: " + data.tel + "\nEmail: " + data.mail,
	font: {fontSize: 10}
    });

    Ti.API.info("URL: " + data.url + "\nTEL: " + data.tel + "\nEmail: " + data.mail);

    shopDetail.add(shopPic);
    shopDetail.add(shopName);
    shopDetail.add(contact);

    var backButton = Ti.UI.createButton({
	title: 'Back'
    });

    backButton.addEventListener('click', function () {
	tabGroup.close({transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
    });

    shopPageWin.leftNavButton = backButton;


    shopPageWin.add(shopDetail);
//     shopPageWin.add(shopFeed);

    // for Map tab
    var mapPageWin = Ti.UI.createWindow();

    var mapPageTab = Ti.UI.createTab({
    	title: 'map',
    	window: mapPageWin
    });

    var shopPin = Ti.Map.createAnnotation({
    	latitude: data.latitude,
    	longitude: data.longitude,
    	subtitle: 'sub title',
    	title: 'title'
    });

    var mapView = Ti.Map.createView({
    	mapType: Ti.Map.STANDARD_TYPE,
    	region: {
    	    latitude: data.latitude,
    	    longitude: data.longitude,
    	    latitudeDelta: 0.01,
    	    longitudeDelta: 0.01
    	},
    	animate: true,
    	regionFit: true,
    	userLocation: false,
    	annotations: [shopPin]
    });

    mapPageWin.add(mapView);
    mapPageWin.leftNavButton = backButton;

    tabGroup.addTab(shopFeedTab);
    tabGroup.addTab(shopPageTab);
    tabGroup.addTab(mapPageTab);

    return tabGroup;
};
