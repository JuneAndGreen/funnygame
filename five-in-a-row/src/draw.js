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