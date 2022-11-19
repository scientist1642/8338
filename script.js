const height = 100;
const width = 320;
const randomX = d3.randomNormal(width / 2, 80);
const randomY = d3.randomNormal(height / 2, 80);
const data = Array.from({ length: 8000 }, () => [randomX(), randomY()]);
console.log(data);
console.log("rame");
function main(data) {
  data = data.map((d) => [
    d.x,
    d.y,
    "https://p2.piqsels.com/preview/486/603/772/adult-alone-black-and-white-dark.jpg",
  ]);
  var svg = d3
    .select("#dataviz_axisZoom")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  const g = svg.append("g");
  //g.selectAll("circle").data(data).join("circle");
  console.log(g);

  const defs = g.append("svg:defs");
  let zoomlevel = 1;
  defs
    .append("pattern")
    //.attr("id", "grump_avatar")
    .attr("id", function (d) {
      //console.log(d[0]);
      return "image";
      return "image" + d[2];
    })
    .attr("width", 1)
    .attr("height", 1)
    //.attr("patternUnits", "userSpaceOnUse")
    .append("image")
    .attr("xlink:href", "./images/ax2.jpeg")
    .attr("width", 1)
    .attr("height", 1);

  g.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", ([x]) => x)
    .attr("cy", ([, y]) => y)
    .attr("r", 0.5)
    .on("mouseover", function (d) {
      if (zoomlevel >= 10)
        d3.select(this)
          .attr("fill", function (d) {
            //return "url(#image" + d[2] + ")";
            return "url(#image)";
          })
          .style("cursor", "pointer");
    });

  //.style("fill", "#00000")
  //.style("opacity", 1);
  svg.call(
    d3
      .zoom()
      .extent([
        [0, 0],
        [width, height],
      ])
      .scaleExtent([1, 100])
      .on("zoom", zoomed)
  );

  function zoomed({ transform }) {
    console.log(transform);
    zoomlevel = transform.k;
    g.attr("transform", transform);
  }
}

d3.csv("./data/data.csv").then((data) => main(data));
