function main(arrayentrada,arraycolors){

var svg = d3.select("body")
.append("svg")
.attr("width", 700)
.attr("height", 700)
.attr("style","background-color:#e6e6ff;align")
.attr("align","center");

var pie = svg.append("g")
.attr('transform', 'translate(' + (700 / 2) +  ',' + (700 / 2) + ')')
.append("circle")
.attr("cx", 10)
.attr("cy",10)
.attr("r",150)
.attr("style","fill:#ffdf80;stroke:#ffdf80;border-radius:0.5;stroke-width:300");

var dataset = [50];

var circle1 = svg
.append("g")
.attr('transform', 'translate(' + (700 / 2) +  ',' + (700 / 2) + ')')
.selectAll("circle")
.data(dataset)
.enter()
.append("circle")
.attr("cx", 10)
.attr("cy",10)
.attr("r",150)
.attr("style","fill-opacity:0;border-radius:0.5;stroke:red;stroke-width:300;stroke-dasharray:471 943;stroke-dashoffset: 0");

/*
var circle1 = svg
.append("g")
.attr('transform', 'translate(' + (700 / 2) +  ',' + (700 / 2) + ')')
.selectAll("circle")
.data(dataset)
.enter()
.append("circle")
.attr("cx", 10)
.attr("cy",10)
.attr("r",150)
.attr("style","fill-opacity:0;border-radius:0.5;stroke:red;stroke-width:300;stroke-dasharray:" + function(d){
	var valor = ()

} 471 + "943;stroke-dashoffset:0");


*/

var circle2 = svg.select("g")
.append("circle")
.attr("cx", 10)
.attr("cy",10)
.attr("r",150)
.attr("style","fill-opacity:0;stroke:blue;border-radius:0.5;stroke-width:300;stroke-dasharray:283 943;stroke-dashoffset:-471");


var circle2 = svg.select("g")
.append("circle")
.attr("cx", 10)
.attr("cy",10)
.attr("r",150)
.attr("style","fill-opacity:0;stroke:green;border-radius:0.5;stroke-width:300;stroke-dasharray:188 943;stroke-dashoffset:-659 ");


}1