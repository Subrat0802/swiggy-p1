import { type Request, type Response } from "express";
export declare const fetchRestaurant: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const fetchRestaurantAfterUserLogin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const fetchRestaurantItems: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=fetchReq.d.ts.map