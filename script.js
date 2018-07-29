
var width = 1430, height = 500;

    var svg = d3.select("#chart")
                .append("svg")
                .attr("height",height)
                .attr("width",width)
                .append("g")
                .attr("transform", "translate(0,0)");


    d3.queue()
        .defer(d3.csv,"Data.csv")
        .await(ready);

    function ready (error, datapoints) {

        datapoints.forEach(function(d) {
            d.State = d.State;
            d.Deaths = +d.Deaths; 
            d.Year = +d.Year;      
        //  console.log(d.Deaths); 
  });

        var ct = d3.sum(datapoints.map(function(d){if (d.State == "Connecticut") return d.Deaths;}));
        var md = d3.sum(datapoints.map(function(d){if (d.State == "Maryland") return d.Deaths;}));
        var nj = d3.sum(datapoints.map(function(d){if (d.State == "New Jersey") return d.Deaths;}));
        var ny = d3.sum(datapoints.map(function(d){if (d.State == "New York") return d.Deaths;}));
        var va = d3.sum(datapoints.map(function(d){if (d.State == "Virginia") return d.Deaths;}));

        var mort = [ct,md,nj,ny,va];
        //console.log(mort);
        var st = ["Connecticut","Maryland","New Jersey", "New York", "Virginia"];

        var circles = svg.selectAll("circle")
                         .data(mort)
                         .enter().append("circle")
                         .attr("class", "Deaths")
                         .attr("r", function(d) {return d/200;})
                         .attr("fill","steelblue")
                         .attr("cx", function(d,i){return 200*i+50;})
                         .attr("cy", function(d){return 250;});


        //console.log(st[1])        

        var txtCt = svg.append("text").attr("x",20).attr("y",300).text(st[0]);
        var txtMd = svg.append("text").attr("x",222).attr("y",320).text(st[1]);
        var txtNj = svg.append("text").attr("x",420).attr("y",330).text(st[2]);
        var txtNy = svg.append("text").attr("x",620).attr("y",360).text(st[3]);
        var txtVa = svg.append("text").attr("x",828).attr("y",310).text(st[4]);


        var dthCt = svg.append("text").attr("x",10).attr("y",210).text("Total deahths: "+mort[0]);
        var dthMd = svg.append("text").attr("x",200).attr("y",190).text("Total deahths: "+mort[1]);
        var dthNj = svg.append("text").attr("x",400).attr("y",180).text("Total deahths: "+mort[2]);
        var dthNy = svg.append("text").attr("x",590).attr("y",150).text("Total deahths: "+mort[3]);
        var dthVa = svg.append("text").attr("x",800).attr("y",205).text("Total deahths: "+mort[4]);

    }
        