type NotificationParams<ParamType> = ParamType;

export interface INotificationPort<ParamType = null, ResultType = void> {
  sendNotification(
    requisites: string,
    notification?: NotificationParams<ParamType>,
  ): Promise<ResultType>;
}
