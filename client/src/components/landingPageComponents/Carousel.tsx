import { useRef } from "react";
import type { RootState } from "../../main";
import { useSelector } from "react-redux";
import CarouselSkel from "../loadingSkeleton/CarouselSkel";

const Carousel = () => {

  const carouselRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    if(carouselRef.current){
      carouselRef.current.scrollLeft -= 500;
    }
  }
  const scrollRight = () => {
    if(carouselRef.current){
      carouselRef.current.scrollLeft += 500;
    }
  }

  const itemsImages = useSelector(
    (state: RootState) => state.itemImagesState.itemsImage
  );
  return (
    <div className="pt-14 md:pt-23 border-b-2 border-gray-200 pb-18">
      <div className=" flex justify-between items-center">
        <p className="text-2xl font-bold">Whats on Your mind?</p>
        <div className="flex gap-4">
          <p onClick={scrollLeft}>left</p>
          <p onClick={scrollRight}>Right</p>
        </div>
      </div>
      <div ref={carouselRef} className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth max-w-full ">
        {itemsImages == null ? (
          <div className="mt-8">
            <CarouselSkel />
          </div>
        ) : (
          itemsImages.map((el) => (
            <div
              key={el.id}
              className="min-w-25 md:min-w-37.5 overflow-hidden"
            >
              <img
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${el.imageId}`}
                className="w-full h-full object-cover mt-3"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Carousel;
