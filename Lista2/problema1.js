function main(probabilities,colors){

var svg = d3
.select("body")
.append("svg")
.attr("width", 900)
.attr("height", 500)
.attr("style","background-color:#e6e6ff;align")
.append("g")
.attr("transform", "translate(" + 20+ "," + 10+ ")");

/*var pie = svg
	.append("circle")
	.attr("cx", 450)
	.attr("cy",250)
	.attr("r",90)
	.attr("style","fill:#ffdf80;stroke:#ffdf80;border-radius:0.5;stroke-width:180");
*/

var circle1 = svg
	.append("g")
	.selectAll("circle")
	.data(probabilities)
	.enter()
	.append("circle")        
	.attr("cx", 450)
	.attr("cy",250)
	.attr("r",90)
	.attr("fill-opacity","0")
	.attr("border-radius","0.5")
	.attr("stroke",function(d,i){
		return colors[i];
	})
	.attr("stroke-width","90")
	.attr("stroke-dasharray", function(d,i){
		var d = d*100;
		var valor = Math.round((565*d)/100);    
		return valor +" 565";
	})
	.attr("stroke-dashoffset",function(d,i){
		if(i===0){
			return "0";
		}else{
			var anteriores = probabilities.slice(0,i);
			var valor = anteriores.reduce( (prev, curr) => prev + curr );
			valor = valor*100;
			var position = Math.round((565*valor)/100);
			position = -1*(position);
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
		return (d*100) + "%"
	})
	.attr("x","715")
	.attr("y",function(d,i){
		return 40+20+18+i*45;
	})
	.attr("font-size","20px");

	}

