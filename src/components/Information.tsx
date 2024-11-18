import { useState } from "react"

export default function Information() {

    const[buton, setButon] = useState<"Income" | "Balance" | "Cash Flow">("Income");
    
    const tabs: Array<"Income" | "Balance" | "Cash Flow"> = ["Income", "Balance", "Cash Flow"];
   

    const data = {
        Income: [
          ["Total Assets", "19 B", "29 B", "19 B", "29 B", "19 B"],
          ["Cost of Goods", "19 B", "29 B", "19 B", "29 B", "19 B"],
          ["Gross Profit", "19 B", "30 B", "19 B", "30 B", "19 B"],
          ["Operating Expenses", "19 B", "19 B", "19 B", "19 B","19 B"]
        ],
        Balance: [
          ["Liabilities", "10 B", "13 B", "11 B", "13 B", "10 B"],
          ["Equity", "12 B", "10 B", "12 B", "11 B", "12 B"],
        ],
        "Cash Flow": [
          ["Net Cash", "9 B", "8 B", "10 B", "11 B", "12 B"],
          ["Investments", "3 B", "5 B", "6 B", "5 B", "4 B"],
        ],
      }
     

  return (
    <div className=" mx-10 min-h-96  gap-5 ">
    {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2  ${
              buton === tab
                ? "bg-slate-900 text-white"
                : "bg-slate-800 text-white"
            }`}
            onClick={() => setButon(tab)}
          >
            {tab}
          </button>
        ))} 
         <table className="min-w-full text-center border   border-gray-600 ">
          <thead className="bg-slate-900">
           <tr>
            <th className="text-white p-2">Item</th>
            <th className="text-white p-2 ">2024</th>
            <th className="text-white p-2">2023</th>
            <th className="text-white p-2">2022</th>
            <th className="text-white p-2">2021</th>
            <th className="text-white p-2">2020</th>
          </tr>
        </thead>
        <tbody>
          {data[buton].map((row, index) => (
            <tr key={index} className="border-b">
              {row.map((cell, idx) => (
                <td key={idx} className="px-4 py-2 text-white">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}
