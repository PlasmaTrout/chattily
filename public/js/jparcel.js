/**
 * Created with IntelliJ IDEA.
 * User: GXReiser
 * Date: 11/23/13
 * Time: 2:52 AM
 * To change this template use File | Settings | File Templates.
 */
function jpackage( str, func ) {
    var namespace = jnamespace( str );
    var args = Array.prototype.slice.call(arguments);
    func.apply( namespace, args.slice(2) );
}

function jnamespace( str ) {
    var separator = ".";
    var split = String(str).split(separator);
    var func = 	function(parent, item){
        if(!parent[item]){
            parent[item] = {};
        }
        return parent[item];
    }

    return _.reduce(split, func, window);
}