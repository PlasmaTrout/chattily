/**
 * Created with IntelliJ IDEA.
 * User: GXReiser
 * Date: 12/11/13
 * Time: 11:33 AM
 * To change this template use File | Settings | File Templates.
 */
jpackage("app.collections", function(){
    var UserModel = app.models.UserModel;

    this.UserCollection = Backbone.Collection.extend({
        model: UserModel,
        url: '/rooms/global'

    });
});