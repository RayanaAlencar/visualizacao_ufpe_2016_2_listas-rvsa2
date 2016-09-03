function main(arrayentrada,colors){

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

var dataset = [50,30,20];
var colors = ["red","blue","green"];
/*var circle1 = svg
.append("g")
.attr('transform', 'translate(' + (700 / 2) +  ',' + (700 / 2) + ')')
.selectAll("circle")
.data(dataset)
.enter()
.append("circle")
.attr("cx", 10)
.attr("cy",10)
.attr("r",150)
.attr("fill-opacity","0")
.attr("border-radius","0.5")
.attr("stroke","red")
.attr("stroke-width","300")
.attr("stroke-dasharray","471 942")
.attr("stroke-dashoffset","0");*/
//border-radius:0.5;stroke:red;stroke-width:300;stroke-dasharray:471 942;stroke-dashoffset: 0");


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
.attr("fill-opacity","0")
.attr("border-radius","0.5")
.attr("stroke",function(d,i){
	console.log(i," ",colors[i]);
	return colors[i];
})
.attr("stroke-width","300")
.attr("stroke-dasharray", function(d){
	var valor = Math.round((942*d)/100);
	console.log("position:" ,valor);
	return valor +" 942";
})
.attr("stroke-dashoffset",function(d,i){
	if(i===0){
		console.log("posicao: 0");
		return "0";
	}else{
		var anteriores = dataset.slice(0,i);
		var valor = anteriores.reduce( (prev, curr) => prev + curr );
		console.log(valor);
		var position = Math.round((942*valor)/100);
		position = -1*(position);
		console.log("posicao: ",position);
		return position;
	}

});

/*
var circle2 = svg.select("g")
.append("circle")
.attr("cx", 10)
.attr("cy",10)
.attr("r",150)
.attr("style","fill-opacity:0;stroke:blue;border-radius:0.5;stroke-width:300;stroke-dasharray:283 942;stroke-dashoffset:-471");*/

/*
var circle2 = svg.select("g")
.append("circle")
.attr("cx", 10)
.attr("cy",10)
.attr("r",150)
.attr("style","fill-opacity:0;stroke:green;border-radius:0.5;stroke-width:300;stroke-dasharray:189 942;stroke-dashoffset:-753");
*/

}