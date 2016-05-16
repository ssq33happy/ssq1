function getStyle( obj, attr){
	return obj.currentStyle? obj.currentStyle[attr]:getComputedStyle(obj, false)[attr] 
	
}
function move1(obj, attr, target,fn){
	clearInterval(obj.timer);

	obj.timer = setInterval(function(){
		if(attr == 'opacity'){
			var iCur =getStyle( obj , attr)*100;
		}else{
			var iCur = parseInt(getStyle(obj, attr));
		}
		var speed = (target - iCur)/2;
		speed>0?speed = Math.ceil(speed):speed = Math.floor(speed);
		if(iCur==target){
			clearInterval( obj.timer );
			fn&&fn();
		}else{
			if(attr == 'opacity'){
				obj.style[attr] = (iCur + speed)/100 ;
				obj.style.filter = 'alpha( opacity = '+(iCur + speed)+' )';
			}
			obj.style[attr] = iCur + speed + 'px';
		};
	
	},30);
}

	/*
			function move( obj , attr , target,fn ){
				clearInterval( obj.timer );
				obj.timer = setInterval(function(){
					var iCur = getStyle( obj , attr ) * 100;
					var speed = ( target - iCur ) / 8;
					if( iCur > target ){
						speed = Math.floor( speed );
					}else{
						speed = Math.ceil( speed );
					}
					if( iCur == target ){
						clearInterval( obj.timer )
						fn&&fn();
					}else{
						obj.style[attr] = (iCur + speed)/100;
						obj.style.filter = 'alpha( opacity = '+(iCur + speed)+' )';
					}
				},30);
				
			};

*/
















