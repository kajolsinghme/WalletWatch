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
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((a, b) => a + b.amount, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-white">

<div className="border-b border-slate-800 bg-slate-900/40 backdrop-blur">
  <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">

    {/* LOGO + BRAND */}
<div className="flex items-center gap-3">
  
  <img
    src="/logo.png"
    alt="logo"
    className="w-8 h-8 rounded-md"
  />

  <div className="flex flex-col leading-tight">
    <h1 className="text-xl font-bold tracking-wide">
      WalletWatch
    </h1>

    <p className="text-[13px] text-slate-400 tracking-wide">
  Spend smarter every day
</p>
  </div>

</div>

    <div className="hidden sm:flex gap-4 text-sm text-slate-300">
      <span>
        Balance: <b className="text-white">₹{balance}</b>
      </span>
      <span className="text-emerald-400">Income ₹{income}</span>
      <span className="text-rose-400">Expense ₹{expense}</span>
    </div>

  </div>
</div>

      <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="md:col-span-1 space-y-4">

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <h2 className="font-semibold mb-3">Add Transaction</h2>

            <input
              className="w-full p-2 mb-2 rounded bg-slate-950 border border-slate-800"
              placeholder="Title (Food, Salary...)"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <input
              className="w-full p-2 mb-3 rounded bg-slate-950 border border-slate-800"
              type="number"
              placeholder="Amount (+ / -)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <button
              onClick={addTransaction}
              className="w-full bg-indigo-500 hover:bg-indigo-600 py-2 rounded font-medium"
            >
              Add
            </button>
          </div>


          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-sm text-slate-300">
            <p>Total Transactions: <b className="text-white">{transactions.length}</b></p>
          </div>

        </div>

        <div className="md:col-span-2 space-y-3">

          <h2 className="text-lg font-semibold">Recent Activity</h2>

          {transactions.length === 0 && (
            <div className="text-slate-500 text-sm">
              No transactions yet. Add one to get started.
            </div>
          )}

          {transactions.map((t) => (
            <div
              key={t.id}
              className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-xl hover:bg-slate-800 transition"
            >
              <div>
                <p className="font-medium">{t.text}</p>
                <p className={t.amount > 0 ? "text-emerald-400" : "text-rose-400"}>
                  {t.amount > 0 ? "+" : ""}₹{t.amount}
                </p>
              </div>

              <button
                onClick={() => deleteTxn(t.id)}
                className="text-slate-400 hover:text-rose-400"
              >
                Delete
              </button>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}