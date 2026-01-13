import type { Request, Response } from "express";
export declare const addtoCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllCartItems: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const removeItem: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const removeAllItem: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=cart.d.ts.map