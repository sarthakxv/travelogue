export interface City {
  id: number;
  name: string;
  slug: string;
  created_at?: string;
}

export interface Place {
  id: number;
  city: string;
  name: string;
  type: PlaceType;
  description: string;
  created_at?: string;
}

export type PlaceType =
  | "food"
  | "bar"
  | "hotel"
  | "sightseeing"
  | "shopping"
  | "beach";

export const PLACE_TYPES: PlaceType[] = [
  "sightseeing",
  "food",
  "bar",
  "hotel",
  "shopping",
  "beach",
];

export const PLACE_TYPE_LABELS: Record<PlaceType, string> = {
  food: "Food",
  bar: "Bars",
  hotel: "Stays",
  sightseeing: "Sights",
  shopping: "Shopping",
  beach: "Beach",
};
