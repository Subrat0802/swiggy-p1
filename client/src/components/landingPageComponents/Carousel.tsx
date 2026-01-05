import { useRef } from "react";
import type { RootState } from "../../main";
import { useSelector } from "react-redux";
import CarouselSkel from "../loadingSkeleton/CarouselSkel";
import { IMAGE_CDN } from "../../utils";
import { CircleChevronRight, CircleChevronLeft } from "lucide-react";

const Carousel = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= 500;
    }
  };
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += 500;
    }
  };

  const itemsImages = useSelector(
    (state: RootState) => state.restaurantsDetails.itemsImage
  );
  return (
    <div className="pt-20 md:pt-23 border-b-2 border-gray-200 md:pb-18 pb-10 px-4 md:px-0">
      <div className=" flex justify-between items-center ">
        <p className="text-sm md:text-2xl font-bold text-black/80">Whats on Your mind?</p>
        <div className="flex gap-4 text-black/50">
          <span className="cursor-pointer" onClick={scrollLeft}>
            <CircleChevronLeft />
          </span>
          <span className="cursor-pointer" onClick={scrollRight}>
            <CircleChevronRight />
          </span>
        </div>
      </div>
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth max-w-full "
      >
        {itemsImages == null ? (
          <div className="mt-8">
            <CarouselSkel />
          </div>
        ) : (
          itemsImages.map((el) => (
            <div key={el.id} className="min-w-25 md:min-w-37.5 overflow-hidden">
              <img
                src={`${IMAGE_CDN + el.imageId}`}
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
