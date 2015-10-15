var draw = require('./draw.js');
var judge = require('./judge.js');

draw.paintTable();
document.querySelector('#canvas').onmousedown = function(event) {
  event = event || window.event;
  window.cache = window.cache || {};
  var data = window.cache.data;

  var chessValue = data.chessValue;
  var money = data.money;
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
      chessValue[x][y] = 1; // 下黑子
      data.isblack = false;
      drawChess(1, x, y); // 画棋子
      // 判断输赢
      winjudge = judge(1, x, y);
      if(winjudge === 1) { 
        data.iswin = 1;
        alert("黑子赢!");
      } else if(winjudge === 3) {
        data.iswin = 1;
        alert("平局！");
      }
      // 已下子的位置权值设为-1
      money[x][y] = -1;
      // 绘制权值
      for(var i =1;i<=4;i++) {
        if(x-i>=0 && x-i<=14 && y>=0 && y<=14)
          bm[x-i][y]=drawMoney(x-i,y);
        if(x+i>=0 && x+i<=14 && y>=0 && y<=14)
          bm[x+i][y]=drawMoney(x+i,y);
        if(x>=0 && x<=14 && y-i>=0 && y-i<=14)
          bm[x][y-i]=drawMoney(x,y-i);
        if(x>=0 && x<=14 && y+i>=0 && y+i<=14)
          bm[x][y+i]=drawMoney(x,y+i);
        if(x-i>=0&&x-i<=14&&y-i>=0 && y-i<=14)
          bm[x-i][y-i]=drawMoney(x-i,y-i);
        if(x+i>=0 && x+i<=14 && y+i>=0 && y+i<=14)
          bm[x+i][y+i]=drawMoney(x+i,y+i);
        if(x-i>=0 && x-i<=14 && y+i>=0 && y+i<=14)
          bm[x-i][y+i]=drawMoney(x-i,y+i);
        if(x+i>=0 && x+i<=14 && y-i>=0 && y-i<=14)
          bm[x+i][y-i]=drawMoney(x+i,y-i);
      }
      
      temx = x;
      temy = y;
      chooseWhere();
    }
  }
};