 function isSomeSpecie (atributo){
 	return function(arrayentrada){
 	return (arrayentrada.Species === atributo);
 }
}
 function isSomeSpecies (atributos){
 	return function(arrayentrada){
 		console.log(atributos, " ")
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

function minn(atributo){
		return function(pre,current,currentIndex,value){
			if(pre[atributo]<current[atributo]){
				return pre;
			}else{
				return current;
			}
		}
}

function avarege(atributo){
		return function(pre,current,currentIndex,value){
			return (pre[atributo]+current[atributo]);
	}
}


function getMinimum (arrayentrada,especie,coluna){
	var onlyEspecie = returnSpecie(arrayentrada,especie);
	//var aux = onlySetosa.map(function(a) {return a[atributo2];});
	//console.log(aux, " tamanho de ",atributo, " eh ", onlySetosa.length);
	var saida =  onlyEspecie.reduce(minn(coluna));
	return saida[coluna];
}

function getAverage(arrayentrada,especies,coluna){
	var onlyEspecies = returnSpecies(arrayentrada,especies);
	console.log("retorno das especies foi " ,onlyEspecies, " tamanho desse array eh de ", onlyEspecies.length);
	var media = onlyEspecies.reduce(function(a[coluna],b[coluna]){ return a[coluna]+b[coluna]});
	console.log("para a coluna", coluna, " a media eh ",media);

}

