export interface IListingParams {
  house: string
  room: string
}

export default async function getListings(params: IListingParams) {
  try {
    const { house, room } = params
    let query: any = {}

    if (house) {
      query.house = house
    }

    if (room) {
      query.room = room
    }
  } catch (error) {
    console.log(error)
  }
}
