 function isSetosa (atributo){
 	return function(arrayentrada){
 	return (arrayentrada.Species === atributo);
 }
}
function returnSetosa(arrayentrada,atributo){
	return arrayentrada.filter(isSetosa(atributo));
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


function getMinimum (arrayentrada,atributo,atributo2){
	var onlySetosa = returnSetosa(arrayentrada,atributo);
	//var aux = onlySetosa.map(function(a) {return a[atributo2];});
	//console.log(aux, " tamanho de ",atributo, " eh ", onlySetosa.length);
	var saida =  onlySetosa.reduce(minn(atributo2));
	return saida[atributo2];
}

