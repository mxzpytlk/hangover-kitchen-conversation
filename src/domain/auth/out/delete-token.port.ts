export interface IDeleteTokenPort {
  deleteRefreshToken(refreshToken: string): Promise<void>;
}
