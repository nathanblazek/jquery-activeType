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
        var saveFrequency = 15000; //15 seconds
        var lastChecked = new Date().getTime();

        //I want to save textarea changes every 15 seconds, but only if the textarea updated
       $(document).on('change keyup',options.selector,function() {
        updatePreview();
            var thisTime = new Date().getTime();
            //Make sure the save frequency has elapsed since the last update
            if(thisTime > (lastChecked+saveFrequency)){
                //Save the notes
                lastChecked = thisTime;
                //If storing a new entry, I need to update the method and url so it can be edited moving forward
            }
        });




        // Creates TinyMCE defaults, allowing user override, except for selector. activeType defaults to plain textarea with html capabilities
        

        //setInterval(updateEditor,0);   


        var defaultRegex = {
                '(#+)(.*)':header, //header
                '\\n([^\\n]+)\\n':'<p>$1</p>' //line breaks and paragraphs
    };
        function header(match, contents, offset, input_string){
            var num = contents.length;
            return '<h' + num + '>'+offset+'</h' + num + '>';
        }
        function paragraph(match, contents, offset, input_string){
            return '<p>'+offset+'</p>';
        }

        function updatePreview(){
            var originalText = $(options.textarea_selector).val();
            var resultText = originalText;
            //var arrayOfLines = lineString.match(/[^\r\n]+/g);
            //Process each regular expressions
            $.each(defaultRegex,function(expression,replacement){
                var regex = new RegExp(expression,"g");
                //Process the regex against the input data.
                resultText = resultText.replace(regex,replacement);



                console.log(resultText);
            });


            //Put the results back onto the pages preview container.
            $(options.preview_selector).html(resultText);
        }

    }


}(jQuery));