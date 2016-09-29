var margin = {top: 10, right: 20, bottom: 10, left: 20};
var w = 900 - margin.left - margin.right;
var h = 900 - margin.top - margin.bottom;


var data = [1,2,3,4,5,8,9,4,1,5];
var data_length = data.length;
console.log("tamanho do array ",data_length);
data = data.sort(function(a, b) {
  return a - b;
});

var svg = d3.select("body")
			.append("svg")
			.attr("width", w)
			.attr("height", h)
			.attr("transform","translate(" + margin.left + "," + margin.top + ")");

var totalClass = 3;

var minCallback = ( pre, cur ) => Math.min( pre, cur );
var maxCallback = ( pre, cur ) => Math.max( pre, cur );

var min = data.reduce(minCallback);
var max = data.reduce(maxCallback);

var limiteEsquerda = 7;
var limiteDireita = 8;

var largura = Math.round((max - min)/totalClass);
console.log("largura ",largura);
console.log("total de classes ", totalClass);
var range = calcRange(min,largura,totalClass);
function calcRange(min,largura,totalClass){
	var range =[];
	var x = min;
	var y =0;
	for( var i =0;i<totalClass;i++){
		var obj = {};
		obj.x = x;
		obj.y = x+largura;
		range.push(obj);
		x = obj.y;
	}
	
	return range;
}
console.log("range" , range);

var frequencia = [];
for (var i =0;i<data_length;i++){
	frequencia.push(0);
}
console.log("frequencia" , frequencia);
function calFrequencia (range,data,data_length,frequencia){
	var aux =0;
	var obj = 0;
	for(var i =0;i<data_length;i++){
		aux = data[i];
		for(var j =0;j<range.length;j++){
			if(aux >= obj.x && aux <= obj.y){
				frequencia[j] = frequencia[j]+1; 
			}
		}
	}
}
frequencia = calFrequencia(range,data,data_length,frequencia);
console.log("frequencia" , frequencia);