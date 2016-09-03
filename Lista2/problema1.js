function main(probabilities,colors){

var svg = d3
.select("body")
.append("svg")
.attr("width", 900)
.attr("height", 900)
.attr("style","background-color:#e6e6ff;align")
.attr("align","center");

var pie = svg
.append("g")
.attr('transform', 'translate(' + (700 / 2) +  ',' + (700 / 2) + ')')
.append("circle")
.attr("cx", 10)
.attr("cy",10)
.attr("r",150)
.attr("style","fill:#ffdf80;stroke:#ffdf80;border-radius:0.5;stroke-width:300");


var circle1 = svg
.append("g")
.attr('transform', 'translate(' + (700 / 2) +  ',' + (700 / 2) + ')')
.selectAll("circle")
.data(probabilities)
.enter()
.append("circle")
.attr("cx", 10)
.attr("cy",10)
.attr("r",150)
.attr("fill-opacity","0")
.attr("border-radius","0.5")
.attr("stroke",function(d,i){
	//console.log(i," ",colors[i]);
	return colors[i];
})
.attr("stroke-width","300")
.attr("stroke-dasharray", function(d){
	var valor = Math.round((942*d)/100);
	//console.log("position:" ,valor);
	return valor +" 942";
})
.attr("stroke-dashoffset",function(d,i){
	if(i===0){
		//console.log("posicao: 0");
		return "0";
	}else{
		var anteriores = probabilities.slice(0,i);
		var valor = anteriores.reduce( (prev, curr) => prev + curr );
		//console.log(valor);
		var position = Math.round((942*valor)/100);
		position = -1*(position);
		//console.log("posicao: ",position);
		return position;
	}

});

var text = svg
.append("text")
.text("Legenda :")
.attr("x","685")
.attr("y","45")
.attr("font-size","20px");


var legendaCor = svg
.selectAll("rect")
.data(probabilities)
.enter()
.append("rect")
.attr("x",function(d){
	return 680;
})
.attr("y",function(d,i){
	return 40+20+i*40;
})
.attr("width",100)
.attr("height",40)
.style("fill", function(d,i) { return colors[i]; });

var legendaTexto = svg
.append("g")
.selectAll("text")
.data(probabilities)
.enter()
.append("text")
.text(function(d){
	return d + "%"
})
.attr("x","730")
.attr("y",function(d,i){
	return 40+20+18+i*45;
})
.attr("font-size","20px");

}

