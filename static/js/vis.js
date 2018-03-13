/* global d3 */

d3.json('artistasSemelhantesNandoReis.json', (error, graph) => {
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