/*==============================================================================

Math

==============================================================================*/

$.rand = function (min, max) {
  return Math.random() * (max - min) + min;
};

$.randInt = function (min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
};

/*==============================================================================

Collision

==============================================================================*/

$.distance = function (p1x, p1y, p2x, p2y) {
  var dx = p1x - p2x,
    dy = p1y - p2y;
  return Math.sqrt(dx * dx + dy * dy);
};

// credit: Keith Peters - https://github.com/bit101/CodingMath
$.inRange = function (value, min, max) {
  return value >= Math.min(min, max) && value <= Math.max(min, max);
};

// credit: Keith Peters - https://github.com/bit101/CodingMath
$.rangeIntersect = function (min0, max0, min1, max1) {
  return (
    Math.max(min0, max0) >= Math.min(min1, max1) &&
    Math.min(min0, max0) <= Math.max(min1, max1)
  );
};

// credit: Keith Peters - https://github.com/bit101/CodingMath
$.collide = function (r0, r1) {
  return (
    $.rangeIntersect(r0.x, r0.x + r0.w, r1.x, r1.x + r1.w) &&
    $.rangeIntersect(r0.y, r0.y + r0.h, r1.y, r1.y + r1.h)
  );
};

// credit: Keith Peters - https://github.com/bit101/CodingMath
$.pointInRect = function (px, py, rx, ry, rw, rh) {
  return $.inRange(px, rx, rx + rw) && $.inRange(py, ry, ry + rh);
};

// credit: Keith Peters - https://github.com/bit101/CodingMath
$.segmentIntersect = function (p0, p1, p2, p3) {
  var A1 = p1.y - p0.y,
    B1 = p0.x - p1.x,
    C1 = A1 * p0.x + B1 * p0.y,
    A2 = p3.y - p2.y,
    B2 = p2.x - p3.x,
    C2 = A2 * p2.x + B2 * p2.y,
    denominator = A1 * B2 - A2 * B1;

  if (denominator == 0) {
    return null;
  }

  var intersectX = (B2 * C1 - B1 * C2) / denominator,
    intersectY = (A1 * C2 - A2 * C1) / denominator,
    rx0 = (intersectX - p0.x) / (p1.x - p0.x),
    ry0 = (intersectY - p0.y) / (p1.y - p0.y),
    rx1 = (intersectX - p2.x) / (p3.x - p2.x),
    ry1 = (intersectY - p2.y) / (p3.y - p2.y);

  if (
    ((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)) &&
    ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))
  ) {
    return {
      x: intersectX,
      y: intersectY,
    };
  } else {
    return null;
  }
};

/*==============================================================================
Formatting
==============================================================================*/

$.formatCommas = function (n) {
  n = Math.round(n);
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

$.pad = function (amount, digits) {
  amount += "";
  if (amount.length < digits) {
    amount = "0" + amount;
    return $.pad(amount, digits);
  } else {
    return amount;
  }
};

$.msToString = function (ms) {
  var x = ms / 1000;
  var seconds = parseInt(x % 60);
  x /= 60;
  var minutes = parseInt(x % 60);
  x /= 60;
  var hours = parseInt(x % 24);

  if (hours < 1) {
    return $.pad(minutes, 2) + ":" + $.pad(seconds, 2);
  } else {
    return $.pad(hours, 2) + ":" + $.pad(minutes, 2) + ":" + $.pad(seconds, 2);
  }
};

/*==============================================================================
Miscellaneous
==============================================================================*/

$.isString = function (variable) {
  return typeof variable === "string";
};

$.isObject = function (variable) {
  return typeof variable === "object";
};

$.isSet = function (prop) {
  return typeof prop != "undefined";
};

$.isObjEmpty = function (obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
};

$.merge = function (obj1, obj2) {
  for (var prop in obj2) {
    obj1[prop] = obj2[prop];
  }
};
