var initData = require('./data.js');
var draw = require('./draw.js');
var judge = require('./judge.js');
var chooseWhere = require('./calc.js');

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