+++
date = 2016-04-20
lastmod = 2017-09-03
draft = false
tags = []
title = "Minhas primeiras visualizações"
math = true
summary = """
5 Visualizações sobre o açude açude epitácio pessoa - PB
"""

[header]
image = "headers/visualizacaoDados.png"
caption = "Image credit: [**Academic**](https://github.com/gcushen/hugo-academic/)"

+++

# Como tudo começou

- Primeiro de tudo, eu sou péssimo com ideias de visualizações de Dados ( isso foi para ser engraçado).
- Esse é um laboratorio para universidade e quem sabe alguem aproveite esses dados em um futuro.
- Minha missão é passar para vocês algumas situações que enfrentamos no decorrer dos anos com o açude Epitácio Pessoa.

{{% toc %}}

## Historia sobre o açude Epitácio Pessoa.

O Açude Epitácio Pessoa, popularmente conhecido como Boqueirão, é uma represa localizada no município de Boqueirão, estado brasileiro da Paraíba. Sua bacia se estende pelos municípios de Boqueirão, Cabaceiras e São Miguel de Taipu e abastece as cidades paraibanas de Campina Grande, Boqueirão, Queimadas, Pocinhos, Caturité, Riacho de Santo Antônio e Barra de São Miguel.

O açude, que está situado na sub-bacia hidrográfica do Alto Paraíba, que juntamente com as sub-bacias do rio Taperoá e do Médio e Baixo Paraíba constituem a bacia hidrográfica do rio Paraíba, abrange uma área de 19.088,5 km², o que corresponde a 34% do território paraibano. Os 78 municípios inseridos nela abrigam uma população em torno de 1,8 milhão de habitantes, aproximadamente, 55% da população total do estado. Essas duas sub-bacias hidrográficas estão situadas em uma área de baixa pluviosidade, com médias anuais inferiores a 600 mm.

Um estudo desenvolvido no início dos anos 2000 pela Companhia de Água e Esgotos da Paraíba (Cagepa) revelou que o volume hídrico acumulado no açude sofreu uma redução de 67,27% nos últimos 20 anos. Na época de sua construção, a capacidade de armazenamento do açude inicialmente era de 536 milhões de metros cúbicos, mas com o assoreamento essa capacidade foi reduzida para 436 milhões. A sua lâmina d’água abrange uma superfície em torno de 2.700 hectares. Nesse mesmo período, segundo dados da pesquisa, o número de ligações de água em prédios residenciais e comerciais em Campina Grande aumentou em 102,9%, as quais passaram de 40.298, em 1983, para 81.796, em 2003.

O clima de toda a região da bacia é tropical quente e seco, com máxima de 37 °Celsius e mínimas de 16 °C. A precipitação média na região é de 600 mm/ano, caracterizando-se um clima de semi-árido.

    Fonte: https://pt.wikipedia.org/wiki/Açude_Boqueirão

Para mais informações sobre a atual crise hídrica, acesse essa visualização sobre o nosso açude:

    https://olhonagua.insa.gov.br/#!/?id=12172&reservatorio=epitacio_pessoa
(nela pode ser visto também a situação de outros reservatorios.)


# Bom vamos ao que interessa ?

Vamos lá, viemos aqui para ver algumas visualizações sobre o açude Epitacio Pessoa, então abaixo estará listado 5 visualizações de dados
usando gráficos tabulares e de todos os tipos, espero que aproveitem. *Lets Gooo!*

1. A primeira visualização será com gráfico de área, a ideia por trás dele, é mostrar os anos em que o açude esteve com sua capacidade oscilando entre 200 e 300 milhões de volume hídrico.

<div id="vis" width=300></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/vega/3.0.7/vega.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-lite/2.0.1/vega-lite.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-embed/3.0.0-rc7/vega-embed.js"></script>
<script>
    const spec = {
 "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
     "data": {
       "url":"https://api.insa.gov.br/reservatorios/12172/monitoramento",
       "format": {
           "type": "json",
           "property": "volumes",
           "parse": {
           "DataInformacao": "utc:'%d/%m/%Y'"
               }
       }},
 "vconcat": [{
    "transform": [
    {"filter": {"field": "Volume", "range": [200, 300] }}
    ],
   "width": 600,
   "mark": "area",
   "encoding": {
     "x": {
       "field": "DataInformacao",
       "type": "temporal",
       "scale": {"domain": {"selection": "brush"}},
       "axis": {"title": ""}
     },
     "y": {"field": "Volume","type": "quantitative"}
   }
 },{
    "transform": [
    {"filter": {"field": "Volume", "range": [200, 300] }}
    ],
   "width": 600,
   "height": 80,
   "mark": "area",

   "selection": {
     "brush": {"type": "interval", "encodings": ["x"]}
   },

   "encoding": {
     "x": {
       "field": "DataInformacao",
       "type": "temporal"

     },
     "y": {
       "field": "Volume",
       "type": "quantitative"
     }
   }
 }]
};
  	vegaEmbed('#vis', spec).catch(console.warn);
</script>


Podemos observar, ao aproximar em um trecho de ano expecifico os anos que oscilaram entre eses volumes de água, e que após de 2013 tivemos uma quebra brusca e ainda não voltamos para esse intervalo de 200-300 milhoes de volumes cúbicos.
