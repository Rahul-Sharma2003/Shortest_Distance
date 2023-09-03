function shortestPath(graph, start, end) {

  const parent = new Map();
  const distances = new Map();
  const toVisit = new Set([start]);

  distances.set(start, 0);

  while (toVisit.size > 0) {
    let current = null;
    let minDistance = Infinity;

    // Find the node with the minimum distance from the start
    for (const node of toVisit) {
      if (distances.get(node) < minDistance) {
        current = node;
        minDistance = distances.get(node);
      }
    }

    toVisit.delete(current);

    if (current === end) {
      const path = [];
      let node = end;

      while (node !== start) {
        path.unshift(node);
        node = parent.get(node);
      }
      path.unshift(start);
      path.push(distances.get(end));
      return path;
    }

    for (const neighbor of graph[current]) {
      const [neighborNode, weight] = neighbor;
      const distance = distances.get(current) + weight;

      if (!distances.has(neighborNode) || distance < distances.get(neighborNode)) {
        parent.set(neighborNode, current);
        distances.set(neighborNode, distance);
        toVisit.add(neighborNode);
      }
    }
  }

  return null; // No path found


}



function showEndButtons() {

  startStation = event.target.id;

  for (var i = 0; i < station.length; i++) {

    (function (index) {

      station[index].getElementsByTagName("button")[0].style.display = "None";



      station[index].onmouseover = function () {
        station[index].getElementsByTagName("button")[1].style.display = "block";

      };

      station[index].onmouseout = function () {
        station[index].getElementsByTagName("button")[1].style.display = "None";

      };



    })(i);



  }


}






function EndButtonSelected() {


  var x = document.querySelectorAll('.end-btn');

console.log("fuck");

  for (var i = 0; i < x.length; i++) {
    x[i].style.visibility = 'hidden';
  }



  endStation = event.target.id;

  origin = startStation.split("-")[2];
  destination = endStation.split("-")[2],

    s = station_Id.get(origin);
  e = station_Id.get(destination);

  nodes = shortestPath(adj, s, e);


  dist = nodes.pop(); document.getElementById("result").innerText = "The Shortest Path Length from Node  " + origin + " to " + destination + " is : " + dist;

  ShowPath(nodes);


  document.getElementById("next").style.display = "Block";

  document.getElementById("next").addEventListener("click", function () { location.reload(); });


}


function makeEdges() {


  for (i = 0; i < edges.length; i++) {


    const posx = document.getElementById(Id_station.get(edges[i][0])).getBoundingClientRect();
    const posy = document.getElementById(Id_station.get(edges[i][1])).getBoundingClientRect();

    pos1 = [(posx.left + posx.right) / 2, (posx.top + posx.bottom) / 2];

    pos2 = [(posy.left + posy.right) / 2, (posy.top + posy.bottom) / 2];



    var length;
    var degree;
    var left_pos, top_pos, delta_x, delta_y;



    if (pos1[0] > pos2[0]) [pos1, pos2] = [pos2, pos1];

    if (pos1[0] == pos2[0]) {
      delta_x = 0; delta_y = pos2[1] - pos1[1];

      if (pos1[1] < pos2.y) { left_pos = pos1[0]; top_pos = pos1[1]; degree = 90; }

      else { left_pos = pos1[0]; top_pos = pos1[1]; degree = -90; }

    }


    else {

      left_pos = pos1[0];
      top_pos = pos1[1];

      if (pos2[1] < pos1[1]) { delta_x = pos1[0] - pos2[0]; delta_y = Math.abs(pos1[1] - pos2[1]); }

      else { delta_x = Math.abs(pos1[0] - pos2[0]); delta_y = Math.abs(pos1[1] - pos2[1]); }

    }

    if (delta_x != 0) degree = Math.atan((delta_y) / delta_x) * 57.30;

    length = Math.sqrt(delta_y * delta_y + delta_x * delta_x);


    newDiv = document.createElement('div');

    document.body.appendChild(newDiv);

    let ew = document.createElement("span");
    ew.innerHTML = edges[i][2];
    ew.classList.add("height");


    if (edges[i][0] == 1 && edges[i][1] == 6) {
      ew.style.left = "80%";
    }else if(edges[i][0] == 2 && edges[i][1] == 5){
      ew.style.left = "80%";
    }else if(edges[i][0] == 3 && edges[i][1] == 7){
      ew.style.left = "70%";
    }
    
    newDiv.appendChild(ew);


    newDiv.classList.add("edge");

    newDiv.id = Id_station.get(edges[i][0]) + "-" + Id_station.get(edges[i][1]);


    newDiv.style.left = left_pos + 'px';
    newDiv.style.top = top_pos + 'px';
    newDiv.style.width = length + 'px';


    newDiv.style.transform = 'rotate(' + degree + 'deg)';

  }

}








var n = 18;

const Id_station = new Map([

  [0, "A"],
  [1, "B"],
  [2, "C"], [3, "D"], [4, "E"], [5, "F"], [6, "G"], [7, "H"], [8, "I"], [9, "J"], [10, "K"], [11, "L"], [12, "M"],[13,"N"],[14,"O"],[15,"P"],[16,"Q"],[17,"R"]

]);

const station_Id = new Map([
  ["A", 0],
  ["B", 1],
  ["C", 2], ["D", 3], ["E", 4], ["F", 5], ["G", 6], ["H", 7], ["I", 8], ["J", 9], ["K", 10], ["L", 11], ["M", 12],["N",13],["O",14],["P",15],["Q",16],["R",17]
]);


var edges = [[0, 1, 9], [0, 7, 18], [0, 2, 13], [0, 3, 22], [1, 6, 18], [2, 5, 8], [2, 9, 28], [3, 7, 30], [4, 6, 6], [5, 7, 10], [5, 12, 16], [6, 8, 4], [7, 10, 11], [7, 12, 8],
[8, 9, 3], [8, 10, 13], [9, 11, 7], [10, 12, 6], [11, 12, 18], [3, 4, 7],[4,16,19],[5,16,10],[12,15,6],[9,13,16],[11,14,10],[13,14,10],[14,17,14],[7,17,10],[5,15,17]];



makeEdges();




const adj = new Array(n).fill(null).map(() => []);

for (const edge of edges) {
  adj[edge[0]].push([edge[1], edge[2]]);
  adj[edge[1]].push([edge[0], edge[2]]);
}


var station = document.getElementsByClassName("Station");


for (var i = 0; i < station.length; i++) {


  var start_button = document.createElement("button");
  start_button.innerHTML = "START";
  start_button.classList.add("st-btn");
  start_button.id = "start-button-" + station[i].id;

  var end_button = document.createElement("button");
  end_button.innerHTML = "END";
  end_button.classList.add("end-btn");
  end_button.id = "end-button-" + station[i].id;


  station[i].appendChild(start_button);
  station[i].appendChild(end_button);
  start_button.style.display = "None";
  end_button.style.display = "None";

  (function (index) {


    station[index].onmouseover = function () {

      station[index].getElementsByTagName("button")[0].style.display = "block";
      //   station[index].getElementsByTagName("button")[1].style.display = "block";
    };

    station[index].onmouseout = function () {

      station[index].getElementsByTagName("button")[0].style.display = "None";
      //   station[index].getElementsByTagName("button")[1].style.display = "None";
    };

  })(i);



}


var startButtons = document.getElementsByClassName("st-btn");
var endButtons = document.getElementsByClassName("end-btn");

// Loop through the startButtons collection and add a click event listener to each button
for (var i = 0; i < startButtons.length; i++) {

  startButtons[i].addEventListener("click", showEndButtons);
  endButtons[i].addEventListener("click", EndButtonSelected);
}








var startStation;
var endStation;


function ShowPath(arr) {

  for (var i = 0; i < arr.length - 1; i++) {

    p = [Id_station.get(arr[i]), Id_station.get(arr[i + 1])];

    p.sort()

    document.getElementById(p[0] + "-" + p[1]).classList.add("Path");


  }

}






//   document.getElementById("next").addEventListener("click", function () { location.reload(); });
