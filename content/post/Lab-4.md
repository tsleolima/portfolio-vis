+++
title = "Visualização de dados sobre o Bobs"
date = 2017-12-10T16:55:39-03:00
draft = false
tags = []
categories = []
summary = """
Visualização usando dados do tráfego em torno do açude velho em Campina Grande, Paraiba.
"""

[header]
image = "headers/bobs.png"
caption = ""
preview = true

+++

<script src="https://d3js.org/d3.v4.min.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
<div class="container">
<div class="row">
<h2>Uma visualização sobre o Bobs</h2>
<p>Dessa vez, estou trazendo um visualização um pouco diferente das convencionais (Barras),a ideia é usar um gráfico linear,<br> ou também conhecido como line chart, para representar a grande quantidade de dados massivos, obtidos no entorno do açude velho,<br> situado em Campina Grande,Paraiba, afim de mostrar ao utilizadores dos serviços do Bobs, ou até mesmo do sistema de marketing da empresa,<br> os picos de horarios em que o local é mais frequentado.</p>

<p>No gráfico a seguir, foram utilizados o número de pedestres que passavam perto do Bobs, e então é feita um mapeamento do horario para a quantidade <br> de pessoas naquele horario.</p>

<div class="row mychart" id="chart"></div>

<p>Podemos observar que o horario em que mais pessoas trafegam proximo ao Bobs é entorno de 17:00 e 19:30, caso essa pesquisa chegue <br> ao ouvidos do marketing do Bobs, pode ser feita alguma estrategia para atrair todas essa pessoas para o local, ou ate mesmo investir em horarios<br> ou refeições em que existe um pessoal relativamente menor que o mencionado, enfim, cabe ao marketing resolver.

<p>Nessa próxima visualização, temos um gráfico em barras nele vemos outro modo de visualizar os mesmos dados, mas dessa vez<br> temos a média dos pedestres em cada hora, sendo assim, existe uma facilidade em ver qual hora possui uma média maior.

<div class="row mychart" id="chart2"></div>

<p>Aqui, retornamos com o mesmo gráfico de linhas, mas dessa vez um pouco mais refinado, e se puderem observar atentamente,vemos <br> que as linhas também estão sendo moduladas atraves de médias de cada horario, ou seja, podemos generalizar qual horario realmente é mais <br> movimentado, ao contrario do anterior que seria apenas no intervalo de tempo de 15 em 15 minutos.

<div class="row mychart" id="chart3"></div>

<script type="text/javascript">
"user strict"

function desenhaVisualizacaoLinha(dados){

  var horariosBobs = dados.filter((dado) => dado.local === "bobs");

  var margin = {top: 50, right: 50, bottom: 50, left: 50}
  , width = 1000 - margin.left - margin.right
  , height = 500 - margin.top - margin.bottom;

  mediaBobs = fazMedia(horariosBobs);

  var xScale = d3.scaleBand()
  .domain(mediaBobs.map((dado,indice) => dado.horas))
  .range([0, width])
  .padding([1]);

  var yScale = d3.scaleLinear()
  .domain([0, 320])
  .rangeRound([height, 0]);

  var line = d3.line()
  .x(function(d, i) { return xScale(d.horas); })
  .y(function(d) { return yScale(d.media); })
  .curve(d3.curveMonotoneX);

  var svg = d3.select("#chart3").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(xScale))

  svg.append("g")
  .attr("class", "y axis")
  .call(d3.axisLeft(yScale));

  svg.append("path")
  .datum(mediaBobs)
  .attr("class", "line")
  .attr("d", line);

}

function desenhaVisualizacaoBarras(dados){

  var horariosBobs = dados.filter((dado) => dado.local === "bobs");

  var mediaBobs = fazMedia(horariosBobs);

  var alturaSVG = 550, larguraSVG = 900;
  var	margin = {top: 10, right: 20, bottom:30, left: 45},
  larguraVis = larguraSVG - margin.left - margin.right,
  alturaVis = alturaSVG - margin.top - margin.bottom;

  var grafico = d3.select('#chart2')
  .append('svg')
  .attr('width', larguraVis + margin.left + margin.right)
  .attr('height', alturaVis + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' +  margin.left + ',' + margin.top + ')');


  var x = d3.scaleBand()
  .domain(mediaBobs.map((dado, indice) => dado.horas))
  .range([0,larguraVis])
  .padding([0.5]);

  var y = d3.scaleLinear()
  .domain([0,250])
  .range([alturaVis,0]);

  grafico.selectAll('g')
  .data(mediaBobs)
  .enter()
  .append('rect')
  .attr('x', d => x(d.horas))
  .attr('y', d => y(d.media))
  .attr('width', x.bandwidth())
  .attr('height', (d) => alturaVis - y(d.media));


  grafico.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + alturaVis + ")")
  .call(d3.axisBottom(x));

  grafico.append('g')
  .attr('transform', 'translate(0,0)')
  .call(d3.axisLeft(y))

  grafico.append("text")
  .attr("transform", "translate(10," + (alturaVis + margin.top)/4 + ") rotate(0)")
  .text("Média de pedestres");
}

function desenhaVisualizacao(dados){

var larguraSVG = 800,
alturaSVG = 500;

var horariosBobs = dados.filter((dado) => dado.local === "bobs");
console.log(horariosBobs);

var margin = {top: 50, right: 50, bottom: 50, left: 50}
, width = larguraSVG - margin.left - margin.right
, height = alturaSVG - margin.top - margin.bottom;

var n = 59;
var horas = ["6:00","7:00","8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];

var xScale = d3.scaleLinear()
.domain([0, n])
.range([0, width]);

var x = d3.scaleBand()
.domain(horas)
.range([0, width]);

var yScale = d3.scaleLinear()
.domain([0, 320])
.range([height, 0]);

var line = d3.line()
.x(function(d, i) { return xScale(i); })
.y(function(d) { return yScale(d.total_pedestres); })
.curve(d3.curveMonotoneX);

var svg = d3.select("#chart").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
.attr("class", "x axis")
.attr("transform", "translate(-22," + height + ")")
.call(d3.axisBottom(x))
.select(".domain")
.remove();

svg.append("g")
.attr("class", "y axis")
.call(d3.axisLeft(yScale));

svg.append("path")
.datum(horariosBobs)
.attr("class", "line")
.attr("d", line);

svg.append("text")
.attr("transform", "translate(20," + (height/100) + ") rotate(0)")
.text("Número de pedestres");

}

d3.csv("https://raw.githubusercontent.com/luizaugustomm/pessoas-no-acude/master/dados/processados/dados.csv",function(dados){
  desenhaVisualizacaoBarras(dados);
  desenhaVisualizacaoLinha(dados);
  desenhaVisualizacao(dados);
});

function fazMedia(dados){

  var horas = ["6:00","7:00","8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];
  var cont = 0;
  var soma = 0;
  var indice = 0;
  var mediaHoras = [];
  for (var i = 0; i < dados.length; i++) {
    if(cont == 4){
      var media = soma / cont;
      var objeto = {'horas':horas[indice],media:media};
      mediaHoras[indice] = objeto;
      cont = 0;
      soma = 0;
      indice ++;
    }
    soma += parseInt(dados[i].total_pedestres);
    cont ++;
  }
  return mediaHoras;
}

</script>

<style type="text/css">
.line {
  fill: none;
  stroke: #ffab00;
  stroke-width: 3;
}

.dot {
  fill: #ffab00;
  stroke: #fff;
}

rect {
  fill: steelblue;
}

rect:hover {
  fill: red;
}

text {
  font: 12px sans-serif;
  text-anchor: left;
}

.row p{
  padding: 10px;
}

</style>
