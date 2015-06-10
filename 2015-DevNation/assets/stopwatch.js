/**
 * A stopwatch widget
 *
 * @module Output
 * @class chart
 */
(function ($) {

  $.widget('rich.stopwatch', {

    options: {
      autostart: true,
      direction: 'decreasing',
      disabled: false,
      showProgressBar: true,
      increment: 100 // in milliseconds
    },

    _create: function() {
      this.digitsElement = this.element.find('.digits');
      this.startTime = this.digits();
      this.digits(this.startTime);
      if (this.options.autostart) {
        this._createInterval();
      }
      if (this.options.showProgressBar) {
        this._addProgressBar();
      }
    },

    start: function() {
      if (this.isRunning()) {
        return;
      }
      this.reset();
      this._createInterval();
    },

    resume: function() {
      this._createInterval();
    },

    pause: function() {
      this._removeInterval();
    },

    stop: function() {
      this.digits(0);
      this._removeInterval();
    },

    reset: function() {
      if (this.options.disabled) {
        return;
      }
      this._removeInterval();
      this.digits(this.startTime);
      this._trigger('reset', undefined, this._dumpUi());
    },

    isRunning: function() {
      return !!this.intervalId;
    },

    digits: function(value) {
      if (typeof value === 'undefined') {
        return parseFloat(this.digitsElement.text());
      } else if (! this.options.disabled) {
        if (value <= 0) {
          value = 0;
        }
        this.digitsElement.text(value.toFixed(2));
        this._updateProgressBar();
      }
    },

    _createInterval: function() {
      if (!this.intervalId && !this.options.disabled) {
        this.intervalId = setInterval($.proxy(this._decrementCount, this), this.options.increment);
        this._trigger('start', undefined, this._dumpUi());
      }
    },

    _removeInterval: function() {
      if (this.intervalId && !this.options.disabled) {
        clearInterval(this.intervalId);
        this.intervalId = null;
        this._trigger('stop', undefined, this._dumpUi());
      }
    },

    _decrementCount: function() {
      var delta = this.options.increment/1000;
      var time = this.options.direction === 'increasing' ?
        this.digits() + delta : this.digits() - delta;
      this.digits(time);
      if (time <= 0) {
        this._removeInterval();
      }
    },
    
    _addProgressBar: function() {
      if (this.options.direction === 'increasing') {
        return;
      }
      this.progressBar = $('<div class="progress-bar" style="width: 0%;" />');
      var progress = $('<div class="progress" />').append(this.progressBar);
      this._updateProgressBar();
      this.element.append(progress);
    },

    _removeProgressBar: function() {
      if (this.progressBar) {
        this.progressBar.parents('.progress').first().remove();
        this.progressBar = null;
      }
    },

    _updateProgressBar: function() {
      if (! this.progressBar) {
        return;
      }
      var value = 100 - (this.digits() / this.startTime * 100);
      this.progressBar.css('width', value.toFixed(4) + '%');
    },

    _disable: function () {
      this._removeInterval();
      this.element.addClass('disabled');
    },

    _enable: function () {
      this.element.removeClass('disabled');
    },

    _dumpUi: function() {
      return {
        element: this.element,
        digits: this.digits()
      };
    },

    _getCreateEventData: function() {
      // called when the widget factory fires its create event
      return this._dumpUi();
    },

    _setOption: function (key, value) {
      var widget = this;
      if (this.options.key === value) {
        return;
      }
      switch (key) {
        case 'disabled':
          if (value === true) {
            widget._disable();
          } else {
            widget._enable();
          }
          break;
        case 'showProgressBar':
          if (value === true && !widget.progressBar) {
            widget._addProgressBar();
          } else if (value === false && widget.progressBar) {
            widget._removeProgressBar();
          }
          break;
      }
      this._super(key, value);
    },

    _destroy: function() {
      this._removeInterval();
      this._removeProgressBar();
      this.digitsElement.text(this.startTime);
      this._trigger('destroy', undefined, this._dumpUi());
    }

  });
}(jQuery) );
