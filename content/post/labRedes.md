+++
title = "LabRedes"
date = 2018-03-12T21:48:58-03:00
draft = false
summary = """
Visualização usando dados do Spotify, afim de organizar artistas em forma de grafo.
"""
# Tags and categories
# For example, use `tags = []` for no tags, or the form `tags = ["A Tag", "Another Tag"]` for one or more tags.
tags = []
categories = []

# Featured image
# Place your image in the `static/img/` folder and reference its filename below, e.g. `image = "example.jpg"`.
# Use `caption` to display an image caption.
#   Markdown linking is allowed, e.g. `caption = "[Image credit](http://example.org)"`.
# Set `preview` to `false` to disable the thumbnail in listings.
[header]
image = "headers/redes.png"
caption = ""
preview = true

+++

Bem vindos novamente a outro post, espero que estejam aqui para aprender mais uma vez sobre algo relacionado a visualização de dados usando nossa velha amiga D3, e bem, se você caiu de paraquedas aqui, meu caro amigo leitor, não se intimide, continue lendo e brinque com a visualização :smile:.

Bem, a ideia é trazer para vocês algum dado sobre o gráfico logo abaixo, mas vou fazer diferente hoje, dessa vez, vou dar as diretivas para vocês irem buscar como fazer a de vocês mesmos :wink:.

Como eu disse, para quem caiu aqui de paraquedas, aconselho estudar um pouco sobre javascript,d3,html, mas não fique triste, a internet está ai aberta para conseguirmos aprender tudo isso, então, não desistam :muscle:.

Assumindo que vocês camaradas, já possuem certos dominios em criação de visualizações através da ferramenta 'D3', irei dar-lhes um exemplo de como é representado um nó e suas arestas, 

Podemos representar um nó dessa maneira:

        var node_data = ['id1', 'id2', 'id3']; 

e nossas arestas dessa maneira:

        var edge_data = [
	        {source: 'id1', target:'id2', weight: 10.0},
	        {source: 'id2', target:'id3', weight: 20.0}, 
	        {source: 'id3', target:'id1', weight: 30.0}
        ];

Por motivos de hora, não posso explicar detalhadamente, entretanto, é aconselhavel seguir esse padrão, para irmos até o proximo passo.

Bem, um dos meus maiores desejos desde o dia em que me foi apresentado esse tipo de visualização, era a de detectar clusters ou agrupamentos de nós e separa-los por cores, afim de descobrir alguma informação através dessa visualização, mas nossos amigos que trabalham com Grafos em si, já descobriram isso para nós, e podemos usar algoritmos que realizam essas operações para conseguirmos extrair essas informações ou até mesmo aproveitar a vista, como estão fazendo os que cairam de paraquedas aqui :grin:. 
Buscando na internet com meu professor, descobrimos que existe um script já desenvolvido para isso, chamado jLouvain, e essas formas de representação de nós e arestas estavam no git dos responsaveis a qual deixarei logo abaixo, mas vou dizer para vocês, não foi facil associar a API do Spotify com os artistas semelhantes ao Nando Reis ( escolhi por ser muito fã, e por outros motivos que supostamente vocẽs devem desconfiar :purple_heart:, sim, é amor :relieved:)
Então deixarei aqui, apenas o link da API do Spotify. 

        https://developer.spotify.com/web-api/get-related-artists/

Lá vocês encontraram detalhadamente pela própria equipe do Spotify, como usar esses dados, lembrando que essas dados são em redes, visto que temos indicações do Spotify quando estamos procurando algum artista, então, é sugerido que o sistema nos indique artistas com sons semelhante ao qual nos estamos escutando, não é verdade ? :thumbsup:

Bem, as dificuldades que senti ao formar esses clusters mesmo usando o script do jLouvain

        https://github.com/upphiminn/jLouvain

Foi em como o json recebido pela api do spotify tinha inumeras informações a mais, e tanta informação assim, as vezes, deixa você meio Lélé da cuca, então busquei por projetos no


        https://bl.ocks.org/

Aconselho a todos irem lá e desfrutarem de tantas criações legais e divertidas, que podemos usar em inumeros dados, da forma como quisermos, além de ter todo o codigo aberto para entendermos a ideia. 

O fato é que nessas pesquisas, encontrei esse link:

        https://bl.ocks.org/micahstubbs/3f439df92579c5bb2902fab15742ba87

Foi aqui que minha dor de cabeça passou, mas eu primeiro tive que entender como era necessario passar o json para o nosso amigo script jLouvain, e foi ai que as ideias viram, mas para não dar rodeios e ir direto ao ponto, voces precisam atentar para as linhas do 'vis.js', onde se diz

        var nodeData = nodes.map(function (d) {return d.id});
        var linkData = links.map(function (d) {return {source: d.source, target: d.target,      weight: d.weight}; });

isso era oque eu precisava, usar os dados que foram carregados, e filtra-los para usar apenas os dados em que o jLouvain irá utilizar, exatamente aqui;

        var community = jLouvain()
            .nodes(nodeData)
            .edges(linkData);

        var result  = community();

Mas, não precisamos usar os dados filtrados na nossa visualização, pois lá possuem varios dados importantissimos para a leitura da mesma, como o Label, então usamos outra variavel para dessa forma, criar os circulos referentes aos nós, e os links referentes as arestas da nossa visualização, deixarei aqui a mudança que fiz para que os label fossem usados na nossa visualização e pudessemos identificar quais artistas pertences aos clusters formados, clusters esses que se afastam um dos outros, é lindo de se ver. 

        circles.append("title")
            .text(function (d) { return d.label; });

Bem, sei que vocês querem ver como ficou, então aqui está: 

<div id="chart"></div>

Espero que tenham gostado, depois eu passo aqui e coloco mais alguma coisinha nova pra vocês, fiquem bem, se alimentem, e nunca esqueçam de seus cafés, Certo ??? 

Abs: Léo. :relieved:


<script src='//d3js.org/d3.v4.min.js'></script>

<script>
    /* global d3 */

d3.json('https://raw.githubusercontent.com/tsleolima/lab-redes/master/artistasSemelhantesNandoReis.json', (error, graph) => {
    if (error) throw error;
    const nodes = graph.nodes;
    const links = graph.edges;

    const width = 1000;
    const height = 1000;

    // separation between same-color circles
    const padding = 9; // 1.5

    // separation between different-color circles
    const clusterPadding = 48; // 6

    const maxRadius = 12;

    const z = d3.scaleOrdinal(d3.schemeCategory20);

    // total number of nodes
    const n = nodes.length;

    // detect communities with jsLouvain
    var nodeData = nodes.map(function (d) { return d.id });
    var linkData = links.map(function (d) { return { source: d.source, target: d.target }; });

    var community = jLouvain()
        .nodes(nodeData)
        .edges(linkData);

    var result = community();

    const defaultRadius = 8;
    nodes.forEach(function (node) {
        node.r = defaultRadius;
        node.cluster = result[node.id]
    });

    // collect clusters from nodes
    const clusters = {};
    nodes.forEach((node) => {
        const radius = node.r;
        const clusterID = node.cluster;
        if (!clusters[clusterID] || (radius > clusters[clusterID].r)) {
            clusters[clusterID] = node;
        }
    });

    var svg = d3.select("#chart")
    .append("svg")
    .attr('version', '1.1')
    .attr('viewBox', '0 0 ' + width + ' ' + height)
    .attr('width', '100%');

    let link = svg.selectAll('line')
        .data(graph.edges)
        .enter().append('line');

    link
        .attr('class', 'link')
        .style('stroke', 'darkgray')
        .style('stroke-width', '0.2px');

    const circles = svg.append('g')
        .datum(nodes)
        .selectAll('.circle')
        .data(d => d)
        .enter().append('circle')
        .attr('r', d => d.r)
        .attr('fill', d => z(d.cluster))
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        );

    circles.append("title")
        .text(function (d) { return d.label; });

    const simulation = d3.forceSimulation()
        .nodes(nodes)
        .force('link', d3.forceLink().id(d => d.id))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2))
        // .velocityDecay(0.2)
        .force('x', d3.forceX().strength(0.0005))
        .force('y', d3.forceY().strength(0.0005))
        .force('collide', collide)
        .force('cluster', clustering)
        .on('tick', ticked);

    simulation.force('link')
        .links(graph.edges)
        // .distance([85]);

    function ticked() {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        circles
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
    }

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    // These are implementations of the custom forces
    function clustering(alpha) {
        nodes.forEach((d) => {
            const cluster = clusters[d.cluster];
            if (cluster === d) return;
            let x = d.x - cluster.x;
            let y = d.y - cluster.y;
            let l = Math.sqrt((x * x) + (y * y));
            const r = d.r + cluster.r;
            if (l !== r) {
                l = ((l - r) / l) * alpha;
                d.x -= x *= l;
                d.y -= y *= l;
                cluster.x += x;
                cluster.y += y;
            }
        });
    }

    function collide(alpha) {
        const quadtree = d3.quadtree()
            .x(d => d.x)
            .y(d => d.y)
            .addAll(nodes);

        nodes.forEach((d) => {
            const r = d.r + maxRadius + Math.max(padding, clusterPadding);
            const nx1 = d.x - r;
            const nx2 = d.x + r;
            const ny1 = d.y - r;
            const ny2 = d.y + r;
            quadtree.visit((quad, x1, y1, x2, y2) => {
                if (quad.data && (quad.data !== d)) {
                    let x = d.x - quad.data.x;
                    let y = d.y - quad.data.y;
                    let l = Math.sqrt((x * x) + (y * y));
                    const r = d.r + quad.data.r + (d.cluster === quad.data.cluster ? padding : clusterPadding);
                    if (l < r) {
                        l = ((l - r) / l) * alpha;
                        d.x -= x *= l;
                        d.y -= y *= l;
                        quad.data.x += x;
                        quad.data.y += y;
                    }
                }
                return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            });
        });
    }
    

});
</script>

<script>
    /*
Author: Corneliu S. (github.com/upphiminn)

This is a javascript implementation of the Louvain
community detection algorithm (http://arxiv.org/abs/0803.0476)
Based on https://bitbucket.org/taynaud/python-louvain/overview

*/
(function(){
	jLouvain = function(){
		//Constants
		var __PASS_MAX = -1
		var __MIN 	 = 0.0000001

		//Local vars
		var original_graph_nodes;
		var original_graph_edges;
		var original_graph = {};
		var partition_init;

		//Helpers
		function make_set(array){
			var set = {};
			array.forEach(function(d,i){
				set[d] = true;
			});
			return Object.keys(set);
		};

		function obj_values(obj){
			 var vals = [];
			 for( var key in obj ) {
			     if ( obj.hasOwnProperty(key) ) {
			         vals.push(obj[key]);
			     }
			 }
			 return vals;
		};

		function get_degree_for_node(graph, node){
			var neighbours = graph._assoc_mat[node] ? Object.keys(graph._assoc_mat[node]) : [];
			var weight = 0;
			neighbours.forEach(function(neighbour,i){
				var value = graph._assoc_mat[node][neighbour] || 1;
				if(node == neighbour)
					value *= 2;
				weight += value;
			});
			return weight;
		};

		function get_neighbours_of_node(graph, node){
			if(typeof graph._assoc_mat[node] == 'undefined')
				return [];

			var neighbours = Object.keys(graph._assoc_mat[node]);
			return neighbours;
		}

		function get_edge_weight(graph, node1, node2){
			return graph._assoc_mat[node1] ? graph._assoc_mat[node1][node2] : undefined;
		}

		function get_graph_size(graph){
			var size = 0;
			graph.edges.forEach(function(edge){
				size += edge.weight;
			});
			return size;
		}

		function add_edge_to_graph(graph, edge){
			update_assoc_mat(graph, edge);

			var edge_index = graph.edges.map(function(d){
				return d.source+'_'+d.target;
			}).indexOf(edge.source+'_'+edge.target);

			if(edge_index != -1)
				graph.edges[edge_index].weight = edge.weight;
			else
				graph.edges.push(edge);
		}

		function make_assoc_mat(edge_list){
			var mat = {};
			edge_list.forEach(function(edge, i){
				mat[edge.source] = mat[edge.source] || {};
				mat[edge.source][edge.target] = edge.weight;
				mat[edge.target] = mat[edge.target] || {};
				mat[edge.target][edge.source] = edge.weight;
			});

			return mat;
		}

		function update_assoc_mat(graph, edge){
			graph._assoc_mat[edge.source] = graph._assoc_mat[edge.source] || {};
			graph._assoc_mat[edge.source][edge.target] = edge.weight;
			graph._assoc_mat[edge.target] = graph._assoc_mat[edge.target] || {};
			graph._assoc_mat[edge.target][edge.source] = edge.weight;
		}

		function clone(obj){
		    if(obj == null || typeof(obj) != 'object')
		        return obj;

		    var temp = obj.constructor();

		    for(var key in obj)
		        temp[key] = clone(obj[key]);
		    return temp;
		}

		//Core-Algorithm Related
		function init_status(graph, status, part){
			status['nodes_to_com'] = {};
			status['total_weight'] = 0;
			status['internals'] = {};
			status['degrees'] = {};
			status['gdegrees'] = {};
			status['loops'] = {};
			status['total_weight'] = get_graph_size(graph);

			if(typeof part == 'undefined'){
				graph.nodes.forEach(function(node,i){
					status.nodes_to_com[node] = i;
					var deg = get_degree_for_node(graph, node);
					if (deg < 0)
						throw 'Bad graph type, use positive weights!';
					status.degrees[i] = deg;
					status.gdegrees[node] = deg;
					status.loops[node] = get_edge_weight(graph, node, node) || 0;
					status.internals[i] = status.loops[node];
				});
			}else{
				graph.nodes.forEach(function(node,i){
					var com = part[node];
					status.nodes_to_com[node] = com;
					var deg = get_degree_for_node(graph, node);
					status.degrees[com] = (status.degrees[com] || 0) + deg;
					status.gdegrees[node] = deg;
					var inc = 0.0;

					var neighbours  = get_neighbours_of_node(graph, node);
					neighbours.forEach(function(neighbour, i){
						var weight = graph._assoc_mat[node][neighbour];
						if (weight <= 0){
							throw "Bad graph type, use positive weights";
						}

						if(part[neighbour] == com){
							if (neighbour == node){
								inc += weight;
							}else{
								inc += weight/2.0;
							}
						}
					});
					status.internals[com] = (status.internals[com] || 0) + inc;
				});
			}
		}

		function __modularity(status){
			var links = status.total_weight;
			var result = 0.0;
			var communities = make_set(obj_values(status.nodes_to_com));

			communities.forEach(function(com,i){
				var in_degree = status.internals[com] || 0 ;
				var degree = status.degrees[com] || 0 ;
				if(links > 0){
					result = result + in_degree / links - Math.pow((degree / (2.0*links)), 2);
				}
			});
			return result;
		}

		function __neighcom(node, graph, status){
			// compute the communities in the neighb. of the node, with the graph given by
			// node_to_com

			var weights = {};
			var neighboorhood = get_neighbours_of_node(graph, node);//make iterable;

			neighboorhood.forEach(function(neighbour, i){
				if(neighbour != node){
					var weight = graph._assoc_mat[node][neighbour] || 1; 
					var neighbourcom = status.nodes_to_com[neighbour];
					weights[neighbourcom] = (weights[neighbourcom] || 0) + weight;
				}	
			});

			return weights;
		}

		function __insert(node, com, weight, status){
			//insert node into com and modify status
			status.nodes_to_com[node] = +com;
			status.degrees[com] = (status.degrees[com] || 0) + (status.gdegrees[node]||0);
			status.internals[com] = (status.internals[com] || 0) + weight + (status.loops[node]||0);
		}

		function __remove(node, com, weight, status){
			//remove node from com and modify status
			status.degrees[com] = ((status.degrees[com] || 0) - (status.gdegrees[node] || 0));
			status.internals[com] = ((status.internals[com] || 0) - weight -(status.loops[node] ||0));
			status.nodes_to_com[node] = -1;
		}

		function __renumber(dict){
			var count = 0;
			var ret = clone(dict); //deep copy :)
			var new_values = {};
			var dict_keys = Object.keys(dict);
			dict_keys.forEach(function(key){
				var value = dict[key];
				var new_value =  typeof new_values[value] =='undefined' ? -1 : new_values[value];
				if(new_value == -1){
					new_values[value] = count;
					new_value = count;
					count = count + 1;
				}
				ret[key] = new_value;
			});
			return ret;
		}

		function __one_level(graph, status){
			//Compute one level of the Communities Dendogram.
			var modif = true,
				nb_pass_done = 0,
				cur_mod = __modularity(status),
				new_mod = cur_mod;

			while (modif && nb_pass_done != __PASS_MAX){
				cur_mod = new_mod;
				modif = false;
				nb_pass_done += 1

				graph.nodes.forEach(function(node,i){
					var com_node = status.nodes_to_com[node];
					var degc_totw = (status.gdegrees[node] || 0) / (status.total_weight * 2.0);
					var neigh_communities = __neighcom(node, graph, status);
					__remove(node, com_node, (neigh_communities[com_node] || 0.0), status);
					var best_com = com_node;
					var best_increase = 0;
					var neigh_communities_entries = Object.keys(neigh_communities);//make iterable;

					neigh_communities_entries.forEach(function(com,i){
						var incr = neigh_communities[com] - (status.degrees[com] || 0.0) * degc_totw;
						if (incr > best_increase){
							best_increase = incr;
							best_com = com;
						}
					});

					__insert(node, best_com, neigh_communities[best_com] || 0, status);

					if(best_com != com_node)
						modif = true;
				});
				new_mod = __modularity(status);
				if(new_mod - cur_mod < __MIN)
					break;
			}
		}

		function induced_graph(partition, graph){
			var ret = {nodes:[], edges:[], _assoc_mat: {}};
			var w_prec, weight;
			//add nodes from partition values
			var partition_values = obj_values(partition);
			ret.nodes = ret.nodes.concat(make_set(partition_values)); //make set
			graph.edges.forEach(function(edge,i){
				weight = edge.weight || 1;
				var com1 = partition[edge.source];
				var com2 = partition[edge.target];
				w_prec = (get_edge_weight(ret, com1, com2) || 0); 
				var new_weight = (w_prec + weight);
				add_edge_to_graph(ret, {'source': com1, 'target': com2, 'weight': new_weight});
			});
			return ret;
		}

		function partition_at_level(dendogram, level){
			var partition = clone(dendogram[0]);
			for(var i = 1; i < level + 1; i++ )
				Object.keys(partition).forEach(function(key,j){
					var node = key;
					var com  = partition[key];
					partition[node] = dendogram[i][com];
				});
			return partition;
		}


		function generate_dendogram(graph, part_init){

			if(graph.edges.length == 0){
				var part = {};
				graph.nodes.forEach(function(node,i){
					part[node] = node;
				});
				return part;
			}
			var status = {};

			init_status(original_graph, status, part_init);
			var mod = __modularity(status);
			var status_list = [];
			__one_level(original_graph, status);
			var new_mod = __modularity(status);
			var partition = __renumber(status.nodes_to_com);
			status_list.push(partition);
			mod = new_mod;
			var current_graph = induced_graph(partition, original_graph);
			init_status(current_graph, status);

			while (true){
				__one_level(current_graph, status);
				new_mod = __modularity(status);
				if(new_mod - mod < __MIN)
					break;

				partition = __renumber(status.nodes_to_com);
				status_list.push(partition); 

				mod = new_mod;
				current_graph = induced_graph(partition, current_graph);
				init_status(current_graph, status);
			}

			return status_list; 
		}

		var core = function(){
			var status = {};
			var dendogram = generate_dendogram(original_graph, partition_init);
			return partition_at_level(dendogram, dendogram.length - 1);
		};

		core.nodes = function(nds){
			if(arguments.length > 0){
				original_graph_nodes = nds;
			}
			return core;
		};

		core.edges = function(edgs){
			if(typeof original_graph_nodes == 'undefined')
				throw 'Please provide the graph nodes first!';

			if(arguments.length > 0){
				original_graph_edges = edgs;
				var assoc_mat = make_assoc_mat(edgs);
				original_graph = { 'nodes': original_graph_nodes,
						  		   'edges': original_graph_edges,
						  		   '_assoc_mat': assoc_mat };
			}
			return core;

		};

		core.partition_init = function(prttn){
			if(arguments.length > 0){
				partition_init = prttn;
			}
			return core;
		};

		return core;
	}
})();

</script>