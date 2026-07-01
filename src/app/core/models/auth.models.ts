// ── Requests ──────────────────────────────────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

// ── Response do BFF ───────────────────────────────────────────────────────────

export interface LoginResponse {
  accountId: string;
  name: string;
  email: string;
  accountType: string;
  acessToken: string;
  acessTokenExpiraEm: string;
  refreshToken: string;
  refreshTokenExpiraEm: string;
}

// ── Usuário logado (salvo em localStorage) ────────────────────────────────────

export interface AuthUser {
  accountId: string;
  name: string;
  email: string;
  accountType: string;
}
