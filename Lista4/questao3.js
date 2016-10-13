	var margin = {top: 20, right: 20, bottom: 20, left: 20};
	var w = 900 - margin.left - margin.right;
	var h = 900 - margin.top - margin.bottom;
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
    .parentId(function(d) { console.log(d);return d.Partido; });


	d3.csv("cand_ver_recife_2016.csv",function(data){
				var aux = data;
				for (var i = 0; i < aux.length; i++) {
					var linha = aux[i];
					//console.log(linha);
					linhas.push(aux[i]);
				}
			

			var root = stratify(data)
				      .sum(function(d) { return d.Votos; })
				      .sort(function(a, b) { return b.height - a.height || b.value - a.value; });

			treemap(root);

}
);


	