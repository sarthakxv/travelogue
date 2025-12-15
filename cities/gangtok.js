const places = [
  {
    name: "Tsomgo Lake",
    type: "sightseeing",
    desc: "Glacial lake associated with many myths."
  },
  {
    name: "MG Marg",
    type: "shopping",
    desc: "The main street of Gangtok, great for walk and food."
  },
  {
    name: "Rumtek Monastery",
    type: "sightseeing",
    desc: "One of the largest and most significant monasteries."
  }
];

import { initPage } from "./utils.js";

initPage(places, "Gangtok");
