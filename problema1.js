 function isSetosa (arrayentrada){
	if(arrayentrada.Species === "setosa"){
		return true;
	}else {
		return false;
	}
}


function maxSetosa (arrayentrada,coluna){
	var onlySetosa = isSetosa(arrayentrada);
	var maximo = ( pre, cur ) => Math.max( pre.x, cur.x );
	var azul =  [ { x: 22 }, { x: 42 } ].reduce(maximo);
	return azul;
}