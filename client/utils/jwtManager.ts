const KEY = "jwt";

class JwtManager {
  private token: string | null = null;

  setJwt(token: string) {
    this.token = token;
    localStorage.setItem(KEY, token);
  }

  getJwt() {
    if (this.token === null) {
      this.token = localStorage.getItem(KEY);
    }
    return this.token;
  }

  clear() {
    this.token = null;
    localStorage.removeItem(KEY);
  }
}

export const jwtManager = new JwtManager();
