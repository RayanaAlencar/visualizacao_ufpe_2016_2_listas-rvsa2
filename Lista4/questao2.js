var margin = {top: 20, right: 20, bottom: 20, left: 20};
var w = 900 - margin.left - margin.right;
var h = 900 - margin.top - margin.bottom;

var minCallback = ( pre, cur ) => Math.min( pre, cur );
var maxCallback = ( pre, cur ) => Math.max( pre, cur );


function histogram(arrayDeNumeros, esquerda, direita, numeroDeBins){
	console.log("Data ",arrayDeNumeros);
	var data = arrayDeNumeros;
	var limiteEsquerda = esquerda;
	var limiteDireita = direita;
	var totalClass = numeroDeBins;
	var data_length = data.length;

	data = data.sort(function(a, b) {
	  return a - b;
	});

	var svg = d3.select("body")
			.append("svg")
			.attr("width", w+margin.left + margin.right)
			.attr("height", h+margin.bottom + margin.top)
			.attr("transform","translate(" + margin.left + "," + margin.top + ")");


	var minCallback = ( pre, cur ) => Math.min( pre, cur );
	var maxCallback = ( pre, cur ) => Math.max( pre, cur );

	var min = data.reduce(minCallback);
	var max = data.reduce(maxCallback);


	var largura = Math.round((max - min)/totalClass);
	console.log("largura ",largura);
	console.log("total de classes ", totalClass);
	var range = calcRange(min,largura,totalClass);
	function calcRange(min,largura,totalClass){
		var range =[];
		var x = min;
		var y =0;
		for( var i =0;i<totalClass;i++){
			var obj = {};
			obj.x = x;
			obj.y = x+largura;
			range.push(obj);
			x = obj.y;
		}
		
		return range;
	}
	console.log("range" , range);

	var frequencia = [];
	for (var i =0;i<range.length;i++){
		frequencia.push(0);
	}
	console.log("frequencia" , frequencia);

	function calFrequencia (range,data,data_length,frequencia){
		var aux =0;
		var obj = 0;
		for(var i =0;i<data_length;i++){
			aux = data[i];
			for(var j =0;j<range.length;j++){
				obj = range[j];
				if(aux >= obj.x && aux <= obj.y){
					frequencia[j] = frequencia[j]+1; 
				}
			}
		}
		return frequencia;
	}

	frequencia = calFrequencia(range,data,data_length,frequencia);
	console.log("frequencia" , frequencia);
	plot(frequencia,totalClass,range);

}

function plot(frequencia,classes,range){
	var xtickers = new Set();
	for(var i =0;i<range.length;i++){
		xtickers.add(range[i].x);
		xtickers.add(range[i].y);
	} 

	xtickers = Array.from(xtickers);

	console.log("xtickers ", xtickers);
	var min = frequencia.reduce(minCallback);
	console.log("minimum ",min);
	var max = frequencia.reduce(maxCallback);
	console.log("max ",max);

	var svg = d3.select("body").select("svg");
	
	var minD = min;
	if(minD>0){
		minD = 0;
	}

	var yScale = d3.scaleLinear()
	    .domain([minD,max+5])
		.range([h,0]);

	var xScale = d3.scaleBand()
				.domain(d3.range(range.length+1))
				.rangeRound([0, w])
				.padding(1.5);

	svg.append("g").attr("id","xAxis")
					.attr("transform","translate(" + 0 +"," + yScale(0)+ ")");

	svg.append("g").attr("id","yAxis").attr("transform","translate(" + (margin.left) + ",0)");

	var xAxis = d3.axisBottom(xScale).tickFormat(function(d){return xtickers[d];});	

	var xAxisGroup = d3.select("#xAxis")
						.transition()
						.call(xAxis);

	var yAxis = d3.axisLeft(yScale);		

	var yAxisGroup = d3.select("#yAxis")
						.transition()
						.call(yAxis);	
			
			svg.selectAll("rect")
				.data(frequencia)
				.enter()
				.append("rect")
				.attr("x", function(d, i) {
					return xScale(i);
				})
				.attr("y", function(d) {
					return yScale(d);
				})
				.attr("width",function(d){
					return 185;
				})
				.attr("height", function(d) {
					return h - yScale(d);
				})
				.attr("fill",function(d){
					//return "blue";
				 return "rgb(0, 0, " + (d * 10) + ")";
				})


}