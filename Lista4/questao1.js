var margin = {top: 10, right: 20, bottom: 10, left: 20};
var w = 1000 - margin.left - margin.right;
var h = 1000 - margin.top - margin.bottom;
var meses = ["Janeiro","Fevereiro","Marco","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
var svg = 0;
var xAxis = 0;
var yAxis =0;
var xScale = 0;
var yScale = 0;
var svg = 0;
var ytickers = new Set();

function init(data) {

console.log("Data ",data);

var max = -151515151515150;
var min = 5589624451155840;
var array =[];
for(var i =1;i<13;i++){
	array = data[i]
	for (var j =0;j<array.length;j++){
		if(max<array[j]){
			max = array[j];
		}

		if(min>data[i][j]){
			min = array[j];
		}
	}
}

var xScale = d3.scaleBand()
				.domain(d3.range(12))
				.rangeRound([0, w])
				.padding(3.5);
    
var yScale = d3.scaleLinear()
        .domain([min,max])
		.range([h,0]);


  	svg = d3.select("body")
			.append("svg")
			.attr("width", w+margin.left + margin.right)
			.attr("height", h+margin.bottom + margin.top)
			.attr("transform","translate(" + margin.left + "," + margin.top + ")");

svg.append("g").attr("id","xAxis")
				.attr("transform","translate(" + 0 +"," + h + ")");

svg.append("g").attr("id","yAxis").attr("transform","translate(" + (margin.left) + ",0)");

 var xAxis = d3.axisBottom(xScale).tickFormat(function(d) {return meses[d]; });	

 var xAxisGroup = d3.select("#xAxis")
				.transition()
				.call(xAxis);

 var yAxis = d3.axisLeft(yScale).ticks(24);		

  var yAxisGroup = d3.select("#yAxis")
  					.transition()
  					.call(yAxis);	

  

  	for(var i =1;i<=12;i++){
  		console.log(meses[i-1],":");
  		boxPlot(data[i],min,max,i-1);
  	}
	
	var labels = Array.from(ytickers);

	labels = labels.sort(function(a, b) {
				  return a - b;
				});

 var yAxis = d3.axisLeft(yScale).tickValues(labels);	

  var yAxisGroup = d3.select("#yAxis")
  					.transition()
  					.call(yAxis);	
}


function boxPlot(data,minE,maxE,indice){

var data_length = data.length;

data = data.sort(function(a, b) {
  return a - b;
});

var min = data.reduce(minCallback);
console.log("minimum ",min);
var max = data.reduce(maxCallback);


var k = 1*(data_length +1) / 4; 
k = Math.floor(k);
var firstQuartile = data[k-1] + (((data_length+1)/4) - k) * (data[k]-data[k-1]);
console.log("first quartile ",firstQuartile);
k = 2*(data_length +1) / 4; 
k = Math.floor(k); 
var secondQuartile =  data[k-1] + ((2*(data_length+1)/4) - k) * (data[k]-data[k-1]);
console.log("second quartile ",secondQuartile);
k = 3*(data_length +1) / 4; 
k = Math.floor(k); 
var thirdQuartile =  data[k-1] + ((3*(data_length+1)/4) - k) * (data[k]-data[k-1]);
console.log("third quartile ",thirdQuartile);

console.log("maximum ",max);


var xScale = d3.scaleBand()
				.domain(d3.range(12))
				.rangeRound([0, w])
				.padding(3.5);
    
var yScale = d3.scaleLinear()
        .domain([minE,maxE])
		.range([h,0]);



var aux = xScale(indice); 

var line = svg.append("line")
			.attr("x1",xScale(indice))
			.attr("y1",yScale(min))
			.attr("x2",xScale(indice))
			.attr("y2",yScale(max))
			.attr("stroke","black")
			.attr("stroke-width","1.5");
			
var lineSup = svg.append("line")
			.attr("x1",function(d){
				return aux-25;
			})
			.attr("y1",yScale(max))
			.attr("x2",function(d){
				return aux+25;
			})
			.attr("y2",yScale(max))
			.attr("stroke","black")
			.attr("stroke-width","1.5");

var lineInf = svg.append("line")
			.attr("x1",function(d){
				return aux-25;
			})
			.attr("y1",yScale(min))
			.attr("x2",function(d){
				var aux = xScale(indice);
				return aux+25;
			})
			.attr("y2",yScale(min))
			.attr("stroke","black")
			.attr("stroke-width","1.5");

var rect = svg.append("rect")
			.attr("x",function(d){
				return aux-25;
			})
			.attr("y",yScale(thirdQuartile))
			.attr("height",yScale(firstQuartile)-yScale(thirdQuartile))
			.attr("width",50)
			.attr("fill","black")
			.attr("opacity","0.5")
			.attr("stroke","black");

		
var line_med = svg.append("line")
			.attr("x1",function(d){
				return aux-25;
			})
			.attr("y1",yScale(secondQuartile))
			.attr("x2",function(d){
				return aux+25;
			})
			.attr("y2",yScale(secondQuartile))
			.attr("stroke","black")
			.attr("stroke-width","1.5");

	ytickers.add(min);
	ytickers.add(max);
/*	ytickers.push(firstQuartile);
	ytickers.push(secondQuartile);
	ytickers.push(thirdQuartile);*/

}

var Meses = {};
	Meses[1] = [];
	Meses[2] = [];
	Meses[3] = [];
	Meses[4] = [];
	Meses[5] = [];
	Meses[6] = [];
	Meses[7] = [];
	Meses[8] = [];
	Meses[9] = [];
	Meses[10] = [];
	Meses[11] = [];
	Meses[12] = [];		


function entrada(ano,tipo){

	for(var i =0;i<nbWeather.length;i++){
		if(nbWeather[i].Year ===2015){
			var j = (nbWeather[i].Month);
			 Meses[j].push(nbWeather[i][tipo]);
		}
	
	}
	init(Meses);

	//boxPlot(Meses);
}

var minCallback = ( pre, cur ) => Math.min( pre, cur );
var maxCallback = ( pre, cur ) => Math.max( pre, cur );
	