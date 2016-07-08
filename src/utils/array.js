Object.defineProperty(Array.prototype, 'shiftMax', {
  configurable: false,
  enumerable: false,
  writable: false,
  value: function(value, max) {
    if (this.length >= max) {
      this.splice(this.length - 1, 1);
    }
    return this.unshift(value);
  }
})
