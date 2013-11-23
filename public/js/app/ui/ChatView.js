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
            var _this = this;
            this.client = new app.services.client();
            this.client.init();
            this.client.connect();
            this.render();
            $('input[type=text]').on('keyup', function(e) {
                if (e.which == 13) {
                    e.preventDefault();
                    _this._send();
                }
            });
            $('#submit').on('click', function(e){
                e.preventDefault();
                _this._send();
            })
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
        }
    });
});