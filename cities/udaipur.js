const places = [
  {
    name: "City Palace",
    type: "sightseeing",
    desc: "A monumental complex of 11 palaces, courtyards and gardens."
  },
  {
    name: "Lake Pichola",
    type: "sightseeing",
    desc: "Artificial fresh water lake, created in the year 1362 AD."
  },
  {
    name: "Ambrai Ghat",
    type: "sightseeing",
    desc: "A beautiful ghat at the lakeside."
  }
];

import { initPage } from "./utils.js";

initPage(places, "Udaipur");
