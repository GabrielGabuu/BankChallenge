import axios from "axios";

const API_URL = "http://localhost:3000"; // seu backend

// Contas
export const createAccount = (data: { holder: string; number: string }) =>
  axios.post(`${API_URL}/accounts`, data);

export const getAccounts = () =>
  axios.get(`${API_URL}/accounts`).then(res => res.data);

// Transações
export const createTransaction = (data: { accountId: string; type: "DEPOSIT" | "WITHDRAW"; amount: number }) =>
  axios.post(`${API_URL}/transactions`, data);

export const getTransactions = (accountId?: string) =>
  axios.get(`${API_URL}/transactions`, { params: { accountId } }).then(res => res.data);
