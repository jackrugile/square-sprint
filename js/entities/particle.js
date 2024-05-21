$.particle = function (opt) {};

$.particle.prototype.init = function (opt) {
  $.merge(this, opt);
  this.drag = 0.99;
  this.life = 1;
  this.radiusBase = $.rand(0.5, 2);
  this.radius = 0;
  this.alphaBase = $.rand(0.25, 1);
  this.saturation = this.desaturated ? 0 : 90;
};

$.particle.prototype.step = function () {
  this.vx += -this.vx * (1 - Math.exp(-(1 - this.drag) * $.game.dtNorm));
  this.vy += -this.vy * (1 - Math.exp(-(1 - this.drag) * $.game.dtNorm));

  this.x += this.vx * $.game.dtNorm;
  this.y += this.vy * $.game.dtNorm;

  this.life -= this.decay * $.game.dtNorm;

  if (this.radius < this.radiusBase) {
    this.radius += 0.1 * $.game.dtNorm;
  }

  if (this.life <= 0) {
    $.game.state.particles.release(this);
  }
};

$.particle.prototype.render = function () {
  $.ctx.fillStyle(
    "hsla(" +
      this.hue +
      ", " +
      this.saturation +
      "%, 70%, " +
      this.life * this.alphaBase +
      ")"
  );
  $.ctx.fillCircle(this.x, this.y, Math.max(0, this.radius));
};
