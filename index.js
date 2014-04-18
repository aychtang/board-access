var accessWrapper = function(board) {
	this.board = board;
};

var constructAccess = function(board) {
	if (!board) { return null; }
	return new accessWrapper(board);
};

accessWrapper.prototype.value = function() {
	return this.board;
};

accessWrapper.prototype.get = function(x, y) {
	return this.board[x][y];
};

accessWrapper.prototype.set = function(x, y, value) {
	if (!this.board[x][y] && this.board[x][y] != undefined) return false;
	if (this.board[x][y] !== value) {
		this.board[x][y] = value;
	}
};

accessWrapper.prototype.map = function(fn) {
	var size = this.board.length;
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			this.board[i][j] = fn(i, j);
		}
	}
};

module.exports = constructAccess;
