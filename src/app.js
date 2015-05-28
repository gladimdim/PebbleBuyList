/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Settings = require('settings');
//Settings.data("buyList", null);
Settings.config(
    {
        url: "atmoache.me"
    },
    function(e) {
        Settings.option("Remove selected", true);
        console.log("opened config");
    }, 
    function(e) {
        console.log(e.data);
    }
);


function fnFactory() {
    var items = Settings.data("buyList") || [];
    if (items.length === 0) {
       var aList = [
           "Банани",
            "Огірки",
            "Помідори"
        ];
        items = aList.map(function(el) {
           return {
               title: el
           }; 
        });
        Settings.data("buyList", items);
    }
    return items;
}
var menu = new UI.Menu({
  sections: [{
    items: fnFactory()
  }]
});

menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
    var aItems = Settings.data("buyList");
    aItems.splice(e.itemIndex, 1);
    Settings.data("buyList", aItems);
    menu.items(0, aItems);
});
menu.show();
