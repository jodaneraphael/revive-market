interface AuthUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "customer" | "admin" | "technician";
  branch_id: number;
}

const TOKEN_KEY = "rm_token";
const USER_KEY = "rm_user";

export function storeAuth(token: string, user: AuthUser) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function hasRole(...roles: string[]): boolean {
  const user = getUser();
  return user ? roles.includes(user.role) : false;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
