const places = [
  {
    name: "Umiam Lake",
    type: "sightseeing",
    desc: "A mesmerizing man-made reservoir."
  },
  {
    name: "Elephant Falls",
    type: "sightseeing",
    desc: "Three-tiered waterfall surrounded by greenery."
  },
  {
    name: "Shillong Peak",
    type: "sightseeing",
    desc: "Highest point in Shillong offering panoramic views."
  }
];

import { initPage } from "./utils.js";

initPage(places, "Shillong");
