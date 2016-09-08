//Width and height
var margin = {top: 10, right: 20, bottom: 10, left: 20};
var width = 900 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var dataset = [
    [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
    [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
];



function renderDataset(){
	    //
    var xScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d[0]; })])
        .range([0, width]);
    //
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d[1]; })])
	.range([height,0]);

    //
    var rScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d[1]; })])
	.range([5,8]);

    //
    var cScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d[1]; })])
	.range(["gray","red"]);
    
    
    //
    var xAxis = d3.axisBottom(xScale).ticks(6);		  
    var xAxisGroup = d3.select("#xAxis")
	.transition()
	.call(xAxis);

    //
    var yAxis = d3.axisLeft(yScale).ticks(6);		  
    var yAxisGroup = d3.select("#yAxis").transition().call(yAxis);		    		  	

    //
    var circleSelection = svg.selectAll("circle")
	.data(dataset);
   // console.log("svg aquii 1",svg);
    //Remove circles that are not needed
    circleSelection
	.exit()
	.attr("fill","rgba(255, 255, 255, 0)")
	.remove();
    
    //Create circles
    circleSelection
	.enter()
	.append("circle")
	.attr("cx", function(d) {
	    return xScale(d[0]);
	})
	.attr("cy", function(d) {
	    return yScale(d[1]);
	})
	.attr("r", function(d) {
	    return rScale(d[1]);
	})
	.attr("fill", function(d){
	    return "black";//cScale(d[1]);
	});

//var svg = d3.select("body").select("svg");
/*svg = svg.selectAll("rect");
console.log("svg aquii",svg);*/
var svgall = d3.select("body").select("svg");
	svgall.on( "mousedown", function() {
   // console.log("mousedown");
    var p = d3.mouse( this);

    svgall.append("rect")
    .attr("x",p[0])
    .attr("y",p[1])
    .attr("rx","6")
    .attr("ry","6")
	.attr("width",0)
	.attr("height",0)
    .attr("stroke","red")
    .attr("stroke-width","1px")
    .attr("stroke-dasharray", "4px")
    .attr("stroke-opacity"," 0.5")
    .attr("fill","transparent")
    .attr("class","selection");
    
})
.on( "mousemove", function() {
       	var s = svgall.select( "rect");
       //  console.log("mousemove");
      // console.log("estou aqui ",!s.empty()," s eh ",s.attr( "x"));
    if( !s.empty()) {
        var p = d3.mouse(this);
           // console.log("valor de p eh ",p);
          var  d = {
                "x"  : parseInt( s.attr( "x"), 10),
                "y"   : parseInt( s.attr( "y"), 10),
               "width" : parseInt( s.attr( "width"), 10),
               "height" : parseInt( s.attr( "height"), 10)
            };
           // console.log("valor de d eh ", d);
         var   move = {
                "x" : p[0] - d.x,
                "y" : p[1] - d.y
           }
        ;

        //console.log("O valor de p eh  ",p, " o valor de move eh ", move);
        if( move.x < 1 || (move.x*2<d.width)) {
            d.x = p[0];
            d.width -= move.x;
        } else {
            d.width = move.x;       
        }

        if( move.y < 1 || (move.y*2<d.height)) {
            d.y = p[1];
            d.height -= move.y;
        } else {
            d.height = move.y;       
        }
       
        s.attr("x",d.x).attr("y",d.y).attr("width",d.width).attr("height",d.height);
      //  console.log( "valor de d por ultimo eh ",d);
    }
}).on( "mouseup", function() {
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    var rect = svgall.select("rect");
     var  d = {
                "x"  : parseInt( rect.attr( "x"), 10),
                "y"   : parseInt( rect.attr( "y"), 10),
               "width" : parseInt( rect.attr( "width"), 10),
               "height" : parseInt( rect.attr( "height"), 10)
            };
    console.log("variaveis do rect eh ", d );
    var largura = d.x + d.width;
    var comprimento = d.y + d.height;
    var circles = svg.selectAll("circle");
    circles.attr("fill", function(c){
        var dx = d.x;
        var dy = d.y;
        var cx = xScale(c[0]);
        var cy = yScale(c[1]);
        var cr = rScale(c[1]);
        var ax = d.x;
        var ay = d.y;
        var bx = d.x +width;
        var by = d.y;
        var ex = d.x+height;
        var ey = d.y;
        var fx = d.x+width;
        var fy = d.y+height;

        //var matr = Math.matrix([ax,ay,1],[bx,by,1],[]) 
        console.log("-----------------------------------------------------");
        console.log("circulo raio",cr ," x ",cx, " y ",cy, " retangulo d x ",dx," d.y ",dy," largura ", largura, " comprimento ",comprimento);
        if(cx+cr>=dx && cx+cr <= largura && cy+cr>=dy && cy+cr <= comprimento ){
            console.log("Pintei de VERMELHO ");
            return "red";
        }
        return "black";//cScale(d[1]);
    });
    rect.remove();
});
  /*  circleSelection
    .enter()
	.append("circle")
    .transition()
	 .delay(function(d,i){return 100*i;})
	 .duration(1000)
	.attr("cx", function(d) {
	    return xScale(d[0]);
	})
	.attr("cy", function(d) {
	    return yScale(d[1]);
	})
	.attr("r", function(d) {
	    return 2;
	})
	.attr("fill", function(d){
	    return  cScale(d[1]);
	});*/
    
}


function init(){
    //create clickable paragraph
    d3.select("body")
	.append("p")
	.text("Click on me!")
	.on("click", function() {
	    renderDataset();
	});
    
    //Create SVG element
    var crudeSVG = d3.select("body")
	.append("svg");

    var svg = crudeSVG
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //
    //var circlesGroup = svg..attr("id","circles");
    
    //
    svg.append("g").attr("id","xAxis").attr("transform","translate(0," + (height - margin.bottom) + ")");
    svg.append("g").attr("id","yAxis").attr("transform","translate(" + (margin.left) + ",0)");
    
    return svg;
}		  		  		  

//
var svg = init();
