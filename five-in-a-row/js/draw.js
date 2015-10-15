var temx = 0;
var temy = 0;

function painttable()//网页加载时触发的事件，绘画棋盘
{
	canvas=document.getElementById("canvas");
	context=canvas.getContext("2d");
	
	for(var i=0;i<=640;i+=40)
	{
		context.beginPath();//画横线
		context.lineWidth="4";
		context.strokeStyle="black";
		context.moveTo(0,i);
		context.lineTo(640,i);
		context.closePath();
		context.stroke();
		
		context.beginPath();//画竖线
		context.lineWidth="4";
		context.strokeStyle="black";
		context.moveTo(i,0);
		context.lineTo(i,640);
		context.closePath();
		context.stroke();
	}
}
function drawChess(flag,x,y)//画棋子
{
	canvas=document.getElementById("canvas");
	context=canvas.getContext("2d");

	if(iswin==1)
	{
		return;
	}
	else
	{
		if(flag==1)//画黑子
		{
			context.drawImage(black,x*40+20,y*40+20);
			return;
		}
		else if(flag==2)//画白子
		{
			context.drawImage(white,x*40+20,y*40+20);
			return;
			//alert("");
		}
		//alert("");
	}
	
}

function mouseclick(event)//鼠标点击时触发的事件
{
	var x=parseInt((event.clientX-20)/40);
	var y=parseInt((event.clientY-20)/40);
	//alert(x+"-"+y+"-"+event.clientX+"-"+event.clientY+"-"+chessValue[x][y]);
	var winjudge;
	if(isblack==false)//如果不是轮到黑子下则返回
	{
		return;
	}
	else
	{
		if(chessValue[x][y]!=0)//这里已经有棋子
		{
			alert("此处不能落子！");
			return;
		}
		else
		{
			chessValue[x][y]=1;//下子，设值为1表示此处已落黑子
			isblack=false;
			drawChess(1,x,y);//画棋子
			//alert(x+"-"+y);
			winjudge= judgeWin(1,x,y)
			if(winjudge==1)
			{//判断输赢
				iswin = 1;
				alert("黑子赢!");
			}
			else if(winjudge==3)
			{
				iswin = 1;
				//alert("ffff");
				alert("平局！");
			}
			money[x][y]=-1;//已下子的位置权值设为-1
			//alert(money[1][0]);
			//alert(x+"-"+y);
			
			for(var i =1;i<=4;i++)
			{
				if(x-i>=0&&x-i<=14&&y>=0&&y<=14)
				{
					bm[x-i][y]=drawMoney(x-i,y);
				}
				if(x+i>=0&&x+i<=14&&y>=0&&y<=14)
				{
					bm[x+i][y]=drawMoney(x+i,y);
				}
				if(x>=0&&x<=14&&y-i>=0&&y-i<=14)
				{
					bm[x][y-i]=drawMoney(x,y-i);
				}
				if(x>=0&&x<=14&&y+i>=0&&y+i<=14)
				{
					bm[x][y+i]=drawMoney(x,y+i);
				}
				if(x-i>=0&&x-i<=14&&y-i>=0&&y-i<=14)
				{
					bm[x-i][y-i]=drawMoney(x-i,y-i);
				}
				if(x+i>=0&&x+i<=14&&y+i>=0&&y+i<=14)
				{
					bm[x+i][y+i]=drawMoney(x+i,y+i);
				}
				if(x-i>=0&&x-i<=14&&y+i>=0&&y+i<=14)
				{
					bm[x-i][y+i]=drawMoney(x-i,y+i);
				}
				if(x+i>=0&&x+i<=14&&y-i>=0&&y-i<=14)
				{
					bm[x+i][y-i]=drawMoney(x+i,y-i);
				}
			}
			
			temx = x;
			temy = y;
			//setTimeout("alert(temx)",1000);
			//setTimeout("chooseWhere(temx,temy);",500);
			chooseWhere();
		}
	}
}

function judgeWin(flag,x,y)//判断输赢
{
	var count1=count2=count3=count4=0;//分别表示横向，竖向，正对角线，反对角线方向棋子个数
	
	var i=j=0;
	var winflag=false;
	//alert(x+"-"+y);
	for(i=0;i<15;i++)
	{
		for(j=0;j<15;j++)
		{
			if(chessValue[i][j]==0)
			{
				winflag=true;
				break;
			}
		}
		if(winflag==true) break;
	}
	//alert(winflag);
	if(winflag==false)
	{
		//alert(winflag==false);
		//iswin = 1;
		return 3;
		//alert("平手！");
	}
	
	for(i=x;i>=0;i--)
	{
		if(chessValue[i][y]==flag)
		{
			count1++;
		}
		else break;
	}
	//alert(count1);
	for(i=x+1;i<15;i++)
	{
		if(chessValue[i][y]==flag)
		{
			count1++;
		}
		else break;
	}
	//alert(count1);
	for(i=y;i>=0;i--)
	{
		if(chessValue[x][i]==flag)
		{
			count2++;
		}
		else break;
	}
	//alert(count2);
	for(i=y+1;i<15;i++)
	{
		if(chessValue[x][i]==flag)
		{
			count2++;
		}
		else break;
	}
	for(i=x,j=y;i>=0&&j>=0;i--,j--)
	{
		if(chessValue[i][j]==flag)
		{
			count3++;
		}
		else break;
	}
	for(i=x+1,j=y+1;i<15&&j<15;i++,j++)
	{
		if(chessValue[i][j]==flag)
		{
			count3++;
		}
		else break;
	}
	//alert(count3);
	for(i=x,j=y;i>=0&&j<=14;i--,j++)
	{
		if(chessValue[i][j]==flag)
		{
			count4++;
		}
		else break;
	}
	for(i=x+1,j=y-1;i<=14&&j>=0;i++,j--)
	{
		if(chessValue[i][j]==flag)
		{
			count4++;
		}
		else break;
	}
	//alert(count4);
	//alert(count1+"-"+count2+"-"+count3+"-"+count4);
	if(count1>=5||count2>=5||count3>=5||count4>=5)
	{
		//iswin=1;
		if(flag==1)
		{
			return 1;
			//alert("黑子赢！");
		}
		else if(flag==2)
		{
			return 2;
			//alert("白子赢！");
		}
	}
	return 0;
	//alert(iswin);
}