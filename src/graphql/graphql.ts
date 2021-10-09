
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

export enum MessageType {
    TEXT = "TEXT",
    FILE = "FILE",
    REPLY = "REPLY"
}

export enum NotificationType {
    USER_WANT_JOIN_ROOM = "USER_WANT_JOIN_ROOM",
    ROOM_ACCESS_ALLOWED = "ROOM_ACCESS_ALLOWED",
    MESSAGE_RECIEVED = "MESSAGE_RECIEVED",
    UNKNOWN = "UNKNOWN"
}

export interface SendMessageInput {
    roomId?: Nullable<string>;
    type?: Nullable<MessageType>;
    content?: Nullable<string>;
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
    messages(roomId?: Nullable<string>): Message[] | Promise<Message[]>;
    getNotifications(from?: Nullable<number>, to?: Nullable<number>): Notification[] | Promise<Notification[]>;
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
    sendMessage(input?: Nullable<SendMessageInput>): Nullable<boolean> | Promise<Nullable<boolean>>;
    createRoom(title: string, description?: Nullable<string>, isOpen?: Nullable<boolean>, canSendAnonimusMessage?: Nullable<boolean>, limit?: Nullable<number>): Room | Promise<Room>;
    joinRoom(roomId: string): Nullable<Room> | Promise<Nullable<Room>>;
    letUserIn(userName: string, roomId: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    kickUser(userName: string, roomId: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    leaveRoom(roomId?: Nullable<string>): Nullable<boolean> | Promise<Nullable<boolean>>;
    updateProfileInfo(changes?: Nullable<UpdateProfileInput>): Nullable<Profile> | Promise<Nullable<Profile>>;
}

export interface Message {
    date: string;
    receiver?: Nullable<Profile>;
    type?: Nullable<MessageType>;
    content?: Nullable<string>;
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
    message?: Nullable<Message>;
}

export interface Notification {
    type?: Nullable<NotificationType>;
    value?: Nullable<NotificationValue>;
}

export interface ISubscription {
    notify(): Nullable<Notification> | Promise<Nullable<Notification>>;
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

export type NotificationValue = UserNotification | RoomNotification | MessageNotification;
type Nullable<T> = T | null;
