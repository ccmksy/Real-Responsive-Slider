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
            height:     '100%',
            width:      '100%',            
            speed:      1000,
            imgCover:   false
        };
        
        // Extend options
        var options = $.extend(defaults, options);         
        
        this.each(function() { 
            
            // Object variable
            var obj = $(this);    
            
            // Qty of li variable
            var qty = $('ul li', obj).length;
            
            // Css setting
            $(obj).css({
                "height":   options.height,
                "width":    options.width
            });
            
            //----------------------------------------------------------------------
            // Functions Setting
            // ---------------------------------------------------------------------             
            
            function adjust_button_top()
            {
                $('button', obj).css({
                    'top': ($("ul", obj).height() / 2) - ($('button').height() / 2)
                });                
            }      
            
            function adjust_img(selector)
            {
                if(!options.imgCover === true)
                {
                    if($('img', selector).width() < $('img', selector).height() )
                    {
                        $('img', selector).css({
                            'height':   "100%",
                            'width':    "auto"
                        });

                    }
                    else
                    {
                        $('img', selector).css({
                            'height':   "auto",
                            'width':    "100%"
                        });
                    }                


                    $('img', selector).css({
                        'left': ($("ul", obj).width() / 2) - ($('img', selector).width() / 2),
                        'top': ($("ul", obj).height() / 2) - ($('img', selector).height() / 2)
                    });                    
                }
                else
                {
                    var imgSrc=$('img', selector).attr('src');
                    
                    $('img', selector).css('display','none');
                    $(selector).css({
                        'background-image':     'url(' + imgSrc + ')',
                        'background-position':  'center center',
                        'background-repeat':    'no-repeat',
                        'background-size':          'cover',
                        '-webkit-background-size': 'cover',
                        '-moz-background-size':     'cover',
                        '-o-background-size':       'cover',
                        'filter':               "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + imgSrc + "', sizingMethod='scale')",
                        '-ms-filter':           "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + imgSrc + "', sizingMethod='scale')"
                    });                    
                }
            }   

            
            //----------------------------------------------------------------------
            // Execute and Flow Control
            // ---------------------------------------------------------------------      
            
            // Initialize Button Location
            adjust_button_top();
            adjust_img($("ul li", obj).eq(qty-1));
            
            // Resize Button Location
            $(window).resize(function(){                
                adjust_button_top();  
                adjust_img($("ul li", obj).eq(qty-1));
            });
            
            // Previous Button Event
            $(".previous", obj).on("click", function(){  
                
                // Set the Current li and move it to right
                $("ul li", obj).eq(qty-1).animate({"left": $("ul", obj).width()}, options.speed, function(){
                    $(this).prependTo(this, obj).css("left","0px");    
                });
                
                // Adjust the previous img
                adjust_img($("ul li", obj).eq(0));
                
                // Set the Previous li and move it frome left to right                
                $("ul li", obj).eq(0).appendTo("ul", obj).css("left", - $("ul", obj).width()).animate({"left":"0px"}, options.speed);                 
            
            });
            
            // Next Button Event            
            $(".next", obj).on("click", function(){    
                
                // Set the Current li and move it to left
                $("ul li", obj).eq(qty-1).animate({"left": - $("ul", obj).width()}, options.speed, function(){
                    $(this).prependTo("ul", obj).css("left","0px");  
                });
                
                // Set the Next li and move it from right to left
                $("ul li", obj).eq(qty-2).css("left", $("ul", obj).width()).animate({"left":"0px"}, options.speed);

                // Because it has to get the newest size that can adjust img, so
                // it must set here 
                adjust_img($("ul li", obj).eq(qty-2));
                
            });
            
        });
        
    };    
    
});
