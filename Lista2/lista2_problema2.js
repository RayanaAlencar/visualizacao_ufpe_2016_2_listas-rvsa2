//Width and height
var margin = {top: 10, right: 20, bottom: 10, left: 20};
var width = 900 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

//
var generator  = d3.randomUniform(0, 1);
var colorScale = colorbrewer.Paired[12];
//			
var dataset = [];

function updateDataset(){
    
    var numPoints = 5;
    var newDataset = Array.apply(null, Array(numPoints)).map(function() { return generator(); });
    var totalSum = d3.sum(newDataset);
    newDataset =  newDataset.map(function(d){return d/totalSum;});
    
    dataset = newDataset;
}

function pieChart(probabilities, colors){
  var pie = svg
.append("circle")
.attr("cx", 450)
.attr("cy",250)
.attr("r",90)
.attr("style","fill:#ffdf80;stroke:#ffdf80;border-radius:0.5;stroke-width:180");

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
    //console.log(i," ",colors[i]);
    return colors[i];
})
.attr("stroke-width","180")
.attr("stroke-dasharray", function(d){
    var valor = Math.round((565*d)/100);
    //console.log("position:" ,valor);
    return valor +" 565";
})
.attr("stroke-dashoffset",function(d,i){
    if(i===0){
        //console.log("posicao: 0");
        return "0";
    }else{
        var anteriores = probabilities.slice(0,i);
        var valor = anteriores.reduce( (prev, curr) => prev + curr );
        //console.log(valor);
        var position = Math.round((565*valor)/100);
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

function renderDataset(){
    //Codigo para fazer insercao/remocao/update de elementos    
    //em algum momento voce provavelmente vai querer chamar algo como:
    //                                      pieChart(dataset,colorScale.slice(0,5))
    var probabilities = [50,30,20];
    var colors = ["red","blue","yellow"];
    pieChart(probabilities,colors);
}


function init(){
    //create clickable paragraph
    d3.select("body")
	.append("p")
	.text("Click on me!")
	.on("click", function() {
	    updateDataset();
	    renderDataset();
	});
    
    //Create SVG element
    var svg = d3.select("body")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    return svg;
}		  		  		  

//
var svg = init();
