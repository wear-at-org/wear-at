export class AuthService {
  public constructor(
  ) {}

  public verify(token: string): void {
    // TODO jwt verify

    // TODO redirect to provider
    console.log('verify');
  }

  public token(): void {
    console.log('token');
  }

  public revoke(): void {
    console.log('revoke');
  }
}
