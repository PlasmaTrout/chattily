/**
 * Created with IntelliJ IDEA.
 * User: GXReiser
 * Date: 11/22/13
 * Time: 10:52 AM
 * To change this template use File | Settings | File Templates.
 */

if (!App) var App = {};

App.settings = {
};

cookie_sec = function(action,str){
    var action = action || 'enc';
    return (action=='enc') ? encodeURIComponent(base64.encode(str)) : base64.decode(decodeURIComponent(str));
};
var user = CookieUtil.read("sec");
if(user !== null){
    App.settings.user = JSON.parse(user);
    var signed_in_as = $("#signed_in_as");
    if(signed_in_as !== null){
        signed_in_as.text(App.settings.user.fullName);
    }
}


