import axios from "axios";
import { useState, useEffect } from "react";

interface InformationProps {
  searchTerm: string;
}

export default function Information({ searchTerm }: InformationProps) {
  const [data, setData] = useState<{
    Income: Array<Record<string, string | number>>;
    Balance: Array<Record<string, string | number>>;
    "Cash Flow": Array<Record<string, string | number>>;
  } | null>({
    Income: [],
    Balance: [],
    "Cash Flow": [],
  });

  const [buton, setButon] = useState<"Income" | "Balance" | "Cash Flow">(
    "Income"
  );

  const tabs: Array<"Income" | "Balance" | "Cash Flow"> = [
    "Income",
    "Balance",
    "Cash Flow",
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((response) => {
        const formattedData = {
          Income: response.data.Income || [],
          Balance: response.data.Balance || [],
          "Cash Flow": response.data["Cash Flow"] || [],
        };
        setData(formattedData);
        console.log(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const selectedData = data ? data[buton] : [];
  //Obtner columnas de los años dinamicamente
  const years = Array.from(
    new Set(selectedData.map((row) => row.Year))
  ) as string[]; //Extraer años unicos

  //Obtener solo Items
  const items = Object.keys(selectedData[0] || {}).filter(
    (key) => key !== "Year"
  );

  return (
    <div className="bg-black mx-10rounded-lg ">
      {searchTerm.toUpperCase() === "NFLX" && (
        <>
          <div className="flex gap-10">
            <img
              className="w-28 rounded-t-full rounded-b-full left-6"
              src="/icon/netflix--big.svg"
              alt="icono netflix"
            />
            <div className="flex flex-col gap-5">
              <div className="flex gap-5">
                <p className="text-white"></p>
                <p className="text-white"></p>
                <p className="text-white"></p>
                <p className="text-white"></p>
              </div>
              <h3 className="  text-white  text-center font-bold text-xl ">
                Netflix Corporation
              </h3>
              <h3 className="text-white font-bold">Ticket: NFLX</h3>
              <h3 className="text-white font-bold">Market Cap: NFLX</h3>
            </div>
          </div>

          <div className=" my-10 ">
            <div className="bg-black  rounded-lg p-5 ">
              <p className="text-white">
                Netflix, Inc operates as a streaming entertainment service
                company. The firm provides subscription service streaming movies
                and television episodes over the Internet and sending DVDs by
                mail. It operates through the following segments: Domestic
                Streaming, International Streaming and Domestic DVD. The
                Domestic Streaming segment derives revenues from monthly
                membership fees for services consisting of streaming content to
                its members in the United States. The International Streaming
                segment includes fees from members outside the United States.
                The Domestic DVD segment covers revenues from services
                consisting of DVD-by-mail. The company was founded by Marc
                Randolph and Wilmot Reed Hastings Jr. on August 29, 1997 and is
                headquartered in Los Gatos, CA.
              </p>
            </div>
          </div>
        </>
      )}

      <div className=" mx-10 min-h-96  gap-5 ">
        {searchTerm.toUpperCase() === "NFLX" && (
          <>
            <div className="flex gap-4 mb-4">
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
            </div>
            <table className="min-w-full text-center border   border-gray-600 ">
              <thead className="bg-slate-900">
                <tr className="p-1">
                  <th className="text-white">Item</th>
                  {/*Renderizando los años como encabezados, asumiendo que las claves numericas presentan los años  */}
                  {years.map((year, index) => (
                    <th key={index} className="text-white p-1">
                      {year}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {items.map((item, rowIndex) => (
                  <tr key={rowIndex} className="border-b bg-slate-950">
                    <td className=" py-2 text-white">{item}</td>
                    {years.map((year, colIndex) => {
                      const row = selectedData.find(
                        (data) => data.Year === year
                      );
                      return (
                        <td key={colIndex} className="px-2 py-2 text-white">
                          {row ? row[item] || "N/A" : "N/A"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
