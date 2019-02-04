const assert = require('assert');
require('module-alias/register');
require('@app/utils');

describe('#toTitleCase()', function() {
  it('should return a word with proper title case', function() {
    assert.equal('things'.toTitleCase(), 'Things');
  });
  it('should return a sentence with proper title case.', function() {
    assert.equal(
      'These are a few of my favorite things.'.toTitleCase(),
      'These Are A Few Of My Favorite Things.'
    );
  });
});
