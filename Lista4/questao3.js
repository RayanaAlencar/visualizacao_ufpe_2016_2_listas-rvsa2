	var margin = {top: 20, right: 20, bottom: 20, left: 20};
	var w = 960 - margin.left - margin.right;
	var h = 1060 - margin.top - margin.bottom;
	var linhas = [];

	var svg = d3.select("body")
			.append("svg")
			.attr("width", w+margin.left + margin.right)
			.attr("height", h+margin.bottom + margin.top)
			.attr("transform","translate(" + margin.left + "," + margin.top + ")");


	var treemap = d3.treemap()
    .size([w, h])
    .padding(1)
    .round(true);


    var stratify = d3.stratify()
    .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(",")); });


	d3.csv("cand_ver_recife_2016.csv",function(data){

 			var nested_data = d3.nest()
			       				.key(function(d)  { return d.Partido; })
			       				.key(function(d)  { return d.Candidato; })
			              		.key(function(d)  { return d.Votos; })
							    .entries(data);

			var controle = 0; 

			var arvore = [];
			var filhos = [];


			var partidos = new Set();
			for(var i =0; i <nested_data.length;i++){
				var partido = nested_data[i].key;
				partidos.add(partido);
				var pessoas = nested_data[i].values;
				var candidatos_partido =[];
				var total_Votos = 0;
				for (var j =0;j<pessoas.length;j++){
					controle++;
					var candidato = {
							Candidato : pessoas[j].key,
							Votos: parseInt(pessoas[j].values[0].key),
							id : "root,"+ partido+","+pessoas[j].key
						};
					total_Votos = parseInt(pessoas[j].values[0].key) + total_Votos;
					filhos.push(candidato);
				}
				
			}

			partidos = Array.from(partidos);
			//console.log(filhos);
			var objs_partidos =[];
			for(var i =0;i<partidos.length;i++){

				var obj = {
					id : "root,"+partidos[i],
					Votos : 0,
					Candidato : partidos[i]
				}
				objs_partidos.push(obj);
			}

			arvore = objs_partidos.concat(filhos);

			filhos = [];
			var pai = {
				id:"root",
				Votos:0,
				Candidato : "root"
			}
			filhos.push(pai);

			arvore = filhos.concat(arvore);
			//console.log(arvore);


			var root = stratify(arvore)
				      .sum(function(d) { return d.Votos; })
				      .sort(function(a, b) { return b.height - a.height || b.Votos - a.Votos; });

			treemap(root);
			console.log(root.leaves());
			/*var format = d3.format(",d")
				
				svg
				.selectAll("rect")
				.data(root.leaves())
				.enter()
				.append("rect")
				.attr("class", "node")
				.attr("title", function(d) { return d.id + "\n" + format(d.value); })
				.style("x", function(d) { return d.x0 + "px"; })
				.style("y", function(d) { return d.y0 + "px"; })
				.style("width", function(d) { return d.x1 - d.x0 + "px"; })
				.style("height", function(d) { return d.y1 - d.y0 + "px"; })
				.style("fill", function(d) {return "blue"; })
				.style("opacity",0.5)
				.append("div")
				.attr("class", "node-label")
				.text(function(d) { return d.id.substring(d.id.lastIndexOf(",") + 1).split(/(?=[A-Z][^A-Z])/g).join("\n"); })
				.append("div")
				.attr("class", "node-value")
				.text(function(d) { return format(d.value); });
				});

				function type(d) {
				d.value = +d.value;
				return d;
				}
*/

});
	