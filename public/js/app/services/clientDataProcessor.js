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
           div.html(this._process(data.type, DateUtil.formatDate(date, "hh:nn:ss"), data.user,(data.message.replace(/</g, "&lt;").replace(/>/g, "&gt;"))));
           div.html(this._imgify(div));
           container.append(div);
           container.parent().animate({ scrollTop: container.parent()[0].scrollHeight}, 100);
       };

       this._process = function(type, time, user, message){
           var mention_start = "";
           var mention_end = "";
           if(type === "emote"){
               return time + ": "+user+" "+message;
           }
           if(user !== App.settings.user.name){
               if(message.indexOf(App.settings.user.name) > 0){
                   mention_start = "<span style=\"background:#5b0000\">"
                   mention_end = "</span>";
               }
           }
           var result = JBBCODE.process({
               text: "[color=grey]"+time+"[/color]: [color=blue]"+user+"[/color] - "+message+"",
               removeMisalignedTags: false,
               addInLineBreaks: false
           });
            var ret = this._linkify(result.html);

           return (mention_start + ret + mention_end);
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
   };
});