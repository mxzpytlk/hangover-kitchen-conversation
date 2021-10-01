
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum RegisterResult {
    SUCCESS = "SUCCESS",
    FAILED = "FAILED"
}

export interface UpdateProfileInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
}

export interface SuccessAuth {
    user: User;
    accessToken: string;
}

export interface IQuery {
    login(email: string, password: string): SuccessAuth | Promise<SuccessAuth>;
    getRooms(): Nullable<Room>[] | Promise<Nullable<Room>[]>;
    getRoom(roomId: string): Room | Promise<Room>;
}

export interface IMutation {
    register(email: string, password: string): Nullable<RegisterResult> | Promise<Nullable<RegisterResult>>;
    refresh(): Nullable<SuccessAuth> | Promise<Nullable<SuccessAuth>>;
    logout(): Nullable<boolean> | Promise<Nullable<boolean>>;
    createRoom(title: string, description?: Nullable<string>, isOpen?: Nullable<boolean>): Room | Promise<Room>;
    joinRoom(roomId: string): Nullable<Room> | Promise<Nullable<Room>>;
    letUserIn(userName: string, roomId: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    kickUser(userName: string, roomId: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    updateProfileInfo(changes?: Nullable<UpdateProfileInput>): Nullable<boolean> | Promise<Nullable<boolean>>;
}

export interface Room {
    id: string;
    name: string;
    isOpen: boolean;
    description?: Nullable<string>;
}

export interface Profile {
    name: string;
    description?: Nullable<string>;
}

export interface User {
    isActivated: boolean;
    personalInfo?: Nullable<Profile>;
}

type Nullable<T> = T | null;
