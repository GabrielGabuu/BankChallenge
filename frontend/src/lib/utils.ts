import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { TransactionType } from '../types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number | string): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value))
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function transactionTypeLabel(type: TransactionType): string {
  const labels: Record<TransactionType, string> = {
    DEPOSIT: 'Depósito',
    WITHDRAWAL: 'Saque',
    TRANSFER: 'Transferência',
  }
  return labels[type]
}

export function transactionTypeColor(type: TransactionType): string {
  const colors: Record<TransactionType, string> = {
    DEPOSIT: 'text-emerald-600',
    WITHDRAWAL: 'text-red-600',
    TRANSFER: 'text-blue-600',
  }
  return colors[type]
}

export function transactionAmountSign(type: TransactionType): string {
  return type === 'DEPOSIT' ? '+' : '-'
}
