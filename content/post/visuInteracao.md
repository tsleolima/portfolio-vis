+++
title = "Visualização de Dados com Interação"
date = 2017-12-22T17:21:06-03:00
draft = false

tags = []
categories = []
summary = """
Visualização usando dados com interação, do tráfego em torno do açude velho em Campina Grande, Paraiba.
"""

[header]
image = "headers/bobsInteracao.png"
caption = ""
preview = true
+++

<script src="https://d3js.org/d3.v4.min.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
<div class="container">
<div class="row">
<div class="col-md-8">
<h2>Uma visualização sobre o Bobs com interação</h2>

<div class="col-md-12"><p>Como foi abordado no outro post sobre a visualização do bobs, com os dados obtidos do em torno do açude velho em Campina Grande, Paraiba, vemos aqui uma nova visualização, olhando bem aparenta ser a mesma utilizada anteriormente, mas esta possui algumas interações com o usuario, na qual tem uma finalidade de se extrair o dado com mais facilidade, ou flexibilidade.</p>

<p>Vamos para o gráfico, nessa nova versão do line chart, temos alguns botões e eventos com hover, ou seja, ao passarmos o mouse por cima das bolinhas que estão presentes na linha, vemos com detalhes a média dos pedestres que passavam no local naquele horario, mas, porque fazer isso, já que possuimos o eixo Y para nos retornar esse resultado ? Bem, a explicação é simples, dessa maneira vemos com precisão a média e com mais facilidade, obviamente poderiamos colocar mais informações usando essa ferramenta (hover) tão importante, mas eu tive apenas essa no momento :(</p>

<p>Explicado como funcionam as bolinhas na nossa linha, vamos para os lindos botões azuis, neles podemos trocar os dados, ou mesmo, visualizar a nova linha para um novo local, também proximo do açudo velho, para ver em qual local, por exemplo,o tráfego de pessoas é maior naquele horario, enfim, existem n observações que podem ser feitas a partir desses dados, inclusive, retomando a ideia do marketing receber esses dados e aplicar em novas táticas de merchandising naquele horario é uma boa ideia!.</p>
<h3><p>Espero que gostem!!!</p></h3>  </div>

<div class="row mychart" id="chart"></div>


<div id="controls"></div>

</div>
</div>
</div>

<div id="tooltip" class="hidden">
  <p id="titulo_tooltip"> </p>
  <p> <b id="value">0</b> </p>
</div>

<style type="text/css">

  .line {
    fill: none;
    stroke: #ffba49;
    stroke-width: 3;
  }

  input{
    margin-left: 60px;
  }

  .dot {
    fill: #20a39e;
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

  #tooltip {
    position: absolute;
    width: auto;
    height: auto;
    padding: 10px;
    background-color: #23001e;
    border-radius: 10px;
    box-shadow:5px 10px 18px #888888;
}

  #controls {
    position: absolute;
    width: auto;
    height: auto;
}

  #tooltip.hidden {
    display: none;
}

  #tooltip p {
    margin: 0;
    font-family: sans-serif;
    font-size: 12px;
    line-height: 20px;
    color: #fff;
    text-align: center;
}

</style>

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

  var svg = d3.select("#chart").append("svg")
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


  svg.selectAll(".dot")
  .data(mediaBobs)
  .enter().append("circle") // Uses the enter().append() method
  .attr("class", "dot") // Assign a class for styling
  .attr("cx", function(d, i) { return xScale(d.horas) })
  .attr("cy", function(d) { return yScale(d.media) })
  .attr("r", 5);

  svg.selectAll(".dot").on("mouseover", mouseDentro);
  function mouseDentro(d){

    d3.select("#tooltip") // reparou que tem uma div escondida no html?
    .style("left", (d3.event.pageX + 50) + "px")
    .style("top", (d3.event.pageY - 60) + "px")
    .select("#value")
    .text(d.media);
    d3.select("#tooltip #titulo_tooltip")
    .text("Média de pedestres")
    // Mostra o tooltip
    d3.select("#tooltip").classed("hidden", false);
  }

  svg.selectAll(".dot").on("mouseout", mouseSaiu);
  function mouseSaiu(d){
    // não precisamos mais de tooltip
    d3.select("#tooltip").classed("hidden", true);
  }

  // Os Botões

  d3.select("#controls")
  .append("input")
  .attr("type","button")
  .attr("value","Média Bobs")
  .attr("class", "btn btn-primary")
  .on("click", mudaHorarioBobs)

  d3.select("#controls")
  .append("input")
  .attr("type","button")
  .attr("value","Média Jackson")
  .attr("class", "btn btn-primary")
  .on("click", mudaHorarioJackson)

  d3.select("#controls")
  .append("input")
  .attr("type","button")
  .attr("value","Média Burrinhos")
  .attr("class", "btn btn-primary")
  .on("click", mudaHorarioBurrinhos)


  function mudaHorarioBobs(){
    var horariosBobs = dados.filter((dado) => dado.local === "bobs");
    var mediaBobs = fazMedia(horariosBobs);

    svg.select(".line")
    .datum(mediaBobs)
    .attr("class", "line")
    .attr("d", line)

    svg.selectAll("circle").remove()

    svg.selectAll("circle")
    .data(mediaBobs)
    .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d, i) { return xScale(d.horas) })
    .attr("cy", function(d) { return yScale(d.media) })
    .attr("r", 5);

    svg.selectAll(".dot").on("mouseover", mouseDentro);
    function mouseDentro(d){

      d3.select("#tooltip") // reparou que tem uma div escondida no html?
      .style("left", (d3.event.pageX + 50) + "px")
      .style("top", (d3.event.pageY - 60) + "px")
      .select("#value")
      .text(d.media);
      d3.select("#tooltip #titulo_tooltip")
      .text("Média de pedestres")
      // Mostra o tooltip
      d3.select("#tooltip").classed("hidden", false);
    }

    svg.selectAll(".dot").on("mouseout", mouseSaiu);
    function mouseSaiu(d){
      // não precisamos mais de tooltip
      d3.select("#tooltip").classed("hidden", true);
    }

  }

  function mudaHorarioJackson(){
    var horariosJackson = dados.filter((dado) => dado.local === "jackson");
    var mediaJackson = fazMedia(horariosJackson);

    svg.select(".line")
    .datum(mediaJackson)
    .attr("class", "line")
    .attr("d", line)

    svg.selectAll("circle").remove()

    svg.selectAll("circle")
    .data(mediaJackson)
    .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d, i) { return xScale(d.horas) })
    .attr("cy", function(d) { return yScale(d.media) })
    .attr("r", 5);

    svg.selectAll(".dot").on("mouseover", mouseDentro);
    function mouseDentro(d){

      d3.select("#tooltip") // reparou que tem uma div escondida no html?
      .style("left", (d3.event.pageX + 50) + "px")
      .style("top", (d3.event.pageY - 60) + "px")
      .select("#value")
      .text(d.media);
      d3.select("#tooltip #titulo_tooltip")
      .text("Média de pedestres")
      // Mostra o tooltip
      d3.select("#tooltip").classed("hidden", false);
    }

    svg.selectAll(".dot").on("mouseout", mouseSaiu);
    function mouseSaiu(d){
      // não precisamos mais de tooltip
      d3.select("#tooltip").classed("hidden", true);
    }

  }

  function mudaHorarioBurrinhos(){
    var horariosBurrinhos = dados.filter((dado) => dado.local === "burrinhos");
    var mediaBurrinhos = fazMedia(horariosBurrinhos);

    svg.select(".line")
    .datum(mediaBurrinhos)
    .attr("class", "line")
    .attr("d", line)

    svg.selectAll("circle").remove()

    svg.selectAll("circle")
    .data(mediaBurrinhos)
    .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d, i) { return xScale(d.horas) })
    .attr("cy", function(d) { return yScale(d.media) })
    .attr("r", 5);

    svg.selectAll(".dot").on("mouseover", mouseDentro);
    function mouseDentro(d){

      d3.select("#tooltip") // reparou que tem uma div escondida no html?
      .style("left", (d3.event.pageX + 50) + "px")
      .style("top", (d3.event.pageY - 60) + "px")
      .select("#value")
      .text(d.media);
      d3.select("#tooltip #titulo_tooltip")
      .text("Média de pedestres")
      // Mostra o tooltip
      d3.select("#tooltip").classed("hidden", false);
    }

    svg.selectAll(".dot").on("mouseout", mouseSaiu);
    function mouseSaiu(d){
      // não precisamos mais de tooltip
      d3.select("#tooltip").classed("hidden", true);
    }

  }

}
d3.csv("https://raw.githubusercontent.com/luizaugustomm/pessoas-no-acude/master/dados/processados/dados.csv",function(dados){
  desenhaVisualizacaoLinha(dados);
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
