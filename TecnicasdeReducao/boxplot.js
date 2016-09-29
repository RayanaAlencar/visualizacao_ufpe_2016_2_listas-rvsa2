var margin = {top: 10, right: 20, bottom: 10, left: 20};
var w = 900 - margin.left - margin.right;
var h = 900 - margin.top - margin.bottom;


var data = [903.88,1036.92,1098.04,1011.26,1020.7,915.38,1014.53,1097.79,934.52,1214.08,993.45,1120.19,860.41,1039.19,950.38,941.83,936.78,1086.98,1144.94,1066.12];
//data = [7.1, 7.4, 7.5, 7.7, 7.8, 7.9];
var data_length = data.length;
console.log("tamanho do array ",data_length);
var svg = d3.select("body")
			.append("svg")
			.attr("width", w)
			.attr("height", h)
			.attr("transform","translate(" + margin.left + "," + margin.top + ")");

var minCallback = ( pre, cur ) => Math.min( pre, cur );
var maxCallback = ( pre, cur ) => Math.max( pre, cur );
data = data.sort(function(a, b) {
  return a - b;
});
var min = data.reduce(minCallback);
var max = data.reduce(maxCallback);


var yScale = d3.scaleLinear().domain([10, max]).range([h,10]);

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



console.log(yScale(min),yScale(max),yScale(secondQuartile),yScale(thirdQuartile), yScale(thirdQuartile-firstQuartile));

var line = svg.append("line")
			.attr("x1",w/2)
			.attr("y1",yScale(min))
			.attr("x2",w/2)
			.attr("y2",yScale(max))
			.attr("stroke","black")
			.attr("stroke-width","1.5");
			
var lineSup = svg.append("line")
			.attr("x1",w/2-50)
			.attr("y1",yScale(max))
			.attr("x2",w/2+50)
			.attr("y2",yScale(max))
			.attr("stroke","black")
			.attr("stroke-width","1.5");
		
var lineInf = svg.append("line")
			.attr("x1",w/2-50)
			.attr("y1",yScale(min))
			.attr("x2",w/2+50)
			.attr("y2",yScale(min))
			.attr("stroke","black")
			.attr("stroke-width","1.5");

			
var rect = svg.append("rect")
			.attr("x",w/2-100)
			.attr("y",yScale(thirdQuartile))
			.attr("height",yScale(firstQuartile)-yScale(thirdQuartile))
			.attr("width",200)
			.attr("fill-opacity","0.5")
			.attr("stroke-width","20");
			
var line_med = svg.append("line")
			.attr("x1",w/2-100)
			.attr("y1",yScale(secondQuartile))
			.attr("x2",w/2+100)
			.attr("y2",yScale(secondQuartile))
			.attr("stroke","black")
			.attr("stroke-width","1.5");			
			
