import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAccounts, useCreateAccount, useDeleteAccount } from '../../hooks/useAccounts'
import { Card, CardBody } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Modal } from '../../components/ui/Modal'
import { PageSpinner } from '../../components/ui/Spinner'
import { formatCurrency, formatDate } from '../../lib/utils'
import type { CreateAccountForm } from '../../types'

const schema = z.object({
  holder: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  number: z
    .string()
    .regex(/^\d{6}-\d$/, 'Formato inválido. Use: 000000-0'),
})

export function AccountsPage() {
  const [open, setOpen] = useState(false)
  const { data: accounts, isLoading } = useAccounts()
  const createAccount = useCreateAccount()
  const deleteAccount = useDeleteAccount()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateAccountForm>({ resolver: zodResolver(schema) })

  const onSubmit = handleSubmit(async (data) => {
    await createAccount.mutateAsync(data)
    reset()
    setOpen(false)
  })

  if (isLoading) return <PageSpinner />

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {accounts?.length ?? 0} conta{accounts?.length !== 1 ? 's' : ''} cadastrada
          {accounts?.length !== 1 ? 's' : ''}
        </p>
        <Button onClick={() => setOpen(true)}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nova Conta
        </Button>
      </div>

      {accounts?.length === 0 ? (
        <Card>
          <CardBody className="py-16 text-center">
            <p className="text-gray-400">Nenhuma conta cadastrada. Crie a primeira!</p>
          </CardBody>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {accounts?.map((account) => (
            <Card key={account.id}>
              <CardBody className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-base font-semibold text-gray-900">{account.holder}</p>
                    <p className="text-sm text-gray-500">Conta {account.number}</p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`Remover conta de ${account.holder}?`)) {
                        deleteAccount.mutate(account.id)
                      }
                    }}
                    className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>

                <div className="rounded-lg bg-brand-50 px-4 py-3">
                  <p className="text-xs text-brand-600">Saldo disponível</p>
                  <p className="text-xl font-bold text-brand-700">{formatCurrency(account.balance)}</p>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{account._count?.transactions ?? 0} transações</span>
                  <span>Desde {formatDate(account.createdAt)}</span>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => { setOpen(false); reset() }} title="Nova Conta Bancária">
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            label="Nome do Titular"
            placeholder="Ex: João Silva"
            required
            error={errors.holder?.message}
            {...register('holder')}
          />
          <Input
            label="Número da Conta"
            placeholder="000000-0"
            required
            hint="Formato: 6 dígitos, hífen, 1 dígito"
            error={errors.number?.message}
            {...register('number')}
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="secondary" onClick={() => { setOpen(false); reset() }}>
              Cancelar
            </Button>
            <Button type="submit" loading={createAccount.isPending}>
              Criar Conta
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
