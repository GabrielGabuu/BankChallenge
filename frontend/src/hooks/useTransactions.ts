import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { transactionsApi } from '../services/api'
import type { DepositForm, WithdrawalForm, TransferForm } from '../types'

const TRANSACTIONS_KEY = ['transactions'] as const
const SUMMARY_KEY = ['summary'] as const

export function useTransactions() {
  return useQuery({
    queryKey: TRANSACTIONS_KEY,
    queryFn: transactionsApi.list,
  })
}

export function useSummary() {
  return useQuery({
    queryKey: SUMMARY_KEY,
    queryFn: transactionsApi.summary,
    staleTime: 10_000,
  })
}

function useTransactionMutation<T>(fn: (data: T) => Promise<unknown>) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRANSACTIONS_KEY })
      queryClient.invalidateQueries({ queryKey: SUMMARY_KEY })
    },
  })
}

export function useDeposit() {
  return useTransactionMutation((data: DepositForm) => transactionsApi.deposit(data))
}

export function useWithdrawal() {
  return useTransactionMutation((data: WithdrawalForm) => transactionsApi.withdraw(data))
}

export function useTransfer() {
  return useTransactionMutation((data: TransferForm) => transactionsApi.transfer(data))
}
