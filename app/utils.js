module.exports = (function assignTitleCase() {
  // eslint-disable-next-line no-extend-native
  String.prototype.toTitleCase =
    String.prototype.toTitleCase ||
    function toTitleCase() {
      return this.replace(
        /\b\S*/g,
        t => t.charAt(0).toUpperCase() + t.slice(1)
      );
    };
})();
