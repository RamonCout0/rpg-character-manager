/** Dados enviados para a rota de login. */
export interface LoginRequest {
  username: string;
  password: string;
}

/** Resposta do backend ao autenticar com sucesso. */
export interface LoginResponse {
  token: string;
  username: string;
  name: string;
}
