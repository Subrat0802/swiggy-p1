import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../main"
import { useEffect, useState } from "react";
import { getCartItems } from "../services/operations.ts/cart";
import { clearCart, setCartItems } from "../redux/slices/restaurants";
import { IMAGE_CDN } from "../utils";
const Cart = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCartItems = async () => {
            const res = await getCartItems()
            console.log("res", res);
            res.data.map((el: { price: number; itemId: string; image: string; name: string; defaultPrice: number; }) => {
                    dispatch(setCartItems({
                      id:el.itemId,
                      image: el.image ?? "",
                      name: el.name,
                      price: el.defaultPrice ?? el.price ?? 0,}))
                  })
        }
        fetchCartItems();
    }, []);

    const items = useSelector((state: RootState) => state.restaurantsDetails.cartItems);
    const total = items.reduce((sum, item) => sum + item.price, 0);
    

  return (
    <div className="max-w-7xl mx-auto pt-24 px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">

  <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6">
    <div className="flex justify-between items-center mb-6 ">
    <h2 className="text-xl font-semibold ">
      Cart Items ({items.length})
    </h2>
    <p onClick={() => dispatch(clearCart())} className="cursor-pointer hover:text-green-800 transition-all duration-200">Clear cart</p>
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
            </div>
          </div>

    
          <div className="flex items-center gap-3 border rounded-lg px-3 py-1">
            <button className="text-gray-500 font-bold">−</button>
            <span className="font-medium">1</span>
            <button className="text-green-600 font-bold">+</button>
          </div>
        </div>
      ))}
    </div>
  </div>


  <div className="bg-white rounded-xl shadow-sm border p-6 h-fit sticky top-28">
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

    <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition">
      Proceed to Checkout
    </button>
  </div>
</div>

  )

}

export default Cart