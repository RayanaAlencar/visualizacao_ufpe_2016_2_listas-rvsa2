var margin = {top: 25, right: 25, bottom: 25, left: 25};
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
	console.log("min ",min);
	var max = data.reduce(maxCallback);
	console.log("max ",max);
	//console.log("------------------> ",(max - min)/totalClass);
	var largura = (Math.round(((max - min)/totalClass)*100)/100);
	console.log("largura ",largura);
	console.log("total de classes ", totalClass);
	var range = calcRange(min,largura,totalClass);

	function calcRange(min,largura,totalClass){
		var range =[];
		var x = min;
		var y =0;
		for( var i =0;i<totalClass;i++){
			var obj = {};
			obj.x = parseFloat(x.toFixed(2));
			obj.y = parseFloat((x+largura).toFixed(2));
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
	plot(data,frequencia,totalClass,range,largura,totalClass);

}

function plot(data,frequencia,classes,range,largura,totalClass){
	var xtickers = new Set();
	for(var i =0;i<range.length;i++){
		xtickers.add(range[i].x);
		xtickers.add(range[i].y);
	} 

	xtickers = Array.from(xtickers);
	/*if(xtickers[0] !=0){
		xtickers.push(0);
		xtickers.sort(function(a, b) {
	  return a - b;
	});
}*/

	console.log("xtickers ", xtickers);
	var min = frequencia.reduce(minCallback);
	var max = frequencia.reduce(maxCallback);

	var svg = d3.select("body").select("svg");
	

	var yScale = d3.scaleLinear()
	    .domain([0,max+1])
		.range([h,0]);

	var rangePlot = [];
	for (var i =0;i<totalClass;i++){
			rangePlot.push(i);
	}

	var xScale2 = d3.scaleBand()
				.domain(xtickers)
				.rangeRound([0, w])
				.paddingInner(0);

	var xScale = d3.scaleQuantile()
				.domain(data)
				.range(rangePlot);

	var xScalePlot = d3.scaleLinear()
		   			 .domain([0,xtickers.length-1])
					 .range([0,w]);
	
	svg.append("g").attr("id","xAxis")
					.attr("transform","translate(" + margin.top +"," + (h+margin.top)+ ")");


	svg.append("g").attr("id","yAxis").attr("transform","translate(" + (margin.left) + ","+ margin.top+ ")");

	var frequenciaOrder=[];
	for (var j =0;j<frequencia.length;j++){
		 frequenciaOrder.push(frequencia[j]);
	}
	var frequenciaOrder = frequenciaOrder.sort(function(a, b) {
	  return a - b;
	});
	if(frequenciaOrder[0]!= 0){
		frequenciaOrder.push(0);
	}
	var frequenciaOrder = frequenciaOrder.sort(function(a, b) {
	  return a - b;
	});

	var yAxis = d3.axisLeft(yScale);

	var xAxis = d3.axisBottom(xScalePlot).tickFormat((function(d,i){return xtickers[i];}));	

	var yAxisGroup = d3.select("#yAxis")
						.transition()
						.call(yAxis);	

	var xAxisGroup = d3.select("#xAxis")
						.transition()
						.call(xAxis);
			


	var rects =	svg.selectAll("rect")
				.data(frequencia)
				.enter()
				.append("rect")
				.attr("x", function(d, i) {
					return xScalePlot(i);
				})
				.attr("y", function(d,i) {
					return yScale(d);
				})
				.attr("width",function(d,i){
					var a = xScalePlot(i);
					var b = xScalePlot(i+1);
					var c = b-a;
					return  c;
				})
				.attr("transform","translate(" + margin.left + "," + margin.top + ")")
				.attr("height", function(d) {
					return h - yScale(d);
				})
				.attr("fill",function(d){
					return "#00FF7F";
				})
				.attr("opacity",0.5)
				.append("title")
			   .text(function(d,i) {
			         return d;
			   });


}