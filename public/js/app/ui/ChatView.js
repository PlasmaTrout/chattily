/**
 * Created with IntelliJ IDEA.
 * User: GXReiser
 * Date: 11/23/13
 * Time: 2:53 AM
 * To change this template use File | Settings | File Templates.
 */
jpackage("app.ui", function() {

    this.ChatView = Backbone.View.extend({
        template: _.template( App.templates.ChatViewTemplate ),
        data: {},

        initialize: function() {
            // console.log("initialize");
            _.bindAll(this);
            $("#testResultPanel").css({"height":DOC_HEIGHT}).css({"width":DOC_WIDTH}).css({"overflow":"scroll"});
            var _this = this;
            this.client = new app.services.client();
            this.client.init();
            this.client.connect();
            this.render();
            this.historyIndex = 0;
            $('input[type=text]').on('keyup', function(e) {
                if(e.which == 38){
                    if(_this.historyIndex >= App.history.length){
                        _this.historyIndex = 1;
                    } else {
                        _this.historyIndex++;
                    }
                    $("#chatLine").val(App.history[App.history.length-_this.historyIndex]);
                }
                if (e.which == 13) {
                    e.preventDefault();
                    _this._send();
                }
            });
            $('#submit').on('click', function(e){
                e.preventDefault();
                _this._send();
            });

            $('#bold').on('click', function(e){
                e.preventDefault();
                _this._wrap($("#chatLine")[0], "b");
            });

            $('#italic').on('click', function(e){
                e.preventDefault();
                _this._wrap($("#chatLine")[0], "i");
            });

            $('#underline').on('click', function(e){
                e.preventDefault();
                _this._wrap($("#chatLine")[0], "u");
            });

            // var _this = this;
        },
        render: function() {
            this.$el.html(this.template(this.data));
        },
        _send: function(){
            var _this = this;
            var command = $('input[type=text]').val();
            if(command !== ""){
                _this.client.send(command);
            }
            $('input[type=text]').val('');
        },
        /**
         * This will wrap selected text (or none if not selected) with the supplied bbcode tag element.
         * @param element - "The element that we will look for a selection in"
         * @param tag - "The bbcode tag to insert"
         * @private
         */
        _wrap: function(element, tag) {
            //This will wrap selected text (or none if not selected) with the supplied bbcode tag element.
            if (typeof(element.selectionStart) != 'undefined') {
                var begin = element.value.substr(0, element.selectionStart);
                var selection = element.value.substr(element.selectionStart, element.selectionEnd - element.selectionStart);
                var end = element.value.substr(element.selectionEnd);
                element.value = begin + "["+tag+"]" + selection + "[/"+tag+"]" + end;
            }
        }
    });
});