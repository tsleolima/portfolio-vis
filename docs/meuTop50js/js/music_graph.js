const svg = d3.select('svg'),
    width = +svg.attr('width'),
    height = +svg.attr('height');

const tooltipDiv = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


const color = d3.scaleOrdinal(d3.schemeCategory20);

const simulation = d3.forceSimulation()
    .force('link', d3.forceLink().id(d => d.id))
    .force('collide', d3.forceCollide(30))
    .force('center', d3.forceCenter((width / 2), height / 2))
    .force('genreX', d3.forceX(genreX).strength(0.009))
    .force('genreY', d3.forceY(genreY));

svg.append('g')
    .attr('class', 'category-legend')
    .attr('transform', 'translate(20,20)');

const legend = d3.legendColor()
    .shape('circle')
    .shapeRadius('8')
    .orient('vertical')
    .classPrefix('legend');


dados = {
    "nodes": [
        {
            "id": "39WpgTHW00GxVkw3jdqupH",
            "name": "Editora Árvore da Vida",
            "genres": [
                "brazilian gospel"
            ],
            "img": "https://i.scdn.co/image/5f32e6ebfa18f97e473b54f2d4edd099398cc69f",
            "url": "https://open.spotify.com/artist/39WpgTHW00GxVkw3jdqupH"
        },
        {
            "id": "69GGBxA162lTqCwzJG5jLp",
            "name": "The Chainsmokers",
            "genres": [
                "pop",
                "tropical house"
            ],
            "img": "https://i.scdn.co/image/219a92adc2c52e6df0a1fffe315bff6e94343ea0",
            "url": "https://open.spotify.com/artist/69GGBxA162lTqCwzJG5jLp"
        },
        {
            "id": "7n1XMwvxPf10t4OX6h6Ufy",
            "name": "Nando Reis",
            "genres": [
                "mpb"
            ],
            "img": "https://i.scdn.co/image/2e9d582acd7f0b01f97ab39cafad848a52896a5c",
            "url": "https://open.spotify.com/artist/7n1XMwvxPf10t4OX6h6Ufy"
        },
        {
            "id": "0L8ExT028jH3ddEcZwqJJ5",
            "name": "Red Hot Chili Peppers",
            "genres": [
                "alternative metal",
                "alternative rock",
                "funk metal",
                "permanent wave",
                "post-grunge",
                "rock"
            ],
            "img": "https://i.scdn.co/image/5b2072e522bf3324019a8c2dc3db20116dff0b87",
            "url": "https://open.spotify.com/artist/0L8ExT028jH3ddEcZwqJJ5"
        },
        {
            "id": "3TbDeRrXw8SVnRWx9BkHeZ",
            "name": "O Teatro Mágico",
            "genres": [
                "mpb",
                "rock gaucho"
            ],
            "img": "https://i.scdn.co/image/2cef2afb60d19c9302ed581250becec15d0e777d",
            "url": "https://open.spotify.com/artist/3TbDeRrXw8SVnRWx9BkHeZ"
        },
        {
            "id": "6eUKZXaKkcviH0Ku9w2n3V",
            "name": "Ed Sheeran",
            "genres": [
                "pop"
            ],
            "img": "https://i.scdn.co/image/f0370da3f52161b07a461b4be9a64d0adbfb498d",
            "url": "https://open.spotify.com/artist/6eUKZXaKkcviH0Ku9w2n3V"
        },
        {
            "id": "0GNq4xh8uFCyihPurnunf7",
            "name": "Engenheiros Do Hawaii",
            "genres": [
                "mpb",
                "rock gaucho"
            ],
            "img": "https://i.scdn.co/image/30a6169720ba5a1b7e90acffedd677a3ab2fae35",
            "url": "https://open.spotify.com/artist/0GNq4xh8uFCyihPurnunf7"
        },
        {
            "id": "7EBn9lIBKysikqbU2XDnoX",
            "name": "Rosa de Saron",
            "genres": [
                "brazilian ccm"
            ],
            "img": "https://i.scdn.co/image/1379be142ffc1923756d96f216501cd9d1d7f6d0",
            "url": "https://open.spotify.com/artist/7EBn9lIBKysikqbU2XDnoX"
        },
        {
            "id": "1R9QfzgBmhk1spLg3BiU1f",
            "name": "5 a Seco",
            "genres": [
                "baile pop",
                "mpb"
            ],
            "img": "https://i.scdn.co/image/80f1ab9875db7ac1b88ffe71af71a6235ab875a8",
            "url": "https://open.spotify.com/artist/1R9QfzgBmhk1spLg3BiU1f"
        },
        {
            "id": "4C4kpaAdp6aKSkguw40SsU",
            "name": "Skank",
            "genres": [
                "latin alternative",
                "mpb",
                "rock"
            ],
            "img": "https://i.scdn.co/image/d7ff7b98a46fe4f01ba1fd9fff5de5a21adb7191",
            "url": "https://open.spotify.com/artist/4C4kpaAdp6aKSkguw40SsU"
        },
        {
            "id": "0gO5Vbklho8yrBrUdHhuLH",
            "name": "Oficina G3",
            "genres": [
                "brazilian gospel"
            ],
            "img": "https://i.scdn.co/image/99b4dfc1d95898af5192ec2910457fce643d01ab",
            "url": "https://open.spotify.com/artist/0gO5Vbklho8yrBrUdHhuLH"
        },
        {
            "id": "3YQKmKGau1PzlVlkL1iodx",
            "name": "Twenty One Pilots",
            "genres": [
                "pop punk"
            ],
            "img": "https://i.scdn.co/image/228a29e1e5b9af12b3d41bc490c916b719d34acd",
            "url": "https://open.spotify.com/artist/3YQKmKGau1PzlVlkL1iodx"
        },
        {
            "id": "1AL2GKpmRrKXkYIcASuRFa",
            "name": "Wesley Safadão",
            "genres": [
                "forro"
            ],
            "img": "https://i.scdn.co/image/8ff836759f4758339b130fecd07a5229a3e8464c",
            "url": "https://open.spotify.com/artist/1AL2GKpmRrKXkYIcASuRFa"
        },
        {
            "id": "02kJSzxNuaWGqwubyUba0Z",
            "name": "G-Eazy",
            "genres": [
                "rap",
                "underground pop rap"
            ],
            "img": "https://i.scdn.co/image/b0bc5b77b7317a8644abe86d95f8fbd4ef4ffe0b",
            "url": "https://open.spotify.com/artist/02kJSzxNuaWGqwubyUba0Z"
        },
        {
            "id": "4mnhyGRAuExTL4J0soT4za",
            "name": "Aviões do Forró",
            "genres": [
                "axe",
                "forro",
                "pagode",
                "sertanejo universitario"
            ],
            "img": "https://i.scdn.co/image/e70a0a6a130d95c9f21558914ab0238bf43c64fa",
            "url": "https://open.spotify.com/artist/4mnhyGRAuExTL4J0soT4za"
        },
        {
            "id": "1sPg5EHuQXTMElpZ4iUgXe",
            "name": "Anavitória",
            "genres": [
                "mpb"
            ],
            "img": "https://i.scdn.co/image/60daad90ec6759516713438c2ce557fde80b03ce",
            "url": "https://open.spotify.com/artist/1sPg5EHuQXTMElpZ4iUgXe"
        },
        {
            "id": "4iWkwAVzssjb8XgxdoOL6M",
            "name": "Tiago Iorc",
            "genres": [
                "mpb"
            ],
            "img": "https://i.scdn.co/image/bd5c0905e33f3505f03febc6095ec828fa3c9908",
            "url": "https://open.spotify.com/artist/4iWkwAVzssjb8XgxdoOL6M"
        },
        {
            "id": "5CC2At3k0Xnyc5s9yHdyax",
            "name": "Roberta Campos",
            "genres": [
                "mpb"
            ],
            "img": "https://i.scdn.co/image/d52e70961c731770e1c3d58c666b3ff508e06b43",
            "url": "https://open.spotify.com/artist/5CC2At3k0Xnyc5s9yHdyax"
        },
        {
            "id": "2ZXnTEyYopSLCDiz5Z0XIf",
            "name": "MC Kekel",
            "genres": [
                "brazilian electronica",
                "deep funk carioca"
            ],
            "img": "https://i.scdn.co/image/7ddedc7ba20ed99a0a32c8541d62235b2e209210",
            "url": "https://open.spotify.com/artist/2ZXnTEyYopSLCDiz5Z0XIf"
        },
        {
            "id": "7CajNmpbOovFoOoasH2HaY",
            "name": "Calvin Harris",
            "genres": [
                "dance pop",
                "edm",
                "electro house",
                "house",
                "pop",
                "progressive house"
            ],
            "img": "https://i.scdn.co/image/daa483279a678a856dfd25def633e0f4e8ebf14f",
            "url": "https://open.spotify.com/artist/7CajNmpbOovFoOoasH2HaY"
        },
        {
            "id": "7oEcbD30xpHuMjkRT9G4fy",
            "name": "Tobias Rauscher",
            "genres": [
                "fingerstyle"
            ],
            "img": "https://i.scdn.co/image/c089f181c573afbef808d30cefa2151b5b62a33c",
            "url": "https://open.spotify.com/artist/7oEcbD30xpHuMjkRT9G4fy"
        }
    ],
    "edges": [
        {
            "source": "39WpgTHW00GxVkw3jdqupH",
            "target": "0gO5Vbklho8yrBrUdHhuLH",
            "type": "brazilian gospel"
        },
        {
            "source": "69GGBxA162lTqCwzJG5jLp",
            "target": "69GGBxA162lTqCwzJG5jLp",
            "type": "pop"
        },
        {
            "source": "69GGBxA162lTqCwzJG5jLp",
            "target": "69GGBxA162lTqCwzJG5jLp",
            "type": "tropical house"
        },
        {
            "source": "69GGBxA162lTqCwzJG5jLp",
            "target": "6eUKZXaKkcviH0Ku9w2n3V",
            "type": "pop"
        },
        {
            "source": "69GGBxA162lTqCwzJG5jLp",
            "target": "7CajNmpbOovFoOoasH2HaY",
            "type": "pop"
        },
        {
            "source": "7n1XMwvxPf10t4OX6h6Ufy",
            "target": "7n1XMwvxPf10t4OX6h6Ufy",
            "type": "mpb"
        },
        {
            "source": "7n1XMwvxPf10t4OX6h6Ufy",
            "target": "3TbDeRrXw8SVnRWx9BkHeZ",
            "type": "mpb"
        },
        {
            "source": "7n1XMwvxPf10t4OX6h6Ufy",
            "target": "0GNq4xh8uFCyihPurnunf7",
            "type": "mpb"
        },
        {
            "source": "7n1XMwvxPf10t4OX6h6Ufy",
            "target": "1R9QfzgBmhk1spLg3BiU1f",
            "type": "mpb"
        },
        {
            "source": "7n1XMwvxPf10t4OX6h6Ufy",
            "target": "4C4kpaAdp6aKSkguw40SsU",
            "type": "mpb"
        },
        {
            "source": "7n1XMwvxPf10t4OX6h6Ufy",
            "target": "1sPg5EHuQXTMElpZ4iUgXe",
            "type": "mpb"
        },
        {
            "source": "7n1XMwvxPf10t4OX6h6Ufy",
            "target": "4iWkwAVzssjb8XgxdoOL6M",
            "type": "mpb"
        },
        {
            "source": "7n1XMwvxPf10t4OX6h6Ufy",
            "target": "5CC2At3k0Xnyc5s9yHdyax",
            "type": "mpb"
        },
        {
            "source": "0L8ExT028jH3ddEcZwqJJ5",
            "target": "0L8ExT028jH3ddEcZwqJJ5",
            "type": "alternative metal"
        },
        {
            "source": "0L8ExT028jH3ddEcZwqJJ5",
            "target": "0L8ExT028jH3ddEcZwqJJ5",
            "type": "alternative rock"
        },
        {
            "source": "0L8ExT028jH3ddEcZwqJJ5",
            "target": "0L8ExT028jH3ddEcZwqJJ5",
            "type": "funk metal"
        },
        {
            "source": "0L8ExT028jH3ddEcZwqJJ5",
            "target": "0L8ExT028jH3ddEcZwqJJ5",
            "type": "permanent wave"
        },
        {
            "source": "0L8ExT028jH3ddEcZwqJJ5",
            "target": "0L8ExT028jH3ddEcZwqJJ5",
            "type": "post-grunge"
        },
        {
            "source": "0L8ExT028jH3ddEcZwqJJ5",
            "target": "0L8ExT028jH3ddEcZwqJJ5",
            "type": "rock"
        },
        {
            "source": "0L8ExT028jH3ddEcZwqJJ5",
            "target": "4C4kpaAdp6aKSkguw40SsU",
            "type": "rock"
        },
        {
            "source": "3TbDeRrXw8SVnRWx9BkHeZ",
            "target": "7n1XMwvxPf10t4OX6h6Ufy",
            "type": "mpb"
        },
        {
            "source": "3TbDeRrXw8SVnRWx9BkHeZ",
            "target": "3TbDeRrXw8SVnRWx9BkHeZ",
            "type": "mpb"
        },
        {
            "source": "3TbDeRrXw8SVnRWx9BkHeZ",
            "target": "3TbDeRrXw8SVnRWx9BkHeZ",
            "type": "rock gaucho"
        },
        {
            "source": "3TbDeRrXw8SVnRWx9BkHeZ",
            "target": "0GNq4xh8uFCyihPurnunf7",
            "type": "mpb"
        },
        {
            "source": "3TbDeRrXw8SVnRWx9BkHeZ",
            "target": "0GNq4xh8uFCyihPurnunf7",
            "type": "rock gaucho"
        },
        {
            "source": "3TbDeRrXw8SVnRWx9BkHeZ",
            "target": "1R9QfzgBmhk1spLg3BiU1f",
            "type": "mpb"
        },
        {
            "source": "3TbDeRrXw8SVnRWx9BkHeZ",
            "target": "4C4kpaAdp6aKSkguw40SsU",
            "type": "mpb"
        },
        {
            "source": "3TbDeRrXw8SVnRWx9BkHeZ",
            "target": "1sPg5EHuQXTMElpZ4iUgXe",
            "type": "mpb"
        },
        {
            "source": "3TbDeRrXw8SVnRWx9BkHeZ",
            "target": "4iWkwAVzssjb8XgxdoOL6M",
            "type": "mpb"
        },
        {
            "source": "3TbDeRrXw8SVnRWx9BkHeZ",
            "target": "5CC2At3k0Xnyc5s9yHdyax",
            "type": "mpb"
        },
        {
            "source": "6eUKZXaKkcviH0Ku9w2n3V",
            "target": "69GGBxA162lTqCwzJG5jLp",
            "type": "pop"
        },
        {
            "source": "6eUKZXaKkcviH0Ku9w2n3V",
            "target": "6eUKZXaKkcviH0Ku9w2n3V",
            "type": "pop"
        },
        {
            "source": "6eUKZXaKkcviH0Ku9w2n3V",
            "target": "7CajNmpbOovFoOoasH2HaY",
            "type": "pop"
        },
        {
            "source": "0GNq4xh8uFCyihPurnunf7",
            "target": "7n1XMwvxPf10t4OX6h6Ufy",
            "type": "mpb"
        },
        {
            "source": "0GNq4xh8uFCyihPurnunf7",
            "target": "3TbDeRrXw8SVnRWx9BkHeZ",
            "type": "mpb"
        },
        {
            "source": "0GNq4xh8uFCyihPurnunf7",
            "target": "3TbDeRrXw8SVnRWx9BkHeZ",
            "type": "rock gaucho"
        },
        {
            "source": "0GNq4xh8uFCyihPurnunf7",
            "target": "0GNq4xh8uFCyihPurnunf7",
            "type": "mpb"
        },
        {
            "source": "0GNq4xh8uFCyihPurnunf7",
            "target": "0GNq4xh8uFCyihPurnunf7",
            "type": "rock gaucho"
        },
        {
            "source": "0GNq4xh8uFCyihPurnunf7",
            "target": "1R9QfzgBmhk1spLg3BiU1f",
            "type": "mpb"
        },
        {
            "source": "0GNq4xh8uFCyihPurnunf7",
            "target": "4C4kpaAdp6aKSkguw40SsU",
            "type": "mpb"
        },
        {
            "source": "0GNq4xh8uFCyihPurnunf7",
            "target": "1sPg5EHuQXTMElpZ4iUgXe",
            "type": "mpb"
        },
        {
            "source": "0GNq4xh8uFCyihPurnunf7",
            "target": "4iWkwAVzssjb8XgxdoOL6M",
            "type": "mpb"
        },
        {
            "source": "0GNq4xh8uFCyihPurnunf7",
            "target": "5CC2At3k0Xnyc5s9yHdyax",
            "type": "mpb"
        },
        {
            "source": "7EBn9lIBKysikqbU2XDnoX",
            "target": "7EBn9lIBKysikqbU2XDnoX",
            "type": "brazilian ccm"
        },
        {
            "source": "1R9QfzgBmhk1spLg3BiU1f",
            "target": "7n1XMwvxPf10t4OX6h6Ufy",
            "type": "mpb"
        },
        {
            "source": "1R9QfzgBmhk1spLg3BiU1f",
            "target": "3TbDeRrXw8SVnRWx9BkHeZ",
            "type": "mpb"
        },
        {
            "source": "1R9QfzgBmhk1spLg3BiU1f",
            "target": "0GNq4xh8uFCyihPurnunf7",
            "type": "mpb"
        },
        {
            "source": "1R9QfzgBmhk1spLg3BiU1f",
            "target": "1R9QfzgBmhk1spLg3BiU1f",
            "type": "baile pop"
        },
        {
            "source": "1R9QfzgBmhk1spLg3BiU1f",
            "target": "1R9QfzgBmhk1spLg3BiU1f",
            "type": "mpb"
        },
        {
            "source": "1R9QfzgBmhk1spLg3BiU1f",
            "target": "4C4kpaAdp6aKSkguw40SsU",
            "type": "mpb"
        },
        {
            "source": "1R9QfzgBmhk1spLg3BiU1f",
            "target": "1sPg5EHuQXTMElpZ4iUgXe",
            "type": "mpb"
        },
        {
            "source": "1R9QfzgBmhk1spLg3BiU1f",
            "target": "4iWkwAVzssjb8XgxdoOL6M",
            "type": "mpb"
        },
        {
            "source": "1R9QfzgBmhk1spLg3BiU1f",
            "target": "5CC2At3k0Xnyc5s9yHdyax",
            "type": "mpb"
        },
        {
            "source": "4C4kpaAdp6aKSkguw40SsU",
            "target": "7n1XMwvxPf10t4OX6h6Ufy",
            "type": "mpb"
        },
        {
            "source": "4C4kpaAdp6aKSkguw40SsU",
            "target": "0L8ExT028jH3ddEcZwqJJ5",
            "type": "rock"
        },
        {
            "source": "4C4kpaAdp6aKSkguw40SsU",
            "target": "3TbDeRrXw8SVnRWx9BkHeZ",
            "type": "mpb"
        },
        {
            "source": "4C4kpaAdp6aKSkguw40SsU",
            "target": "0GNq4xh8uFCyihPurnunf7",
            "type": "mpb"
        },
        {
            "source": "4C4kpaAdp6aKSkguw40SsU",
            "target": "1R9QfzgBmhk1spLg3BiU1f",
            "type": "mpb"
        },
        {
            "source": "4C4kpaAdp6aKSkguw40SsU",
            "target": "4C4kpaAdp6aKSkguw40SsU",
            "type": "latin alternative"
        },
        {
            "source": "4C4kpaAdp6aKSkguw40SsU",
            "target": "4C4kpaAdp6aKSkguw40SsU",
            "type": "mpb"
        },
        {
            "source": "4C4kpaAdp6aKSkguw40SsU",
            "target": "4C4kpaAdp6aKSkguw40SsU",
            "type": "rock"
        },
        {
            "source": "4C4kpaAdp6aKSkguw40SsU",
            "target": "1sPg5EHuQXTMElpZ4iUgXe",
            "type": "mpb"
        },
        {
            "source": "4C4kpaAdp6aKSkguw40SsU",
            "target": "4iWkwAVzssjb8XgxdoOL6M",
            "type": "mpb"
        },
        {
            "source": "4C4kpaAdp6aKSkguw40SsU",
            "target": "5CC2At3k0Xnyc5s9yHdyax",
            "type": "mpb"
        },
        {
            "source": "0gO5Vbklho8yrBrUdHhuLH",
            "target": "0gO5Vbklho8yrBrUdHhuLH",
            "type": "brazilian gospel"
        },
        {
            "source": "3YQKmKGau1PzlVlkL1iodx",
            "target": "3YQKmKGau1PzlVlkL1iodx",
            "type": "pop punk"
        },
        {
            "source": "1AL2GKpmRrKXkYIcASuRFa",
            "target": "1AL2GKpmRrKXkYIcASuRFa",
            "type": "forro"
        },
        {
            "source": "1AL2GKpmRrKXkYIcASuRFa",
            "target": "4mnhyGRAuExTL4J0soT4za",
            "type": "forro"
        },
        {
            "source": "02kJSzxNuaWGqwubyUba0Z",
            "target": "02kJSzxNuaWGqwubyUba0Z",
            "type": "rap"
        },
        {
            "source": "02kJSzxNuaWGqwubyUba0Z",
            "target": "02kJSzxNuaWGqwubyUba0Z",
            "type": "underground pop rap"
        },
        {
            "source": "4mnhyGRAuExTL4J0soT4za",
            "target": "1AL2GKpmRrKXkYIcASuRFa",
            "type": "forro"
        },
        {
            "source": "4mnhyGRAuExTL4J0soT4za",
            "target": "4mnhyGRAuExTL4J0soT4za",
            "type": "axe"
        },
        {
            "source": "4mnhyGRAuExTL4J0soT4za",
            "target": "4mnhyGRAuExTL4J0soT4za",
            "type": "forro"
        },
        {
            "source": "4mnhyGRAuExTL4J0soT4za",
            "target": "4mnhyGRAuExTL4J0soT4za",
            "type": "pagode"
        },
        {
            "source": "4mnhyGRAuExTL4J0soT4za",
            "target": "4mnhyGRAuExTL4J0soT4za",
            "type": "sertanejo universitario"
        },
        {
            "source": "1sPg5EHuQXTMElpZ4iUgXe",
            "target": "7n1XMwvxPf10t4OX6h6Ufy",
            "type": "mpb"
        },
        {
            "source": "1sPg5EHuQXTMElpZ4iUgXe",
            "target": "3TbDeRrXw8SVnRWx9BkHeZ",
            "type": "mpb"
        },
        {
            "source": "1sPg5EHuQXTMElpZ4iUgXe",
            "target": "0GNq4xh8uFCyihPurnunf7",
            "type": "mpb"
        },
        {
            "source": "1sPg5EHuQXTMElpZ4iUgXe",
            "target": "1R9QfzgBmhk1spLg3BiU1f",
            "type": "mpb"
        },
        {
            "source": "1sPg5EHuQXTMElpZ4iUgXe",
            "target": "4C4kpaAdp6aKSkguw40SsU",
            "type": "mpb"
        },
        {
            "source": "1sPg5EHuQXTMElpZ4iUgXe",
            "target": "1sPg5EHuQXTMElpZ4iUgXe",
            "type": "mpb"
        },
        {
            "source": "1sPg5EHuQXTMElpZ4iUgXe",
            "target": "4iWkwAVzssjb8XgxdoOL6M",
            "type": "mpb"
        },
        {
            "source": "1sPg5EHuQXTMElpZ4iUgXe",
            "target": "5CC2At3k0Xnyc5s9yHdyax",
            "type": "mpb"
        },
        {
            "source": "4iWkwAVzssjb8XgxdoOL6M",
            "target": "7n1XMwvxPf10t4OX6h6Ufy",
            "type": "mpb"
        },
        {
            "source": "4iWkwAVzssjb8XgxdoOL6M",
            "target": "3TbDeRrXw8SVnRWx9BkHeZ",
            "type": "mpb"
        },
        {
            "source": "4iWkwAVzssjb8XgxdoOL6M",
            "target": "0GNq4xh8uFCyihPurnunf7",
            "type": "mpb"
        },
        {
            "source": "4iWkwAVzssjb8XgxdoOL6M",
            "target": "1R9QfzgBmhk1spLg3BiU1f",
            "type": "mpb"
        },
        {
            "source": "4iWkwAVzssjb8XgxdoOL6M",
            "target": "4C4kpaAdp6aKSkguw40SsU",
            "type": "mpb"
        },
        {
            "source": "4iWkwAVzssjb8XgxdoOL6M",
            "target": "1sPg5EHuQXTMElpZ4iUgXe",
            "type": "mpb"
        },
        {
            "source": "4iWkwAVzssjb8XgxdoOL6M",
            "target": "4iWkwAVzssjb8XgxdoOL6M",
            "type": "mpb"
        },
        {
            "source": "4iWkwAVzssjb8XgxdoOL6M",
            "target": "5CC2At3k0Xnyc5s9yHdyax",
            "type": "mpb"
        },
        {
            "source": "5CC2At3k0Xnyc5s9yHdyax",
            "target": "7n1XMwvxPf10t4OX6h6Ufy",
            "type": "mpb"
        },
        {
            "source": "5CC2At3k0Xnyc5s9yHdyax",
            "target": "3TbDeRrXw8SVnRWx9BkHeZ",
            "type": "mpb"
        },
        {
            "source": "5CC2At3k0Xnyc5s9yHdyax",
            "target": "0GNq4xh8uFCyihPurnunf7",
            "type": "mpb"
        },
        {
            "source": "5CC2At3k0Xnyc5s9yHdyax",
            "target": "1R9QfzgBmhk1spLg3BiU1f",
            "type": "mpb"
        },
        {
            "source": "5CC2At3k0Xnyc5s9yHdyax",
            "target": "4C4kpaAdp6aKSkguw40SsU",
            "type": "mpb"
        },
        {
            "source": "5CC2At3k0Xnyc5s9yHdyax",
            "target": "1sPg5EHuQXTMElpZ4iUgXe",
            "type": "mpb"
        },
        {
            "source": "5CC2At3k0Xnyc5s9yHdyax",
            "target": "4iWkwAVzssjb8XgxdoOL6M",
            "type": "mpb"
        },
        {
            "source": "5CC2At3k0Xnyc5s9yHdyax",
            "target": "5CC2At3k0Xnyc5s9yHdyax",
            "type": "mpb"
        },
        {
            "source": "2ZXnTEyYopSLCDiz5Z0XIf",
            "target": "2ZXnTEyYopSLCDiz5Z0XIf",
            "type": "brazilian electronica"
        },
        {
            "source": "2ZXnTEyYopSLCDiz5Z0XIf",
            "target": "2ZXnTEyYopSLCDiz5Z0XIf",
            "type": "deep funk carioca"
        },
        {
            "source": "7CajNmpbOovFoOoasH2HaY",
            "target": "69GGBxA162lTqCwzJG5jLp",
            "type": "pop"
        },
        {
            "source": "7CajNmpbOovFoOoasH2HaY",
            "target": "6eUKZXaKkcviH0Ku9w2n3V",
            "type": "pop"
        },
        {
            "source": "7CajNmpbOovFoOoasH2HaY",
            "target": "7CajNmpbOovFoOoasH2HaY",
            "type": "dance pop"
        },
        {
            "source": "7CajNmpbOovFoOoasH2HaY",
            "target": "7CajNmpbOovFoOoasH2HaY",
            "type": "edm"
        },
        {
            "source": "7CajNmpbOovFoOoasH2HaY",
            "target": "7CajNmpbOovFoOoasH2HaY",
            "type": "electro house"
        },
        {
            "source": "7CajNmpbOovFoOoasH2HaY",
            "target": "7CajNmpbOovFoOoasH2HaY",
            "type": "house"
        },
        {
            "source": "7CajNmpbOovFoOoasH2HaY",
            "target": "7CajNmpbOovFoOoasH2HaY",
            "type": "pop"
        },
        {
            "source": "7CajNmpbOovFoOoasH2HaY",
            "target": "7CajNmpbOovFoOoasH2HaY",
            "type": "progressive house"
        },
        {
            "source": "7oEcbD30xpHuMjkRT9G4fy",
            "target": "7oEcbD30xpHuMjkRT9G4fy",
            "type": "fingerstyle"
        }
    ]
};

d3.json(dados, function (error, graph) {
    if (error) throw error;

    const types = d3.set(graph.edges.map(e => e.type)).values();
    color.domain(types);

    legend
        .scale(color)
        .on('cellover', c => {
            d3.selectAll('.links line')
                .transition().duration(200)
                .attr('opacity', d => d.type === c ? 1 : 0);

            d3.selectAll('.node image')
                .filter(n => {
                    return graph.edges
                        .filter(e => e.type === c)
                        .find(e => e.source.id === n.id || e.target.id === n.id) !== undefined;
                })
                .attr('x', n => -33)
                .attr('y', n => -33)
                .attr('width', 66)
                .attr('height', 66);
        })
        .on('cellout', () => {
            d3.selectAll('.links line')
                .transition().duration(200)
                .attr('opacity', 1);

            d3.selectAll('.node image')
                .attr('x', n => -25)
                .attr('y', n => -25)
                .attr('width', 50)
                .attr('height', 50);
        });

    svg.select('.category-legend')
        .call(legend);

    const link = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(graph.edges)
        .enter()
        .append('line')
        .style('stroke', e => color(e.type))
        .attr('stroke-width', 1)
        .on('mouseover', d => {
            d3.selectAll('.legendlabel')
                .filter(l => l === d.type)
                .classed('legend-hover', true);
        })
        .on('mouseout', () => {
            d3.selectAll('.legendlabel')
                .classed('legend-hover', false);
        });

    const nodeGroup = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('.node')
        .data(graph.nodes)
        .enter()
        .append('g')
        .attr('class', 'node')
        .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended));

    nodeGroup
        .append('image')
        .attr('xlink:href', d => d.img)
        .attr('x', -25)
        .attr('y', -25)
        .attr('width', 55)
        .attr('height', 55)
        .on('mouseover', (d, i, nodes) => {
            svg.selectAll('.links line')
                .transition()
                .duration(200)
                .attr('opacity', e => d.id === e.source.id || d.id === e.target.id ? 1 : 0);

            tooltipDiv.transition()
                .duration(200)
                .style('opacity', 0.7);
            tooltipDiv.html(`${d.name}`)
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY + "px");

            d3.selectAll(nodes)
                .classed('greyed', n => n.id !== d.id && !isAdjacent(d, n))
                .transition().duration(200)
                .attr('x', n => isAdjacent(d, n) ? -33 : -25)
                .attr('y', n => isAdjacent(d, n) ? -33 : -25)
                .attr('width', n => isAdjacent(d, n) ? 66 : 50)
                .attr('height', n => isAdjacent(d, n) ? 66 : 50);

            d3.select(nodes[i])
                .transition()
                .duration(200)
                .attr('x', -40)
                .attr('y', -40)
                .attr('width', 80)
                .attr('height', 80);

            d3.selectAll('.legendlabel')
                .filter(l => {
                    return graph.edges
                        .filter(e => e.source.id === d.id || e.target.id === d.id)
                        .map(e => e.type)
                        .includes(l);
                })
                .classed('legend-hover', true);

        })
        .on('mouseout', (d, i, nodes) => {
            svg.selectAll('.links line')
                .transition()
                .duration(200)
                .attr('opacity', 1)
                .attr('stroke-width', 1)
                .style('stroke', e => color(e.type));

            tooltipDiv.transition()
                .duration(200)
                .style('opacity', 0);

            d3.selectAll(nodes)
                .classed('greyed', false)
                .transition()
                .duration(200)
                .attr('x', -25)
                .attr('y', -25)
                .attr('width', 55)
                .attr('height', 55);

            d3.selectAll('.legendlabel')
                .classed('legend-hover', false);
            const node = d3.selectAll('.node')
                .filter(n => d.id === n.id);

            node.select('rect')
                .remove();

            node.select('text')
                .remove();
        })
        .on('click', d => window.open(d.url));

    simulation
        .nodes(graph.nodes)
        .on('tick', ticked);

    simulation.force('link')
        .links(graph.edges);

    function ticked() {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        nodeGroup.attr('transform', d => `translate(${d.x}, ${d.y})`);
    }

    function isAdjacent(source, node) {
        return graph.edges
            .filter(e => e.source.id === source.id || e.target.id === source.id)
            .find(e => e.target.id === node.id || e.source.id === node.id) !== undefined;
    }
});

function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function genreX(n) {
    const genres = n.genres.join('-');
    if (genres.includes('hip hop') || genres.includes('rap')) {
        return width / 4 * 3;
    } else if (genres.includes('house')) {
        return width / 4;
    } else {
        return width;
    }
}

function genreY(n) {
    const genres = n.genres.join('-');
    if (genres.length === 0 && !genres.includes('hip hop') && !genres.includes('rap') && genres.includes('house')) {
        return height / 4;
    } else {
        return height / 2;
    }
}

function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;


}
