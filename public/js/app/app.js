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
App.templates = {};
App.history = [];

App.localstorage = window.localStorage;
var history = App.localstorage.getItem("history");
if(history){
    try{
        App.history = JSON.parse(history);
    } catch(e){
        App.history = [];
        App.localstorage.setItem("history", JSON.stringify(App.history));
    }

}
function load_template(name, path){
    $.ajax({
        url: path,
        async:false,
        success: function(contents){
            App.templates[name] = contents;
        }
    })
}

function prepare_tell(username){
    $("#chatLine").val('/tell '+username+' <message>');
    $("#chatLine")[0].selectionStart = $("#chatLine").val().length - 9;
    $("#chatLine")[0].selectionEnd = $("#chatLine").val().length;
}

function load_gist(gist){
    $.ajax({
        url: 'https://gist.github.com/'+gist+'.json',
        async: false,
        dataType: 'jsonp',
        success: function(data){
            $('head').append('<link rel="stylesheet" href="https://gist.github.com/'+data.stylesheet+'">');
            $('#gistModalBody').html(data.div);
            $('#gistModalLabel').text(data.description);
            $('#gistModal').modal({backdrop:false, show:true});
            $('#gistModal').on('hidden.bs.modal', function(e){
                $('#gistModalBody').html('');
            });
        }
    });
}

function load_youtube(video){

    $('#mediaModalBody').html('<iframe width="538" height="315" src="http://www.youtube.com/embed/'+video+'?rel=0" frameborder="0" allowfullscreen></iframe>');
    $('#mediaModalLabel').text("Youtube");
    $('#mediaModal').modal({backdrop:false, show:true});
    $('#mediaModal').on('hidden.bs.modal', function(e){
        $('#mediaModalBody').html('');
    });

}

function alert(message){
    var alert = $('#errorAlert');
    alert.html(message);
    alert.css({top: (DOC_HEIGHT/2.5 - alert.height()/2), left:(DOC_WIDTH/2 - alert.width()/2)});
    alert.fadeIn();
}

cookie_sec = function(action,str){
    var action = action || 'enc';
    return (action=='enc') ? encodeURIComponent(base64.encode(str)) : base64.decode(decodeURIComponent(str));
};
var user = CookieUtil.read("sec");
if(user && user !== null){
    App.settings.user = JSON.parse(user);
    var signed_in_as = $("#signed_in_as");
    if(signed_in_as !== null){
        signed_in_as.text(App.settings.user.fullName);
        $('#loggedInUser').text(App.settings.user.fullName);
    }
}

var DOC_HEIGHT = document.body.clientHeight;
var DOC_WIDTH = document.body.clientWidth;
$(window).on("resize",function(){
    DOC_HEIGHT = document.body.clientHeight;
    DOC_WIDTH = document.body.clientWidth;
})




