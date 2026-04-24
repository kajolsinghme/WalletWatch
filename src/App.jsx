import { useEffect, useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState(() => {
    const data = localStorage.getItem("txns");
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem("txns", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = () => {
    if (!text || !amount) return;

    const newTxn = {
      id: Date.now(),
      text,
      amount: Number(amount),
    };

    setTransactions([newTxn, ...transactions]);
    setText("");
    setAmount("");
  };

  const deleteTxn = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const balance = transactions.reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="container">
      <h1>💰 Expense Tracker</h1>

      <h2>Balance: ₹{balance}</h2>

      <div className="form">
        <input
          placeholder="Text (e.g. Salary, Food)"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount (+income / -expense)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={addTransaction}>Add</button>
      </div>

      <div className="list">
        {transactions.map((t) => (
          <div key={t.id} className="item">
            <span>
              {t.text} : {t.amount}
            </span>
            <button onClick={() => deleteTxn(t.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
