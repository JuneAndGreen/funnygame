var calcMoney = require('./money.js');
var judgeWin = require('./judge.js');
var draw = require('./draw.js');
var calc = {};

/* ai选择位置并落子 */
module.exports = (function() {
	var cache = window.cache;
	var chessValue = cache.chessValue;

	/* 求棋盘最高分 */
	var calculmaxvalue = function() {
		var maxvalue = [0, 0, 0]; // 分别表示价值，坐标x，坐标y

		for(var i=0; i<15; i++)
			for(var j=0; j<15; j++)
				maxvalue[0] += calcMoney(i, j);

		return maxvalue;
	}
	/* 分别表示递归终止标志(搜索博弈树层数)，落子为谁，α值和β值 */
	/* 目前仅遍历三层，根节点（第一层） ----> AI白子下（第二层） ----> 玩家黑子下（第三层）*/
	var seapo = function(flag, chess, aa, bb) {
		var i = 0, j = 0;
		var buff; // 分别表示价值，坐标x，坐标y
		var fin = [-1, 0, 0];
		// 用于存储同层级的α和β值
		var atmp = aa;
		var btmp = bb;
		
		if(flag === 2) return calculmaxvalue(); // 到达叶子结点，计算棋盘权值
		
		for(i=0; i<15; i++) {
			for(j=0; j<15; j++) {
				if(chessValue[i][j]) continue; // 此处已有棋子
				if(chess === 1) {
					// 此时轮到黑子下

					var thisMoney = calcMoney(i, j);
					if(thisMoney === 0) continue; // 此处无价值可言

					chessValue[i][j] = 1; // 假设在此位置落黑子
					buff = seapo(flag+1, 2, atmp, btmp); // 遍历下一层
					chessValue[i][j] = 0; // 恢复为未落子的状态

					if(buff[0] <= aa) {
						// α剪枝
						return buff;
					}
					if(buff[0] < btmp) {
						// 重新设置β值
						btmp = buff[0];
						fin[0] = buff[0];
						fin[1] = i;
						fin[2] = j;
					}
				} else if(chess === 2) {
					// 此时轮到白子下

					var thisMoney = calcMoney(i, j);
					if(thisMoney === 0) continue; // 此处无价值可言
					if(thisMoney >= 99999 || thisMoney <= -50000) {
						// 当此处为必须落子的点（自己在此落子即赢或对方在此落子即输）
						fin[0] = 99999;
						fin[1] = i;
						fin[2] = j;
						return fin
					}

					chessValue[i][j] = 2; // 假设在此位置落白子
					buff = seapo(flag+1, 1, atmp, btmp); // 遍历下一层
					chessValue[i][j] = 0; // 恢复为未落子的状态
					
					if(buff[0] >= bb) {
						// β剪枝
						return buff;
					}
					if(buff[0] > atmp) {
						// 重新设置α值
						atmp = buff[0];
						fin[0] = buff[0];
						fin[1] = i;
						fin[2] = j;
					}
				}
			}
		}
		return fin;
	}

	return function() {
		var value=[-1,0,0]; // 分别表示价值，坐标x，坐标y和距离
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
	};
})();