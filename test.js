var test = require('tape');
var board = require('n-board');
var access = require('./index');

// Access should consume a 2d array and provide set and access methods.

test('should return null if no board is provided on construction', function(t) {
	t.equal(access(), null);
	t.end();
});

test('should not be null if a board is provided on construction', function(t) {
	var wrapped = access(board(1));
	t.notEqual(Object.prototype.toString.call(wrapped), '[object Null]');
	t.end();
});

test('should return wrapped board when value() is called', function(t) {
	var b = board(2);
	var wrapped = access(b);
	t.deepEqual(wrapped.value(), [[undefined, undefined],[undefined, undefined]]);
	t.end();
});

test('should return specific cell value when get(x, y) is called', function(t) {
	var wrapped = access(board(2, 1));
	var value = wrapped.get(0, 0);
	t.equal(value, 1);
	t.end();
});

test('should return specific cell value when get(x, y) is called', function(t) {
	var wrapped = access(board(2, 2));
	var value = wrapped.get(0, 0);
	t.equal(value, 2);
	t.end();
});

test('should return specific cell value when get(x, y) is called', function(t) {
	var wrapped = access(board(2, function(i, j) { return i + j; }));
	var value = wrapped.get(0, 1);
	t.equal(value, 1);
	t.end();
});

test('should change specific cell to value passed when set(x, y, v) is called', function(t) {
	var wrapped = access(board(2));
	wrapped.set(0, 1, 'hello');
	var value = wrapped.get(0, 1);
	t.equal(value, 'hello');
	t.end();
});

// 2d map functionality.
test('should map function over all cells of the board when map(fn) is called', function(t) {
	var wrapped = access(board(2));
	wrapped.map(function(x, y) {
		return x + y;
	});
	var value = wrapped.get(0, 1);
	t.equal(value, 1);
	t.end();
});
