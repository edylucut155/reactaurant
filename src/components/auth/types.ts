export type User = {
    [key: string]: string,
    type: UserTypes;
};

export enum UserTypes {
    CLIENT = "client",
    RESTAURANT = "restaurant"
}

export enum AuthModals {
    REGISTER,
    SIGNUP,
    CLOSED
}