/**
 * Cookie Utils 
 * Library-agnostic utility for reading and writing cookies.
 * 
 * @author Heidi Hunter
 * @version 1.2
 * 
 * EXAMPLES
 * ----------------------------------------------------------------
 * CookieUtil.write("myCookie", "aValue", 60000); // cookie expires in 1 minute
 * 
 * 
 * Change log
 * ----------------------------------------------------------------
 * 1.2  Add support for domain setting
 * 
 */
var CookieUtil = {};

CookieUtil.SECOND = 1000;
CookieUtil.MINUTE = CookieUtil.SECOND * 60;
CookieUtil.HOUR = CookieUtil.MINUTE * 60;
CookieUtil.DAY = CookieUtil.HOUR * 24;
CookieUtil.WEEK = CookieUtil.DAY * 7;
CookieUtil.YEAR = CookieUtil.DAY * 365;

/**
 * Returns the cookie value, or undefined if it does not exist.
 * 
 * @param {String} name
 * @param {Boolean} objectify (Optional) If true, returns an objectified version of cookie value.
 * @return {String}
 */
CookieUtil.read = function(name,objectify){
    var pattern = name+"=.*[^;]";
    var regex = new RegExp(pattern, "i");
    var match = regex.exec(document.cookie);
    var val;
    if (match && match.length > 0){
    	val = cookie_sec('dec',match[0].split("=")[1].split(";")[0]);
        return objectify ? JSON.parse( val ) : val;
    }

};

/**
 * Creates or updates the value of a cookie.
 * 
 * @param {String} name
 * @param {string, object} value    Any string or object. If an object is passed it is converted to string. Proper encoding will be handled by this class.
 * @param {Number} expiry   		A time span in milliseconds (optional). If not specified, 
*                           		the cookie will expire at the end of the browser session. 
 * @param {String} path     		(Optional) A path within the domain which the cookie will be applied to (optional).
 *                          		The default is the domain root ("/").
 * @param {String} domain   		(Optional) The domain the cookie is valid for.
 */
CookieUtil.write = function(name, value, expiry, path, domain){
	if( typeof(value) == "object" ) {
		value = JSON.stringify(value);
	}
    if (expiry) {
        var date = new Date();
        date.setTime(date.getTime() + expiry);
        var expires = "; expires=" + date.getUTCDate().toString();
    }
    else {
        expires = "";
    }
    if (!path){
        path = "/";
    }
    var cookieStr = name+"="+cookie_sec('enc',value)+expires+"; path="+path;
    if (domain){
        cookieStr += "; domain=" + domain;
    }
    document.cookie = cookieStr;
};

/**
 * Creates or updates the value of a cookie without objectification.
 *
 * @param {String} name
 * @param {string, object} value    Any string or object. If an object is passed it is converted to string. Proper encoding will be handled by this class.
 * @param {Number} expiry   		A time span in milliseconds (optional). If not specified,
*                           		the cookie will expire at the end of the browser session.
 * @param {String} path     		(Optional) A path within the domain which the cookie will be applied to (optional).
 *                          		The default is the domain root ("/").
 * @param {String} domain   		(Optional) The domain the cookie is valid for.
 */
CookieUtil.simpleWrite = function(name, value, expiry, path, domain){
    if( typeof(value) == "object" ) {
   		value = JSON.stringify(value);
   	}
       if (expiry) {
           var date = new Date();
           date.setTime(date.getTime() + expiry);
           var expires = "; expires=" + date.getUTCDate().toString();
       }
       else {
           expires = "";
       }
       if (!path){
           path = "/";
       }
       var cookieStr = name+"="+value+expires+"; path="+path;
       if (domain){
           cookieStr += "; domain=" + domain;
       }
       document.cookie = cookieStr;
}

/**
 * Returns the cookie value, or undefined if it does not exist.
 *
 * @param {String} name
 * @return {String}
 */
CookieUtil.simpleRead = function(name){
    var pattern = name+"=.*[^;]";
    var regex = new RegExp(pattern, "i");
    var match = regex.exec(document.cookie);
    var val;
    if (match && match.length > 0){
    	val = match[0].split("=")[1].split(";")[0];
        return val;
    }

};

/**
 * Deletes the cookies with the given name.
 * @param {String} name
 */
CookieUtil.erase = function(name){
    this.write(name,"",-1000, "/", document.location.hostname);
};