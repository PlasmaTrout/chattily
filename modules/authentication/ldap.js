/**
 * Created with IntelliJ IDEA.
 * User: GXReiser
 * Date: 11/22/13
 * Time: 1:24 PM
 * To change this template use File | Settings | File Templates.
 */
var settings = require('../../settings.json');
var LdapAuth = require('ldapauth');

function auth() {
    this.url = settings.ldap.url;
    this.port = settings.ldap.port;
    this.org = settings.ldap.org;
    this.uid = settings.ldap.uid;
    this.admin = settings.ldap.adminUser;
    this.adminPass = settings.ldap.adminPass;

};

auth.prototype.login = function(username, password, callback_fn) {
    this.ldauth = new LdapAuth({
        url: 'ldap://'+this.url+':'+this.port,
        adminDn: this.admin,
        adminPassword: this.adminPass,
        searchBase: this.org,
        searchFilter: '('+this.uid+'={{username}})',
        verbose: true
    });
    this.ldauth.authenticate(username, password, function(err, user){
        callback_fn(err, user);
    });

};
auth.prototype.close = function(){
    this.ldauth.close(function(err){
        if(err) { console.log(err); }
    });
}
module.exports = auth;