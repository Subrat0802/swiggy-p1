import type { Request, Response } from "express";
import Cart from "../models/cartItems.js";
import { success } from "zod";


export const addtoCart = async (req: Request, res: Response) => {
    try{
        const {itemId, image, name, price} = req.body; 
        //@ts-ignore
        const {id} = req.user
        if(!image || !name || !itemId || !price){
            return res.status(404).json({
                message:"Missing some credentials",
                success:false
            })
        }

        const alreadyExists = await Cart.findOne({
            userId: id,
            itemId: itemId,
            });

        if (alreadyExists) {
            return res.status(409).json({
                success: false,
                message: "Item already added",
            });
        }

        const response = await Cart.create({itemId, image, name, price, userId:id});
        if(!response) {
            return res.status(404).json({
                message:"Error while adding items in cart",
                success:false
            })
        }

        return res.status(200).json({
            message:"Item added to cart",
            success: true,
            response: response
        })
    }catch(error){  
        return res.status(500).json({
            message:"Server error while adding items to cart",
            success:false
        })
    }
}


export const getAllCartItems = async (req: Request, res: Response) => {
    try{
        //@ts-ignore
        const {id} = req.user;
        const response = await Cart.find({userId: id});

        if(!response) {
            return res.status(409).json({
                message:"No items in cart",
                success:false
            })
        }

        return res.status(200).json({
                message:"All Items in cart",
                success:true,
                data: response
            })
    }catch(error){
        return res.status(500).json({
                message:"server error while fetching cart items",
                success:false
            })
    }
}

export const removeItem = async (req: Request, res: Response) => {
    try{
        // @ts-ignore
        const { id: userId } = req.user;
        const itemId = req.query.itemId as string;

        const deletedItem = await Cart.findOneAndDelete({
        itemId: itemId,
        userId: userId,
        });

        if (!deletedItem) {
        return res.status(404).json({
            success: false,
            message: "Cart item not found",
        });
        }

        res.status(200).json({
            success: true,
            message: "Item removed from cart",
        });

    }catch(error){
        return res.status(500).json({
                message:"server error while removing cart items",
                success:false
            })
    }
}



export const removeAllItem = async (req: Request, res: Response) => {
    try{
        // @ts-ignore
        const { id: userId } = req.user;

        const deletedAllItem = await Cart.deleteMany({
        userId: userId,
        });

        if (!deletedAllItem) {
        return res.status(404).json({
            success: false,
            message: "Cart items not found",
        });
        }

        res.status(200).json({
            success: true,
            message: "Item removed from cart",
        });

    }catch(error){
        return res.status(500).json({
                message:"server error while removing all cart items",
                success:false
            })
    }
}