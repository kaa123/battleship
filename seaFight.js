$(document).ready(function() {
	var shoots = 0;

	$.getJSON('http://kaa123.github.io/SeaFight/seafight.json', function(positions){
		var ships=positions.ships;
		var width = positions.width;
		var height = positions.height;
		$(function(){
			for (var x = 1; x <= width; x++) {
				for (var y = 1; y <= height; y++) {
					$('<div></div>')
					.addClass('field')
					.addClass('free')
					.attr('id','field'+x.toString()+'-' + y.toString())
					.css({left:(x-1)*50, top:(y-1)*50})
					.appendTo('#map')
				}
			}
		})
		$.each(ships,function(shipNum, value){
			$.each(this, function(){
				$('#field'+this.x+'-'+this.y).addClass('ship').addClass('ship'+'-'+shipNum).data('shipNum',shipNum);
			})
		})
		$(".ship").removeClass("free");

		var deadShips=[];
		var num = 0;
		//селектор not
		//найти все корабли, которые не помечны классом 
		$('.field').on('click',function(){
			var target = this.id;
			var ships = parseInt($(this).data('shipNum'));

			if($(this).hasClass('free')){
				$(this).addClass('field-empty');
				shoots = shoots+1;
			}if($(this).hasClass('ship')&&$(this).hasClass('field-dead')){
				shoots = shoots;
			}if($(this).hasClass('ship')&& deadShips.indexOf(target)==-1){
				shoots = shoots+1;
				$(this).addClass('field-dead');
				deadShips.push(target);
			}
			// if($(this).hasClass('ship'+'-'+ships) ){
			// 	$(this).addClass('checked');
			// 	if($(".ship-"+ships":not(.checked)")){
			// 	}else{
			// 		alert ("Убит");
			// 	}	
			// }
			
			$(".field-dead").removeClass("ship");

			if(deadShips.length ==20){
				alert("Вы уничтожили все корабли. Количество выстрелов: "+ shoots);
				$('.field').off('click');
			}
		})
	})	
});