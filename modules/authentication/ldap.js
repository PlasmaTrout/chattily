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
    console.log(settings);
    this.url = settings.ldap2.url;
    this.port = settings.ldap2.port;
    this.org = settings.ldap2.org;
    this.uid = settings.ldap2.uid;
    this.admin = '';
    this.adminPass = '';

};

auth.prototype.login = function(username, password, callback_fn) {
    this.ldauth = new LdapAuth({
        url: 'ldap://'+this.url+':'+this.port,
        adminDn: '',
        adminPassword: '',
        searchBase: this.org,
        searchFilter: '(cn={{username}})'
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