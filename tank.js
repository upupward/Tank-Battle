var heroColor=new Array("#BA9658","#FEF26E");
var enemyColor=new Array("#00A2B5","#00FEFE");
// 定义子弹类
function Bullet(x,y,direct,speed){
	this.x=x;
	this.y=y;
	this.direct=direct;
	this.speed=speed;
	this.timer=null;
	this.isLive=true;
	this.run=function run(){
			if(this.x<=0||this.x>=400||this.y<=0||this.y>=300){
				window.clearInterval(this.timer);
				this.isLive=false;
			}else{
				switch(this.direct){
					case 0:
							this.y-=this.speed;
							break;
					case 1:
							this.x+=this.speed;
							break;
					case 2:
							this.y+=this.speed;
							break;
					case 3:
							this.x-=this.speed;
							break;
				}
			}

			document.getElementById("aa").innerText="子弹x="+this.x+" 子弹y="+this.y;
	}
}
function Tank(x,y,direct,color){
		this.x=x;
		this.y=y;
		this.speed=1;
		this.direct=direct;
		this.color=color;
		this.moveUp=function(){
			this.y-=this.speed;
			this.direct=0;
		}
		this.moveRight=function(){
			this.x+=this.speed;
			this.direct=1;
		}

		//下移
		this.moveDown=function(){
			this.y+=this.speed;
			this.direct=2;
		}
		//左
		this.moveLeft=function(){
			this.x-=this.speed;
			this.direct=3;
		}
}
	
function Hero(x,y,direct,color){
	this.tank=Tank;
	this.tank(x,y,direct,color);
	// 增加一个函数射击敌人
	this.shotEnemy=function(){
		// 创建子弹，子弹的初始位置与hero的方向有关
		// this.x代表当前hero的横坐标，this.y代表纵坐标
		// 0代表方向
		switch(this.direct){
			case 0:
				heroBullet=new Bullet(this.x+9,this.y,this.direct,1);
				break;
			case 1:
				heroBullet=new Bullet(this.x+30,this.y+9,this.direct,1);
				break;
			case 2:
				heroBullet=new Bullet(this.x+9,this.y+30,this.direct,1);
				break;
			case 3:
				heroBullet=new Bullet(this.x,this.y+9,this.direct,1);
				break;
		}
		heroBullets.push(heroBullet);
		// 把子弹放到数组中
		
		// 调用子弹的run(),50是最合适的
		var timer=window.setInterval("heroBullets["+(heroBullets.length-1)+"].run()",50)
		// 把这个timer赋值给这个子弹，js对象是引用传递
		heroBullets[heroBullets.length-1].timer=timer;

	}
}
// 定义各一个enemyTank类
function EnemyTank(x,y,direct,color){
	this.tank=Tank;
	this.tank(x,y,direct,color);
}

// 画出自己的子弹,也可以封装到hero中
function drawHeroBullet(){
	for(var i=0;i<heroBullets.length;i++){
		var heroBullet=heroBullets[i];
		if(heroBullet!=null&&heroBullet.isLive){
			cxt.fillStyle="#FEF26E";
			cxt.fillRect(heroBullet.x,heroBullet.y,2,2);
		}
	}

		}
function drawTank(tank){
switch(tank.direct){
	case 0:
	case 2:
		cxt.fillStyle=tank.color[0];
			cxt.fillRect(tank.x,tank.y,5,30);
			cxt.fillRect(tank.x+15,tank.y,5,30);
			cxt.fillRect(tank.x+6,tank.y+5,8,20);
			cxt.fillStyle=tank.color[1];
			cxt.arc(tank.x+10,tank.y+15,4,0,360,true);
			cxt.fill();
			cxt.strokeStyle=tank.color[1];
			cxt.lineWidth=1.5;
			cxt.beginPath();
			cxt.moveTo(tank.x+10,tank.y+15);
			if(tank.direct==0){
				cxt.lineTo(tank.x+10,tank.y);
			}else if(tank.direct==2){
				cxt.lineTo(tank.x+10,tank.y+30);
			}

			cxt.closePath();
			cxt.stroke();
			break;
	case 1:
	case 3:
		cxt.fillStyle=tank.color[0];
		cxt.fillRect(tank.x,tank.y,30,5);
		cxt.fillRect(tank.x,tank.y+15,30,5);
		cxt.fillRect(tank.x+5,tank.y+6,20,8);
		cxt.fillStyle=tank.color[1];
		cxt.arc(tank.x+15,tank.y+10,4,0,360,true);
		cxt.fill();
		cxt.strokeStyle=tank.color[1];
		cxt.lineWidth=1.5;
		cxt.beginPath();
		cxt.moveTo(tank.x+15,tank.y+10);
		if(tank.direct==1){
			cxt.lineTo(tank.x+30,tank.y+10);
		}else if(tank.direct==3){
			cxt.lineTo(tank.x,tank.y+10);
		}
		cxt.closePath();
		cxt.stroke();
		break;
	}
}
