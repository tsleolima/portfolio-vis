+++
title = "Laboratorio 4 - Visualização da Informação"
date = 2017-12-10T16:55:39-03:00
draft = false
summary = """
Visualização usando dados do tráfego em torno do açude velho em Campina Grande, Paraiba.
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
    <h2>Uma visualização sobre o Bobs</h2>
    <p>Dessa vez, estou trazendo um visualização um pouco diferente das convencionais (Barras),a ideia é usar um gráfico linear,<br> ou também conhecido como line chart, para representar a grande quantidade de dados massivos, obtidos no entorno do açude velho,<br> situado em Campina Grande,Paraiba, afim de mostrar ao utilizadores dos serviços do Bobs, ou até mesmo do sistema de marketing da empresa,<br> os picos de horarios em que o local é mais frequentado.</p>

    <p>No gráfico a seguir, foram utilizados o número de pedestres que passavam perto do Bobs, e então é feita um mapeamento do horario para a quantidade <br> de pessoas naquele horario.</p>

  </div>
  <div class="row mychart" id="chart"></div>

  <p>Podemos observar que o horario em que mais pessoas trafegam proximo ao Bobs é entorno de 17:00 e 19:30, caso essa pesquisa chegue <br> ao ouvidos do marketing do Bobs, pode ser feita alguma estrategia para atrair todas essa pessoas para o local, ou ate mesmo investir em horarios<br> ou refeições em que existe um pessoal relativamente menor que o mencionado, enfim, cabe ao marketing resolver.

  <p>Nessa próxima visualização, temos um gráfico em radar, também conhecido como radar chart, nele vamos destacar mais 3 áreas movimentadas,<br> situadas também ao redor do açude velho.

  <p>"Espaço para a proxima visualização"

</div>

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

  .row p{
    padding: 10px;
  }

</style>
<script type="text/javascript">
    "user strict"

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
        desenhaVisualizacao(dados);
    });

  </script>
