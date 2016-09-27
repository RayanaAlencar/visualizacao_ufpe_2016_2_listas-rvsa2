			var margin = {top: 20, right: 20, bottom: 70, left: 20};
			var w = 900 - margin.left - margin.right;
			var h = 500 - margin.top - margin.bottom;
			var w2 = 750- margin.left - margin.right;
			var h2 = 750- margin.top - margin.bottom;
			var w3 = 900 - margin.left - margin.right;
			var h3 = 500 - margin.top - margin.bottom;
			var xOffset = 0;
			var yOffset = 0;
			var initialMousePosition  = [0,0] 
			var state = "idle";
			var tiposAcidente = ["Atropelamentos","Automóveis","Ciclistas","Ciclomotores","Colisoes","Motocicletas","Motos e Ciclomotores","Outros","Pedestres"];
			var causasAcidentes = {};
				causasAcidentes["Atropelamentos"] =0;
				causasAcidentes["Automóveis"]=0;
				causasAcidentes["Ciclistas"]=0;
				causasAcidentes["Ciclomotores"]=0;
				causasAcidentes["Colisoes"]=0;
				causasAcidentes["Motocicletas"]=0;
				causasAcidentes["Motos e Ciclomotores"] =0;
				causasAcidentes["Outros"] = 0;
				causasAcidentes["Pedestres"]=0;



			var dict = {};
				dict["Atropelamentos"] =0;
				dict["Automóveis"]=0;
				dict["Ciclistas"]=0;
				dict["Ciclomotores"]=0;
				dict["Colisoes"]=0;
				dict["Motocicletas"]=0;
				dict["Motos e Ciclomotores"] =0;
				dict["Outros"] = 0;
				dict["Pedestres"]=0;

			var firstTime = true;
			var acidentesNovembro =[];
			var acidentesAnoTodo = {};
			acidentesAnoTodo["1"] = [];
			acidentesAnoTodo["2"] = [];
			acidentesAnoTodo["3"] = [];
			acidentesAnoTodo["4"] = [];
			acidentesAnoTodo["5"] = [];
			acidentesAnoTodo["6"] = [];
			acidentesAnoTodo["7"] = [];
			acidentesAnoTodo["8"] = [];
			acidentesAnoTodo["9"] = [];
			acidentesAnoTodo["10"] = [];
			acidentesAnoTodo["11"] = [];
			acidentesAnoTodo["12"] = [];

			var arrayJson = [];
			var projecao = 100000;
			var svg2 =0;
			var svg3 = 0;
			var first = true;
			
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
						.attr("class","painel1")
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
			
			 svg3 = d3.select("body")
						.append("svg")
						.attr("class","painel3")
						.attr("width", w3 + margin.left + margin.right)
						.attr("height", h3 + margin.top + margin.bottom)
						.append("g")
						.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
   			 		

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
			
			

			d3.csv("acidentes-2014.csv",function(data){
				var aux = data;
				for (var i = 0; i < aux.length; i++) {
					var dia = aux[i].data;
					var diasp = dia.split("/");
					var mes = diasp[0];
					aux[i].longitude= aux[i].longitude.replace(",", ".");
					aux[i].longitude= aux[i].longitude.replace(",", "");
					aux[i].latitude= aux[i].latitude.replace(",", ".");
					aux[i].latitude= aux[i].latitude.replace(",", "");	
					aux[i].longitude = parseFloat(aux[i].longitude);
					aux[i].latitude = parseFloat(aux[i].latitude);
					acidentesAnoTodo[mes].push(aux[i]);
				}
			});


			var svgall = d3.select("body").select("svg.painel1");		  		
		
			d3.select("svg.painel1")
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

				  	var s = svgall.select("rect");

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
			   var circles =  d3.select("svg.painel1").selectAll("circle");

			   circles.attr("opacity", function(c){
					var dx = d.x;
			    	var dy = d.y;
			        var cx = d3.select(this).attr("cx");
			        var cy = d3.select(this).attr("cy");

			    	if(cx>=dx && cx <= largura && cy>=dy && cy <= comprimento ){
			    		entrou = 1;
			           causasAcidentes[c.tipo] = causasAcidentes[c.tipo] +1;
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
			    		var mes = document.getElementById('meses');
						mes = mes.value;
			    		histograma(1,acidentesAnoTodo[mes]);
			    		entrou =0;
			    	}else {
			    		var mes = document.getElementById('meses');
						mes = mes.value;
			    		histograma(0,acidentesAnoTodo[mes]);
			    		
			    	}
			   		console.log("Total de acidentes por tipo : ")
			   		console.log("Atropelamentos",causasAcidentes["Atropelamentos"]);
			   		console.log("Automóveis",causasAcidentes["Automóveis"]);
			   		console.log("Ciclistas",causasAcidentes["Ciclistas"]);
			   		console.log("Ciclomotores",causasAcidentes["Ciclomotores"]);
			   		console.log("Colisoes",causasAcidentes["Colisoes"]);
			   		console.log("Motocicletas",causasAcidentes["Motocicletas"]);
					console.log("Motos e Ciclomotores",causasAcidentes["Motos e Ciclomotores"]);
			   		console.log("Outros",causasAcidentes["Outros"]);
					console.log("Pedestres",causasAcidentes["Pedestres"]);

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
			var mes = document.getElementById('meses');
			mes = mes.value;
			if(this.checked){
				var array = acidentesAnoTodo[mes];
				acidentes(array);
			}else {
				removeAcidentes();
			}
		});

		d3.select("select").on("change", function(){
			
			var sel = document.getElementById('myselect');
			check = sel.checked;
			if(check){
				var array = acidentesAnoTodo[this.value];
				acidentes(array);
			}
		});

}
		function removeAcidentes(){
			d3.select("body").select("svg.painel1").selectAll("circle").style("fill", "transparent");
			d3.select("body").select("svg.painel2").selectAll("rect").attr("fill", "transparent");
			d3.select("body").select("svg.painel2").selectAll("text").attr("fill", "transparent");
			d3.select("body").select("svg.painel2").selectAll("g").remove();
			d3.select("body").select("svg.painel3").selectAll("text").attr("fill", "transparent");
			d3.select("body").select("svg.painel3").selectAll("rect").style("fill", "transparent");
			d3.select("body").select("svg.painel3").selectAll("circle").attr("opacity", 0);
			
		}	

		function acidentes(acidentes){
			
	  		
	  		var svg2 = d3.select("body").select("svg.painel2");
	  		svg2.append("g")
					 .attr("id","xAxis")
					 .attr("transform","translate(0," + h2 + ")");
   			 
   			 svg2.append("g")
   			 		.attr("class","histograma")

			var svg = d3.select("body").select("svg.painel1");

			var projection = d3.geoMercator()
				.translate([w/2+xOffset, h/2+ yOffset])
				.center([-34.87986,-8.05596])
				.scale(projecao);

				var aci = svg.selectAll("circle").data(acidentes);
				
				console.log("recebi o array ",acidentes);
				aci
				.exit()
				.remove();
					
				aci
				.enter()
				.append("circle")
				.attr("r",5)
				//.attr("transform", function(d) {return "translate(" + projection([d.properties.longitude,d.properties.latitude]) + ")";})
				.attr("cx", function(d) {
	                   return (projection([d.longitude, d.latitude]))[0];
	           	})
				.attr("cy", function(d) {
	                   return (projection([d.longitude, d.latitude]))[1];
	           	})
				.attr("fill",function(d){
					return pintar(d); 
				} );
				

				aci
				.attr("r",5)
				.attr("cx", function(d) {
	                   return projection([d.longitude, d.latitude])[0];
	           	})
				.attr("cy", function(d) {
	                   return projection([d.longitude, d.latitude])[1];
	           	})
				//.attr("transform", function(d) {return "translate(" + projection([d.properties.longitude,d.properties.latitude]) + ")";})
				.attr("fill",function(d){
					console.log("cor ",pintar(d));
					return pintar(d); 
				});
			
					histograma(0,acidentes);


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
						var aux = tiposAcidente.indexOf(c.tipo);
							if(aux==b){
						 			return 1;
						 		}
						 		return 0.3;
					});
					
					var circles2 = d3.select("svg.painel3").selectAll("circle");

					circles2.attr("opacity",function(c,d){
							if(d==b){
					 			return 1;
					 		}
					 		return 0.3;
					});

					var rects2 = d3.select("svg.painel3").selectAll("rect");
					 rects2.attr("opacity", function(c,d){
					 		if(d==b){
					 			return 1;
					 		}
					 		return 0.3;
					 });

				});



		}


		function histograma(controle,acidentes){
			
			var data =[];
			var positionOpacity =[0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3];
			for(var i =0;i<acidentes.length;i++){
	 					dict[acidentes[i].tipo] = dict[acidentes[i].tipo] +1;
			}

			if(controle===0){
						//console.log("controle 0");
					for(var j =0; j<tiposAcidente.length;j++){
						var ac = tiposAcidente[j];
						var aux = dict[ac];
						data.push(aux);
					}
					
			}else {
				data.push(causasAcidentes["Atropelamentos"]);
				data.push(causasAcidentes["Automóveis"]);
				data.push(causasAcidentes["Ciclistas"]);
				data.push(causasAcidentes["Ciclomotores"]);
				data.push(causasAcidentes["Colisoes"]);
				data.push(causasAcidentes["Motocicletas"]);
				data.push(causasAcidentes["Motos e Ciclomotores"]);
				data.push(causasAcidentes["Outros"] );
				data.push(causasAcidentes["Pedestres"]);

			   		for(var j=0;j<data.length;j++){
			   			if(data[j]===0){
			   				//console.log(data);
			   				var ac = tiposAcidente[j];
							var aux = dict[ac];
							data[j] = aux;
			   			}else{
			   				positionOpacity[j]=1;
			   			}
			   		}

			}
				
				dict["Atropelamentos"] =0;
				dict["Automóveis"]=0;
				dict["Ciclistas"]=0;
				dict["Ciclomotores"]=0;
				dict["Colisoes"]=0;
				dict["Motocicletas"]=0;
				dict["Motos e Ciclomotores"] =0;
				dict["Outros"] = 0;
				dict["Pedestres"]=0;
					
				//console.log("data do histograma eh ",data);
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
			
				pieChart(data,positionOpacity);
			

		}

		function pintarHisto (d){
				if(d===0){
					return "blue";
				}else if (d===1){
					return "green";
				}else if(d==2){
					return "#00ffcc";
				}
				else if(d===3){
					return "purple";
				}else if(d===4){
					return "red";
				}else if(d===5){ 
					return "black";
				}else if(d==6){
					return"#ff00bf";
				}else if(d==7){
					return"#663300";
				}else if(d==8){
					return "#e6e600";
				}
			
		}
/*
	dict["Atropelamentos"] =0;
				dict["Automóveis"]=0;
				dict["Ciclomotores"]=0;
				dict["Colisoes"]=0;
				dict["Motocicletas"]=0;
				dict["Motos e Ciclomotores"] =0;
				dict["Outros"] = 0;
				dict["Pedestres"]=0;
*/
		function pintar (d){
				if(d.tipo=="Atropelamentos"){
					return "blue";
				}
				if(d.tipo==="Automóveis"){
					return "green";
				}else if(d.tipo=="Ciclistas"){
					return "#00ffcc";
				}
				else if (d.tipo==="Ciclomotores"){
					return "purple";
				}else if(d.tipo==="Colisoes"){
					return "red";
				}else if(d.tipo==="Motocicletas"){
					return "black";
				}else if(d.tipo==="Motos e Ciclomotores"){ 
					return"#ff00bf";
				}else if("Outros"){
					return"#663300";
				}else if("Pedestres"){
					return "#e6e600";
				}
			
			
		}

		function renderDataset(){
			//Define path generator
			var projection = d3.geoMercator()
			.translate([w/2+xOffset, h/2+ yOffset])
			.center([-34.87986,-8.05596])
			.scale(projecao);
			
			var svg = d3.select("body")
						.select("svg.painel1");

						
			var path = d3.geoPath().projection(projection);
						
				var paths = svg.selectAll("path").data(arrayJson);	   
				
				paths.exit().remove();
	
				paths.attr("d", path);
		
			var aci = svg.selectAll("circle");

			aci.exit().remove();
			
			aci
			.attr("r",3)
			.attr("cx", function(d) {
                   return projection([d.longitude, d.latitude])[0];
           	})
			.attr("cy", function(d) {
                   return projection([d.longitude, d.latitude])[1];
           	});
			//.attr("transform", function(d) {return "translate(" + projection([d.properties.longitude,d.properties.latitude]) + ")";});
					
	}

function add(a, b) {
		    return a + b;
		}

function pieChart(probabilities,positionOpacity){
		console.log("pieChart ",probabilities);

		var sum = probabilities.reduce(add, 0);

		var svg3 = d3.select("body").select("svg.painel3");
	    var circleSelection = d3.select("body").select("svg.painel3")
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
	                return pintarHisto(i);
	            })
	            .attr("stroke-width",function(d){
	            		if(d===0){
	            		 	return 0;
	            		 }
	            		 return 90;
	            })
	            .attr("stroke-dasharray", function(d,i){
	            		//console.log("antes de converter ",d);
	            		if(d===0){
	            		 	return 0;
	            		 }
	            		d = d*100/sum;
	            		//console.log("total ",sum, " d ", d);
	                var valor = Math.round((565*d)/100);    
	                return valor +" 565";
	            })
	            .attr("stroke-dashoffset",function(d,i){
	                if(i===0 || d===0){
	                    return "0";
	                }else{
	                    var anteriores = probabilities.slice(0,i);
	                    var valor = anteriores.reduce( (prev, curr) => prev + curr );
	                    valor = valor*100/sum;
	                    var position = Math.round((565*valor)/100);
	                    position = -1*(position);
	                    return position;
	                }

	            }).attr("opacity",function(d,i){
	            	if(d===0){
	            		 	return 0;
	            	}
	            	return positionOpacity[i];
	            });

		circleSelection
	            .transition()
	            .delay(function(d, i) {
	            var delay = 10;
	            return delay;
	            })
	            .duration(function(d, i) {
	                var duration = 1000/2;
	                return duration;
	            })
	            .attr("cx", 450)
	            .attr("cy",250)
	            .attr("r",90)
	            .attr("fill-opacity","0")
	            .attr("border-radius","0.5")
	            .attr("stroke",function(d,i){
	                return pintarHisto(i);
	            })
	            .attr("stroke-width",function(d){
	            		if(d===0){
	            		 	return 0;
	            		 }
	            		 return 90;
	            })
	            .attr("stroke-dasharray", function(d,i){
	            		//console.log("antes de converter ",d);
	            		if(d===0){
	            		 	return 0;
	            		 }
	            		d = d*100/sum;
	            		//console.log("total ",sum, " d ", d);
	                var valor = Math.round((565*d)/100);    
	                return valor +" 565";
	            })
	            .attr("stroke-dashoffset",function(d,i){
	                if(i===0 || d===0){
	                    return "0";
	                }else{
	                    var anteriores = probabilities.slice(0,i);
	                    var valor = anteriores.reduce( (prev, curr) => prev + curr );
	                    valor = valor*100/sum;
	                    var position = Math.round((565*valor)/100);
	                    position = -1*(position);
	                    return position;
	                }

	            }).attr("opacity",function(d,i){
	            	if(d===0){
	            		 	return 0;
	            	}
	            	return positionOpacity[i];
	            });


	    var legendaCor = svg3
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
			.attr("width",300)
			.attr("height",35)
			.style("fill", function(d,i) { return pintarHisto(i); })
			.attr("opacity",function(d,i){
	            	return positionOpacity[i];
	            });

			//console.log("atualizei as cores");
			legendaCor
			.transition()
			.attr("x",function(d){
				return 680;
			})
			.attr("y",function(d,i){
				return 40+20+i*40;
			})
			.attr("width",300)
			.attr("height",35)
			.style("fill", function(d,i) { return pintarHisto(i); })
			.attr("opacity",function(d,i){
	            	return positionOpacity[i];
	        });


		if(firstTime){
			firstTime = false;
			legendaTexto = svg3
	        .selectAll("text")
	        .data(probabilities);
		}
		
		legendaTexto = svg3
			.selectAll("text")
			.data(probabilities);
		
	    legendaTexto.exit().remove();

	    legendaTexto
			.enter()
			.append("text")
			.text(function(d,i){
				
				return d +" "+ tiposAcidente[i];
			}).attr("x","690")
			.attr("y",function(d,i){
				if(i===7|| i==6 || i==8){
					return 72+35+i*35+i;
				}
				
				var y = 72+20+i*35+i;
				return y;
			})
			.attr("font-size","14px")
			.attr("fill","white");

		//console.log("atualizei as legendas");
	   
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
			return d +" "+ tiposAcidente[i];
			})
			.attr("x","690")
			.attr("y",function(d,i){
				if(i===7|| i==6 || i==8){
					return 72+35+i*35+i;
				}
				var y = 72+20+i*35+i;
				return y;
			})
			.attr("font-size","14px")
			.attr("fill","white");



		svg3.selectAll("circle").on("click",function(a,b){
					
					var rects =  d3.select("body").select("svg.painel2").selectAll("rect");
					 rects.attr("opacity", function(c,d){
					 		if(d==b){
					 			return 1;
					 		}
					 		return 0.3;
					 });
					
					var circles = d3.select("body").select("svg.painel1").selectAll("circle");
					circles.attr("opacity",function(c,d){
						//console.log("estou na selecao ",c.properties.tipo);
						var aux = tiposAcidente.indexOf(c.tipo);
							if(aux==b){
						 			return 1;
						 		}
						 		return 0.3;
					});
					
					var circles2 = d3.select("svg.painel3").selectAll("circle");

					circles2.attr("opacity",function(c,d){
							if(d==b){
					 			return 1;
					 		}
					 		return 0.3;
					});

					var rects2 = d3.select("svg.painel3").selectAll("rect");
					 rects2.attr("opacity", function(c,d){
					 		if(d==b){
					 			return 1;
					 		}
					 		return 0.3;
					 });

				});


		svg3.selectAll("rect").on("click",function(a,b){
					
					var rects =  d3.select("body").select("svg.painel2").selectAll("rect");
					 rects.attr("opacity", function(c,d){
					 		if(d==b){
					 			return 1;
					 		}
					 		return 0.3;
					 });
					
					var circles = d3.select("body").select("svg.painel1").selectAll("circle");
					circles.attr("opacity",function(c,d){
						//console.log("estou na selecao ",c.properties.tipo);
						var aux = tiposAcidente.indexOf(c.tipo);
							if(aux==b){
						 			return 1;
						 		}
						 		return 0.3;
					});
					
					var circles2 = d3.select("svg.painel3").selectAll("circle");

					circles2.attr("opacity",function(c,d){
							if(d==b){
					 			return 1;
					 		}
					 		return 0.3;
					});

					var rects2 = d3.select("svg.painel3").selectAll("rect");
					 rects2.attr("opacity", function(c,d){
					 		if(d==b){
					 			return 1;
					 		}
					 		return 0.3;
					 });

				});

		svg3.selectAll("text").on("click",function(a,b){
				
				var rects =  d3.select("body").select("svg.painel2").selectAll("rect");
					 rects.attr("opacity", function(c,d){
					 		if(d==b){
					 			return 1;
					 		}
					 		return 0.3;
					 });
					
					var circles = d3.select("body").select("svg.painel1").selectAll("circle");
					circles.attr("opacity",function(c,d){
						//console.log("estou na selecao ",c.properties.tipo);
						var aux = tiposAcidente.indexOf(c.tipo);
							if(aux==b){
						 			return 1;
						 		}
						 		return 0.3;
					});
					
					var circles2 = d3.select("svg.painel3").selectAll("circle");

					circles2.attr("opacity",function(c,d){
							if(d==b){
					 			return 1;
					 		}
					 		return 0.3;
					});

					var rects2 = d3.select("svg.painel3").selectAll("rect");
					 rects2.attr("opacity", function(c,d){
					 		if(d==b){
					 			return 1;
					 		}
					 		return 0.3;
					 });
		});
}
