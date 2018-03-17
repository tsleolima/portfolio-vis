+++
title = "Meu Top 50 no Spotify"
date = 2018-03-16T22:35:55-03:00
draft = false
summary = """
Visualização usando os meu dados do Spotify, onde mostro meu top 50 de artistas..
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
image = "headers/top50spotify.jpg"
caption = ""
preview = true

+++

Olá a todos, dessa vez estou dando uma passadinha rápida para mostrar a vocês uma nova visualização com os meus dados do spotify, eu espero que gostem, daqui alguns dias tentarei se possivel trazer uma interação para esse tipo de visualização, onde vocês veram seus "tops 50 spotify artists" :stuck_out_tongue_winking_eye:, no mesmo formato que esse aqui de baixo, espero que gostem e deixem seu Like :thumbsup:, hahaha :joy:.

<link rel="stylesheet" href="https://cdn.rawgit.com/tsleolima/portfolio-vis/ed55de71/content/meuTop50js/css/style.css">
<!-- Main -->
<div id="main">
    <div class="box container">
        <section>
            <svg width="930" height="630">
                <defs>
                    <filter id="greyscale">
                        <feColorMatrix
                                type="matrix"
                                values="0 1 0 0 0
                  0 1 0 0 0
                  0 1 0 0 0
                  0 1 0 1 0 ">
                        </feColorMatrix>
                    </filter>
                </defs>
            </svg>
        </section>
    </div>
</div>

        Créditos ao criador: https://github.com/ss1993/my-spotify-top50

<!-- Scripts -->
<script src="https://cdn.rawgit.com/tsleolima/portfolio-vis/ed55de71/content/meuTop50js/js/jquery.min.js"></script>
<script src="https://cdn.rawgit.com/tsleolima/portfolio-vis/ed55de71/content/meuTop50js/js/skel.min.js"></script>
<script src="https://cdn.rawgit.com/tsleolima/portfolio-vis/ed55de71/content/meuTop50js/js/util.js"></script>
<script src="https://cdn.rawgit.com/tsleolima/portfolio-vis/ed55de71/content/meuTop50js/js/main.js"></script>
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3-legend/2.24.0/d3-legend.js"></script>
<script src="https://cdn.rawgit.com/tsleolima/portfolio-vis/ed55de71/content/meuTop50js/js/music_graph.js"></script>
