module.exports = (function() {
  // eslint-disable no-extend-native
  String.prototype.toTitleCase =
    String.prototype.toTitleCase ||
    function toTitleCase() {
      return this.replace(
        /\b\S*/g,
        t => t.charAt(0).toUpperCase() + t.slice(1)
      );
    };
  // eslint-enable no-extend-native
})();
