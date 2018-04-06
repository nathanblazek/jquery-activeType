# Welcome to ActiveType Markdown Parser!
## By Nathan Blazek
### Installation and Setup
1. Place the following in the &lt;head&gt; section of your webpage. Make sure the path is correct and relative to where you installed the js file.<br />
            `<script src="../src/active-type.js"></script>`
2. Add the following to the bottom of your html, just above the &lt;/body&gt; tag
               
```javascript
    <script type="text/javascript">
       $(document).ready(function() {
           var options = {
               textarea_selector:'#active-type',
               preview_selector:'#active-type-preview',
               markdown:{ //Enter custom regex in here, identical regex will overwrite defaults
                   'italics':'&lt;em&gt;$2&lt;/em&gt;',
               },
               regex:[ //Custom regex using this structure
                   {   name:'Box',
                       regex:/{{Box:([0-9]*) title:(.*)}}/g,
                       replace:'&lt;div class="card" id="box_$1"&gt;$2&lt;/div&gt;'
                   }
               ]
    
           };
    
           $("#active-type").activeType(options);
       });
    </script>
```
               


Thank you for checking out my plugin. I created this plugin for a personal project of mine located at [my personal web site](http://www.nateblazek.com)...eventually!
### Goals
1. Actively parse markdown and display it on the webpage as a user updates it.
12. Process markdown by using basic regex
33. Get better at using regex..**I suck at it**, I really do. I use it very periodically and I never get held up by it, but I do not feel confident enough to use it without the help of [Google](http://www.google.com) or online test sites like [Regex101](http://www.regex101.com)
3. Allow Regex to be passed into the plugin. This, at it's core, was a requirement of mine. I want to store markdown in a table, parsing it server side to deliver onto a webpage. Rewriting regex didnt sound like fun and I hate code duplication. Allowing regex to be passed into this plugin solves my concerns. *Hopefully*.
------------
### Markdown Logic
* \# Headers - They are created with \#, where the number of \# determines the size of the header
* Links - They are created with the \[Link Title](Link URL) format.
* \*\*Bold\*\* - Put any text in between two asterisk to bold the text.
* \*Italics\* - Put any text between a single asterisk to italicize the text.
* \`code\` - Put your text between these characters(What are they called? No idea..) to emphasize your code. Browsers/websites tend to put this in a monospace format by default
* \> Blockqoute - Put your text after a greater than symbol to create blockquotes.
* \* Unordered List - Put an asterisk before your text to make an unordered list. Having these in each line will group them together into one unordered list.
* 5\. Ordered List - Put an asterisk before your text to make an ordered list. Having these in each line will group them together into one ordered list.



