import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../main"
import { useEffect, useState } from "react";
import { getCartItems, removeAllItem, removeItems } from "../services/operations.ts/cart";
import { clearCart, removeFromCart, setCartItems } from "../redux/slices/restaurants";
import { IMAGE_CDN } from "../utils";
import { useNavigate } from "react-router-dom";

interface CartItemResponse {
  price: number;
  itemId: string;
  image: string;
  name: string;
  defaultPrice?: number;
}

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      const res = await getCartItems();
      if (res?.data) {
        dispatch(clearCart());
        res.data.map((el: CartItemResponse) => {
          dispatch(setCartItems({
            id: el.itemId,
            image: el.image ?? "",
            name: el.name,
            price: el.defaultPrice ?? el.price ?? 0,
          }))
        })
      }
    }
    fetchCartItems();
  }, [dispatch]);

  const items = useSelector((state: RootState) => state.restaurantsDetails.cartItems);
  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handleProcess = async () => {
    setIsLoading(true);
    await removeAllItem();
    dispatch(clearCart());
    
    // Show loading for 2 seconds
    setTimeout(() => {
      setIsLoading(false);
      setIsOrderPlaced(true);
    }, 2000);
  }

  const handleClearCart = async () => {
    const clearAllItems = await removeAllItem();
    if (!clearAllItems) {
      return;
    }
    navigate(-1);
    dispatch(clearCart());
  }

  const handleRemoveItem = async (itemId: { itemId: string }) => {
    const res = await removeItems(itemId);
    if (!res) {
      return;
    }
    dispatch(removeFromCart(itemId.itemId));
  }

  const handleGoToHome = () => {
    navigate("/");
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-semibold text-gray-700">Placing your order...</p>
        </div>
      </div>
    );
  }

  // Order placed state
  if (isOrderPlaced) {
    return (
      <div className="min-h-screen flex justify-center items-center px-4">
        <div className="flex flex-col items-center gap-6 text-center max-w-md">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-semibold text-black/90 mb-2">Thank you for choosing us!</p>
            <p className="text-lg text-gray-600">Your order is on the way!</p>
          </div>
          <button
            onClick={handleGoToHome}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pt-24 px-4 flex flex-col lg:flex-row gap-6 min-h-screen w-full pb-4">
      {items.length !== 0 ? (
        <>
          <div className="lg:w-[70%] w-full bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg md:text-xl font-semibold">
                Cart Items ({items.length})
              </h2>
              <p
                onClick={handleClearCart}
                className="cursor-pointer hover:text-green-800 transition-all duration-200 text-sm md:text-base"
              >
                Clear cart
              </p>
            </div>

            <div className="space-y-5 max-h-[60vh] md:max-h-[70vh] overflow-y-auto pr-2">
              {items.map((el) => (
                <div
                  key={el.id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4 last:border-b-0"
                >
                  <div className="flex gap-4 items-center w-full sm:w-auto">
                    <img
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover bg-gray-100 flex-shrink-0"
                      src={
                        el.image
                          ? `${IMAGE_CDN}${el.image}`
                          : "/placeholder-food.png"
                      }
                      alt={el.name}
                      loading="lazy"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm md:text-base truncate">{el.name}</p>
                      <p className="text-gray-600 mt-1 text-sm md:text-base">₹ {el.price / 100}</p>
                      <p
                        className="text-green-800 text-sm mt-1 cursor-pointer hover:text-green-900"
                        onClick={() => handleRemoveItem({ itemId: el.id })}
                      >
                        Remove
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 border rounded-lg px-3 py-1 self-start sm:self-auto">
                    <button className="text-gray-500 font-bold">−</button>
                    <span className="font-medium">1</span>
                    <button className="text-green-600 font-bold">+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-[30%] w-full bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 h-fit lg:sticky lg:top-28">
            <h2 className="text-lg font-semibold mb-4">Bill Summary</h2>

            <div className="flex justify-between text-gray-700 mb-2 text-sm md:text-base">
              <span>Item Total</span>
              <span>₹ {total / 100}</span>
            </div>

            <div className="flex justify-between text-gray-700 mb-2 text-sm md:text-base">
              <span>Delivery Fee</span>
              <span>₹ 40</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-semibold text-base md:text-lg">
              <span>To Pay</span>
              <span>₹ {total / 100}</span>
            </div>

            <button
              onClick={handleProcess}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition text-sm md:text-base"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      ) : (
        <div className="justify-center items-center flex flex-col w-full h-[80dvh]">
          <p className="text-xl font-semibold text-black/90 mb-3 text-center px-4">
            Thank you for choosing us. <br /> Your order is on the way!
          </p>
          <button
            onClick={handleGoToHome}
            className="p-2 px-4 bg-green-600 hover:bg-green-700 rounded-lg text-white/90 transition-all duration-200 cursor-pointer"
          >
            Go to Home
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart