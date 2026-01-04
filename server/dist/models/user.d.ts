import mongoose from "mongoose";
declare const User: mongoose.Model<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    token?: string | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    token?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    token?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    token?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    token?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & Omit<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    token?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        token?: string | null;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.ResolveSchemaOptions<{
        timestamps: true;
    }>> & Omit<{
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        token?: string | null;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    token?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    token?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default User;
//# sourceMappingURL=user.d.ts.map