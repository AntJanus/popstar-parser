/*jshint multistr: true */
var should = require('should');
var Parser = require('../lib/parser');
var parser = new Parser();

var fileString = 'title: Something \r\n\ -----\r\n\ content: something else.';

var fileStringArray = 'title: Something \r\n\ -----\r\n\ myarray[]: first element. \r\n\ -----\r\n\ myarray[]: second element.';

var varString = 'title: Something';

//splitting string
describe('Parser', function(){
  describe('parseVariable', function() {
    it('should have name=title and content=Something', function(done) {
      var parsedString = parser.parseVariable(varString);
      parsedString.should.have.property('name', 'title');
      parsedString.should.have.property('content', 'Something');
      done();
    });
  });

  describe('parseFile', function() {
    it('should have title and content keys', function(done) {
      var parsedFile = parser.parseFile(fileString);
      parsedFile.should.have.keys('title', 'content');
      done();
    });
  });

  describe('parseArray', function() {
    it('should pass back an array of values', function(done) {
      var parsedFile = parser.parseFile(fileStringArray);
      parsedFile.should.have.keys('title', 'myarray');
      parsedFile.myarray.should.have.lengthOf(2);
      done();
    });
  });

  describe('options', function() {
    it('should return existing options', function(done) {
      var testParser = new Parser();
      var opts = testParser.options();

      opts.should.eql({
        split: /-{3,}(\r\n|\r|\n)/g,
        varSplit: /^(\w+)(\[\])?:/,
        arraySplit: /\[\]/
      });

      done();
    });

    it('should extend existing options', function(done) {
      var testParser = new Parser();
      var opts = testParser.options();

      opts.should.eql({
        split: /-{3,}(\r\n|\r|\n)/g,
        varSplit: /^(\w+)(\[\])?:/,
        arraySplit: /\[\]/
      });

      var newOpts = {
        split: /,/g,
        test: 1
      };

      testParser.options(newOpts);
      opts = testParser.options();

      opts.should.eql({
        split: /,/g,
        varSplit: /^(\w+)(\[\])?:/,
        arraySplit: /\[\]/,
        test: 1
      });

      done();
    });
  });
});
