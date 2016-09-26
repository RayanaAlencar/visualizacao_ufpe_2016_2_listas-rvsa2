			var margin = {top: 20, right: 20, bottom: 70, left: 20};
			var w = 900 - margin.left - margin.right;
			var h = 500 - margin.top - margin.bottom;
			var w2 = 500- margin.left - margin.right;
			var h2 = 500- margin.top - margin.bottom;
			var xOffset = 0;
			var yOffset = 0;
			var initialMousePosition  = [0,0] 
			var state = "idle";
			var tiposAcidente = ["Automóveis e outros","Ciclistas","Ciclomotores","Motocicletas","Pedestres"];
			var causasAcidentes = {};
				causasAcidentes["Automóveis e outros"] =0;
				causasAcidentes["Ciclistas"]=0;
				causasAcidentes["Ciclomotores"]=0;
				causasAcidentes["Motocicletas"]=0;
				causasAcidentes["Pedestres"]=0;
			var dictNovembro = {};
				dictNovembro["Automóveis e outros"] =0;
				dictNovembro["Ciclistas"]=0;
				dictNovembro["Ciclomotores"]=0;
				dictNovembro["Motocicletas"]=0;
				dictNovembro["Pedestres"]=0;
			
			var acidentesNovembro =[];
			var arrayJson = [];
			var projecao = 100000;
			var svg2 =0;
			//var first = true;
			
	function init(){ 
			//Define path generator
			var projection = d3.geoMercator()
			.translate([w/2, h/2])
			.center([-34.87986,-8.05596])
			.scale(projecao);

			var path = d3.geoPath()
				.projection(projection);

			//Create SVG element
			var svg = d3.select("body")
						.append("svg")
						.attr("width", w)
						.attr("height", h)
						.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			 svg2 = d3.select("body")
						.append("svg")
						.attr("class","painel2")
						.attr("width", w2+margin.left + margin.right)
						.attr("height", h2+margin.bottom + margin.top)
						.append("g")
						.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			
			  svg2.append("g")
					 .attr("id","xAxis")
					 .attr("transform","translate(0," + h2 + ")");
   			 
   			 svg2.append("g")
   			 		.attr("class","histograma")
   			 		

			d3.json("bairros.json", function(json) {
					for(var i =0;i<json.features.length;i++){
						var obj = json.features[i];
						//console.log(typeof(obj)," " , obj);
						arrayJson.push(obj);
						//console.log("Tamanho de arrayJson eh ",arrayJson.length);
					}
				//Bind data and create one path per GeoJSON feature
				svg.selectAll("path")
				   .data(json.features)
				   .enter()
				   .append("path")
				   .attr("d", path)
				   .attr("fill","#87CEFA")
				   .attr("stroke","white");
		
			});
			
			
			d3.json("acidentes-2014-11-novembro.json",function(data){
				var aux = data.features;
				for (var i = 0; i < aux.length; i++) {
						var cood = aux[i];
						acidentesNovembro.push(cood);
				}
			});


			var svgall = d3.select("body").select("svg");		  		
		
			d3.select("svg")
			.on("click",function(d){
				//console.log("click ",state);
				var p = d3.mouse( this);
				initialMousePosition = p;
				if(state=="pan"){
					state = "idle";
				}else{
					state = "pan";
				}
				d3.event.stopPropagation();
				d3.event.preventDefault();
				//console.log("click");
			})
			.on("mousemove",function(d){
				//console.log("mousemove ",state);
				if(state === "pan"){
				var p = d3.mouse( this),
					move = {
						x : p[0] - initialMousePosition[0],
						y : p[1] - initialMousePosition[1]
					};

				xOffset += (move.x);
				yOffset += (move.y);
				initialMousePosition = p;    
					renderDataset();
				}
				d3.event.stopPropagation();
				d3.event.preventDefault();

				  	var s = svgall.select( "rect");

			    if( !s.empty()) {
			        var p = d3.mouse(this);

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
			})
			.on("mouseup",function(d){	
				//console.log("mouseup ",state);
				//state = "idle";
				renderDataset();
				d3.event.stopPropagation();
				d3.event.preventDefault();
				var rect = svgall.select("rect");
			     var  d = {
			                "x"  : parseInt( rect.attr( "x"), 10),
			                "y"   : parseInt( rect.attr( "y"), 10),
			               "width" : parseInt( rect.attr( "width"), 10),
			               "height" : parseInt( rect.attr( "height"), 10)
			            };
			    //console.log("variaveis do rect eh ", d );
			    var largura = d.x + d.width;
			    var comprimento = d.y + d.height;
			   	var entrou = 0;
			   var circles =  d3.select("svg").selectAll("circle");

			   circles.attr("opacity", function(c){
					var dx = d.x;
			    	var dy = d.y;
			        var cx = d3.select(this).attr("cx");
			        var cy = d3.select(this).attr("cy");

			    	if(cx>=dx && cx <= largura && cy>=dy && cy <= comprimento ){
			    		entrou = 1;
			           causasAcidentes[c.properties.tipo] = causasAcidentes[c.properties.tipo] +1;
			           return 1;
			        }
			        	return 0.3;
				});
		    	/*.each(function(c){
				var dx = d.x;
		    	var dy = d.y;
		        var cx = d3.select(this).attr("cx");
		        var cy = d3.select(this).attr("cy");

		    	if(cx>=dx && cx <= largura && cy>=dy && cy <= comprimento ){
		    		entrou = 1;
		           causasAcidentes[c.properties.tipo] = causasAcidentes[c.properties.tipo] +1;
		        }
		    });*/
			    	if(entrou===1){ //entao foi selecionado algum ponto
			    		histograma(1);
			    		entrou =0;
			    	}else {
			    		//console.log("nenhum selecionado");
			    		histograma(0);
			    	}
			   		console.log("Total de acidentes por tipo : ")
			   		console.log("Automóveis e outros",causasAcidentes["Automóveis e outros"]);
			   		console.log("Ciclistas",causasAcidentes["Ciclistas"]);
			   		console.log("Ciclomotores",causasAcidentes["Ciclomotores"]);
			   		console.log("Motocicletas",causasAcidentes["Motocicletas"]);
			   		console.log("Pedestres",causasAcidentes["Pedestres"]);

					causasAcidentes["Automóveis e outros"] =0;
					causasAcidentes["Ciclistas"]=0;
					causasAcidentes["Ciclomotores"]=0;
					causasAcidentes["Motocicletas"]=0;
					causasAcidentes["Pedestres"]=0;
				    rect.remove();
			})
			.on("wheel.zoom",function(d){
					//console.log("zoom ",state);
					d3.event.stopPropagation();
					d3.event.preventDefault();
					if(d3.event.wheelDeltaY > 0)
					projecao = projecao+(100000/2);
					else
					projecao = projecao-(100000/2);
					renderDataset();  
			}).on("contextmenu", function(d, i) {
					//console.log("left ",state);
					d3.event.preventDefault();
					var p = d3.mouse( this);
				    svgall.append("rect")
				    .attr("x",p[0])
				    .attr("y",p[1])
				    .attr("rx","6")
				    .attr("ry","6")
					.attr("width",0)
					.attr("height",0)
				    .attr("stroke","black")
				    .attr("stroke-width","2px")
				    .attr("stroke-dasharray", "4px")
				    .attr("stroke-opacity"," 0.5")
				    .attr("fill","transparent")
				    .attr("class","selection");
			});
	

		d3.select("input").on("change", function(){
			//console.log(this.checked);
			if(this.checked){
				acidentes();
			}else {
				removeAcidentes();
			}
		});

}
		function removeAcidentes(){
			d3.selectAll("circle").style("fill", "transparent");
			d3.select("body").select("svg.painel2").selectAll("rect").attr("fill", "transparent");
			d3.select("body").select("svg.painel2").selectAll("text").attr("fill", "transparent");
		}	

		function acidentes(){


			var svg = d3.select("svg");

			var projection = d3.geoMercator()
				.translate([w/2+xOffset, h/2+ yOffset])
				.center([-34.87986,-8.05596])
				.scale(projecao);

				var aci = svg.selectAll("circles").data(acidentesNovembro);

				aci
				.exit()
				.remove();
					
				aci
				.enter()
				.append("circle")
				.attr("r",5)
				//.attr("transform", function(d) {return "translate(" + projection([d.properties.longitude,d.properties.latitude]) + ")";})
				.attr("cx", function(d) {
	                   return (projection([d.properties.longitude, d.properties.latitude]))[0];
	           	})
				.attr("cy", function(d) {
	                   return (projection([d.properties.longitude, d.properties.latitude]))[1];
	           	})
				.attr("fill",function(d){
					return pintar(d); 
				} );
				

				aci
				.attr("r",5)
				.attr("cx", function(d) {
	                   return projection([d.properties.longitude, d.properties.latitude])[0];
	           	})
				.attr("cy", function(d) {
	                   return projection([d.properties.longitude, d.properties.latitude])[1];
	           	})
				//.attr("transform", function(d) {return "translate(" + projection([d.properties.longitude,d.properties.latitude]) + ")";})
				.attr("fill",function(d){
					return pintar(d); 
				});
			
					histograma(0);


				svg2.selectAll("rect").on("click",function(a,b){
					
					var rects = svg2.selectAll("rect");
					 rects.attr("opacity", function(c,d){
					 		if(d==b){
					 			return 1;
					 		}
					 		return 0.3;
					 });
					
					var circles = svg.selectAll("circle");
					circles.attr("opacity",function(c,d){
						//console.log("estou na selecao ",c.properties.tipo);
						var aux = tiposAcidente.indexOf(c.properties.tipo);
							if(aux==b){
						 			return 1;
						 		}
						 		return 0.3;
					});
					

				});
		}


		function histograma(controle){
			
			var data =[];
			var positionOpacity =[0.3,0.3,0.3,0.3,0.3];
			for(var i =0;i<acidentesNovembro.length;i++){
	 					dictNovembro[acidentesNovembro[i].properties.tipo] = dictNovembro[acidentesNovembro[i].properties.tipo] +1;
			}
			if(controle===0){
					
					for(var j =0; j<tiposAcidente.length;j++){
						var ac = tiposAcidente[j];
						var aux = dictNovembro[ac];
						data.push(aux);
					}
					
			}else {
					//console.log(causasAcidentes);
					data.push(causasAcidentes["Automóveis e outros"]);
			   		data.push(causasAcidentes["Ciclistas"]);
			   		data.push(causasAcidentes["Ciclomotores"]);
			   		data.push(causasAcidentes["Motocicletas"]);
			   		data.push(causasAcidentes["Pedestres"]);

			   		for(var j=0;j<data.length;j++){
			   			if(data[j]===0){
			   				//console.log(data);
			   				var ac = tiposAcidente[j];
							var aux = dictNovembro[ac];
							data[j] = aux;
			   			}else{
			   				positionOpacity[j]=1;
			   			}
			   		}

			}

			dictNovembro["Automóveis e outros"] =0;
			dictNovembro["Ciclistas"]=0;
			dictNovembro["Ciclomotores"]=0;
			dictNovembro["Motocicletas"]=0;
			dictNovembro["Pedestres"]=0;
					

		var xScale = d3.scaleBand()
						.domain(d3.range(data.length))
						.rangeRound([0, w2])
      					.padding(0.05);
      
		var yScale = d3.scaleLinear()
						.domain([0, d3.max(data)])
						.range([h2, 0]);

		
			var histo = d3.select("body").select("svg.painel2").select("g.histograma").selectAll("rect").data(data);
			
			histo.exit()
				.remove();
					
			histo
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
			   		return xScale(i);
			   })
			   .attr("y", function(d) {
			   		return yScale(d);
			   })
			   .attr("width", xScale.bandwidth())
			   .attr("height", function(d) {
			   		return h2 - yScale(d);
			   })
			   .attr("fill",function(d,i){
			   	return pintarHisto(i);
			   })
			   .attr("opacity",function(d,i){
			   	return positionOpacity[i];
			   })
			   .append("title")
			   .text(function(d,i) {
			         return tiposAcidente[i];
			   });


			histo
			   .attr("x", function(d, i) {
			   		return xScale(i);
			   })
			   .attr("y", function(d) {
			   		return yScale(d);
			   })
			   .attr("width", xScale.bandwidth())
			   .attr("height", function(d) {
			   		return h2 - yScale(d);
			   })
			   .attr("fill",function(d,i){
			   	return pintarHisto(i);
			   })
			   .attr("opacity",function(d,i){
			   	return positionOpacity[i];
			   })
			   .append("title")
			   .text(function(d,i) {
			         return tiposAcidente[i];
			   }).attr("font-size", "14px");

			   var labels = d3.select("body").select("svg.painel2").select("g.histograma").selectAll("text").data(data);

			   labels
			   .enter()
			   .append("text")
			   .text(function(d) {
				        return d;
				  	 })
				  .attr("text-anchor", "middle") 
				   .attr("x", function(d, i) {
				   		return xScale(i) + xScale.bandwidth() / 2;
				   })
				   .attr("y", function(d) {
				   		return yScale(d) + 14;
				   })
				   .attr("font-family", "sans-serif")
				   .attr("font-size", "14px")
				   .attr("fill", "white");


			labels
			   .text(function(d) {
				        return d;
				  	 })
				  .attr("text-anchor", "middle") 
				   .attr("x", function(d, i) {
				   		return xScale(i) + xScale.bandwidth() / 2;
				   })
				   .attr("y", function(d) {
				   		return yScale(d) + 14;
				   })
				   .attr("font-family", "sans-serif")
				   .attr("font-size", "14px")
				   .attr("fill", "white")
				   .attr("opacity",2);

			
				var xAxis = d3.axisBottom(xScale).tickFormat(function(d) { return tiposAcidente[d]; });		  
			    var xAxisGroup = d3.select("#xAxis")
				.transition()
				.call(xAxis);
				first = false;
			
			

		}

		function pintarHisto (d){
				if(d===0){
					return "blue";
				}else if (d===1){
					return "green";
				}else if(d===2){
					return "purple";
				}else if(d===3){
					return "red";
				}else if(d===4){ 
					return "black";
				}
			
		}

		function pintar (d){
				if(d.properties.tipo==="Automóveis e outros"){
					return "blue";
				}else if (d.properties.tipo==="Ciclistas"){
					return "green";
				}else if(d.properties.tipo==="Ciclomotores"){
					return "purple";
				}else if(d.properties.tipo==="Motocicletas"){
					return "red";
				}else if(d.properties.tipo==="Pedestres"){ 
					return "black";
				}
			
		}

		function renderDataset(){
			//Define path generator
			var projection = d3.geoMercator()
			.translate([w/2+xOffset, h/2+ yOffset])
			.center([-34.87986,-8.05596])
			.scale(projecao);
			
			var svg = d3.select("body")
						.select("svg");

						
			var path = d3.geoPath().projection(projection);
						
				var paths = svg.selectAll("path").data(arrayJson);	   
				
				paths.exit().remove();
	
				paths.attr("d", path);
		
			var aci = d3.selectAll("circle");

			aci.exit().remove();
			
			aci
			.attr("r",3)
			.attr("cx", function(d) {
                   return projection([d.properties.longitude, d.properties.latitude])[0];
           	})
			.attr("cy", function(d) {
                   return projection([d.properties.longitude, d.properties.latitude])[1];
           	});
			//.attr("transform", function(d) {return "translate(" + projection([d.properties.longitude,d.properties.latitude]) + ")";});
					
	}
