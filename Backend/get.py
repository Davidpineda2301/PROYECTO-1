from flask import Flask, jsonify
import requests
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True 
CORS(app)

@app.route("/", methods=["GET"])
def get():
    CIK = '0001065280'
    url = f'https://data.sec.gov/api/xbrl/companyfacts/CIK{CIK}.json'
    headers = {'User-Agent': 'Mozilla/5.0'}
    response = requests.get(url, stream=True, headers=headers)   
    data = response.json()


    info = data["facts"]["us-gaap"]["Revenues"]["units"]["USD"]
    val = []
    for date in info:
        if "frame" in date and "Q" not in date["frame"]:
            val.append({"Year":date["frame"], "Revenue":round(date["val"]/1_000_000_000,3)})
    pandasData = pd.DataFrame(val)
    pandasData["Revenue %"]= (pandasData["Revenue"].pct_change()*100).round(3)
    print(val)

                # Agregar costo de bienes vendidos (Cost of Goods Sold)
    info = data["facts"]["us-gaap"]["CostOfRevenue"]["units"]["USD"]
    cos = []
    for date in info:
        if "frame" in date and "Q" not in date["frame"]:
            cos.append(round(date["val"] / 1_000_000_000, 3))

    pandasData["Cost of Revenue"] = cos
    print(cos)
    



    info  = data["facts"]["us-gaap"]["MarketingExpense"]["units"]["USD"]
    gross = []

    for date in info:
        if "frame" in date and "Q" not in date["frame"]:
            gross.append(round(date["val"]/1_000_000_000,3))
    pandasData["Marketing"] = gross
    print(gross)

    info  = data["facts"]["us-gaap"]["ResearchAndDevelopmentExpense"]["units"]["USD"]

    research = []

    for date in info:
        if "frame" in date and "Q" not in date["frame"]:
            research.append(round(date["val"]/1_000_000_000,3))
    pandasData["Technology and Development"] = research
    print(research)

    info  = data["facts"]["us-gaap"]["GeneralAndAdministrativeExpense"]["units"]["USD"]
    general = []

    for date in info:
        if "frame" in date and "Q" not in date["frame"]:
            general.append(round(date["val"]/1_000_000_000,3))

    pandasData["General and Administrative"] = general
    print(general)

    info = data["facts"]["us-gaap"]["OperatingIncomeLoss"]["units"]["USD"]
    operating = []
    for date in info:
        if "frame" in date and "Q" not in date["frame"]:
            operating.append(round(date["val"]/1_000_000_000,3))
    pandasData["Operating income"] = operating
    print(operating)
    
    
    
    info  = data["facts"]["us-gaap"]["InterestExpense"]["units"]["USD"]
    interest= []

    for date in info:
        if "frame" in date and "Q" not in date["frame"]:
            interest.append(round(date["val"]/1_000_000_000,3))

    pandasData["Interest expense"] = interest
    print(interest)
    
    info  = data["facts"]["us-gaap"]["NetIncomeLoss"]["units"]["USD"]
    net = []
    for date in info:
        if "frame" in date and "Q" not in date["frame"]:
            net.append(round(date["val"]/1_000_000_000,3))
    pandasData["Net income"] = net
    print(net)

    #Organizar datos en tabs
    group_data ={
        "Income":pandasData[["Year","Revenue","Cost of Revenue","Marketing"]].to_dict(orient="records"),
        "Balance":pandasData[["Year","Operating income","Technology and Development","General and Administrative",]].to_dict(orient="records"),
        "Cash Flow":pandasData[["Year","Interest expense","Net income"]].to_dict(orient="records"),
    }
    print(pandasData.columns)
    
    return jsonify(group_data)




                # Convertir DataFrame a JSON
    #return jsonify(pandasData.to_dict(orient="records"))

