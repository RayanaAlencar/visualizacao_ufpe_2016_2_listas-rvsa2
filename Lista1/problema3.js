 function attValue (atributo1,atributo2){
 	return function(obj){
 		var rObj = {};
   		rObj[atributo1] = obj[atributo1];
   		rObj[atributo2] = obj[atributo2];
   		rObj ["Species"]= obj["Species"];
   		return rObj;
 	}
}


function returnAttValues(arrayentrada,atributo1,atributo2){
	return arrayentrada.map(attValue(atributo1,atributo2));
}

function render(data,atributo1,atributo2,xmax,xmin,ymax,ymin) {
	console.log("atributo1 ",atributo1, " atributo2 ",atributo2);
	var svg = d3.select("body").select("svg");
	var xScale = d3.scaleLinear().domain([0, d3.max(data, function(d) { return d[atributo1]; })]).range([30, 670]);
	var yScale = d3.scaleLinear() .domain([0, d3.max(data, function(d) { return d[atributo2]; })]).range([670,30]);
	var pontos = svg.selectAll("circle").data(data);
	pontos.exit().remove();
	console.log("criando o circulo");
	pontos.enter().append("circle").attr("cx", function(d){return xScale(d[atributo1]);}).attr("cy", function(d){return yScale(d[atributo2]);}).attr("r",5).attr("fill",function(d){
	console.log(d["Species"]);
	if(d["Species"] ==="setosa"){
		return "red";
	}else if(d["Species"] ==="versicolor"){
		return "blue";
	}else{
		return "green";
	}
	} );
	var xAxis = d3.axisBottom(xScale).tickValues([xmin,xmax]);  //Set rough # of ticks
	console.log("x maximo ",xmax, " xmin ",xmin);
	console.log("y maximo ",ymax, " ymin ", ymin)
	var yAxis = d3.axisLeft(yScale).tickValues([ymin,ymax]);  //Set rough # of ticks
	var aux = svg.append("g").call(xAxis).attr("transform", "translate(0,670)");
	var aux2 = svg.append("g").call(yAxis).attr("transform", "translate(30,0)");
	svg.append("text").attr("y",680).attr("x",375).attr("dy", "1em").style("text-anchor", "middle").text(atributo1); 
	svg.append("text").attr("x",-350).attr("y",0).attr("dy", "1em").style("text-anchor", "middle").text(atributo2).attr("transform", "rotate(-90)"); 
}


function getMinimum (arrayentrada,coluna){
	var saida =  arrayentrada.reduce(minn(coluna));
	saida = saida[coluna];
	console.log("O minimo valor do atributo ",coluna, " eh ",saida);
	return saida;
}

function color(element){
	if(element ==="setosa"){
		return "red";
	}else if(element ==="versicolor"){
		return "blue";
	}else{
		return "yellow";
	}

}

function getMax (arrayentrada,coluna){
	var saida =  arrayentrada.reduce(max(coluna));
	saida = saida[coluna];
	console.log("O maximo valor do atributo ",coluna, " eh ",saida);
	return saida;
}


function minn(atributo){
		return function(pre,current,currentIndex,value){
			if(pre[atributo]<current[atributo]){
				return pre;
			}else{
				return current;
			}
		}
}

function max(atributo){
		return function(pre,current,currentIndex,value){
			if(pre[atributo]>current[atributo]){
				return pre;
			}else{
				return current;
			}
		}
}


function main(arrayentrada,atributo1,atributo2){
	var svg = d3.select("body").append("svg").attr("width", 700).attr("height", 700).attr("style","background-color:#ffb3ff;align").attr("align","center");
	var att1 = returnAttValues(arrayentrada,atributo1,atributo2);
	console.log("array um eh ",att1);
	var xMaximo = getMax(att1,atributo1);
	var xMin = getMinimum(att1,atributo1);
	var yMaximo = getMax(att1,atributo2);
	var yMin = getMinimum(att1,atributo2);
	render(att1,atributo1,atributo2,xMaximo,xMin,yMaximo,yMin);
}