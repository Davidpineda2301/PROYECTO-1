import { useState } from "react"

interface InformationProps {
  searchTerm : string;
}

export default function Information({searchTerm} : InformationProps) {

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
  
    <div className=" mx-10   rounded-lg ">
    
      {searchTerm.toUpperCase() === "NTFLX" && (
       <>
        <div className="flex gap-10">
        <img className="w-28 rounded-t-full rounded-b-full" src="/icon/netflix--big.svg" alt="icono netflix" />
        <div className="flex flex-col gap-5">
        <h3 className="  text-white  text-center font-bold text-xl ">Netflix Corporation</h3>
        <h3 className="text-white font-bold">Ticket: NTFLX</h3>
        <h3 className="text-white font-bold">Market Cap: NTFLX</h3>
        </div>
        </div>
      
        <div className=" my-10 ">
            <div className=" rounded-lg p-5 ">
                <p className="text-white">Netflix, Inc operates as a streaming entertainment service company.
                   The firm provides subscription service streaming movies and television episodes over the Internet
                    and sending DVDs by mail. It operates through the following segments: Domestic Streaming, International
                     Streaming and Domestic DVD. The Domestic Streaming segment derives revenues from monthly membership
                      fees for services consisting of streaming content to its members in the United States. The International 
                      Streaming segment includes fees from members outside the United States. The Domestic DVD segment covers
                       revenues from services consisting of DVD-by-mail. The company was founded by Marc Randolph and Wilmot
                        Reed Hastings Jr. on August 29, 1997 and is headquartered in Los Gatos, CA.
                </p>  
            </div>      
        </div>
      </>  
    )}

    <div className=" mx-10 min-h-96  gap-5 ">
      {searchTerm.toUpperCase() === "NTFLX" && (
        <>
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
           <tr className="bg-slate-900">
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
            <tr key={index} className={` ${index % 2 === 0 ?'bg-gray-800' : 'bg-gray-700' }`}>
              {row.map((cell, idx) => (
                <td key={idx} className="px-4 py-2 text-white">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="text-white mt-5 bg-slate-900 p-5 rounded-lg">Cerrar</button>

       </>


      )}
       

    </div>
  </div>
  )
}
