import axios from 'axios'
import type {
  Transaction,
  Summary,
  ApiResponse,
  AuthResponse,
  LoginForm,
  RegisterForm,
  DepositForm,
  WithdrawalForm,
  TransferForm,
} from '../types'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  },
)

const unwrap = <T>(res: { data: ApiResponse<T> }): T => res.data.data

export const authApi = {
  register: (body: RegisterForm): Promise<AuthResponse> =>
    http.post<ApiResponse<AuthResponse>>('/auth/register', body).then(unwrap),
  login: (body: LoginForm): Promise<AuthResponse> =>
    http.post<ApiResponse<AuthResponse>>('/auth/login', body).then(unwrap),
  me: () => http.get<ApiResponse<AuthResponse['user']>>('/auth/me').then(unwrap),
}

export const transactionsApi = {
  list: () => http.get<ApiResponse<Transaction[]>>('/transactions').then(unwrap),
  get: (id: string) => http.get<ApiResponse<Transaction>>(`/transactions/${id}`).then(unwrap),
  deposit: (body: DepositForm) =>
    http.post<ApiResponse<Transaction>>('/transactions/deposit', body).then(unwrap),
  withdraw: (body: WithdrawalForm) =>
    http.post<ApiResponse<Transaction>>('/transactions/withdraw', body).then(unwrap),
  transfer: (body: TransferForm) =>
    http.post<ApiResponse<Transaction>>('/transactions/transfer', body).then(unwrap),
  summary: () => http.get<ApiResponse<Summary>>('/transactions/summary').then(unwrap),
}
