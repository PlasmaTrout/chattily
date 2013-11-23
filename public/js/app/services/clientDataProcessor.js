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
           div.addClass(data.type);
           div.html(date.toLocaleTimeString()+" "+data.user+": "+data.message);
           container.append(div);
           container.parent().animate({ scrollTop: container.parent()[0].scrollHeight}, 100);
       }
   };
});