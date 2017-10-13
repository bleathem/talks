var DrawCanvas = (function ($) {
    function initialize(options) {
        var settings = $.extend({
            'reveal':Reveal
        }, options);
        var self = this;
        var Reveal = settings.reveal;
        Reveal.addEventListener('fragmentshown', drawShape);
    }

    function drawShape(event) {
        var fragment = event.fragment;
        if ($(fragment).hasClass('canvas')) {
            drawSquare(fragment);
        }
    }

    function drawSquare(fragment) {
        $(fragment).css('position', 'absolute')
            .css('top', '100px')
            .css('left', '0px')
            .css('height', '500px')
            .css('width', '900px');
        $('.reveal').addClass('alert');
        var ctx = fragment.getContext("2d");
        ctx.strokeStyle = '#ff0000'
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(300,150);
        ctx.stroke();
        ctx.moveTo(300,0);
        ctx.lineTo(0,150);
        ctx.stroke();
        Reveal.addEventListener('slidechanged', resetBackground);
    }

    function resetBackground() {
        $('.reveal').removeClass('alert');
        Reveal.removeEventListener('slidechanged', resetBackground);
    }

    return {
        initialize: initialize
    }

})(jQuery);