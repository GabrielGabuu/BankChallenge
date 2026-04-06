import { cn } from '../../lib/utils'
import type { TransactionType } from '../../types'

type Color = 'green' | 'red' | 'blue' | 'gray' | 'yellow'

interface BadgeProps {
  children: React.ReactNode
  color?: Color
  className?: string
}

const colorClasses: Record<Color, string> = {
  green: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  red: 'bg-red-50 text-red-700 ring-red-200',
  blue: 'bg-blue-50 text-blue-700 ring-blue-200',
  gray: 'bg-gray-100 text-gray-600 ring-gray-200',
  yellow: 'bg-yellow-50 text-yellow-700 ring-yellow-200',
}

export function Badge({ children, color = 'gray', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset',
        colorClasses[color],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function TransactionBadge({ type }: { type: TransactionType }) {
  const map: Record<TransactionType, { label: string; color: Color }> = {
    DEPOSIT: { label: 'Depósito', color: 'green' },
    WITHDRAWAL: { label: 'Saque', color: 'red' },
    TRANSFER: { label: 'Transferência', color: 'blue' },
  }
  const { label, color } = map[type]
  return <Badge color={color}>{label}</Badge>
}
