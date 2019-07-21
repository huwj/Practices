'use strict'

var OPACITY = {
    NODE_DEFAULT: 0.9,
    NODE_FADED: 0.1,
    NODE_HIGHLIGHT: 0.8,
    LINK_DEFAULT: 0.6,
    LINK_FADED: 0.05,
    LINK_HIGHLIGHT: 0.9
  },
  TYPES = ["Perforce", "P4Svc", "JMD", "BaTCave"],
  TYPE_COLORS = ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d"],
  TYPE_HIGHLIGHT_COLORS = ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494"],
  LINK_COLOR = "#b3b3b3",
  INFLOW_COLOR = "#2E86D1",
  OUTFLOW_COLOR = "#D63028",
  NODE_WIDTH = 36,
  COLLAPSER = {
    RADIUS: NODE_WIDTH / 2,
    SPACING: 2
  },
  OUTER_MARGIN = 10,
  MARGIN = {
    TOP: 2 * (COLLAPSER.RADIUS + OUTER_MARGIN),
    RIGHT: OUTER_MARGIN,
    BOTTOM: OUTER_MARGIN,
    LEFT: OUTER_MARGIN
  },
  TRANSITION_DURATION = 400,
  HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM,
  WIDTH = 960 - MARGIN.LEFT - MARGIN.RIGHT,
  LAYOUT_INTERATIONS = 32,
  REFRESH_INTERVAL = 7000;

colorScale = d3.scale.ordinal().domain(TYPES).range(TYPE_COLORS),
highlightColorScale = d3.scale.ordinal().domain(TYPES).range(TYPE_HIGHLIGHT_COLORS),

var svg = d3.select("#chart").append("svg")
        .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
        .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
        .append("g")
        .attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.TOP + ")");

svg.append("g").attr("id", "links");
svg.append("g").attr("id", "nodes");

biHiSankey = d3.biHiSankey();


// Set the biHiSankey diagram properties
biHiSankey
  .nodeWidth(NODE_WIDTH)
  .nodeSpacing(10)
  .linkSpacing(4)
  .arrowheadScaleFactor(0.5) // Specifies that 0.5 of the link's stroke WIDTH should be allowed for the marker at the end of the link.
  .size([WIDTH, HEIGHT]);

path = biHiSankey.link().curvature(0.45);

var exampleNodes = [
	{"id": "Perforce", 	"value": "OK"},
	{"id": "P4Svc", 	"value": "OK"},	
	{"id": "JMD", 		"value": "OK"},	
	{"id": "BaTCave", 	"value": "OK"}	
]

var exampleLinks = [
	{"source":"P4Svc",		target:"Perforce", 	"value": Math.floor(Math.random() * 100)},
	{"source":"JMD",		  target:"P4Svc", 	  "value": Math.floor(Math.random() * 100)},
	{"source":"BaTCave",	target:"JMD", 		  "value": Math.floor(Math.random() * 100)},
	{"source":"BaTCave",	target:"Perforce", 	"value": Math.floor(Math.random() * 100)}
]

biHiSankey
  .nodes(exampleNodes)
  .links(exampleLinks)
  .layout(LAYOUT_INTERATIONS);

  function update () {
    var link, linkEnter, node, nodeEnter;
  
    function dragmove(node) {
      node.x = Math.max(0, Math.min(WIDTH - node.width, d3.event.x));
      node.y = Math.max(0, Math.min(HEIGHT - node.height, d3.event.y));
      d3.select(this).attr("transform", "translate(" + node.x + "," + node.y + ")");
      biHiSankey.relayout();
      svg.selectAll(".node").selectAll("rect").attr("height", function (d) { return d.height; });
      link.attr("d", path);
    }
  
  }
  


update();
