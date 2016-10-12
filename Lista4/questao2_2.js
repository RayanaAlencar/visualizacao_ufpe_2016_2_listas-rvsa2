var margin = {top: 20, right: 20, bottom: 20, left: 20};
var w = 900 - margin.left - margin.right;
var h = 900 - margin.top - margin.bottom;

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

function init(entrada){

	var svg = d3.select("body").select("svg");

	var arrays =[];

	for(var i =0;i<entrada.length;i++){
		arrays.push(gaus(entrada[i]));
	}
	console.log("gaus ",arrays);

	svg.selectAll("circle")
		.data(arrays)
		.enter()
		.append("circle")
		.attr("cx",function(d,i){
			return xScale(entrada[i]);
		})
		.attr("cy",function(d,i){
			return yScale(d);
		})
		.attr("r",2);
}
