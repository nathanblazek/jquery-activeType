/*
 Copyright (c) 2018 Nathan Blazek
 Written by Nathan Blazek http://nateblazek.com
 Permission is hereby granted, free of charge, to any person obtaining
 a copy of this software and associated documentation files (the
 "Software"), to deal in the Software without restriction, including
 without limitation the rights to use, copy, modify, merge, publish,
 distribute, sublicense, and/or sell copies of the Software, and to
 permit persons to whom the Software is furnished to do so, subject to
 the following conditions:
 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function ($) {

    $.fn.activeType = function (options) {
        var saveFrequency = 1000; //15 seconds
        var lastChecked = new Date().getTime();

        //I want to save textarea changes every 15 seconds, but only if the textarea updated
        $(document).on('keypress',options.selector,function() {
            var thisTime = new Date().getTime();
            //Make sure the save frequency has elapsed since the last update
            if(thisTime > (lastChecked+saveFrequency)){
                //Save the notes
                lastChecked = thisTime;
                //If storing a new entry, I need to update the method and url so it can be edited moving forward
                console.log('textarea changed!!')
            }
        });



        CKEDITOR.replace( options.selector );
        // Creates TinyMCE defaults, allowing user override, except for selector. activeType defaults to plain textarea with html capabilities
        //var tinyMCEOptions = $.extend({},{menubar:false,statusbar: false,toolbar:false},options.tinymce,{selector:options.selector});
        //tinymce.init(tinyMCEOptions);

    }

}(jQuery));