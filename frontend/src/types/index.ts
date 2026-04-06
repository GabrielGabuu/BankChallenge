export type TransactionType = 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER'

export interface User {
  id: string
  name: string
  email: string
  balance?: number | string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface Transaction {
  id: string
  type: TransactionType
  amount: number | string
  description: string | null
  createdAt: string
  userId: string
  toUserId: string | null
  user: Pick<User, 'id' | 'name' | 'email'>
  toUser: Pick<User, 'id' | 'name' | 'email'> | null
}

export interface Summary {
  balance: number
  totalTransactions: number
  totalDeposits: number
  totalWithdrawals: number
  totalTransfers: number
}

export interface ApiResponse<T> {
  data: T
  timestamp: string
}

export interface ApiError {
  statusCode: number
  error: string
  message: string
  path: string
  timestamp: string
}

// Form types
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  name: string
  email: string
  password: string
}

export interface DepositForm {
  amount: number
  description?: string
}

export interface WithdrawalForm {
  amount: number
  description?: string
}

export interface TransferForm {
  toEmail: string
  amount: number
  description?: string
}
