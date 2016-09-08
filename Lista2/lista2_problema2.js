
//Width and height
var margin = {top: 10, right: 20, bottom: 10, left: 20};
var width = 900 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var total = 0;
var firstTime = true;
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
total = total+1;
console.log("------------------------------------------------------------")
    
    if(total===3){
        probabilities = [0.5,0.5];
    }

    console.log("total ",total, " probabilities ",probabilities.length," ",probabilities);
    
    var circleSelection = svg
            .selectAll("circle")
            .data(probabilities);

    circleSelection.exit().remove();

    circleSelection
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

circleSelection
            .transition()
            .delay(function(d, i) {
            var delay = 50;
            return delay;
            })
            .duration(function(d, i) {
                var duration = 1000;
                return duration;
            })
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



    var legendaCor = svg
    .selectAll("rect")
    .data(probabilities); 

    legendaCor.exit().remove();

    legendaCor
    .enter()
    .append("rect")
    .transition()
    .delay(50)
    .attr("x",function(d){
        return 680;
    })
    .attr("y",function(d,i){
        return 40+20+i*40;
    })
    .attr("width",100)
    .attr("height",35)
    .style("fill", function(d,i) { return colors[i]; });

    legendaCor
    .transition()
    .attr("x",function(d){
        return 680;
    })
    .attr("y",function(d,i){
        return 40+20+i*40;
    })
    .attr("width",100)
    .attr("height",35)
    .style("fill", function(d,i) { return colors[i]; });


    var legendaTexto = svg
   // .select("g")
    .selectAll("text")
    .data(probabilities);

    legendaTexto.exit().remove();

    legendaTexto
    .enter()
    .append("text")
    .text(function(d,i){
        var d = parseFloat(d*100).toFixed(2);;
        return d + "%";
    }).attr("x","710")
    .attr("y",function(d,i){
        var y = 72+20+i*35+i;
        console.log("indice ",i," valor de y ",y);
        return y;
    })
    .attr("font-size","18px");

    legendaTexto
    .transition()
    .delay(function(d, i) {
            var delay = 500;
            return delay;
            })
            .duration(function(d, i) {
                var duration = 1000;
                return duration;
    })
    .text(function(d,i){
    var d = parseFloat(d*100).toFixed(2);;
    return d + "%";
    })
    .attr("x","710")
    .attr("y",function(d,i){
        var y = 72+20+i*35+i;
        console.log("indice ",i," valor de y ",y);
        return y;
    })
    .attr("font-size","18px");




}

function renderDataset(){
    //Codigo para fazer insercao/remocao/update de elementos    
    //em algum momento voce provavelmente vai querer chamar algo como:
    //pieChart(dataset,colorScale.slice(0,5))
  
   


    
         pieChart(dataset,colorScale.slice(0,5));
        
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