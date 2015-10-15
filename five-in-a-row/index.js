/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var draw = __webpack_require__(1);
	var judge = __webpack_require__(2);

	draw.paintTable();
	document.querySelector('#canvas').onmousedown = function(event) {
	  event = event || window.event;
	  window.cache = window.cache || {};
	  var data = window.cache.data;

	  // var chessValue = data.chessValue;
	  // var money = data.money;
	  var x=parseInt((event.clientX-20)/40);
	  var y=parseInt((event.clientY-20)/40);
	  var winjudge;

	  if(!data.isblack) return; // 如果不是轮到黑子下则返回
	  else {
	    if(chessValue[x][y]) {
	      // 这里已经有棋子
	      alert("此处不能落子！");
	      return;
	    } else {
	      // chessValue[x][y] = 1; // 下黑子
	      // data.isblack = false;
	      drawChess(1, x, y); // 画棋子
	      // 判断输赢
	      // winjudge = judge(1, x, y);
	      // if(winjudge === 1) { 
	      //   data.iswin = 1;
	      //   alert("黑子赢!");
	      // } else if(winjudge === 3) {
	      //   data.iswin = 1;
	      //   alert("平局！");
	      // }
	      // //已下子的位置权值设为-1
	      // money[x][y] = -1;
	      
	      // for(var i =1;i<=4;i++)
	      // {
	      //   if(x-i>=0&&x-i<=14&&y>=0&&y<=14)
	      //   {
	      //     bm[x-i][y]=drawMoney(x-i,y);
	      //   }
	      //   if(x+i>=0&&x+i<=14&&y>=0&&y<=14)
	      //   {
	      //     bm[x+i][y]=drawMoney(x+i,y);
	      //   }
	      //   if(x>=0&&x<=14&&y-i>=0&&y-i<=14)
	      //   {
	      //     bm[x][y-i]=drawMoney(x,y-i);
	      //   }
	      //   if(x>=0&&x<=14&&y+i>=0&&y+i<=14)
	      //   {
	      //     bm[x][y+i]=drawMoney(x,y+i);
	      //   }
	      //   if(x-i>=0&&x-i<=14&&y-i>=0&&y-i<=14)
	      //   {
	      //     bm[x-i][y-i]=drawMoney(x-i,y-i);
	      //   }
	      //   if(x+i>=0&&x+i<=14&&y+i>=0&&y+i<=14)
	      //   {
	      //     bm[x+i][y+i]=drawMoney(x+i,y+i);
	      //   }
	      //   if(x-i>=0&&x-i<=14&&y+i>=0&&y+i<=14)
	      //   {
	      //     bm[x-i][y+i]=drawMoney(x-i,y+i);
	      //   }
	      //   if(x+i>=0&&x+i<=14&&y-i>=0&&y-i<=14)
	      //   {
	      //     bm[x+i][y-i]=drawMoney(x+i,y-i);
	      //   }
	      // }
	      
	      // temx = x;
	      // temy = y;
	      // chooseWhere();
	    }
	  }
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	/* 绘制棋盘和棋子 */

	var draw = {};
	window.cache = window.cache || {};

	/* 绘制棋盘 */
	draw.paintTable = (function() {
	  var drawLine = function(context, dir, i) {
	    var x,y;
	    if(dir === 'row') {
	      // 画横线
	      x = [0, 640];
	      y = [i, i];
	    } else {
	      // 画竖线
	      x = [i, i];
	      y = [0, 640];
	    }

	    context.beginPath();
	    context.lineWidth = '4';
	    context.strokeStyle = 'black';
	    context.moveTo(x[0], y[0]);
	    context.lineTo(x[1], y[1]);
	    context.closePath();
	    context.stroke();
	  };
	  return function() {
	    var context = document.querySelector('#canvas').getContext('2d');
	    window.cache.table = context;
	    
	    for(var i=0; i<=640; i+=40) {
	      drawLine(context, 'row', i);
	      drawLine(context, 'column', i);
	    }
	  }
	})();

	/* 绘制棋子 */
	/* flag为1表示黑字，flag为2表示白子 */
	draw.drawChess = function(flag, x, y) {
	  var cache = window.cache;
	  context = cache.table;

	  if(cache.isWin === 1) return; // 结束战斗
	  else {
	    if(flag === 1) {
	      // 画黑子
	      context.drawImage(black, x*40+20, y*40+20);
	    } else if(flag === 2) {
	      // 画白子
	      context.drawImage(white, x*40+20, y*40+20);
	    }
	  } 
	}

	module.exports = draw;

/***/ },
/* 2 */
/***/ function(module, exports) {

	/* 判断输赢 */
	/* flag为1表示黑字，flag为2表示白子 */
	module.exports = function(flag, x, y) {
	  window.cache = window.cache || {};
	  var data = window.cache.data;
	  var chessValue = data.chessValue;
	  var count1 = count2 = count3 = count4 = 0; //分别表示横向，竖向，正对角线，反对角线方向棋子个数
	  
	  var i = j = 0;
	  var hasBlank = false; // 是否存在空白位
	  for(i=0; i<15; i++) {
	    for(j=0; j<15; j++) {
	      if(!chessValue[i][j]) {
	        hasBlank=true;
	        break;
	      }
	    }
	    if(hasBlank) break;
	  }
	  // 平手
	  if(!hasBlank) return 3;
	  
	  // 横向
	  for(i=x; i>=0; i--) {
	    if(chessValue[i][y] === flag) count1 ++;
	    else break;
	  }
	  for(i=x+1; i<15; i++) {
	    if(chessValue[i][y] === flag) count1 ++;
	    else break;
	  }
	  // 纵向
	  for(i=y; i>=0; i--) {
	    if(chessValue[x][i] === flag) count2 ++;
	    else break;
	  }
	  for(i=y+1; i<15; i++) {
	    if(chessValue[x][i] === flag) count2 ++;
	    else break;
	  }
	  // 正对角线
	  for(i=x,j=y; i>=0&&j>=0; i--,j--) {
	    if(chessValue[i][j] === flag) count3 ++;
	    else break;
	  }
	  for(i=x+1,j=y+1; i<15&&j<15; i++,j++) {
	    if(chessValue[i][j] === flag) count3 ++;
	    else break;
	  }
	  // 反对角线
	  for(i=x,j=y; i>=0&&j<=14; i--,j++) {
	    if(chessValue[i][j] === flag) count4 ++;
	    else break;
	  }
	  for(i=x+1,j=y-1; i<=14&&j>=0; i++,j--) {
	    if(chessValue[i][j] === flag) count4 ++;
	    else break;
	  }

	  // 存在五子相连则赢
	  if(count1>=5 || count2>=5 || count3>=5 || count4>=5) { 
	    if(flag === 1) return 1; // 黑子赢
	    else if(flag === 2) return 2; // 白子赢
	  }
	  return 0;
	}

/***/ }
/******/ ]);