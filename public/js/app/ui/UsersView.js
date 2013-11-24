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
        data: {},

        initialize: function() {
            // console.log("initialize");
            _.bindAll(this);
            this.render();

            // var _this = this;
        },
        render: function() {
            this.$el.html(this.template(this.data));
        }

    });
});