// Generated by CoffeeScript 1.6.2
(function() {
  var SIZE, dlog, drawBackground, drawIndicator, favicon_canvas, favicon_canvas_context, favicon_link_element, favscrin, _DEBUG_, _scroll_listener_is_set_;

  _DEBUG_ = false;

  SIZE = 32;

  _scroll_listener_is_set_ = false;

  dlog = function(msg, var_name, debug) {
    if (debug == null) {
      debug = _DEBUG_;
    }
    while (!debug) {
      return msg;
    }
    if (var_name) {
      console.log("" + var_name + ": " + msg);
    } else {
      console.log(msg);
    }
    return msg;
  };

  favicon_canvas = document.createElement('canvas');

  favicon_canvas.width = SIZE;

  favicon_canvas.height = SIZE;

  favicon_canvas_context = favicon_canvas.getContext('2d');

  favicon_link_element = document.createElement('link');

  favicon_link_element.setAttribute('rel', 'icon');

  favicon_link_element.setAttribute('type', 'image/png');

  favicon_link_element.setAttribute('href', '');

  document.head.appendChild(favicon_link_element);

  drawBackground = function(color) {
    favicon_canvas_context.fillStyle = color;
    return favicon_canvas_context.fillRect(0, 0, SIZE, SIZE);
  };

  drawIndicator = function(ratio, color) {
    var down_pos;

    if (ratio == null) {
      ratio = 0;
    }
    dlog(ratio, 'ratio');
    favicon_canvas_context.fillStyle = color;
    down_pos = Math.ceil(SIZE * ratio);
    dlog(down_pos, 'down_pos');
    return favicon_canvas_context.fillRect(0, down_pos, SIZE, SIZE);
  };

  favscrin = function(background_color, indicator_color, letter, letter_color) {
    var body, body_height, current_scroll_bottom, doc, scrolled_ratio, viewport_height, _results;

    if (background_color == null) {
      background_color = '#FF8000';
    }
    if (indicator_color == null) {
      indicator_color = '#31B404';
    }
    if (letter == null) {
      letter = 'E';
    }
    if (letter_color == null) {
      letter_color = '#ffffff';
    }
    doc = document.documentElement;
    body = document.body;
    viewport_height = dlog(window.innerHeight, 'viewport_height');
    current_scroll_bottom = dlog((doc != null ? doc.scrollTop : void 0) || (body != null ? body.scrollTop : void 0) || 0, 'current_scroll_bottom');
    body_height = dlog(window.document.height, 'body_height');
    scrolled_ratio = dlog(current_scroll_bottom / (body_height - viewport_height), 'scrolled_ratio');
    dlog(background_color, 'background_color');
    drawBackground(background_color);
    dlog(indicator_color, 'indicator_color');
    drawIndicator(scrolled_ratio, indicator_color);
    favicon_canvas_context.font = '29pt Arial';
    favicon_canvas_context.textAlign = 'center';
    favicon_canvas_context.fillStyle = letter_color;
    favicon_canvas_context.fillText(letter, 15, 30);
    favicon_link_element.setAttribute('href', favicon_canvas.toDataURL());
    _results = [];
    while (!_scroll_listener_is_set_) {
      window.addEventListener('scroll', (function() {
        return favscrin(background_color, indicator_color, letter, letter_color);
      }));
      _results.push(_scroll_listener_is_set_ = true);
    }
    return _results;
  };

  window.favscrin = favscrin;

}).call(this);
