/**
 * Created with IntelliJ IDEA.
 * User: GXReiser
 * Date: 11/23/13
 * Time: 5:59 PM
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with IntelliJ IDEA.
 * User: GXReiser
 * Date: 11/23/13
 * Time: 2:53 AM
 * To change this template use File | Settings | File Templates.
 */
jpackage("app.ui", function() {

    this.UsersView = Backbone.View.extend({
        template: _.template( App.templates.UsersViewTemplate ),

        initialize: function() {
            // console.log("initialize");
            this.collection = new app.collections.UserCollection();
            this.collection.fetch();
            var _this = this;
            this.collection.on("add", function(model){
                //console.log(model);
                _this.render();
            });

            _.bindAll(this);

            // var _this = this;
        },
        render: function() {
            this.$el.html(this.template( {users: this.collection.models} ));
        },
        update: function(){
            this.collection.fetch({add:true});
        }
        

    });
});