+++
title = "Visualização usando D3"
date = 2017-11-29T14:40:02-03:00
draft = false
tags = []
categories = []
summary = """
Visualização com dados de boqueirão usando D3
"""

[header]
image = ""
caption = ""
preview = true

+++

<script src="https://d3js.org/d3.v4.min.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
<div class="container">
  <div class="row">
    <h2>Visualização usando D3</h2>
    <p>Aplicando elementos visuais para criação de uma visualização apartir dos dados do açude Epitácio Pessoa</p>
  </div>
  <div class="row mychart" id="chart">
  </div>
</div>

<style>
  .mychart rect {
    fill: steelblue;
  }

  .mychart rect:hover {
    fill: red;
  }

  .mychart text {
    font: 12px sans-serif;
    text-anchor: left;
  }
</style>

<script type="text/javascript">
  "use strict"

  function desenhaBarras(dados) {

    var larguraSVG = 700,
        alturaSVG = 200;

    var	margin = {top: 50, right: 0, bottom: 50, left: 0}, // para descolar a vis das bordas do grafico
            larguraVis = larguraSVG - margin.left - margin.right,
            alturaVis = alturaSVG - margin.top - margin.bottom;

    var x = d3.scaleBand()
            .domain(dados.map((dado) => dado.mes))
            .range([0,larguraVis])
            .padding([1]);

    var grafico = d3.select('#chart')
      .append('svg')
        .attr('width',larguraSVG)
        .attr('height',alturaSVG)
        .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    <!-- O circulo amarelo indica os dados em noventa_percentil -->

    grafico.selectAll('g')
      .data(dados)
      .enter()
        .append('circle')
          .attr('cx',dado => x(dado.mes))
          .attr('cy',50)
          .attr('r',dado => dado.noventa_percentil/4)
          .attr("fill",'yellow');

    <!-- O circulo em azul indica os dados em dez_percentil -->

    grafico.selectAll('g')
      .data(dados)
      .enter()
        .append('circle')
          .attr('cx',dado => x(dado.mes))
          .attr('cy',50)
          .attr('r', dado => dado.dez_percentil/4)
          .attr("fill",'blue');

    grafico.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + alturaVis + ")")
      .call(d3.axisBottom(x)); // magica do d3: gera eixo a partir da escala

  }

  d3.csv('https://raw.githubusercontent.com/tsleolima/intro-d3/master/dados/boqueirao-por-mes.csv', function(dados) {
    desenhaBarras(dados);
  });

</script>
