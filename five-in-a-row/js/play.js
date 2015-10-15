//棋盘坐标取值0-14
var canvas;
var context;
var iswin=0;//0表示棋局未结束，1表示棋局结束
var isblack=true;
var black=new Image();
var white=new Image();
black.src="image/black.png";
white.src="image/white.png";

window.chessValue=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];//二维数组用来保存棋盘信息，0为无子，1为黑子，2为白子
window.money=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];//二维数组用来存储AI选择下子位置的价值缓冲区
	window.bm=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];//二维数组用来存储AI选择下子位置的价值缓冲区
	window.bm2=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
	
function printmoney()//打印棋盘的值
{
	var ss="";
	for(var qwe=0;qwe<15;qwe++)
	{
		for(var ewq = 0;ewq<15;ewq++)
		{
			ss+="+"+chessValue[ewq][qwe];
		}
		ss+="\n";
	}
	return ss;
}

function calculmaxvalue()//求棋盘最高分
{
	var maxvalue=[0,0,0];//分别表示价值，坐标x，坐标y
	//alert("1");
	for(var i =0 ;i<15;i++)
	{
		for(var j=0;j<15;j++)
		{
			money[i][j]=drawMoney(i,j);
			//if(money[i][j]==10) alert(i+"-"+j);
		}
	}
	for(var i=0;i<15;i++)
	{
		for(var j=0;j<15;j++)
		{
			maxvalue[0]+=money[i][j];
		}
	}
	//alert(maxvalue[0]+"-"+maxvalue[1]+"-"+maxvalue[2]);
	return maxvalue;
}

function seapo(flag,chess,aa,bb)//分别表示递归终止标志，落子为谁，α值和β值
{
	var i=0,j=0;
	var flagtmp = flag;
	var chessfan;
	var score =0;
	var buff=[-1,0,0];//分别表示价值，坐标x，坐标y
	var fin=[-1,0,0];
	var atmp=aa;
	var btmp =bb;
	
	var winjd;
	
	if(flag==2) 
	{
		return calculmaxvalue();
	}
	
	
	for(i=0;i<15;i++)
	{
		for(j=0;j<15;j++)
		{//alert(chess);
			if(chess==1)//此时轮到黑子下
			{
				if(chessValue[i][j]!=0) continue;
				if(bm2[i][j]==0) continue;
				chessValue[i][j]=1;
				buff=seapo(flagtmp+1,2,atmp,btmp);
				//alert(buff[0]);
				if(buff[0]<=atmp) //α剪枝
				{
					chessValue[i][j]=0;
					return buff;
				}
				if(buff[0]<btmp)
				{
					btmp = buff[0];
					fin[0] = buff[0];
					fin[1] = i;
					fin[2] = j;
					//alert(i+"-"+j);
				}
				chessValue[i][j]=0;
			}
			else if(chess==2)//此时轮到白子下
			{//alert(chess);
				if(chessValue[i][j]!=0) continue;
				if(bm[i][j]==0) continue;
				chessValue[i][j]=2;
				if(bm[i][j]>=99999||bm[i][j]<=-50000)
				{
					chessValue[i][j]=0;
					fin[0] = 99999;
					fin[1] = i;
					fin[2] = j;
					return fin
				}
				revalue(i,j);
				buff=seapo(flagtmp+1,1,atmp,btmp);
				//if(buff[0]>=btmp) return;
				if(buff[0]>atmp)
				{
					atmp = buff[0];
					fin[0] = buff[0];
					fin[1] = i;
					fin[2] = j;
					//alert(i+"-"+j);
				}
				chessValue[i][j]=0;
			}
		}
	}
	return fin;
}
	
function revalue(x,y)
{
	for(var i=0;i<15;i++)
	{
		for(var j=0;j<15;j++)
		{
			bm2[i][j]=bm[i][j];
		}
	}
	for(var i =1;i<=4;i++)
	{
		if(x-i>=0&&x-i<=14&&y>=0&&y<=14)
		{
			bm2[x-i][y]=drawMoney(x-i,y);
		}
		if(x+i>=0&&x+i<=14&&y>=0&&y<=14)
		{
			bm2[x+i][y]=drawMoney(x+i,y);
		}
		if(x>=0&&x<=14&&y-i>=0&&y-i<=14)
		{
			bm2[x][y-i]=drawMoney(x,y-i);
		}
		if(x>=0&&x<=14&&y+i>=0&&y+i<=14)
		{
			bm2[x][y+i]=drawMoney(x,y+i);
		}
		if(x-i>=0&&x-i<=14&&y-i>=0&&y-i<=14)
		{
			bm2[x-i][y-i]=drawMoney(x-i,y-i);
		}
		if(x+i>=0&&x+i<=14&&y+i>=0&&y+i<=14)
		{
			bm2[x+i][y+i]=drawMoney(x+i,y+i);
		}
		if(x-i>=0&&x-i<=14&&y+i>=0&&y+i<=14)
		{
			bm2[x-i][y+i]=drawMoney(x-i,y+i);
		}
		if(x+i>=0&&x+i<=14&&y-i>=0&&y-i<=14)
		{
			bm2[x+i][y-i]=drawMoney(x+i,y-i);
		}
	}
	
}
	
function chooseWhere()//ai选择位置并落子
{
	var value=[-1,0,0];//分别表示价值，坐标x，坐标y和距离
	var leng = 0;
	var x,y;
	var winjudge;
	
	if(iswin==1) return;
	
	value = seapo(0,2,-1000000,1000000);
	x=value[1];
	y=value[2];
	
	isblack=true;
	//alert(money[maxvalue[1]][maxvalue[2]]);
	//alert(value[1]+"+"+value[2]);
	//alert(money[1][0]);
	drawChess(2,x,y);
	chessValue[x][y]=2;
	winjudge= judgeWin(2,x,y)
	if(winjudge==2)
	{//判断输赢
		iswin = 1;
		alert("白子赢!");
	}
	else if(winjudge==3)
	{
		iswin = 1;
		alert("平局！");
	}
	money[x][y]=-1;
	
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
	

}

function drawMoney(x,y)//给棋盘坐标x，y的位置赋值，作为ai下子的参考,flag为1表示刚下黑子，flag为2表示刚下白子
{
	var value=0;
	var b1=b2=b3=b4=1;//分别表示横向，竖向，正对角线，反对角线方向黑子个数
	var w1=w2=w3=w4=1;//分别表示横向，竖向，正对角线，反对角线方向白子个数
	
	var black=[0,0,0,0];//分别表示横向，竖向，正对角线，反对角线的阵型，其中1表示冲二，2表示活二，3表示冲三，4表示活三，5表示冲四，6表示活四
	var white=[0,0,0,0];
	var bupwall=false;
	var bdownwall=false;
	var wupwall=false;
	var wdownwall=false;//表示此处是否处于边界附近
	//alert("");
	if(x<0||y<0||x>14||y>14)//如果此处位于棋盘上边沿之外或左边沿之外，则返回
	{
		//alert("xiaoyu");
		return -1;
	}
	//alert(w1+"-"+b1);
	if(chessValue[x][y]!=0)//如果此处已经下过子，则返回
	{
		return -1;
	}
	//alert(w1+"-"+b1);
	
	//*******************横向判断
	bupwall=false;
	bdownwall=false;
	wupwall=false;
	wdownwall=false;
	//-----左边
	if(x==0)
	{
		bupwall=true;
		wupwall=true;
	}
	else if(x>=1)
	{
		for(var i=x-1;i>=0;i--)//判断横向白子数量
		{
			if(i<x-4) break;
			if(chessValue[i][y]==2)//如果是白子
			{
				w1++;
				if(i==0)//如果处于边界
				{
					wupwall=true;
					break;
				}
			}
			else if(chessValue[i][y]==1)//如果是黑子
			{
				wupwall=true
				break;
			}
			else
			{
				wupwall=false;
				break;
			}
		}
		for(var i=x-1;i>=0;i--)//判断横向黑子数量
		{
			if(i<x-4) break;
			if(chessValue[i][y]==1)//如果是黑子
			{
				b1++;
				if(i==0)//如果处于边界
				{
					bupwall=true;
					break;
				}
			}
			else if(chessValue[i][y]==2)//如果是白子
			{
				bupwall=true
				break;
			}
			else
			{
				break;
			}
		}
	}
	//alert(w1+"-"+b1);
	//-----右边
	if(x==14)
	{
		bdownwall=true;
		wdownwall=true;
	}
	else if(x<=13)
	{
		for(var i=x+1;i<=14;i++)//判断横向白子数量
		{
			if(i>x+4) break;
			if(chessValue[i][y]==2)//如果是白子
			{
				w1++;
				if(i==14)//如果处于边界
				{
					wdownwall=true;
					break;
				}
			}
			else if(chessValue[i][y]==1)//如果是黑子
			{
				wdownwall=true
				break;
			}
			else
			{
				break;
			}
		}
		for(var i=x+1;i<=14;i++)//判断横向黑子数量
		{
			if(i>x+4) break;
			if(chessValue[i][y]==1)//如果是黑子
			{
				b1++;
				if(i==14)//如果处于边界
				{
					bdownwall=true;
					break;
				}
			}
			else if(chessValue[i][y]==2)//如果是白子
			{
				bdownwall=true
				break;
			}
			else
			{
				break;
			}
		}
	}
	//判断白子棋阵
	if(wupwall==false&&wdownwall==false)//活棋
	{
		if(w1==2)
		{
			white[0]=2;
		}
		else if(w1==3)
		{
			white[0]=4;
		}
		else if(w1==4)
		{
			//alert("win");
			white[0]=6;
		}
		else if(w1==5)
		{
			value=99999;
			return value;
		}
	}
	else if((wupwall==true&&wdownwall==false)||(wupwall==false&&wdownwall==true))//冲棋
	{
		if(w1==2)
		{
			white[0]=1;
		}
		else if(w1==3)
		{
			white[0]=3;
		}
		else if(w1==4)
		{
			white[0]=5;
		}
		else if(w1==5)
		{
			value=99999;
			return value;
		}
	}
	else
	{
		if(w1==5)
		{
			value=99999;
			return value;
		}
	}
	//判断黑子棋阵
	if(bupwall==false&&bdownwall==false)//活棋
	{
		if(b1==2)
		{
			black[0]=2;
		}
		else if(b1==3)
		{
			black[0]=4;
		}
		else if(b1==4)
		{
			black[0]=6;
		}
		else if(b1==5)
		{
			value=-50000;
			return value;
		}
	}
	else if(bupwall==true&&bdownwall==false||bupwall==false&&bdownwall==true)//冲棋
	{
		if(b1==2)
		{
			black[0]=1;
		}
		else if(b1==3)
		{
			black[0]=3;
		}
		else if(b1==4)
		{
			black[0]=5;
		}
		else if(b1==5)
		{
			value=-50000;
			return value;
		}
	}
	else
	{
		if(b1==5)
		{
			value=-50000;
			return value;
		}
	}

	
	//*******************竖向判断
	bupwall=false;
	bdownwall=false;
	wupwall=false;
	wdownwall=false;
	//-----上边
	if(y==0)
	{
		bupwall=true;
		wupwall=true;
	}
	else if(y>=1)
	{
		for(var i=y-1;i>=0;i--)//判断白子数量
		{
			if(i<y-4) break;
			if(chessValue[x][i]==2)//如果是白子
			{
				w2++;
				if(i==0)//如果处于边界
				{
					wupwall=true;
					break;
				}
			}
			else if(chessValue[x][i]==1)//如果是黑子
			{
				wupwall=true
				break;
			}
			else
			{
				break;
			}
		}
		for(var i=y-1;i>=0;i--)//判断黑子数量
		{
			if(i<y-4) break;
			if(chessValue[x][i]==1)//如果是黑子
			{
				b2++;
				if(i==0)//如果处于边界
				{
					bupwall=true;
					break;
				}
			}
			else if(chessValue[x][i]==2)//如果是白子
			{
				bupwall=true
				break;
			}
			else
			{
				break;
			}
		}
	}
	//-----下边
	if(y==14)
	{
		bdownwall=true;
		wdownwall=true;
	}
	else if(y<=13)
	{
		for(var i=y+1;i<=14;i++)//判断白子数量
		{
			if(i>y+4) break;
			if(chessValue[x][i]==2)//如果是白子
			{
				w2++;
				if(i==14)//如果处于边界
				{
					wdownwall=true;
					break;
				}
			}
			else if(chessValue[x][i]==1)//如果是黑子
			{
				wdownwall=true
				break;
			}
			else
			{
				break;
			}
		}
		for(var i=y+1;i<=14;i++)//判断黑子数量
		{
			if(i>y+4) break;
			if(chessValue[x][i]==1)//如果是黑子
			{
				b2++;
				if(i==14)//如果处于边界
				{
					bdownwall=true;
					break;
				}
			}
			else if(chessValue[x][i]==2)//如果是白子
			{
				bdownwall=true
				break;
			}
			else
			{
				break;
			}
		}
	}
	//判断白子棋阵
	if(wupwall==false&&wdownwall==false)//活棋
	{
		if(w2==2)
		{
			white[1]=2;
		}
		else if(w2==3)
		{
			white[1]=4;
		}
		else if(w2==4)
		{
			white[1]=6;
		}
		else if(w2==5)
		{
			value=99999;
			return value;
		}
	}
	else if(wupwall==true&&wdownwall==false||wupwall==false&&wdownwall==true)//冲棋
	{
		if(w2==2)
		{
			white[1]=1;
		}
		else if(w2==3)
		{
			white[1]=3;
		}
		else if(w2==4)
		{
			white[1]=5;
		}
		else if(w2==5)
		{
			value=99999;
			return value;
		}
	}
	else
	{
		if(w2==5)
		{
			value=99999;
			return value;
		}
	}
	//判断黑子棋阵
	if(bupwall==false&&bdownwall==false)//活棋
	{
		if(b2==2)
		{
			black[1]=2;
		}
		else if(b2==3)
		{
			black[1]=4;
		}
		else if(b2==4)
		{
			black[1]=6;
		}
		else if(b2==5)
		{
			value=-50000;
			return value;
		}
	}
	else if(bupwall==true&&bdownwall==false||bupwall==false&&bdownwall==true)//冲棋
	{
		if(b2==2)
		{
			black[1]=1;
		}
		else if(b2==3)
		{
			black[1]=3;
		}
		else if(b2==4)
		{
			black[1]=5;
		}
		else if(b2==5)
		{
			value=-50000;
			return value;
		}
	}
	else
	{
		if(b2==5)
		{
			value=-50000;
			return value;
		}
	}
	
	
	//*******************正对角线判断
	bupwall=false;
	bdownwall=false;
	wupwall=false;
	wdownwall=false;
	//-----左上边
	if(y==0||x==0)
	{
		bupwall=true;
		wupwall=true;
	}
	else if(x>=1&&y>=1)
	{
		for(var i=x-1,j=y-1;i>=0&&j>=0;i--,j--)//判断白子数量
		{
			if(i<x-4) break;
			if(chessValue[i][j]==2)//如果是白子
			{
				w3++;
				if(i==0||j==0)//如果处于边界
				{
					wupwall=true;
					break;
				}
			}
			else if(chessValue[i][j]==1)//如果是黑子
			{
				wupwall=true
				break;
			}
			else
			{
				break;
			}
		}
		for(var i=x-1,j=y-1;i>=0&&j>=0;i--,j--)//判断黑子数量
		{
			if(i<x-4) break;
			if(chessValue[i][j]==1)//如果是黑子
			{
				b3++;
				if(i==0||j==0)//如果处于边界
				{
					bupwall=true;
					break;
				}
			}
			else if(chessValue[i][j]==2)//如果是白子
			{
				bupwall=true
				break;
			}
			else
			{
				break;
			}
		}
	}
	//-----右下边
	if(y==14||x==14)
	{
		bdownwall=true;
		wdownwall=true;
	}
	else if(y<=13&&x<=13)
	{
		for(var i=x+1,j=y+1;i<=14&&j<=14;i++,j++)//判断白子数量
		{
			if(i>x+4) break;
			if(chessValue[i][j]==2)//如果是白子
			{
				w3++;
				if(i==14||j==14)//如果处于边界
				{
					wdownwall=true;
					break;
				}
			}
			else if(chessValue[i][j]==1)//如果是黑子
			{
				wdownwall=true
				break;
			}
			else
			{
				break;
			}
		}
		for(var i=x+1,j=y+1;i<=14&&j<=14;i++,j++)//判断黑子数量
		{
			if(i>x+4) break;
			if(chessValue[i][j]==1)//如果是黑子
			{
				b3++;
				if(i==14||j==14)//如果处于边界
				{
					bdownwall=true;
					break;
				}
			}
			else if(chessValue[i][j]==2)//如果是白子
			{
				bdownwall=true
				break;
			}
			else
			{
				break;
			}
		}
	}
	//判断白子棋阵
	if(wupwall==false&&wdownwall==false)//活棋
	{
		if(w3==2)
		{
			white[2]=2;
		}
		else if(w3==3)
		{
			white[2]=4;
		}
		else if(w3==4)
		{
			white[2]=6;
		}
		else if(w3==5)
		{
			value=99999;
			return value;
		}
	}
	else if(wupwall==true&&wdownwall==false||wupwall==false&&wdownwall==true)//冲棋
	{
		if(w3==2)
		{
			white[2]=1;
		}
		else if(w3==3)
		{
			white[2]=3;
		}
		else if(w3==4)
		{
			white[2]=5;
		}
		else if(w3==5)
		{
			value=99999;
			return value;
		}
	}
	else
	{
		if(w3==5)
		{
			value=99999;
			return value;
		}
	}
	//判断黑子棋阵
	if(bupwall==false&&bdownwall==false)//活棋
	{
		if(b3==2)
		{
			black[2]=2;
		}
		else if(b3==3)
		{
			black[2]=4;
		}
		else if(b3==4)
		{
			black[2]=6;
		}
		else if(b3==5)
		{
			value=-50000;
			return value;
		}
	}
	else if(bupwall==true&&bdownwall==false||bupwall==false&&bdownwall==true)//冲棋
	{
		if(b3==2)
		{
			black[2]=1;
		}
		else if(b3==3)
		{
			black[2]=3;
		}
		else if(b3==4)
		{
			black[2]=5;
		}
		else if(b3==5)
		{
			value=-50000;
			return value;
		}
	}
	else
	{
		if(b3==5)
		{
			value=-50000;
			return value;
		}
	}
	
	//if(x==7&&y==5)
	//alert(white[2]);
	
	//*******************反对角线判断
	bupwall=false;
	bdownwall=false;
	wupwall=false;
	wdownwall=false;
	//-----右上边
	if(y==0||x==14)
	{
		bupwall=true;
		wupwall=true;
	}
	else if(x<=13&&y>=1)
	{
		for(var i=x+1,j=y-1;i<=14&&j>=0;i++,j--)//判断白子数量
		{
			if(i>x+4) break;
			if(chessValue[i][j]==2)//如果是白子
			{
				w4++;
				if(i==14||j==0)//如果处于边界
				{
					wupwall=true;
					break;
				}
			}
			else if(chessValue[i][j]==0)//如果是无子
			{
				if(i==14||j==0)//如果处于边界
				{
					wupwall=true;
					break;
				}
				else
				{
					break;
				}
			}
			else if(chessValue[i][j]==1)//如果是黑子
			{
				wupwall=true
				break;
			}
		}
		for(var i=x+1,j=y-1;i<=14&&j>=0;i++,j--)//判断黑子数量
		{
			if(i>x+4) break;
			if(chessValue[i][j]==1)//如果是黑子
			{
				b4++;
				if(i==14||j==0)//如果处于边界
				{
					bupwall=true;
					break;
				}
			}
			else if(chessValue[i][j]==0)//如果是无子
			{
				if(i==14||j==0)//如果处于边界
				{
					bupwall=true;
					break;
				}
				else
				{
					break;
				}
			}
			else if(chessValue[i][j]==2)//如果是白子
			{
				bupwall=true
				break;
			}
		}
	}
	//-----左下边
	if(y==14||x==0)
	{
		bdownwall=true;
		wdownwall=true;
	}
	else if(y<=13&&x>=1)
	{
		for(var i=x-1,j=y+1;i>=1&&j<=14;i--,j++)//判断白子数量
		{
			if(i<x-4) break;
			if(chessValue[i][j]==2)//如果是白子
			{
				w4++;
				if(i==0||j==14)//如果处于边界
				{
					wdownwall=true;
					break;
				}
			}
			else if(chessValue[i][j]==0)//如果是无子
			{
				if(i==0||j==14)//如果处于边界
				{
					wdownwall=true;
					break;
				}
				else
				{
					break;
				}
			}
			else if(chessValue[i][j]==1)//如果是黑子
			{
				wdownwall=true
				break;
			}
		}
		for(var i=x-1,j=y+1;i>=1&&j<=14;i--,j++)//判断黑子数量
		{
			if(i<x-4) break;
			if(chessValue[i][j]==1)//如果是黑子
			{
				b4++;
				if(i==0||j==14)//如果处于边界
				{
					bdownwall=true;
					break;
				}
			}
			else if(chessValue[i][j]==0)//如果是无子
			{
				if(i==0||j==14)//如果处于边界
				{
					bdownwall=true;
					break;
				}
				else
				{
					break;
				}
			}
			else if(chessValue[i][j]==2)//如果是白子
			{
				bdownwall=true
				break;
			}
		}
	}
	//判断白子棋阵
	if(wupwall==false&&wdownwall==false)//活棋
	{
		if(w4==2)
		{
			white[3]=2;
		}
		else if(w4==3)
		{
			white[3]=4;
		}
		else if(w4==4)
		{
			white[3]=6;
		}
		else if(w4==5)
		{
			value=99999;
			return value;
		}
	}
	else if(wupwall==true&&wdownwall==false||wupwall==false&&wdownwall==true)//冲棋
	{
		if(w4==2)
		{
			white[3]=1;
		}
		else if(w4==3)
		{
			white[3]=3;
		}
		else if(w4==4)
		{
			white[3]=5;
		}
		else if(w4==5)
		{
			value=99999;
			return value;
		}
	}
	else
	{
		if(w4==5)
		{
			value=99999;
			return value;
		}
	}
	//判断黑子棋阵
	if(bupwall==false&&bdownwall==false)//活棋
	{
		if(b4==2)
		{
			black[3]=2;
		}
		else if(b4==3)
		{
			black[3]=4;
		}
		else if(b4==4)
		{
			black[3]=6;
		}
		else if(b4==5)
		{
			value=-50000;
			return value;
		}
	}
	else if(bupwall==true&&bdownwall==false||bupwall==false&&bdownwall==true)//冲棋
	{
		if(b4==2)
		{
			black[3]=1;
		}
		else if(b4==3)
		{
			black[3]=3;
		}
		else if(b4==4)
		{
			black[3]=5;
		}
		else if(b4==5)
		{
			value=-50000;
			return value;
		}
	}
	else
	{
		if(b4==5)
		{
			value=-50000;
			return value;
		}
	}

	
	//*******************计算棋阵的个数
	var wnum1=wnum2=wnum3=wnum4=wnum5=wnum6=0;//表示此位置冲二，活二，冲三，活三，冲四，活四的个数
	var bnum1=bnum2=bnum3=bnum4=bnum5=bnum6=0;
	for(var i=0;i<4;i++)
	{
		//白子
		if(white[i]==6)//活四
		{
			//alert("win");
			wnum6++;
		}
		else if(white[i]==5)//冲四
		{
			wnum5++;
		}
		else if(white[i]==4)//活三
		{
			wnum4++;
		}
		else if(white[i]==3)//冲三
		{
			wnum3++;
		}
		else if(white[i]==2)//活二
		{
			wnum2++;
		}
		else if(white[i]==1)//冲二
		{
			wnum1++;
		}
		
		//黑子
		if(black[i]==6)//活四
		{
			bnum6++;
		}
		else if(black[i]==5)//冲四
		{
			bnum5++;
		}
		else if(black[i]==4)//活三
		{
			bnum4++;
		}
		else if(black[i]==3)//冲三
		{
			bnum3++;
		}
		else if(black[i]==2)//活二
		{
			bnum2++;
		}
		else if(black[i]==1)//冲二
		{
			//alert(i);
			bnum1++;
		}
	}
	
	//*******************根据此处所处棋阵来给此处赋值
	//当此处下了白子（ai自己）可形成的阵型
	if(wnum6>=1)//活四以上
	{
		//alert("win");
		value=10000;
	}
	else if(wnum5>=2)//双冲四
	{
		value=10000;
	}
	else if(wnum5==1&&wnum4>=1)//单冲四加活三以上
	{
		value=7000;
	}
	else if(wnum4>=2)//双活三以上
	{
		value=5000;
	}
	else if(wnum4==1)//单活三
	{
		//alert("win");
		value=1000;
	}
	else if(wnum5==1)//单冲四
	{
		value=800;
	}
	else if(wnum3>=2)//双冲三以上
	{
		value=500;
	}
	else if(wnum3==1)//单冲三
	{
		value=200;
	}
	else if(wnum2>=2)//双活二以上
	{
		value=125;
	}
	else if(wnum2==1)//单活二
	{
		value=100;
	}
	else if(wnum1>=2)//双冲二以上
	{
		value=70;
	}
	else if(wnum1==1)//单冲二
	{
		value=50;
	}
	else
	{
		value=0;
	}
	//当此处下了黑子（对手，即玩家）可形成的阵型
	if(bnum6>=1)//活四以上
	{
		value-=6500;
		return value;
	}
	else if(bnum5>=2)//双冲四
	{
		value-=6500;	
		return value;
	}
	else if(bnum5==1&&bnum4>=1)//单冲四加活三以上
	{
		value-=6000;
		return value;
	}
	else if(bnum4>=2)//双活三以上
	{
		value-=4000;
		return value;
	}
	else if(bnum4==1)//单活三
	{
		value-=750;
		return value;
	}
	else if(bnum5==1)//单冲四
	{
		value-=600;
		return value;
	}
	else if(bnum3>=2)//双冲三以上
	{
		value-=300;
		return value;
	}
	else if(bnum3==1)//单冲三
	{
		value-=150;
		return value;
	}
	else if(bnum2>=2)//双活二以上
	{
		value-=110;
		return value;
	}
	else if(bnum2==1)//单活二
	{
		value-=30;
		return value;
	}
	else if(bnum1>=2)//双冲二以上
	{
		value-=30;
		return value;
	}
	else if(bnum1==1)//单冲二
	{
		value-=10;	
		return value;
	}
	else
	{
		value-=0;
		return value;
	}
	//alert(count1+"-"+count2+"-"+count3+"-"+count4);
}