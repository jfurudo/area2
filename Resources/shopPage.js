exports.createPage = function (data) {
    var tabGroup = Ti.UI.createTabGroup();
    var shopPageWin = Ti.UI.createWindow();

    var shopPageTab = Ti.UI.createTab({
	window: shopPageWin,
	title: "Shop Page"
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

    var shopFeed = Ti.UI.createTableView({
	top: 150
    });

    var backButton = Ti.UI.createButton({
	title: 'Back'
    });

    backButton.addEventListener('click', function () {
	tabGroup.close({transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
    });

    shopPageWin.leftNavButton = backButton;

    for (var i = 0; i < data.feeds.length; i++) {
	var row = Ti.UI.createTableViewRow();
	row.hight = 120;
	row.add(Ti.UI.createLabel({
	    text: data.feeds[i].username,
	    top: 8,
	    left: 64,
	    backgroundColor: 'green',
	    height: 16
	}));
	row.add(Ti.UI.createLabel({
	    text: data.feeds[i].text,
	    top: 32,
	    left: 64,
	    backgroundColor: 'red',
	    height: 'auto'
	}));
	row.add(Ti.UI.createImageView({
	    top: 8,
	    left: 8,
	    width: 48,
	    height: 48,
	    backgroundColor: 'blue',
	    image: data.picture
	}));
	shopFeed.appendRow(row);
    }

    shopPageWin.add(shopDetail);
    shopPageWin.add(shopFeed);

    // for Map tab
    var mapPageWin = Ti.UI.createWindow();

    var mapPageTab = Ti.UI.createTab({
    	title: 'map',
    	window: mapPageWin
    });
    
    var latitude = 35.71006098178059,
    	longitude = 139.81071964110447;

    var pin = Ti.Map.createAnnotation({
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
    	annotations: [pin]
    });

    mapPageWin.add(mapView);
    mapPageWin.leftNavButton = backButton;

    tabGroup.addTab(shopPageTab);
    tabGroup.addTab(mapPageTab);

    return tabGroup;
};

// exports = tabGroup;
