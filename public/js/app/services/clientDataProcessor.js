/**
 * Created with IntelliJ IDEA.
 * User: GXReiser
 * Date: 11/23/13
 * Time: 3:05 AM
 * To change this template use File | Settings | File Templates.
 */
jpackage("app.services", function(){
   this.clientDataProcessor = function(el){

       this._data = function(data){
           var date = new Date(data.timestamp);
           var div = $('<div></div>');
           var container = $(el);
           div.addClass(data.type.replace('/',''));                                                    //escape html lt & gt symbols to prevent html text - see jbbcode in _process
           div.html(this._process(data.type, DateUtil.formatDate(date, "h:nn:ss"), data.user,(data.message.replace(/</g, "&lt;").replace(/>/g, "&gt;"))));
           div.html(this._imgify(div));
           if(data.user !== App.settings.user.name){
               if(data.message.indexOf(App.settings.user.name) > 0){
                 div.addClass("mention");
               }
           }
           container.append(div);
           $(div.children()).each(function(i, elm){
               var attr = $(elm).attr("href");
               if(attr){
                   if(attr.slice(0,15) == "http://youtu.be"){
                       $(elm).attr("href", "javascript:load_youtube('"+attr.replace(attr.slice(0,16), '')+"');");
                   }
               }
           });
           if(container.children().length > 50){
             container.children("div:first").remove();
           }
           //container.parent().animate({ scrollTop: container.parent()[0].scrollHeight}, 100);
           //container.animate({ scrollTop: container.attr("scrollHeight") }, 3000);
           this._scroll();


           $.titleAlert("New Message", {
               requireBlur:true,
               stopOnFocus:true,
               duration:30000,
               interval:500
           });
       };

       this._scroll = function(){
           var div = $(el).children("div:last");
           var scrollHeight = $('.page')[0].scrollHeight;
           if(scrollHeight > DOC_HEIGHT){
               $(".page").animate({ scrollTop: scrollHeight }, 100);
           }
       }
       this._process = function(type, time, user, message){

           if(type === "emote"){
               return time + ": "+user+" "+message;
           }

           var result = JBBCODE.process({
               text: "[color=grey]"+time+"[/color]: [color=blue]"+user+"[/color] - "+message+"",
               removeMisalignedTags: false,
               addInLineBreaks: false
           });

           var ret = result.html;
           if(message.substr(0, 6)==='[gist]'){
               var gist = ret.split(' - ')[1];
               ret = ret.replace(gist, '');
               ret += this._gist($(el), gist);
           } else {
               ret = this._linkify(result.html);
           }
           return ret;


       };

       this._linkify = function(message){


           /* TODO:
            * Fork call stack if message with link ends in .jpg, .png, .svg as well as test for gists or snippets from
            * github and gitlab, but for now, this works.
            */

           var replacedText, replacePattern1, replacePattern2, replacePattern3;

           //URLs starting with http://, https://, or ftp://
           replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
           replacedText = message.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

           //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
           replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
           replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

           //Change email addresses to mailto:: links.
           replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
           replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');


           return replacedText;

       };

       this._imgify = function(element){
           // searches for any links that are images and replaces them with img tags instead.

           var links = $('a', element);
           $(links).each(function() {
               if($(this).attr('href').match(/\.(jpe?g|png|gif)/i)){
                   var img = $("<img/>");
                   img.attr("src", this.href);
                   img.addClass("thumb");
                   $(this).html(img);
               }

           });
       }

       this._gist = function(div, message){
           var _this = this;
           var gist = message.replace('gist|', '').replace(/[^0-9A-Za-z]+/g, '');
           var new_message;
           if(DOC_WIDTH>767){
               new_message = '<a href="javascript:load_gist(\''+gist+'\');">https://gist.github.com/'+gist+'</a>';
           }else {
               new_message = '<a target="_new" href="https://gist.github.com/'+gist+'">https://gist.github.com/'+gist+'</a>';
           }

           return new_message;
       }
   };
});