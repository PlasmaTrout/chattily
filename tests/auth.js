/**
 * Created with IntelliJ IDEA.
 * User: GXReiser
 * Date: 11/22/13
 * Time: 1:43 PM
 * To change this template use File | Settings | File Templates.
 */
var settings = require('./../settings.json');
var ldauth = require('./../modules/authentication/ldap');

var auth = new ldauth();

auth.login("username", "password", function(err, user){
    if(err){console.log("Error: "+err);}
    if(user){console.log(user);}
    auth.close();
    process.exit(0);
});
