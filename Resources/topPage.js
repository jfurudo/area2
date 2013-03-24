var tabGroup = Ti.UI.createTabGroup();
var topPageWin = Ti.UI.createWindow({
//    backgoundColor: 'white'
});
var topPageTab = Ti.UI.createTab({
    window: topPageWin,
    title: "Top Page"
});
var button = Ti.UI.createButton({
    title: "Get",
    top: 200,
    width: 64
});

button.addEventListener('click', function () {
//     Ti.API.info(search.value);
    require('sendAPI').sendRequest(search.value, 'feedPage');
});

// topPageWin.rightNavButton = 'geer mark'

var search = Ti.UI.createTextField({
    top: 150,
    width: 200,
    height: 35,
    borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

topPageWin.add(button);
topPageWin.add(search);
topPageWin.tabBarHidden = true;
tabGroup.addTab(topPageTab);

exports = tabGroup;
