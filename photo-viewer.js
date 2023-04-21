var request;                                    //Latest image to be requested
var $current;                                   // Image currently being shown
var cache={}                                    // cache object
var $frame  =$('#photo-viewer');                //Container for image
var $thumbs = $ ('.thumb');                      //thumbnails

function crossfade($img){
    if ($current){
        $current.stop().fadeOut('slow');
    }

    $img.css({                                  //set the css margins for the image
        marginLeft: -$img.width() / 2,          //Negative margin of half images's width
        marginTop: -$img.height() /2,           //Negative margin of half image's height
    }); 

    $img.stop().fadeTo('slow', 1);              //Stop animation on new image & fae in

    $current = $img;
}

$(document).on('click', '.thumb', function(e){
    var $img,
        src = this.href;
        request = src;

    e.preventDefault();

    $thumbs.removeClass('active');
    $(this).addClass('active');

    if (cache.hasOwnProperty(src)){
        if(cache[src].isLoading === false){
            crossfade(cache[src].$img);
        }
    }else{
        $img = $('<img/>');
        cache[src] = {
            $img: $img,
            isLoading: true
        };
    }

    //Next fews lines will run when images has loaded but are prepared first

    $img.on('load', function(){                         //when image is loaded
        $img.hide();                                    //hide it
        //remove is-loading class from frame & append new image to it
        $frame.removeClass('is-loading').append($img);
        cache[src].isLoading = false;
        //If still most recently requested image then
        if (request == src){
            crossfade($img);
        }
    });

    $frame.addClass('is-loading');

    $img.attr({
        'src': src,
        'alt': this.title ||''
    });

});

//Final line runs oncewhen rest of script has loaded to show the first image
$('.thumb').eq(0).click();