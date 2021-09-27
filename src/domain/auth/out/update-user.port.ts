export interface IUpdateUserPort {
  activateUser(activationLink: string): Promise<void>;
}
