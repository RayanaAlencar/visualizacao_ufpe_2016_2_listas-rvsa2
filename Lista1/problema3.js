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

function render(data,atributo1,atributo2) {
	console.log("aquiiii");
	var pontos = d3.select("body").select("svg").select("g").selectAll("circle").data(data);
	pontos.exit().remove();
	pontos.enter().append("circle").attr("cx",function(d){ return d[atributo1];}).attr("cy",function(d){ return d[atributo2];}).attr("r",50).attr("sytle","fill:rgb(204,102,0);stroke:black;stroke-width:8");
}


function calcPosition(data,especie,atributo1){



}
function getMinimum (arrayentrada,especie,coluna){
	var onlyEspecie = returnSpecie(arrayentrada,especie);
	var saida =  onlyEspecie.reduce(minn(coluna));
	saida = saida[coluna];
	//console.log("O minimo valor do atributo ",coluna," da especie ",especie, " eh ",saida);
	return saida;
}

function getMax (arrayentrada,especie,coluna){
	var onlyEspecie = returnSpecie(arrayentrada,especie);
	var saida =  onlyEspecie.reduce(max(coluna));
	saida = saida[coluna];
	//console.log("O maximo valor do atributo ",coluna," da especie ",especie, " eh ",saida);
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
	d3.select("body").select("svg").select("g").append("line").attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",700).attr("style","fill:none;stroke:black;stroke-width:8");
	d3.select("body").select("svg").select("g").append("line").attr("x1",0).attr("y1",0).attr("x2",700).attr("y2",0).attr("style","fill:none;stroke:black;stroke-width:8");
	render(att1,atributo1,atributo2);
}