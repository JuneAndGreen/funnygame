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

	var initData = __webpack_require__(1);
	var draw = __webpack_require__(2);
	var judge = __webpack_require__(3);
	var chooseWhere = __webpack_require__(4);

	draw.paintTable();
	(function() {
	  // 此处是为了获取棋盘居中时的偏移量
	  var canvas = window.cache.canvas;
	  window.cache.offsetX = canvas.offsetLeft - (canvas.clientWidth/2);
	})();

	window.cache.canvas.onmousedown = function(event) {
	  event = event || window.event;

	  var cache = window.cache;
	  var chessValue = cache.chessValue;

	  var x=parseInt((event.pageX - 20 - cache.offsetX)/40);
	  var y=parseInt((event.pageY - 20)/40);
	  var winjudge;

	  if(!cache.isblack) return; // 如果不是轮到黑子下则返回
	  else {
	    if(chessValue[x][y]) {
	      // 这里已经有棋子
	      alert("此处不能落子！");
	      return;
	    } else {
	      chessValue[x][y] = 1; // 下黑子
	      cache.isblack = false;
	      draw.drawChess(1, x, y); // 画棋子

	      // 判断输赢
	      winjudge = judge(1, x, y);
	      if(winjudge === 1) { 
	        cache.iswin = 1;
	        alert("黑子赢!");
	      } else if(winjudge === 3) {
	        cache.iswin = 1;
	        alert("平局！");
	      }
	      
	      chooseWhere();
	    }
	  }
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = (function() {
		window.cache = window.cache || {};
		window.cache.data = window.cache.data || {};
		// 棋盘
		window.cache.canvas = document.querySelector('#canvas');
		window.cache.table = window.cache.canvas.getContext('2d'); 
		// 15*15的二维数组用来保存棋盘信息，0为无子，1为黑子，2为白子
		window.cache.chessValue = new Array(15);
		for(var i=0; i<15; i++) {
			window.cache.chessValue[i] = new Array(15);
			for(var j=0; j<15; j++) {
				window.cache.chessValue[i][j] = 0;
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	/* 绘制棋盘和棋子 */

	var draw = {};

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
	    var context = window.cache.table;
	    
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
	  var context = cache.table;
	  var iswin = cache.iswin;

	  if(iswin === 1) return; // 结束战斗
	  else {
	    if(flag === 1) {
	      // 画黑子
	      context.drawImage(cache.black, x*40+20, y*40+20);
	    } else if(flag === 2) {
	      // 画白子
	      context.drawImage(cache.white, x*40+20, y*40+20);
	    }
	  } 
	}

	module.exports = draw;

/***/ },
/* 3 */
/***/ function(module, exports) {

	/* 判断输赢 */
	/* flag为1表示黑字，flag为2表示白子 */
	module.exports = function(flag, x, y) {
	  var chessValue = window.cache.chessValue;
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
	  for(i=x,j=y; i>=0 && j>=0; i--,j--) {
	    if(chessValue[i][j] === flag) count3 ++;
	    else break;
	  }
	  for(i=x+1,j=y+1; i<15 && j<15; i++,j++) {
	    if(chessValue[i][j] === flag) count3 ++;
	    else break;
	  }
	  // 反对角线
	  for(i=x,j=y; i>=0 && j<=14; i--,j++) {
	    if(chessValue[i][j] === flag) count4 ++;
	    else break;
	  }
	  for(i=x+1,j=y-1; i<=14 && j>=0; i++,j--) {
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var calcMoney = __webpack_require__(5);
	var judgeWin = __webpack_require__(3);
	var draw = __webpack_require__(2);
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

/***/ },
/* 5 */
/***/ function(module, exports) {

	/* 给棋盘坐标x，y的位置赋值，作为ai下子的参考,flag为1表示刚下黑子，flag为2表示刚下白子 */
	module.exports = function(x, y) {
		var chessValue = window.cache.chessValue;
		var value = 0;
		var b1 = b2 = b3 = b4 = 1; // 分别表示横向，竖向，正对角线，反对角线方向黑子个数
		var w1 = w2 = w3 = w4 = 1; // 分别表示横向，竖向，正对角线，反对角线方向白子个数
		
		// 分别表示横向，竖向，正对角线，反对角线的阵型，其中1表示冲二，2表示活二，3表示冲三，4表示活三，5表示冲四，6表示活四
		var black = [0, 0, 0, 0]; 
		var white = [0, 0, 0, 0];

		// 表示此处是否处于边界附近
		var bupwall = false;
		var bdownwall = false;
		var wupwall = false;
		var wdownwall = false; 

		if(x<0 || y<0 || x>14 || y>14) return -1; // 如果此处位于棋盘上边沿之外或左边沿之外，则返回

		if(chessValue[x][y]) return -1; // 如果此处已经下过子，则返回
		
		/*******************横向判断*******************/
		bupwall = false;
		bdownwall = false;
		wupwall = false;
		wdownwall = false;
		/* -----左边----- */
		if(x === 0) {
			bupwall = true;
			wupwall = true;
		}	else if(x >= 1) {
			// 判断横向白子数量
			for(var i=x-1; i>=0; i--) {
				if(i < x-4) break;
				if(chessValue[i][y] === 2) {
					// 如果是白子
					w1 ++;
					if(i === 0) {
						// 如果处于边界
						wupwall = true;
						break;
					}
				} else if(chessValue[i][y]==1) {
					// 如果是黑子
					wupwall = true
					break;
				} else 
					break;
			}
			// 判断横向黑子数量
			for(var i=x-1; i>=0; i--) {
				if(i < x-4) break;
				if(chessValue[i][y] === 1) {
					// 如果是黑子
					b1 ++;
					if(i === 0) {
						// 如果处于边界
						bupwall = true;
						break;
					}
				} else if(chessValue[i][y] === 2) {
					// 如果是白子
					bupwall = true
					break;
				} else 
					break;
			}
		}

		/* -----右边----- */
		if(x === 14) {
			bdownwall = true;
			wdownwall = true;
		} else if(x <= 13) {
			// 判断横向白子数量
			for(var i=x+1; i<=14; i++) {
				if(i > x+4) break;
				if(chessValue[i][y] === 2) {
					// 如果是白子
					w1 ++;
					if(i === 14) {
						//如果处于边界
						wdownwall = true;
						break;
					}
				}	else if(chessValue[i][y] === 1) {
					// 如果是黑子
					wdownwall = true
					break;
				} else
					break;
			}
			// 判断横向黑子数量
			for(var i=x+1; i<=14; i++) {
				if(i > x+4) break;
				if(chessValue[i][y] === 1) {
					// 如果是黑子
					b1 ++;
					if(i === 14) {
						// 如果处于边界
						bdownwall = true;
						break;
					}
				}	else if(chessValue[i][y] === 2) {
					// 如果是白子
					bdownwall = true
					break;
				}	else
					break;
			}
		}
		// 判断白子棋阵
		if(!wupwall && !wdownwall) {
			// 活棋
			if(w1 === 2) white[0] = 2;
			else if(w1 === 3) white[0] = 4;
			else if(w1 === 4)	white[0] = 6;
			else if(w1 === 5) {
				value = 99999;
				return value;
			}
		}	else if(wupwall && !wdownwall || !wupwall && wdownwall) {
			// 冲棋
			if(w1 === 2) white[0] = 1;
			else if(w1 === 3) white[0] = 3;
			else if(w1 === 4) white[0] = 5;
			else if(w1 === 5) {
				value = 99999;
				return value;
			}
		}	else {
			if(w1 === 5) {
				value = 99999;
				return value;
			}
		}
		// 判断黑子棋阵
		if(!bupwall && !bdownwall) {
			// 活棋
			if(b1 === 2) black[0] = 2;
			else if(b1 === 3) black[0] = 4;
			else if(b1 === 4)	black[0] = 6;
			else if(b1 === 5) {
				value = -50000;
				return value;
			}
		} else if(bupwall && !bdownwall || !bupwall && bdownwall) {
			// 冲棋
			if(b1 === 2) black[0] = 1;
			else if(b1 === 3) black[0] = 3;
			else if(b1 === 4) black[0] = 5;
			else if(b1 === 5)	{
				value = -50000;
				return value;
			}
		} else {
			if(b1 === 5) {
				value = -50000;
				return value;
			}
		}

		/*******************竖向判断*******************/
		bupwall = false;
		bdownwall = false;
		wupwall = false;
		wdownwall = false;
		/* -----上边----- */
		if(y === 0) {
			bupwall = true;
			wupwall = true;
		} else if(y >= 1)	{
			// 判断白子数量
			for(var i=y-1; i>=0; i--) {
				if(i < y-4) break;
				if(chessValue[x][i] === 2) {
					// 如果是白子
					w2 ++;
					if(i === 0) {
						// 如果处于边界
						wupwall = true;
						break;
					}
				}	else if(chessValue[x][i] === 1) {
					// 如果是黑子
					wupwall = true;
					break;
				} else
					break;
			}
			// 判断黑子数量
			for(var i=y-1; i>=0; i--) {
				if(i < y-4) break;
				if(chessValue[x][i] === 1) {
					// 如果是黑子
					b2 ++;
					if(i === 0) {
						// 如果处于边界
						bupwall = true;
						break;
					}
				}	else if(chessValue[x][i] === 2) {
					// 如果是白子
					bupwall = true
					break;
				} else 
					break;
			}
		}
		/* -----下边----- */
		if(y === 14)	{
			bdownwall = true;
			wdownwall = true;
		}	else if(y<=13) {
			// 判断白子数量
			for(var i=y+1; i<=14; i++) {
				if(i > y+4) break;
				if(chessValue[x][i] === 2) {
					// 如果是白子
					w2 ++;
					if(i === 14) {
						// 如果处于边界
						wdownwall = true;
						break;
					}
				}	else if(chessValue[x][i] === 1) {
					// 如果是黑子
					wdownwall = true
					break;
				} else
					break;
			}
			// 判断黑子数量
			for(var i=y+1; i<=14; i++) {
				if(i > y+4) break;
				if(chessValue[x][i] === 1) {
					// 如果是黑子
					b2 ++;
					if(i === 14) {
						// 如果处于边界
						bdownwall = true;
						break;
					}
				} else if(chessValue[x][i] === 2) {
					// 如果是白子
					bdownwall = true
					break;
				} else
					break;
			}
		}
		// 判断白子棋阵
		if(!wupwall && !wdownwall) {
			// 活棋
			if(w2 === 2) white[1] = 2;
			else if(w2 === 3) white[1] = 4;
			else if(w2 === 4) white[1] = 6;
			else if(w2 === 5) {
				value = 99999;
				return value;
			}
		} else if(wupwall && !wdownwall || !wupwall && wdownwall) {
			// 冲棋
			if(w2 === 2)	white[1] = 1;
			else if(w2 === 3) white[1] = 3;
			else if(w2 === 4) white[1] = 5;
			else if(w2 === 5) {
				value = 99999;
				return value;
			}
		} else {
			if(w2 === 5) {
				value = 99999;
				return value;
			}
		}
		// 判断黑子棋阵
		if(!bupwall && !bdownwall) {
			// 活棋
			if(b2 === 2) black[1] = 2;
			else if(b2 === 3) black[1] = 4;
			else if(b2 === 4) black[1] = 6;
			else if(b2 === 5) {
				value = -50000;
				return value;
			}
		}	else if(bupwall && !bdownwall || !bupwall && bdownwall) {
			// 冲棋
			if(b2 === 2) black[1] = 1;
			else if(b2 === 3) black[1] = 3;
			else if(b2 === 4) black[1] = 5;
			else if(b2 === 5) {
				value = -50000;
				return value;
			}
		} else {
			if(b2 === 5) {
				value = -50000;
				return value;
			}
		}
		
		/*******************正对角线判断*******************/
		bupwall = false;
		bdownwall = false;
		wupwall = false;
		wdownwall = false;
		/* -----左上边----- */
		if(y === 0 || x === 0) {
			bupwall = true;
			wupwall = true;
		} else if(x>=1 && y>=1) {
			// 判断白子数量
			for(var i=x-1,j=y-1; i>=0&&j>=0; i--,j--) {
				if(i < x-4) break;
				if(chessValue[i][j] === 2) {
					// 如果是白子
					w3 ++;
					if(i === 0 || j === 0) {
						// 如果处于边界
						wupwall = true;
						break;
					}
				} else if(chessValue[i][j] === 1) {
					// 如果是黑子
					wupwall = true
					break;
				} else
					break;
			}
			// 判断黑子数量
			for(var i=x-1,j=y-1; i>=0&&j>=0; i--,j--) {
				if(i < x-4) break;
				if(chessValue[i][j] === 1) {
					// 如果是黑子
					b3 ++;
					if(i === 0 || j === 0) {
						// 如果处于边界
						bupwall = true;
						break;
					}
				} else if(chessValue[i][j] === 2) {
					// 如果是白子
					bupwall = true
					break;
				} else
					break;
			}
		}
		/* -----右下边----- */
		if(y === 14 || x === 14) {
			bdownwall = true;
			wdownwall = true;
		}	else if(y<=13 && x<=13)	{
			// 判断白子数量
			for(var i=x+1,j=y+1; i<=14&&j<=14; i++,j++) {
				if(i > x+4) break;
				if(chessValue[i][j] === 2) {
					// 如果是白子
					w3 ++;
					if(i === 14 || j === 14) {
						// 如果处于边界
						wdownwall = true;
						break;
					}
				} else if(chessValue[i][j] === 1) {
					// 如果是黑子
					wdownwall = true
					break;
				}	else
					break;
			}
			// 判断黑子数量
			for(var i=x+1,j=y+1; i<=14&&j<=14; i++,j++) {
				if(i > x+4) break;
				if(chessValue[i][j] === 1) {
					// 如果是黑子
					b3 ++;
					if(i === 14 || j === 14) {
						// 如果处于边界
						bdownwall = true;
						break;
					}
				}	else if(chessValue[i][j] === 2) {
					// 如果是白子
					bdownwall = true
					break;
				} else
					break;
			}
		}
		// 判断白子棋阵
		if(!wupwall && !wdownwall) {
			// 活棋
			if(w3 === 2) white[2] = 2;
			else if(w3 === 3) white[2] = 4;
			else if(w3 === 4) white[2] = 6;
			else if(w3 === 5) {
				value = 99999;
				return value;
			}
		} else if(wupwall && !wdownwall || !wupwall && wdownwall) {
			// 冲棋
			if(w3 === 2) white[2] = 1;
			else if(w3 === 3) white[2] = 3;
			else if(w3 === 4) white[2] = 5;
			else if(w3 === 5) {
				value = 99999;
				return value;
			}
		}	else {
			if(w3 === 5) {
				value = 99999;
				return value;
			}
		}
		// 判断黑子棋阵
		if(!bupwall && !bdownwall) {
			// 活棋
			if(b3 === 2) black[2] = 2;
			else if(b3 === 3) black[2] = 4;
			else if(b3 === 4) black[2] = 6;
			else if(b3 === 5) {
				value = -50000;
				return value;
			}
		}	else if(bupwall && !bdownwall || !bupwall && bdownwall) {
		  // 冲棋
			if(b3 === 2) black[2] = 1;
			else if(b3 === 3) black[2] = 3;
			else if(b3 === 4) black[2] = 5;
			else if(b3 === 5) {
				value = -50000;
				return value;
			}
		}	else {
			if(b3 === 5)
			{
				value = -50000;
				return value;
			}
		}
		
		/*******************反对角线判断*******************/
		bupwall = false;
		bdownwall = false;
		wupwall = false;
		wdownwall = false;
		/* -----右上边----- */
		if(y === 0 || x === 14) {
			bupwall = true;
			wupwall = true;
		}	else if(x<=13 && y>=1) {
			// 判断白子数量
			for(var i=x+1,j=y-1; i<=14&&j>=0; i++,j--) {
				if(i > x+4) break;
				if(chessValue[i][j] === 2) {
					// 如果是白子
					w4 ++;
					if(i === 14 || j === 0) {
						// 如果处于边界
						wupwall = true;
						break;
					}
				} else if(chessValue[i][j] === 0) {
					// 如果是无子
					if(i === 14 || j === 0) {
					  // 如果处于边界
						wupwall = true;
						break;
					} else
						break;
				}	else if(chessValue[i][j] === 1) {
					// 如果是黑子
					wupwall = true
					break;
				}
			}
			// 判断黑子数量
			for(var i=x+1,j=y-1; i<=14&&j>=0; i++,j--) {
				if(i > x+4) break;
				if(chessValue[i][j] === 1) {
					// 如果是黑子
					b4 ++;
					if(i === 14 || j === 0) {
						// 如果处于边界
						bupwall = true;
						break;
					}
				}	else if(chessValue[i][j] === 0) {
					// 如果是无子
					if(i === 14 || j === 0) {
						// 如果处于边界
						bupwall = true;
						break;
					} else 
						break;
				} else if(chessValue[i][j] === 2) {
					// 如果是白子
					bupwall = true
					break;
				}
			}
		}
		/* -----左下边----- */
		if(y === 14 || x === 0) {
			bdownwall = true;
			wdownwall = true;
		} else if(y<=13 && x>=1) {
			// 判断白子数量
			for(var i=x-1,j=y+1; i>=1&&j<=14; i--,j++) {
				if(i < x-4) break;
				if(chessValue[i][j] === 2) {
					// 如果是白子
					w4 ++;
					if(i === 0 || j === 14) {
						// 如果处于边界
						wdownwall = true;
						break;
					}
				} else if(chessValue[i][j] === 0) {
					// 如果是无子
					if(i === 0 || j === 14) {
						// 如果处于边界
						wdownwall = true;
						break;
					}	else
						break;
				} else if(chessValue[i][j] === 1) {
					// 如果是黑子
					wdownwall = true
					break;
				}
			}
			// 判断黑子数量
			for(var i=x-1,j=y+1; i>=1&&j<=14; i--,j++) {
				if(i < x-4) break;
				if(chessValue[i][j] === 1) {
					// 如果是黑子
					b4 ++;
					if(i === 0 || j === 14) {
						// 如果处于边界
						bdownwall = true;
						break;
					}
				} else if(chessValue[i][j] === 0) {
					// 如果是无子
					if(i === 0 || j === 14) {
						// 如果处于边界
						bdownwall = true;
						break;
					} else
						break;
				} else if(chessValue[i][j] === 2) {
					// 如果是白子
					bdownwall = true
					break;
				}
			}
		}
		// 判断白子棋阵
		if(!wupwall && !wdownwall) {
			// 活棋
			if(w4 === 2) white[3] = 2;
			else if(w4 === 3) white[3] = 4;
			else if(w4 === 4) white[3] = 6;
			else if(w4 === 5) {
				value = 99999;
				return value;
			}
		}
		else if(wupwall && !wdownwall || !wupwall && wdownwall) {
			// 冲棋
			if(w4 === 2) white[3] = 1;
			else if(w4 === 3) white[3] = 3;
			else if(w4 === 4) white[3] = 5;
			else if(w4 === 5) {
				value = 99999;
				return value;
			}
		}	else {
			if(w4 === 5) {
				value = 99999;
				return value;
			}
		}
		// 判断黑子棋阵
		if(!bupwall && !bdownwall) {
			// 活棋
			if(b4 === 2) black[3] = 2;
			else if(b4 === 3) black[3] = 4;
			else if(b4 === 4) black[3] = 6;
			else if(b4 === 5) {
				value = -50000;
				return value;
			}
		}	else if(bupwall && !bdownwall || !bupwall && bdownwall) {
			// 冲棋
			if(b4 === 2) black[3] = 1;
			else if(b4 === 3) black[3] = 3;
			else if(b4 === 4) black[3] = 5;
			else if(b4 === 5) {
				value = -50000;
				return value;
			}
		}	else {
			if(b4 === 5) {
				value = -50000;
				return value;
			}
		}

		/* ******************计算棋阵的个数****************** */
		// 表示此位置冲二，活二，冲三，活三，冲四，活四的个数
		var wnum1 = wnum2 = wnum3 = wnum4 = wnum5 = wnum6 = 0;
		var bnum1 = bnum2 = bnum3 = bnum4 = bnum5 = bnum6 = 0;
		for(var i=0; i<4; i++) {
			// 白子
			if(white[i] === 6) wnum6 ++; // 活四
			else if(white[i] === 5) wnum5 ++; // 冲四
			else if(white[i] === 4) wnum4 ++; // 活三
			else if(white[i] === 3) wnum3 ++; // 冲三
			else if(white[i] === 2) wnum2 ++; // 活二
			else if(white[i] === 1) wnum1 ++; // 冲二
			
			//黑子
			if(black[i] === 6) bnum6 ++; // 活四
			else if(black[i] === 5) bnum5 ++; // 冲四
			else if(black[i] === 4) bnum4 ++; // 活三
			else if(black[i] === 3) bnum3 ++; // 冲三
			else if(black[i] === 2) bnum2 ++; // 活二
			else if(black[i] === 1) bnum1 ++; // 冲二
		}
		
		/* ******************根据此处所处棋阵来给此处赋值****************** */
		// 当此处下了白子（ai自己）可形成的阵型
		if(wnum6 >= 1) value = 10000; // 活四以上
		else if(wnum5 >= 2) value = 10000; // 双冲四
		else if(wnum5 === 1 && wnum4 >= 1) value = 7000; // 单冲四加活三以上
		else if(wnum4 >= 2) value = 5000; // 双活三以上
		else if(wnum4 === 1) value = 1000; // 单活三
		else if(wnum5 === 1) value = 800; // 单冲四
		else if(wnum3 >= 2) value = 500; // 双冲三以上
		else if(wnum3 === 1) value = 200; // 单冲三
		else if(wnum2 >= 2) value = 125; // 双活二以上
		else if(wnum2 === 1) value = 100; // 单活二
		else if(wnum1 >= 2) value = 70; // 双冲二以上
		else if(wnum1 === 1) value = 50; // 单冲二
		else value = 0;

		// 当此处下了黑子（对手，即玩家）可形成的阵型
		if(bnum6 >= 1) value -= 6500; // 活四以上
		else if(bnum5 >= 2) value -= 6500; // 双冲四
		else if(bnum5 == 1 && bnum4 >= 1) value -= 6000; // 单冲四加活三以上
		else if(bnum4 >= 2) value -= 4000; // 双活三以上
		else if(bnum4==1) value -= 750; // 单活三
		else if(bnum5 == 1) value -= 600; // 单冲四
		else if(bnum3 >= 2) value -= 300; // 双冲三以上
		else if(bnum3 == 1) value -= 150; // 单冲三
		else if(bnum2 >= 2) value -= 110; // 双活二以上
		else if(bnum2 == 1) value -= 30; // 单活二
		else if(bnum1 >= 2) value -= 30; // 双冲二以上
		else if(bnum1 == 1) value -= 10; // 单冲二
		else value -= 0;
		
		return value;
	}

/***/ }
/******/ ]);