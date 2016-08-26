 function attValue (atributo1,atributo2){
 	return function(obj){
 		var rObj = {};
   		rObj[atributo1] = obj[atributo1];
   		rObj[atributo2] = obj[atributo2];
   		return rObj;
 	}
}


function returnAttValues(arrayentrada,atributo1,atributo2){
	return arrayentrada.map(attValue(atributo1,atributo2));
}

function render(data,atributo1,atributo2,xmin,xmax,ymin,ymax) {
	console.log("aquiiii");
	console.log(xmin," ",xmax);
	var pontos = d3.select("body").select("svg").select("g").selectAll("circle").data(data);
	pontos.exit().remove();
	pontos.enter().append("circle").attr("cx", function (d,xmin,xmax){
												console.log(d," ",xmin,xmax);
												 return (d[atributo2]-xmin/xmax-xmin);
												 }
										).attr("cy", function (ymin,ymax){
												return function(d){ 
												 return (d[atributo1]-ymin/ymax-ymin);
												 }
											}).attr("r",50).attr("sytle","fill:rgb(204,102,0);stroke:black;stroke-width:8");
}


function calcPosition(data,especie,atributo1){



}
function getMinimum (arrayentrada,coluna){
	var saida =  arrayentrada.reduce(minn(coluna));
	saida = saida[coluna];
	console.log("O minimo valor do atributo ",coluna, " eh ",saida);
	return saida;
}

function getMax (arrayentrada,coluna){
	var saida =  arrayentrada.reduce(max(coluna));
	saida = saida[coluna];
	console.log("O maximo valor do atributo ",coluna, " eh ",saida);
	return saida;
}

function returnSpecie(arrayentrada,atributo){
	return arrayentrada.filter(isSomeSpecie(atributo));
}

 function isSomeSpecie (atributo){
 	return function(arrayentrada){
 	return (arrayentrada.Species === atributo);
 }
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
	var att1 = returnAttValues(arrayentrada,atributo1,atributo2);
	console.log("array um eh ",att1);
	var xMaximo = getMax(att1,atributo2);
	var xMin = getMinimum(att1,atributo2);
	var yMaximo = getMax(att1,atributo1);
	var yMin = getMinimum(att1,atributo1);
	d3.select("body").select("svg").select("g").append("line").attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",700).attr("style","fill:none;stroke:black;stroke-width:8");
	d3.select("body").select("svg").select("g").append("line").attr("x1",0).attr("y1",0).attr("x2",700).attr("y2",0).attr("style","fill:none;stroke:black;stroke-width:8");
	render(att1,atributo1,atributo2,xMin,xMaximo,yMin,yMaximo);
}