interface IAuthProvider {
  requestURL(): string;
  token(): Promise<void>;
  revoke(): Promise<void>;
}