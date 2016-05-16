function move(obj,num){
var divs =  contianer.getElementsByTagName('div');//获得contianer下所有布局div
var attack = document.getElementById("attack");//子弹发射的声音
var move = document.getElementById("move");//移动的声音
var tankCrack = document.getElementById("tankCrack");//敌人爆炸的声音
var playerCrack = document.getElementById("playerCrack");//玩家爆炸的声音
		 switch(num){
			case 65 : //按下←方向键A
					if(obj==img){move.load();move.play();}
					for(var i=0;i<divs.length;i++){//判断左边有没有除了草丛的其他div，有则坦克前进不了
						if(divs[i].offsetLeft+30==obj.offsetLeft && divs[i].offsetTop==obj.offsetTop&&divs[i].className!='zhuan2'){
						obj.style.transform='rotate(-90deg)';
						return;}
					}
					if(obj.offsetLeft>0&&obj.style.transform=='rotate(-90deg)' ){//判断是否超过左边界和炮口是否方向向左（符合则向左走一格）
						obj.style.left = obj.offsetLeft - 30 +'px';
					}
					obj.style.transform='rotate(-90deg)';//保证坦克方向向左
			  	break;
			case 87 : //按下↑方向键W/
					if(obj==img){move.load();move.play();}
					for(var i=0;i<divs.length;i++){//判断上面有没有除了草丛的其他div，有则坦克前进不了
						if(divs[i].offsetTop+30==obj.offsetTop && divs[i].offsetLeft==obj.offsetLeft&&divs[i].className!='zhuan2'){
						obj.style.transform='rotate(0deg)';
						return;}
					}
					if(obj.offsetTop>0&&obj.style.transform=='rotate(0deg)'){//判断是否超过上边界和炮口是否方向向上（符合向上走一格）
						obj.style.top = obj.offsetTop - 30 +'px';
					}
					obj.style.transform='rotate(0deg)';//保证坦克方向向上
			  	break;
			case 68 : //按下→方向键D
					if(obj==img){move.load();move.play();}
					for(var i=0;i<divs.length;i++){//判断右面有没有除了草丛的其他div，有则坦克前进不了
						if(divs[i].offsetLeft-30==obj.offsetLeft && divs[i].offsetTop==obj.offsetTop&&divs[i].className!='zhuan2'){
						obj.style.transform='rotate(90deg)';
						return;}
					}
					if(obj.offsetLeft<920&&obj.style.transform=='rotate(90deg)'){//判断是否超过右边界和炮口是否方向向右（符合向右走一格）
						obj.style.left = obj.offsetLeft + 30 +'px';
					}
					obj.style.transform='rotate(90deg)';//保证坦克方向向右
					break;
			case 83 ://按下↓方向键S
					if(obj==img){move.load();move.play();}
					for(var i=0;i<divs.length;i++){//判断下面有没有除了草丛的其他div，有则坦克前进不了
						if(divs[i].offsetTop-30==obj.offsetTop && divs[i].offsetLeft==obj.offsetLeft&&divs[i].className!='zhuan2'){
							obj.style.transform='rotate(180deg)';
							return;}
					} 
					if(obj.offsetTop<600&&obj.style.transform=='rotate(180deg)'){//判断是否超过下边界和炮口是否方向向下（符合向下走一格）
			 			obj.style.top = obj.offsetTop + 30 +'px';
					}
					obj.style.transform='rotate(180deg)';//保证坦克方向向下
			  		break;
		 	}
		 if(num==74){//按下J键发子弹
			var odiv = document.createElement('div');//创造一颗子弹div
			if(obj==img){odiv.className='zhidan myzd';attack.load();attack.play();
}else{odiv.className='zhidan qtzd'}//玩家子弹添加class名myzd，敌方坦克添加class名qtzd;
			odiv.style.left=obj.offsetLeft+15+'px';//定位子弹在坦克中心位置出发(因为坦克方向会变，定义在中心不需要再改变子弹发射位置)
			odiv.style.top=obj.offsetTop+15+'px';
			contianer.appendChild(odiv);
			var x =obj.style.transform;//获取子弹发射时坦克的方向从而确定子弹发射方向
			var t = setInterval(function(){
				  switch(x){//获得子弹发射方向并让子弹朝这个方向持续移动
				  case 'rotate(-90deg)': //方向←
					  odiv.style.left = odiv.offsetLeft - 15 +'px';			
					  break;
				  case 'rotate(0deg)' : //方向↑
					  odiv.style.top = odiv.offsetTop - 15 +'px';
					  break;
				  case 'rotate(90deg)' : //方向→
					  odiv.style.left = odiv.offsetLeft + 15 +'px';
					  break;
				  case 'rotate(180deg)': //方向↓
					  odiv.style.top = odiv.offsetTop + 15 +'px';
					  break;
				  }
				  for(var i =0;i<divs.length; i++){//（当子弹遇到砖头砖头div被删除，敌方子弹遇到玩家玩家div被隐藏下次位置被重置，玩家子弹遇到敌方坦克敌方坦克div被删除）并关闭定时器
					  if((divs[i].offsetTop==odiv.offsetTop-15 && divs[i].offsetLeft == odiv.offsetLeft-15) && (divs[i].className!='zhuan4'&&divs[i].className!='home6'&&divs[i].className!='zhuan2'&&divs[i].className!='zhuan5') &&!(odiv.className=='zhidan myzd'&&divs[i].id=='img')&&!(odiv.className=='zhidan qtzd'&&divs[i].className=='zhuan3') ){		
					  	divs[i].style.background='url(baozha.png)';//添加爆炸效果的图片
						clearInterval(t);
						(function(i){//闭包不受for循环影响
						var tem =divs[i];//将对象存储，因为divs数组随时间在变
						  if(tem.className=='zhuan3'){
							tankCrack.load();
							tankCrack.play();
						  }
						  if(tem==img){
						  	playerCrack.load();
						  	playerCrack.play();
						  }
						move1(tem,'opacity',0,function(){//爆炸效果图片变淡到透明的效果
						  if(tem!=img){//判断是否是玩家，不是玩家，div被删除（DOM优化）
							  contianer.removeChild(tem);
						  }else{//是玩家被隐藏下次出现位置被重置
							  tem.style.display='none';
						  }
						  })
						})(i);
					  }
					 if((divs[i].offsetTop==odiv.offsetTop-15 && divs[i].offsetLeft == odiv.offsetLeft-15) && divs[i].className=='home6'){//当子弹打到老家，重新开始
						  divs[i].style.background='url(del.png)';
						  clearInterval(t);
						  alert('重新开始！！！！');
						  open('坦克大战.html','_parent')
					  }
					   //当子弹超过边界,遇到非(河流,草丛,自己)div时子弹消失定时器关闭
					if((odiv.offsetTop<=0 ||odiv.offsetTop>=630 || odiv.offsetLeft<=0||odiv.offsetLeft>950 ||(divs[i].offsetTop==odiv.offsetTop-15 && divs[i].offsetLeft == odiv.offsetLeft-15)||(divs[i].offsetTop==odiv.offsetTop && divs[i].offsetLeft == odiv.offsetLeft)&&(divs[i]!=odiv))&&(divs[i].className!='zhuan2')&&(divs[i].className!='zhuan5')&&!(odiv.className=='zhidan myzd'&&divs[i].id=='img')){
						if(odiv.parentNode){//由于子弹odiv删除后for循环未结束，此时子弹odiv,没有父节点所有加一个判断防止报错；
						contianer.removeChild(odiv);
						clearInterval(t);
						}
					 }
				  }
				},30)
		 	}
}