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