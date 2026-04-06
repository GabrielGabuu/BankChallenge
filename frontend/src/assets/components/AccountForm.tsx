import { useState } from "react";
import { createAccount } from "../api/api";

export function AccountForm() {
  const [holder, setHolder] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const account = await createAccount({ holder, number });
      alert(`Conta criada! ID: ${account.data.id}`);
      setHolder("");
      setNumber("");
    } catch (err: any) {
      alert(err.response?.data?.error || "Erro ao criar conta");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={holder} onChange={e => setHolder(e.target.value)} placeholder="Nome do titular" />
      <input value={number} onChange={e => setNumber(e.target.value)} placeholder="Número da conta" />
      <button type="submit">Criar Conta</button>
    </form>
  );
}
