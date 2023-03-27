const API_URL = "";

class AuthService {
  login({ email, password }: { email: string; password: string }) {
    return new Promise((res, rej) => {
      //mock login api call
      if (email === "demo@email.com" && password === "demo123") {
        localStorage.setItem("menu-user", JSON.stringify({ email }));
        setTimeout(() => {
          return res({ email });
        }, 2000);
      } else {
        setTimeout(() => {
          return rej("Wrong credentials");
        }, 2000);
      }
    });
  }

  logout() {
    localStorage.removeItem("menu-user");
    return new Promise((res, rej) => {
      return res(true);
    });
  }
}

const authService = new AuthService();

export { authService };
