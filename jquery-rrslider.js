/* 
 * Real Responsive Slider - jQuery Plugin
 * 
 * Author : Mike Yeung - www.cloud-design.hk
 * License : Dual licensed under the MIT and GPL licenses
 * Version : 1.0
 * Last revised: 2014-03-10
 * 
 * Example ( Must use "descending" order ) :
 * <div id='xxx' class='rrslider'>
 *      <ul>
 *          <li>3</li>
 *          <li>2</li>
 *          <li>1</li>
 *      </ul>
 *      <button class='previous'>previous</button>
 *      <button class='next'>next</button>      
 * </div>
 * 
 */

$(function(){
    
    $.fn.rrslider = function(options){
        
        //----------------------------------------------------------------------
        // Basic Setting
        // ---------------------------------------------------------------------
        
        // Default configuration properties
        var defaults = {
            speed:             1000
        };
        
        // Extend options
        var options = $.extend(defaults, options);         
        
        this.each(function() { 
            
            // Object variable
            var obj = $(this);    
            
            // Qty of li variable
            var qty = $("ul li", obj).length;
            
            // CSS setting           
            $('button', obj).css({
                'top': (obj.height() / 2) - ($('button').height() / 2)
            });


            //----------------------------------------------------------------------
            // Functions Setting
            // ---------------------------------------------------------------------    
            
            //----------------------------------------------------------------------
            // Execute
            // ---------------------------------------------------------------------             

            $(".previous", obj).on("click", function(){
                
                $("ul li", obj).eq(qty-1).animate({"left": $("ul", obj).width()}, options.speed, function(){
                    $(this).prependTo(this, obj).css("left","0px");    
                });                 
                
                $("ul li", obj).eq(0).appendTo("ul", obj).css("left", - $("ul", obj).width()).animate({"left":"0px"}, options.speed);

                
            });
            
            $(".next", obj).on("click", function(){     
                
                
                $("ul li", obj).eq(qty-1).animate({"left": - $("ul", obj).width()}, options.speed, function(){
                    $(this).prependTo("ul", obj).css("left","0px");    
                });
                
                $("ul li", obj).eq(qty-2).css("left", $("ul", obj).width()).animate({"left":"0px"}, options.speed);
 
                
            });
            



        });
    };    
    
});
