show_lines = function (event) {
    $(event.fragment).each(function(count, elem) {
        var code = $(this);
        highlight_fragment(code);
    })
};

highlight_fragment = function (code) {
    var data_prettify = code.attr('data-prettify')
    var data_prettify_lines = code.attr('data-prettify_lines')
    if(data_prettify != undefined) {
        var code_lines = data_prettify_lines.split(':')
        var from = code_lines[0];
        var to = code_lines[1];

        var new_lines = ""

        var code_block = $('#' + data_prettify);

        var orig_code_id = 'code_' + data_prettify
        var orig_code = $('#' + orig_code_id)
        var text = ''
        if(orig_code.length == 0) {
            $('body').append('<' + 'code id="' + orig_code_id + '" style="display:none;"' + '>' + code_block.html() + '</' + 'code' + '>');
            text = code_block.html();
        }
        else {
            text = orig_code.html()
        }

        var text_lines = text.split('\n');
        var between = false;
        var padding = 0;
        for(var i = 0; i < text_lines.length; i++) {
            var line = text_lines[i]
            if(i == from) {
                between = true;
                padding = determine_left_padding(line);

                var new_line = line.substring(padding);
                new_lines += '<' + 'pre' + ' class="prettyprint highlighted_lines" style="background-color:#eee">\n'
                new_lines += ('<' + 'code' + ' id="highlight" class="prettyprint" style="background-color:#eee;">' +new_line+ '\n')
            }
            else {
                new_lines += (between ? line.substring(padding):line) + '\n'
            }
            if(i == to) {
                between = false;
                new_lines += '</code></pre>'
            }
        }

        code_block.html(new_lines);
        prettyPrint();
        $("#highlight").animate({fontSize: '130%'}, 100, 'swing');
    }
}

hide_lines = function (event) {
    $(event.fragment).each(function(i, elem) {
        var code = $(this);
        var data_prettify = code.attr('data-prettify')
        var data_prettify_lines = code.attr('data-prettify_lines')
        if(data_prettify != undefined) {
            var code_lines = data_prettify_lines.split(':')
            var from = code_lines[0];
            var to = code_lines[1];

            var new_lines = ""

            var code_block = $('#' + data_prettify);

            var orig_code_id = 'code_' + data_prettify
            var orig_code = $('#' + orig_code_id)
            var text = ''
            if(orig_code.length == 0) {
                $('body').append('<' + 'code id="' + orig_code_id + '" style="display:none;"' + '>' + code_block.html() + '</' + 'code' + '>');
                text = code_block.html();
            }
            else {
                text = orig_code.html()
            }
            code_block.html(text);
            prettyPrint();

            var previous_fragment = $(".present .fragment.visible").last();
            highlight_fragment(previous_fragment);
        }
    })
};

function determine_left_padding(line) {
    for(i = 0; i < line.length; i++) {
        if(line.charAt(i) != ' ') {
            return i
        }
    }
    return 0
}
