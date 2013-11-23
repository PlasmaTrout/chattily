/**
 * Created with IntelliJ IDEA.
 * User: GXReiser
 * Date: 11/22/13
 * Time: 8:52 PM
 * To change this template use File | Settings | File Templates.
 */
var base64_utils = require('../../modules/utils/base64');

var user_utils = function(){
    this.base64 = new base64_utils();
};

user_utils.prototype.get = function(cookie){
    return this.base64.decode(decodeURIComponent(cookie));
};

module.exports = user_utils;