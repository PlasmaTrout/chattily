/**
 * Created with IntelliJ IDEA.
 * User: GXReiser
 * Date: 12/11/13
 * Time: 11:29 AM
 * To change this template use File | Settings | File Templates.
 */

jpackage("app.models", function(){
    this.UserModel = Backbone.Model.extend({
        defaults: {
            email: '',
            username: '',
            id: ''
        },

        initialize: function(){

        }
    });
});