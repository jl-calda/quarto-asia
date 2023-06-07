import ListingSearch from "./ListingSearch"
import LocationSearch from "./LocationSearch"

type Props = {}

const Searchbar = (props: Props) => {
  return (
    <div className="sticky top-[65px] z-40 w-full border-b bg-background">
      <div className="container flex items-center space-x-4 sm:justify-between sm:space-x-0 px-2 sm:px-8">
        <ListingSearch />
        {/* <LocationSearch /> */}
      </div>
    </div>
  )
}

export default Searchbar
