from flask import Flask, jsonify
import requests
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def get():
    CIK = '0001065280'
    url = f'https://data.sec.gov/api/xbrl/companyfacts/CIK{CIK}.json'
    headers = {'User-Agent': 'Mozilla/5.0'}
    response = requests.get(url, stream=True, headers=headers)

    if response.status_code == 200:
        
            data = response.json()

            # Verificar si los datos existen
            if "facts" in data and "us-gaap" in data["facts"] and "Revenues" in data["facts"]["us-gaap"]:
                info = data["facts"]["us-gaap"]["Revenues"]["units"]["USD"]
                val = []
                for date in info:
                    if "frame" in date and "Q" not in date["frame"]:
                        val.append({
                            "Year": date["frame"],
                            "Revenue": round(date["val"] / 1_000_000_000, 3)
                        })
                print(val)

                pandasData = pd.DataFrame(val)
                pandasData["Revenue %"] = (pandasData["Revenue"].pct_change() * 100).round(3)

                # Agregar costo de bienes vendidos (Cost of Goods Sold)
                cos = []
                if "CostOfGoodsSold" in data["facts"]["us-gaap"]:
                    cost_info = data["facts"]["us-gaap"]["CostOfGoodsSold"]["units"]["USD"]
                    for date in cost_info:
                        if "frame" in date and "Q" not in date["frame"]:
                            cos.append(round(date["val"] / 1_000_000_000, 3))

                    pandasData["Cost of Goods Sold"] = cos
                print(cos)

                info  = data["facts"]["us-gaap"]["MarketingExpense"]["units"]["USD"]

                gross = []

                for date in info:
                    if "frame" in date and "Q" not in date["frame"]:
                        gross.append(round(date["val"]/1_000_000_000,3))
                print(gross)

                info  = data["facts"]["us-gaap"]["ResearchAndDevelopmentExpense"]["units"]["USD"]

                research = []

                for date in info:
                    if "frame" in date and "Q" not in date["frame"]:
                        research.append(round(date["val"]/1_000_000_000,3))
                print(research)

                info  = data["facts"]["us-gaap"]["GeneralAndAdministrativeExpense"]["units"]["USD"]
                general = []

                for date in info:
                    if "frame" in date and "Q" not in date["frame"]:
                        general.append(round(date["val"]/1_000_000_000,3))


                print(general)

                # Convertir DataFrame a JSON
                return jsonify(pandasData.to_dict(orient="records"))
            else:
                return jsonify({"error": "Datos financieros no disponibles"}), 500
       
    else:
        return jsonify({"error": "No se pudieron obtener los datos"}), 500

