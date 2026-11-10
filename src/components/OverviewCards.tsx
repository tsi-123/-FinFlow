const overviewData = [
  {
    title: "Total Balance",
    amount: "$12,450.00",
    change: "+12.5%",
    description: "Compared to last month",
    color: "text-slate-900",
  },
  {
    title: "Total Income",
    amount: "$5,200.00",
    change: "+8.2%",
    description: "Compared to last month",
    color: "text-emerald-600",
  },
  {
    title: "Total Expenses",
    amount: "$2,750.00",
    change: "-4.3%",
    description: "Compared to last month",
    color: "text-rose-600",
  },
];

export default function OverviewCards() {
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {overviewData.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-medium text-slate-500">
            {item.title}
          </p>

          <h2 className={`mt-3 text-2xl font-bold ${item.color}`}>
            {item.amount}
          </h2>

          <div className="mt-4 flex items-center gap-2">
            <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600">
              {item.change}
            </span>

            <span className="text-xs text-slate-400">
              {item.description}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}