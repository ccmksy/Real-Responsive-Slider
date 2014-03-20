/* 
 * Real Responsive Slider - jQuery Plugin
 * 
 * Author : Mike Yeung - www.cloud-design.hk
 * License : Dual licensed under the MIT and GPL licenses
 * Version : 2.0 
 * Last revised: 2014-03-10
 * 
 * Example ( Must use "descending" order ) :
 * 
 * <div id='xxx' class='rrslider'>
 *      <ul>
 *          <li>item 3</li>
 *          <li>item 2</li>
 *          <li>item 1</li>
 *      </ul>
 *      <button class='previous'>previous</button>
 *      <button class='next'>next</button>      
 * </div>
 * 
 * Above example, "item 1" will be shown firstly, not "item 3".
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
            var obj     = $(this);    
            
            // Qty of li variable
            var qty     = $('ul li', obj).length;
            
            // Get id variable
            var obj_id  = "#" + obj.attr('id');
            
            // Css setting
            $(obj).css({
                'height':   options.height,
                'width':    options.width
            });
            $('ul', obj).css({
                'position': 'absolute'
            });
            
            //----------------------------------------------------------------------
            // Functions Setting
            // ---------------------------------------------------------------------    
            
            // Adjust Button Top Location function            
            function adjust_button_top()
            {
                var obj_h   = $("ul", obj).height();
                var btn_h   = $('button').height();
                
                $('button', obj).css({
                    'top': ( obj_h / 2 ) - ( btn_h / 2 )
                });                
            }      
            
            // Adjust Image Responsive
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
            
            
            // Call Next Slide Function 
            // Because descending order, so we must use prev(), not next().            
            function call_next_slide(e)
            {
                e.preventDefault();
                $(e.target).off('click');
                
                var cur_slide   = $("ul li", obj).eq(qty-1);
                var cur_obj_w   = $("ul", obj).width();
                var nex_slide   = $(cur_slide).prev('li');                      // Important !!    
                
                // Current Slide move to left
                $(cur_slide).animate({ 'left': - cur_obj_w }, options.speed, function(){
                    
                    // Rearrange the order index
                    $(this).prependTo( obj_id + " ul" ).css( 'left', '0px'); 
                    
                });                
                
                // Adjust next image
                adjust_img(nex_slide);
                
                // Next Slide move from right to left
                $(nex_slide).css({ 'left': cur_obj_w }).animate({ 'left': '0px' }, options.speed, function(){
                    
                    $(e.target).on('click', call_next_slide);
                    
                });                  
                
            }
            
            // Call Previous Slide Function 
            // Because descending order, so we must use eq(0), not prev().                 
            function call_previous_slide(e)
            {
                e.preventDefault();
                $(e.target).off('click');
                
                var cur_slide   = $("ul li", obj).eq(qty-1);                
                var cur_obj_w   = $("ul", obj).width();   
                var pre_slide   = $("ul li", obj).eq(0);               
                
                // Current Slide move to right
                $(cur_slide).animate({ 'left': cur_obj_w }, options.speed, function(){
                    
                    // Rearrange the order index
                    $(this).prependTo( this ).css( 'left', '0px');             // Important !!
                    
                });   
                
                // Adjust next image
                adjust_img(pre_slide);                
                
                // Pre Slide move to right                
                $(pre_slide).appendTo( obj_id + " ul" ).css({ 'left': - cur_obj_w }).animate({ 'left': '0px' }, options.speed, function(){
                    
                    $(e.target).on('click', call_previous_slide);
                    
                });                 
            }

            
            //----------------------------------------------------------------------
            // Execute and Flow Control
            // ---------------------------------------------------------------------      
            
            // Initialize
            adjust_button_top();
            adjust_img($("ul li", obj).eq(qty-1));
            
            // Resizing
            $(window).resize(function(){                
                adjust_button_top();  
                adjust_img($("ul li", obj).eq(qty-1));
            });
            
            // Call Previous Slide
            $(".previous", obj).on("click", call_previous_slide);            
             
            // Call Next Slide
            $(".next", obj).on("click", call_next_slide );
            
        });
        
    };    
    
});
