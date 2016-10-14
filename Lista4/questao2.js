var margin = {top: 25, right: 25, bottom: 25, left: 25};
var w = 900 - margin.left - margin.right;
var h = 900 - margin.top - margin.bottom;

var minCallback = ( pre, cur ) => Math.min( pre, cur );
var maxCallback = ( pre, cur ) => Math.max( pre, cur );
var controle = 0;
var yMax = 0;

function histogram(arrayDeNumeros, esquerda, direita, numeroDeBins){
	controle = controle+1;
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

	console.log("xtickers ", xtickers);
	var min = frequencia.reduce(minCallback);
	var max = frequencia.reduce(maxCallback);

	var svg = d3.select("body").select("svg");
	
	yMax = max;
	var yScale = d3.scaleLinear()
	    .domain([0,max])
		.range([h,0]);

	
	var xScalePlot = d3.scaleLinear()
		   			 .domain([xtickers.reduce(minCallback),xtickers.reduce(maxCallback)])
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

	var xAxis = d3.axisBottom(xScalePlot);	

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
					return xScalePlot(xtickers[i]);
				})
				.attr("y", function(d,i) {
					return yScale(d);
				})
				.attr("width",function(d,i){
					var a = xScalePlot(xtickers[i]);
					var b = xScalePlot(xtickers[i+1]);
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
				.attr("stroke-width", 1)
			   	.attr("stroke","black")
				.attr("opacity",0.8)
				.append("title")
			   .text(function(d,i) {
			         return d;
			   });

}

function gaus (u) {
	var a = 1/Math.sqrt(2*Math.PI) ;
	var c = -1/2 * Math.pow(u,2);
	var b = Math.pow(Math.E,c);

	return a*b;
}

function kernel(array,x,h){
	var n = array.length;
	var aux = 0;
	var g = 0;
	for (var j =0;j<n;j++){
		g = gaus(((x-array[j])/h));
		aux = aux+g; 
	}

	var b = 1/(n*h);

	return b*aux;
}

function calclcarray(arrayX,amplitude,entrada){

	//console.log("entrada da questao ",entrada,  " valores das classes ",arrayX);

	var arrays =[];

	for(var i =0;i<arrayX.length;i++){
		arrays.push(kernel(entrada,arrayX[i],amplitude));
	}
	console.log("kernel ",arrays);

	return arrays;
}

function kde(arrayDeNumeros,amplitude,esquerda, direita, numeroDeBins){
	controle = controle+1;
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

	console.log("range" , range);

	var frequencia = [];
	for (var i =0;i<range.length;i++){
		frequencia.push(0);
	}
	console.log("frequencia" , frequencia);

	frequencia = calFrequencia(range,data,data_length,frequencia);
	console.log("frequencia" , frequencia);
	
	var entrada = new Set();
		for(var i =0;i<range.length;i++){
			entrada.add(range[i].x);
			entrada.add(range[i].y);
		} 

	entrada = Array.from(entrada);
	//console.log("???",entrada)
	var arrayKernel = calclcarray(entrada,amplitude,arrayDeNumeros);

	plot2(arrayKernel,frequencia,range,largura,totalClass,2);


}

function plot2(data,frequencia,range,largura,totalClass,controle){
	var xtickers = new Set();
	for(var i =0;i<range.length;i++){
		xtickers.add(range[i].x);
		xtickers.add(range[i].y);
	} 

	xtickers = Array.from(xtickers);

	console.log("xtickers ", xtickers);
	var min = data.reduce(minCallback);
	var max = data.reduce(maxCallback);

	var svg = d3.select("body").select("svg");
	

	var yScale = d3.scaleLinear()
	    .domain([0,max+1])
		.range([h,0]);

	var rangePlot = [];
	for (var i =0;i<totalClass;i++){
			rangePlot.push(i);
	}

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
			
		var circles= svg.selectAll("circle")
					.data(data)
					.enter()
					.append("circle")
					.attr("cx",function(d,i){
						return xScalePlot(i);
					})
					.attr("cy",function(d,i){
						return  yScale(d);
					})
					.attr("r",3)
					.attr("transform","translate(" + margin.left + "," + margin.top + ")");


		for(var i =0;i<data.length-1;i++){
				 svg.append('line')
				 	.attr("x1",xScalePlot(i))     
				    .attr("y1",yScale(data[i]))
				    .attr("x2",xScalePlot(i+1))   
				    .attr("y2", yScale(data[i+1]))
					.style("stroke", "red")
					.attr("stroke-width",3)
					.attr("transform","translate(" + margin.left + "," + margin.top + ")");
		}


		if(controle ==2){ //chamou os dois graficos entao arrumar o yScale para deixar mostrando a frequencia
		var yScale = d3.scaleLinear()
			    .domain([0,yMax])
				.range([h,0]);

				svg.append("g").attr("id","yAxis").attr("transform","translate(" + (margin.left) + ","+ margin.top+ ")");

			var yAxis = d3.axisLeft(yScale);
			var yAxisGroup = d3.select("#yAxis")
								.transition()
								.call(yAxis);	
}
}

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

