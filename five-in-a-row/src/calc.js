var calcMoney = require('./money.js');
var judgeWin = require('./judge.js');
var draw = require('./draw.js');
var calc = {};

/* ai选择位置并落子 */
module.exports = (function() {
	var cache = window.cache;
	var chessValue = cache.chessValue;
	var bm = cache.bm;
	var bm2 = cache.bm2;
	var money = cache.money;
	/* 求棋盘最高分 */
	var calculmaxvalue = function() {
		var maxvalue = [0, 0, 0]; // 分别表示价值，坐标x，坐标y
		for(var i =0; i<15; i++)
			for(var j=0;j<15;j++)
				money[i][j] = calcMoney(i, j);

		for(var i=0; i<15; i++)
			for(var j=0; j<15; j++)
				maxvalue[0] += money[i][j];

		return maxvalue;
	}
	/* 分别表示递归终止标志，落子为谁，α值和β值 */
	var seapo = function(flag, chess, aa, bb) {
		var i = 0, j = 0;
		var flagtmp = flag;
		var chessfan;
		var score = 0;
		var buff = [-1, 0, 0];//分别表示价值，坐标x，坐标y
		var fin = [-1, 0, 0];
		var atmp = aa;
		var btmp = bb;
		
		var winjd;
		
		if(flag === 2) return calculmaxvalue();
		
		for(i=0; i<15; i++) {
			for(j=0; j<15; j++) {
				if(chessValue[i][j]) continue;
				if(chess === 1) {
					// 此时轮到黑子下
					if(bm2[i][j] === 0) continue;
					chessValue[i][j] = 1;
					buff = seapo(flagtmp+1, 2, atmp, btmp);

					if(buff[0] <= atmp) {
						// α剪枝
						chessValue[i][j] = 0;
						return buff;
					}
					if(buff[0] < btmp) {
						btmp = buff[0];
						fin[0] = buff[0];
						fin[1] = i;
						fin[2] = j;
					}
					chessValue[i][j] = 0;
				} else if(chess === 2) {
					// 此时轮到白子下
					if(bm[i][j]==0) continue;
					chessValue[i][j] = 2;
					if(bm[i][j] >= 99999 || bm[i][j] <= -50000) {
						chessValue[i][j] = 0;
						fin[0] = 99999;
						fin[1] = i;
						fin[2] = j;
						return fin
					}
					revalue(i, j);
					buff = seapo(flagtmp+1, 1, atmp, btmp);
					
					if(buff[0] > atmp) {
						atmp = buff[0];
						fin[0] = buff[0];
						fin[1] = i;
						fin[2] = j;
					}
					chessValue[i][j] = 0;
				}
			}
		}
		return fin;
	}
		
	var revalue = function(x, y) {
		for(var i=0; i<15; i++)
			for(var j=0; j<15; j++)
				bm2[i][j] = bm[i][j];
		
		for(var i=1; i<=4; i++)	{
			if(x-i>=0 && x-i<=14 && y>=0 && y<=14)
				bm2[x-i][y] = calcMoney(x-i, y);

			if(x+i>=0 && x+i<=14 && y>=0 && y<=14)
				bm2[x+i][y] = calcMoney(x+i, y);

			if(x>=0 && x<=14 && y-i>=0 && y-i<=14)
				bm2[x][y-i] = calcMoney(x, y-i);

			if(x>=0 && x<=14 && y+i>=0 && y+i<=14)
				bm2[x][y+i] = calcMoney(x, y+i);

			if(x-i>=0 && x-i<=14 && y-i>=0 && y-i<=14)
				bm2[x-i][y-i] = calcMoney(x-i, y-i);

			if(x+i>=0 && x+i<=14 && y+i>=0 && y+i<=14)
				bm2[x+i][y+i] = calcMoney(x+i, y+i);

			if(x-i>=0 && x-i<=14 && y+i>=0 && y+i<=14)
				bm2[x-i][y+i] = calcMoney(x-i, y+i);

			if(x+i>=0 && x+i<=14 && y-i>=0 && y-i<=14)
				bm2[x+i][y-i] = calcMoney(x+i, y-i);
		}
	}

	return function() {
		var value=[-1,0,0];//分别表示价值，坐标x，坐标y和距离
		var leng = 0;
		var x,y;
		var winjudge;
		
		if(cache.iswin==1) return;
		
		value = seapo(0, 2, -1000000, 1000000);
		x = value[1];
		y = value[2];
		
		cache.isblack = true;

		draw.drawChess(2, x, y);
		chessValue[x][y] = 2;

		// 判断输赢
		winjudge= judgeWin(2, x, y);
		if(winjudge==2) {
			cache.iswin = 1;
			alert("白子赢!");
		} else if(winjudge === 3) {
			cache.iswin = 1;
			alert("平局！");
		}
		money[x][y] = -1;
		
		for(var i =1; i<=4; i++) {
			if(x-i>=0 && x-i<=14 && y>=0 && y<=14)
				bm[x-i][y] = calcMoney(x-i, y);

			if(x+i>=0 && x+i<=14 && y>=0 && y<=14)
				bm[x+i][y] = calcMoney(x+i, y);

			if(x>=0 && x<=14 && y-i>=0 && y-i<=14)
				bm[x][y-i] = calcMoney(x, y-i);

			if(x>=0 && x<=14 && y+i>=0 && y+i<=14)
				bm[x][y+i] = calcMoney(x, y+i);

			if(x-i>=0 && x-i<=14 && y-i>=0 && y-i<=14)
				bm[x-i][y-i] = calcMoney(x-i, y-i);

			if(x+i>=0 && x+i<=14 && y+i>=0 && y+i<=14)
				bm[x+i][y+i] = calcMoney(x+i, y+i);

			if(x-i>=0 && x-i<=14 && y+i>=0 && y+i<=14)
				bm[x-i][y+i] = calcMoney(x-i, y+i);

			if(x+i>=0 && x+i<=14 && y-i>=0 && y-i<=14)
				bm[x+i][y-i] = calcMoney(x+i, y-i);
		}
	};
})();