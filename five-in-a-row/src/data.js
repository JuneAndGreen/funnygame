module.exports = (function() {
	window.cache = window.cache || {};
	window.cache.data = window.cache.data || {};
	// 棋盘
	window.cache.table = document.querySelector('#canvas').getContext('2d'); 
	// 15*15的二维数组用来保存棋盘信息，0为无子，1为黑子，2为白子
	window.cache.chessValue = new Array(15);
	for(var i=0; i<15; i++) {
		window.cache.chessValue[i] = new Array(15);
		for(var j=0; j<15; j++) {
			window.cache.chessValue[i][j] = 0;
		}
	}
	// 15*15的二维数组用来存储AI选择下子位置的价值缓冲区
	window.cache.money = new Array(15);
	for(var i=0; i<15; i++) {
		window.cache.money[i] = new Array(15);
		for(var j=0; j<15; j++) {
			window.cache.money[i][j] = 0;
		}
	}
	// 15*15的二维数组用来存储AI选择下子位置的价值缓冲区
	window.cache.bm = new Array(15);
	for(var i=0; i<15; i++) {
		window.cache.bm[i] = new Array(15);
		for(var j=0; j<15; j++) {
			window.cache.bm[i][j] = 0;
		}
	}
	window.cache.bm2 = new Array(15);
	for(var i=0; i<15; i++) {
		window.cache.bm2[i] = new Array(15);
		for(var j=0; j<15; j++) {
			window.cache.bm2[i][j] = 0;
		}
	}
	// 棋子图片
	window.cache.black = new Image();
	window.cache.white = new Image();
	window.cache.black.src = 'image/black.png';
	window.cache.white.src = 'image/white.png';

	window.cache.iswin = 0; // 0表示棋局未结束，1表示棋局结束
	window.cache.isblack = true; // 是否轮到黑子（玩家）下子
})();