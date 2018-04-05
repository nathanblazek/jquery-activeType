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

        $(options.selector).trigger('change keyup');


        // Creates TinyMCE defaults, allowing user override, except for selector. activeType defaults to plain textarea with html capabilities
        

        //setInterval(updateEditor,0);   

        //The order of the regex is important. For example, if I process paragraph first, the <p> tags will exists in
        // elements that shouldn't contain them.
        var defaultRegex = {
                /* Header */    '(#+)(.*)':                         header,
                /* Bold */      '(\\*\\*|__)(.*?)\\1':              '<strong>$2</strong>',
                /* Link */      '\\[([^\\[]+)\\]\\(([^\\)]+)\\)':   '<a href=\'$2\'>$1</a>',
                /* Hor. Rule */ '\\n-{5,}':                         '\n<hr />',
                /* Code */      '`(.*?)`':                          '<code>$1</code>',
                /* List UL */   '((?:\\*.*\\n)+)':                  list_ul,
                /* List OL */   '((?:[0-9]+\\..*\\n)+)':            list_ol,
                /* Blockquote */'\n(&gt;|\>)(.*)':                  '\n<blockquote>$2</blockquote>',
                /* Paragraph */ '\\n([^\\n]+)\\n':                  paragraph,
    };
        function header(match, contents, offset, input_string){
            var num = contents.length;
            return '<h' + num + '>'+offset.trim()+'</h' + num + '>';
        }
        function list_ul(entire_group){
            // Returns the entire li group since the regex grabbed all the items in the grouping
            // Now I can add <ul> around the results and <li> tags around each list item

            var result = entire_group.trim();
            result = result.replace(/\*(.*)/g,'<li>$1</li>');
            return '<ul>'+result+'</ul>';
        }

        function list_ol(entire_group){
            // Returns the entire li group since the regex grabbed all the items in the grouping
            // Now I can add <ol> around the results and <li> tags around each list item

            var result = entire_group.trim();
            result = result.replace(/^[0-9]*\.(.*)/gm,'<li>$1</li>');
            return '<ol>'+result+'</ol>';
        }

        function paragraph(match, content) {
            var result = content.trim();
            // Prevent insertion of <p> tag inside an existing tag that should not contain p tags
            if (/^<\/?(h|p|bl|ul|ol|li)/i.test(result)) {
                return '\n' + content + '\n';
            }
            return '\n<p>' + result + '</p>\n';
        }

        function updatePreview(){
            var originalText = $(options.textarea_selector).val();
            var resultText = originalText;
            //var arrayOfLines = lineString.match(/[^\r\n]+/g);
            //Process each regular expressions
            $.each(defaultRegex,function(expression,replacement){
                var regex = new RegExp(expression,"gm");
                //Process the regex against the input data.
                resultText = resultText.replace(regex,replacement);
            });


            //Put the results back onto the pages preview container.
            $(options.preview_selector).html(resultText);
        }

    }


}(jQuery));