var zoom_level = 100;
var MAX_ZOOM_LEVEL = 400;
var MIN_ZOOM_LEVEL = 100;
var original_width = 1204;
var original_height = 589;
var top = 0;
var left = 0;

var drag_started = false;
var pinch_started = false;
var last_mouse_x = 0;
var last_mouse_y = 0;

var old_pinch_center_x = 0;
var old_pinch_center_y = 0;
var initial_d = 0;
var current_d = 0;

var is_mobile = false;

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function isMobile() {
  let md = new MobileDetect(window.navigator.userAgent);
  let small_screen = window.matchMedia("(max-width: 991px)").matches;
  return md.mobile() || small_screen;
}

function increaseZoom() {
  if (is_mobile) {
    let zl = zoom_level + 100;
    return Math.min(MAX_ZOOM_LEVEL, zl);
  } else {
    let zl = Math.floor(zoom_level / 10) * 10;
    return zl + 10;
  }
}

function decreaseZoom() {
  if (is_mobile) {
    let zl = zoom_level - 100;
    return Math.max(MIN_ZOOM_LEVEL, zl);
  } else {
    let zl = Math.floor(zoom_level / 10) * 10;
    return zl - 10;
  }
}

function zoomIn() {
  zoom_level = increaseZoom();
  if (zoom_level > MAX_ZOOM_LEVEL) {
    zoom_level = MAX_ZOOM_LEVEL;
    return true;
  }
  /*
    var callbacks = $.Callbacks();
    callbacks.add( setMapPosition );
    callbacks.add( resizeMap );
    callbacks.fire( );
    */
  setMapPosition();
  resizeMap();
}

function zoomOut() {
  zoom_level = decreaseZoom();
  if (zoom_level < MIN_ZOOM_LEVEL) {
    zoom_level = MIN_ZOOM_LEVEL;
    return true;
  }
  /*
    var callbacks = $.Callbacks();
    callbacks.add( setMapPosition );
    callbacks.add( resizeMap );
    callbacks.fire( );
    */
  setMapPosition();
  resizeMap();
}

function setMapPosition() {
  if (zoom_level.toFixed(2) == MIN_ZOOM_LEVEL.toFixed(2)) {
    $("#map").css({
      top: "0px",
      left: "0px",
      cursor: "default",
    });
    return true;
  }

  let $map = $("#map");
  let $container = $(".map").first();
  let $position = $map.position();

  let container_width = $container.width();
  let container_half_width = container_width * 0.5;
  let container_height = Math.min(
    $container.height(),
    (container_width * original_height) / original_width
  );
  let container_half_height = container_height * 0.5;

  let old_left = Math.abs($position.left);
  let old_width = $map.width();
  let new_width = (container_width * zoom_level) / 100;

  let old_top = Math.abs($position.top);
  let old_height = $map.height();
  let new_height = (new_width * original_height) / original_width;

  // For maintain the map visible center.
  let new_left =
    (new_width * (old_left + container_half_width)) / old_width -
    container_half_width;
  if (new_left > 0) {
    new_left *= -1;
  }

  let new_top =
    (new_height * (old_top + container_half_height)) / old_height -
    container_half_height;
  if (new_top > 0) {
    new_top *= -1;
  }

  if (new_top > 0) {
    new_top = 0;
  }
  if (new_top + new_height < container_height) {
    new_top = container_height - new_height;
  }
  if (new_left > 0) {
    new_left = 0;
  }
  if (new_left + new_width < container_width) {
    new_left = container_width - new_width;
  }

  $("#map").css({
    top: new_top + "px",
    left: new_left + "px",
    cursor: "move",
  });

  return true;
}

function resizeMap() {
  let container_width = $(".map").first().width();
  let map_width = (container_width * zoom_level) / 100;
  $("#map").width(map_width);
  $("#map").trigger("zoom");
}

function initMapDrag(event) {
  event.preventDefault();

  if (
    event.pageX === undefined &&
    $.isTouchCapable() &&
    event.targetTouches.length == 2
  ) {
    let pinch_initial_a_x = event.targetTouches[0].pageX;
    let pinch_initial_a_y = event.targetTouches[0].pageY;
    let pinch_initial_b_x = event.targetTouches[1].pageX;
    let pinch_initial_b_y = event.targetTouches[1].pageY;

    initial_d = distance(
      pinch_initial_a_x,
      pinch_initial_a_y,
      pinch_initial_b_x,
      pinch_initial_b_y
    );

    old_pinch_center_x = (pinch_initial_a_x + pinch_initial_b_x) / 2.0;
    old_pinch_center_y = (pinch_initial_a_y + pinch_initial_b_y) / 2.0;

    drag_started = false;
    pinch_started = true;
    return true;
  }

  if (
    event.pageX === undefined &&
    $.isTouchCapable() &&
    event.targetTouches.length == 1
  ) {
    event.pageX = event.targetTouches[0].pageX;
    event.pageY = event.targetTouches[0].pageY;
  }

  if (zoom_level <= MIN_ZOOM_LEVEL) {
    drag_started = false;
    return true;
  }

  drag_started = true;
  last_mouse_x = event.pageX;
  last_mouse_y = event.pageY;
}

function endMapDrag(event) {
  event.preventDefault();
  drag_started = false;

  if ($.isTouchCapable() && event.targetTouches.length == 1) {
    drag_started = true;
    last_mouse_x = event.targetTouches[0].pageX;
    last_mouse_y = event.targetTouches[0].pageY;

    return true;
  }
  drag_started = false;
}

function pinchOut(event) {
  let pinch_a_x = event.targetTouches[0].pageX;
  let pinch_a_y = event.targetTouches[0].pageY;
  let pinch_b_x = event.targetTouches[1].pageX;
  let pinch_b_y = event.targetTouches[1].pageY;

  let new_pinch_center_x = (pinch_a_x + pinch_b_x) / 2.0;
  let new_pinch_center_y = (pinch_a_y + pinch_b_y) / 2.0;

  let $map = $("#map");
  let $container = $(".map").first();
  let container_width = $container.width();
  let container_height = Math.min(
    $container.height(),
    (container_width * original_height) / original_width
  );
  let old_width = $map.width();
  let old_height = $map.height();

  let current_d = distance(pinch_a_x, pinch_a_y, pinch_b_x, pinch_b_y);
  let k = current_d / initial_d;
  let new_width = old_width * k;
  let max_width = ($container.width() * MAX_ZOOM_LEVEL) / 100;
  let min_width = ($container.width() * MIN_ZOOM_LEVEL) / 100;

  if (new_width > max_width) {
    new_width = max_width;
    k = new_width / old_width;
  } else if (new_width < min_width) {
    new_width = min_width;
    k = new_width / old_width;
  }
  let new_height = old_height * k;

  // For maintain the pinch center in the same position (relative to .map, the user view point )
  let new_top =
    (1 - k) * (old_pinch_center_y - $container.offset().top) +
    k * $map.position().top;
  let new_left =
    (1 - k) * (old_pinch_center_x - $container.offset().left) +
    k * $map.position().left;

  let left_delta = new_pinch_center_x - old_pinch_center_x;
  let top_delta = new_pinch_center_y - old_pinch_center_y;
  old_pinch_center_x = new_pinch_center_x;
  old_pinch_center_y = new_pinch_center_y;

  //The user can move the map while making pinch
  new_top += top_delta;
  new_left += left_delta;
  if (new_top > 0) {
    new_top = 0;
  }
  if (new_top + new_height < container_height) {
    new_top = container_height - new_height;
  }
  if (new_left > 0) {
    new_left = 0;
  }
  if (new_left + new_width < container_width) {
    new_left = container_width - new_width;
  }

  $("#map").width(new_width);
  zoom_level = (new_width * 100) / container_width;
  $("#map").trigger("zoom");
  let cursor =
    zoom_level.toFixed(2) == MIN_ZOOM_LEVEL.toFixed(2) ? "default" : "move";

  $("#map").css({
    top: new_top + "px",
    left: new_left + "px",
    cursor: cursor,
  });

  initial_d = current_d;
}

function mapDrag(event) {
  event.preventDefault();
  event.stopImmediatePropagation();

  if ($.isTouchCapable() && event.targetTouches.length == 2) {
    drag_started = false;
    pinchOut(event);
    return true;
  }

  if (!drag_started) {
    return true;
  }

  if (
    event.pageX === undefined &&
    $.isTouchCapable() &&
    event.targetTouches.length == 1
  ) {
    event.pageX = event.targetTouches[0].pageX;
    event.pageY = event.targetTouches[0].pageY;
  }

  let delta_top = event.pageY - last_mouse_y;
  let delta_left = event.pageX - last_mouse_x;
  last_mouse_x = event.pageX;
  last_mouse_y = event.pageY;

  let $position = $("#map").position();
  let new_top = $position.top + delta_top;
  let new_left = $position.left + delta_left;

  let $map = $("#map");
  let $container = $(".map").first();
  let container_width = $container.width();
  let container_height = Math.min(
    $container.height(),
    (container_width * original_height) / original_width
  );

  if (new_top > 0) {
    new_top = 0;
  }
  if (new_top + $map.height() < container_height) {
    new_top = container_height - $map.height();
  }

  if (new_left > 0) {
    new_left = 0;
  }
  if (new_left + $map.width() < container_width) {
    new_left = container_width - $map.width();
  }

  let cursor =
    zoom_level.toFixed(2) == MIN_ZOOM_LEVEL.toFixed(2) ? "default" : "move";
  $("#map").css({
    top: new_top + "px",
    left: new_left + "px",
    cursor: cursor,
  });
}

function changeOrientation() {
  setMapPosition();
  resizeMap();
}

$(function () {
  zoom_level = 100;
  original_width = $("#map").prop("naturalWidth");
  original_height = $("#map").prop("naturalHeight");
  let $position = $("#map").position();
  top = $position.top;
  left = $position.left;
  is_mobile = isMobile();

  $("#map").css({
    position: "relative",
    left: 0,
    top: 0,
    cursor: "default",
  });

  $(".plus").on("click", zoomIn);
  $(".minus").on("click", zoomOut);
  $(window).resize(resizeMap);

  $("#map").on("tapstart", initMapDrag);
  $("#map").on("tapmove", mapDrag);
  $("#map").on("tapend", endMapDrag);
  $("area.icon").on("mouseenter", endMapDrag);
  $(window).on("orientationchange", changeOrientation);
  /*
    $('#map').bind('mousewheel', function(e){
        if(e.originalEvent.wheelDelta /120 > 0) {
            zoomIn();
        }
        else{
            zoomOut();
        }
    });

 */
});
