import { useEffect, useState } from "react";
import { getAccounts } from "../api/api";

export function AccountList() {
  const [accounts, setAccounts] = useState<any[]>([]);

  useEffect(() => {
    getAccounts().then(setAccounts);
  }, []);

  return (
    <ul>
      {accounts.map(acc => (
        <li key={acc.id}>{acc.holder} - {acc.number} - Saldo: {acc.balance}</li>
      ))}
    </ul>
  );
}
