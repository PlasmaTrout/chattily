/**
 * Created with IntelliJ IDEA.
 * User: GXReiser
 * Date: 11/23/13
 * Time: 4:23 AM
 * To change this template use File | Settings | File Templates.
 */
$(function(){
    var chatView = new app.ui.ChatView({ el: $('#view') });
    var usersView = new app.ui.UsersView({ el: $('#UsersView') });
    App.chatView = chatView;
    App.usersView = usersView;

    $("#logout").on("click",function(e){
        e.preventDefault();
        window.location = "/logout";
    })
});