import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../main"
import { useEffect } from "react";
import { getCartItems, removeAllItem, removeItems } from "../services/operations.ts/cart";
import { clearCart, removeFromCart, setCartItems } from "../redux/slices/restaurants";
import { IMAGE_CDN } from "../utils";
import { Link, useNavigate } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCartItems = async () => {
            const res = await getCartItems()
            dispatch(clearCart());
            res.data.map((el: { price: number; itemId: string; image: string; name: string; defaultPrice: number; }) => {
                    dispatch(setCartItems({
                      id:el.itemId,
                      image: el.image ?? "",
                      name: el.name,
                      price: el.defaultPrice ?? el.price ?? 0,}))
                  })
        }
        fetchCartItems();
    }, [dispatch]);

    const items = useSelector((state: RootState) => state.restaurantsDetails.cartItems);
    const total = items.reduce((sum, item) => sum + item.price, 0);

    const handleProcess = () => {
      removeAllItem()
      dispatch(clearCart());
    }

    const handleClearCart = async () => {
      const clearAllItems = await removeAllItem();
      if(!clearAllItems) {
        return;
      }
      navigate(-1); 
      dispatch(clearCart());
    }

    const handleRemoveItem = async (itemId: {itemId: string}) => {
      const res = await removeItems(itemId);
      if(!res) {
        return;
      }
      dispatch(removeFromCart(itemId.itemId));
    }
    
  return (
    <div className="max-w-7xl mx-auto pt-24 px-4 flex gap-6 h-screen w-full pb-4">

  {items.length !== 0 ? <> <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6 w-[70%]">
    <div className="flex justify-between items-center mb-6 ">
    <h2 className="text-xl font-semibold ">
      Cart Items ({items.length})
    </h2>
    <p onClick={handleClearCart} className="cursor-pointer hover:text-green-800 transition-all duration-200">Clear cart</p>
    </div>
    

    <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-2">
      {items.map((el) => (
        <div
          key={el.id}
          className="flex justify-between items-center border-b pb-4 last:border-b-0"
        >
          <div className="flex gap-4 items-center">
            <img
              className="w-24 h-24 rounded-xl object-cover bg-gray-100"
              src={
                el.image
                  ? `${IMAGE_CDN}${el.image}`
                  : "/placeholder-food.png"
              }
              alt={el.name}
              loading="lazy"
            />

            <div>
              <p className="font-medium text-gray-900">{el.name}</p>
              <p className="text-gray-600 mt-1">₹ {el.price / 100}</p>
              <p className="text-green-800 text-sm mt-1" onClick={() => handleRemoveItem({itemId: el.id})}>Remove</p>
            </div>
          </div>

          {/* pending  */}
          <div className="flex items-center gap-3 border rounded-lg px-3 py-1">
            <button className="text-gray-500 font-bold">−</button>
            <span className="font-medium">1</span>
            <button className="text-green-600 font-bold">+</button>
          </div>
        </div>
      ))}
    </div>
  </div>


  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit sticky top-28 w-[30%]">
    <h2 className="text-lg font-semibold mb-4">Bill Summary</h2>

    <div className="flex justify-between text-gray-700 mb-2">
      <span>Item Total</span>
      <span>₹ {total / 100}</span>
    </div>

    <div className="flex justify-between text-gray-700 mb-2">
      <span>Delivery Fee</span>
      <span>₹ 40</span>
    </div>

    <hr className="my-4" />

    <div className="flex justify-between font-semibold text-lg">
      <span>To Pay</span>
      <span>₹ {total / 100}</span>
    </div>

    <button onClick={handleProcess} className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition">
      Proceed to Checkout
    </button>
  </div> </> : <div className="justify-center items-center flex flex-col w-full h-[80dvh] ">
      <p className="text-xl font-semibold text-black/90 mb-3">Thankyou for choosing us. <br /> Your order is one the way!</p>
      <Link to={"/"}><button className="p-2 px-4 bg-green-900 rounded-lg text-white/80 transition-all duration-200 hover:bg-green-800 cursor-pointer">Go to home page</button></Link>
    </div>}
</div>

  )

}

export default Cart