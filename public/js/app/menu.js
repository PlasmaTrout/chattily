/**
 * Created with IntelliJ IDEA.
 * User: GXReiser
 * Date: 11/26/13
 * Time: 3:18 PM
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){

    var menu_open = false;
    $('.navbar-toggle').on('click',function(e){
        if(!menu_open){
            $('#app').translate3d({x: -200,y: 0, z: 0});
            menu_open = true;
            e.preventDefault();
            e.stopPropagation();
        }
    });
    $('#app').on('click', function(e){
        if(menu_open){
            menu_open = false;
            $('#app').translate3d({x: 0, y: 0, z: 0});
            e.preventDefault();
            e.stopPropagation();
        }
    });
});
