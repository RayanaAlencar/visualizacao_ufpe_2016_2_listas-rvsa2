 function isSomeSpecie (atributo){
 	return function(arrayentrada){
 	return (arrayentrada.Species === atributo);
 }
}

 function notSomeSpecies (atributos){
 	return function(arrayentrada){
 		if(atributos.indexOf(arrayentrada.Species) <0){
 			return true;
 		}else{
 			return false;
 		}
 }
}

 function isSomeSpecies (atributos){
 	return function(arrayentrada){
 		if(atributos.indexOf(arrayentrada.Species) <0){
 			return false;
 		}else{
 			return true;
 		}
 }
}

function returnSpecie(arrayentrada,atributo){
	return arrayentrada.filter(isSomeSpecie(atributo));
}

function returnSpecies(arrayentrada,atributo){
	return arrayentrada.filter(isSomeSpecies(atributo));
}

function returnNotSpecies(arrayentrada,atributo){
	return arrayentrada.filter(notSomeSpecies(atributo));
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


function average(atributo){
		return function(pre,current,currentIndex,value){
			var sum = pre[atributo]+current[atributo];
			var aux = Object.create(pre);
			aux[atributo]=sum;
			return (aux);
	}
}


function getMinimum (arrayentrada,especie,coluna){
	var onlyEspecie = returnSpecie(arrayentrada,especie);
	//var aux = onlySetosa.map(function(a) {return a[atributo2];});
	//console.log(aux, " tamanho de ",atributo, " eh ", onlySetosa.length);
	var saida =  onlyEspecie.reduce(minn(coluna));
	saida = saida[coluna];
	console.log("O minimo valor do atributo ",coluna," da especie ",especie, " eh ",saida);
	return saida;
}

function getAverage(arrayentrada,especies,coluna){
	var onlyEspecies = returnSpecies(arrayentrada,especies);
	var sumColunas = onlyEspecies.reduce(average(coluna));
	sumColunas = sumColunas[coluna];
	var media = (sumColunas/onlyEspecies.length);
	console.log("Para a coluna", coluna, " a media eh ",media);
}

function getMaximumNotIn(arrayentrada,especies,coluna){
	var onlyNotEspecies = returnNotSpecies(arrayentrada,especies);
	var saida =  onlyNotEspecies.reduce(max(coluna));
	saida = saida[coluna];
	console.log("O maximo valor do atributo ",coluna," das especies que nao sao ",especies, " eh ",saida);
	return saida;
}

