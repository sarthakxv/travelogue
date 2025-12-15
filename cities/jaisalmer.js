const places = [
  {
    name: "Jaisalmer Fort",
    type: "sightseeing",
    desc: "A living fort made of yellow sandstone."
  },
  {
    name: "Patwon Ki Haveli",
    type: "sightseeing",
    desc: "A cluster of five havelis of unique architecture."
  },
  {
    name: "Sam Sand Dunes",
    type: "sightseeing",
    desc: "Desert dunes perfect for camel safaris."
  }
];

import { initPage } from "./utils.js";

initPage(places, "Jaisalmer");
