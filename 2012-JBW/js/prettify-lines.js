/*

 show_lines and hide_lines assumes a element that has data-prettify='code-element-id' and data-prettify_lines="from:to"

 */
show_lines = function (event) {
    $(event.fragment).each(function(count, elem) {
        var code = $(this);
        highlight_fragment(code);
    })
};

highlight_fragment = function (fragment) {
    var code = get_code(fragment);
    if (typeof code !== 'undefined') {
        var new_html = "";

        var text_lines = code.orig.code.html().split('\n');
        var between = false;
        var padding = 0;
        for(var i = 0; i < text_lines.length; i++) {
            var line = text_lines[i]
            if (i == code.from) {
                between = true;
                padding = determine_left_padding(line);

                var new_line = line.substring(padding);
                new_html += '<' + 'pre' + ' class="prettyprint highlight">\n'
                new_html += ('<' + 'code' + ' class="prettyprint">' +new_line+ '\n')
            }
            else {
                new_html += (between ? line.substring(padding):line) + '\n'
            }
            if (i == code.to) {
                between = false;
                new_html += '</code></pre>'
            }
        }

        code.block.html(new_html);
        prettyPrint();
        $('.present .highlight').trigger('lineshighlighted');
    }
}

hide_lines = function (event) {
    $(event.fragment).each(function(i, elem) {
        var fragment = $(this);
        var code = get_code(fragment);
        if (typeof code !== 'undefined') {
            code.block.html(code.orig.code.html());
            prettyPrint();

            var previous_fragment = $(".present .fragment.visible").last();
            highlight_fragment(previous_fragment);
        }
    })
};

get_code = function (fragment) {
    if (typeof fragment.attr('data-prettify') === 'undefined') {
        return undefined;
    }
    var code = {};
    var prettify = fragment.attr('data-prettify')
    code.lines = fragment.attr('data-prettify_lines').split(':');
    code.from = code.lines[0];
    code.to = code.lines[1];
    code.block = $('#' + prettify);
    code.orig = {};
    code.orig.id = 'code_' + prettify;
    code.orig.code = $('#' + code.orig.id);
    if(code.orig.code.length == 0) {
        $('<code />', {
            id: code.orig.id,
            style: "display:none",
            html: code.block.html()
        }).appendTo('body');
        code.orig.code = $('#' + code.orig.id);
    }
    return code;
}

function determine_left_padding(line) {
    for(i = 0; i < line.length; i++) {
        if(line.charAt(i) != ' ') {
            return i
        }
    }
    return 0
}
