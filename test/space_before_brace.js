var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../src/linter');
    var spaceBeforeBrace = require('../src/linters/space_before_brace');

    describe('#spaceBeforeBrace()', function () {
        it('should not tolerate missing space', function () {
            var source = '.foo{ color: red; }';
            var ast;
            var config = {
                spaceBeforeBrace: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.equal(1, spaceBeforeBrace(ast, config));
        });

        it('should allow one space', function () {
            var source = '.foo { color: red; }';
            var ast;
            var config = {
                spaceBeforeBrace: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.equal(0, spaceBeforeBrace(ast, config));
        });

        it('should handle multiple simple selectors', function () {
            var source = '.foo, .bar { color: red; }';
            var ast;
            var config = {
                spaceBeforeBrace: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.equal(0, spaceBeforeBrace(ast, config));
        });

        it('should fail with multiple simple selectors and no space', function () {
            var source = '.foo, .bar{ color: red; }';
            var ast;
            var config = {
                spaceBeforeBrace: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.equal(1, spaceBeforeBrace(ast, config));
        });

        it('should return null run when disabled', function () {
            var source = '.foo{ color: red; }';
            var ast;
            var config = {
                spaceBeforeBrace: {
                    enabled: false
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.equal(null, spaceBeforeBrace(ast, config));
        });
    });
});
