import { useEffect, useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [search, setSearch] = useState("");

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
      amount: type === "income" ? Number(amount) : -Number(amount),
      category: type,
    };

    setTransactions([newTxn, ...transactions]);
    setText("");
    setAmount("");
  };

  const deleteTxn = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };
  const filtered = transactions.filter((t) =>
    t.text.toLowerCase().includes(search.toLowerCase()),
  );

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
          <div className="flex items-center gap-3">
            <img src="/logo.png" className="w-8 h-8 rounded-md" />
            <div>
              <h1 className="font-bold">WalletWatch Kajol</h1>
              <p className="text-xs text-slate-400">Spend smarter every day</p>
            </div>
          </div>

          <div className="hidden sm:flex gap-4 text-sm">
            <span>₹{balance}</span>
            <span className="text-emerald-400">+₹{income}</span>
            <span className="text-rose-400">-₹{Math.abs(expense)}</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 grid grid-cols-3 gap-3 text-sm">
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          Total Balance <div className="text-xl font-bold">₹{balance}</div>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          Income{" "}
          <div className="text-xl font-bold text-emerald-400">₹{income}</div>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          Expense{" "}
          <div className="text-xl font-bold text-rose-400">
            ₹{Math.abs(expense)}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <h2 className="font-semibold mb-3">Add Transaction</h2>

            <input
              className="w-full p-2 mb-2 rounded bg-slate-950 border border-slate-800"
              placeholder="e.g. Food, Salary"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <input
              type="number"
              className="w-full p-2 mb-2 rounded bg-slate-950 border border-slate-800"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setType("income")}
                className={`flex-1 p-2 rounded ${type === "income" ? "bg-emerald-500" : "bg-slate-800"}`}
              >
                Income
              </button>

              <button
                onClick={() => setType("expense")}
                className={`flex-1 p-2 rounded ${type === "expense" ? "bg-rose-500" : "bg-slate-800"}`}
              >
                Expense
              </button>
            </div>

            <button
              onClick={addTransaction}
              className="w-full bg-indigo-500 hover:bg-indigo-600 p-2 rounded"
            >
              Add
            </button>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-sm">
            Total Transactions: {transactions.length}
          </div>
        </div>

        <div className="md:col-span-2 space-y-3">
          <input
            className="w-full p-2 rounded bg-slate-900 border border-slate-800"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {filtered.length === 0 && (
            <div className="text-slate-500 text-sm">
              No matching transactions
            </div>
          )}

          {filtered.map((t) => (
            <div
              key={t.id}
              className="flex justify-between items-center bg-slate-900 p-4 rounded-xl border border-slate-800"
            >
              <div>
                <p>{t.text}</p>
                <p
                  className={
                    t.amount > 0 ? "text-emerald-400" : "text-rose-400"
                  }
                >
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
