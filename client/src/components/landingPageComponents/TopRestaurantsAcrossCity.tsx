import { useSelector } from "react-redux"
import type { RootState } from "../../main"


const TopRestaurantsAcrossCity = () => {

    const allCityBrads = useSelector((state: RootState) => state.restaurantsDetails.allCityBrands);
  
  return (
    <div className="pb-20 px-4 md:px-0">
        <p className="text-sm md:text-2xl text-black/80 font-bold mb-10">Best Places to Eat Across Cities</p>
        {
            allCityBrads == null ? (<p>Loading...</p>) : <div className="grid grid-cols-1 md:grid-cols-4  gap-4 text-black-80 ">
                {
                    allCityBrads.map((el, i) => (
                        <p className="text-center p-4 border rounded-xl hover:text-green-900 hover:border-green-900 hover:scale-95 transition-all duration-200 cursor-pointer" key={i}>{el.text}</p>
                    ))
                }
            </div>
        }
    </div>
  )
}

export default TopRestaurantsAcrossCity