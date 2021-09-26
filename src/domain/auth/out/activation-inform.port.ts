export interface IActivationInformPort {
  inform(email: string): Promise<string>;
}
