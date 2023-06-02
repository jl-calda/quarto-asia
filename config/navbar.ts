export type Rooms = typeof rooms

export const rooms = [
  "Master",
  "Common",
  "Single",
  "Studio",
  "Whole Unit",
  "Utility",
]

export type Houses = typeof houses
export const houses = ["HDB", "Condo", "Landed", "Studio", "Dormitory"]

export const navbarConfig = {
  name: "quarto.sg",
  description:
    "We help you find listings for your next room rental in Singapore.",
  rooms: rooms,
  houses: houses,
}
