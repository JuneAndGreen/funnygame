var initData = require('./data.js');
var draw = require('./draw.js');
var judge = require('./judge.js');
var calcMoney = require('./money.js');
var chooseWhere = require('./calc.js');

draw.paintTable();
document.querySelector('#canvas').onmousedown = function(event) {
  event = event || window.event;

  var cache = window.cache;
  var chessValue = cache.chessValue;
  var money = cache.money;
  var bm = cache.bm;
  var bm2 = cache.bm2;

  var x=parseInt((event.clientX-20)/40);
  var y=parseInt((event.clientY-20)/40);
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

      // 已下子的位置权值设为-1
      money[x][y] = -1;
      // 给所有点重新计算权值
      for(var i =1;i<=4;i++) {
        if(x-i>=0 && x-i<=14 && y>=0 && y<=14)
          bm[x-i][y]=calcMoney(x-i,y);

        if(x+i>=0 && x+i<=14 && y>=0 && y<=14)
          bm[x+i][y]=calcMoney(x+i,y);

        if(x>=0 && x<=14 && y-i>=0 && y-i<=14)
          bm[x][y-i]=calcMoney(x,y-i);

        if(x>=0 && x<=14 && y+i>=0 && y+i<=14)
          bm[x][y+i]=calcMoney(x,y+i);

        if(x-i>=0&&x-i<=14&&y-i>=0 && y-i<=14)
          bm[x-i][y-i]=calcMoney(x-i,y-i);

        if(x+i>=0 && x+i<=14 && y+i>=0 && y+i<=14)
          bm[x+i][y+i]=calcMoney(x+i,y+i);

        if(x-i>=0 && x-i<=14 && y+i>=0 && y+i<=14)
          bm[x-i][y+i]=calcMoney(x-i,y+i);

        if(x+i>=0 && x+i<=14 && y-i>=0 && y-i<=14)
          bm[x+i][y-i]=calcMoney(x+i,y-i);
      }
      
      chooseWhere();
    }
  }
};