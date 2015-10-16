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