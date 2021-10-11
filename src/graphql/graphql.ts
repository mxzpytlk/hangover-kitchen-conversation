
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

export enum NotificationType {
    USER_WANT_JOIN_ROOM = "USER_WANT_JOIN_ROOM",
    ROOM_ACCESS_ALLOWED = "ROOM_ACCESS_ALLOWED",
    NEW_MESSAGE = "NEW_MESSAGE",
    MESSAGE_REPLY = "MESSAGE_REPLY",
    UNKNOWN = "UNKNOWN"
}

export interface SendMessageInput {
    roomId: string;
    text: string;
    isAnonimus: boolean;
    photoes?: Nullable<Upload[]>;
    repliedId?: Nullable<string>;
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
    messages(roomId: string, from?: Nullable<number>, to?: Nullable<number>): Message[] | Promise<Message[]>;
    notifications(from?: Nullable<number>, to?: Nullable<number>): Notification[] | Promise<Notification[]>;
    allRooms(from?: Nullable<number>, to?: Nullable<number>): Room[] | Promise<Room[]>;
    room(roomId: string): Room | Promise<Room>;
    waitingUsers(roomId: string): Profile[] | Promise<Profile[]>;
    managedRooms(): Room[] | Promise<Room[]>;
    ownRooms(from?: Nullable<number>, to?: Nullable<number>): Room[] | Promise<Room[]>;
}

export interface IMutation {
    register(email: string, password: string): Nullable<RegisterResult> | Promise<Nullable<RegisterResult>>;
    refresh(): Nullable<SuccessAuth> | Promise<Nullable<SuccessAuth>>;
    logout(): Nullable<boolean> | Promise<Nullable<boolean>>;
    sendMessage(message: SendMessageInput): Nullable<Message> | Promise<Nullable<Message>>;
    createRoom(title: string, description?: Nullable<string>, isOpen?: Nullable<boolean>, canSendAnonimusMessage?: Nullable<boolean>, limit?: Nullable<number>): Room | Promise<Room>;
    joinRoom(roomId: string): Nullable<Room> | Promise<Nullable<Room>>;
    letUserIn(userName: string, roomId: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    kickUser(userName: string, roomId: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    leaveRoom(roomId?: Nullable<string>): Nullable<boolean> | Promise<Nullable<boolean>>;
    updateProfileInfo(changes?: Nullable<UpdateProfileInput>): Nullable<Profile> | Promise<Nullable<Profile>>;
}

export interface Message {
    id: string;
    date: string;
    author?: Nullable<Profile>;
    text: string;
    photoes?: Nullable<string[]>;
    repliedId?: Nullable<string>;
}

export interface ISubscription {
    newMessages(roomId?: Nullable<string>): Nullable<Message> | Promise<Nullable<Message>>;
    notify(): Nullable<Notification> | Promise<Nullable<Notification>>;
}

export interface UserNotification {
    userName: string;
}

export interface RoomNotification {
    roomTitle: string;
    roomId: string;
}

export interface MessageNotification {
    roomTitle: string;
    text: string;
    author?: Nullable<Profile>;
    repliedId?: Nullable<string>;
}

export interface Notification {
    type?: Nullable<NotificationType>;
    value?: Nullable<NotificationValue>;
}

export interface Room {
    id: string;
    title: string;
    isOpen: boolean;
    date?: Nullable<string>;
    description?: Nullable<string>;
    canSendAnonimusMessage?: Nullable<boolean>;
    limit?: Nullable<number>;
    participantsCount?: Nullable<number>;
    users?: Nullable<Profile[]>;
}

export interface Profile {
    name?: Nullable<string>;
    description?: Nullable<string>;
}

export interface User {
    isActivated: boolean;
    personalInfo?: Nullable<Profile>;
}

export type Upload = any;
export type NotificationValue = UserNotification | RoomNotification | MessageNotification;
type Nullable<T> = T | null;
