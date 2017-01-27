# GDG-financial-api

  ______ _____ _   _          _   _  _____ ______            _____ _____ 
 |  ____|_   _| \ | |   /\   | \ | |/ ____|  ____|     /\   |  __ \_   _|
 | |__    | | |  \| |  /  \  |  \| | |    | |__       /  \  | |__) || |  
 |  __|   | | | . ` | / /\ \ | . ` | |    |  __|     / /\ \ |  ___/ | |  
 | |     _| |_| |\  |/ ____ \| |\  | |____| |____   / ____ \| |    _| |_ 
 |_|    |_____|_| \_/_/    \_\_| \_|\_____|______| /_/    \_\_|   |_____|

    ____           ____              _ __       ________               __  
   / __ )__  __   / __ \___  ___    (_) /_     / ____/ /_  ____  _____/ /_ 
  / __  / / / /  / /_/ / _ \/ _ \  / / __ \   / / __/ __ \/ __ \/ ___/ __ \
 / /_/ / /_/ /  / _, _/  __/  __/ / / / / /  / /_/ / / / / /_/ (__  ) / / /
/_____/\__, /  /_/ |_|\___/\___/_/ /_/ /_/   \____/_/ /_/\____/____/_/ /_/ 
      /____/                  /___/                                        
                                                                         
A financial API which returns financial information of a company as a JSON object


Basic Requirements to Run Application:
--nodejs installed on pc
--npm packet manager installed on pc


Running the database:
->You may start a mongodb instance on your local machine, then start the application in folder "app-local"
->If you do not have mongoDB installed/ do not wish to run an instance on local machine, start the application in folder "app-mLab"


NOTE:
If you want to run "app-local":
--You will not get any sample data
--You will not need an active internet connection


If you want to run "app-mLabs":
--You will get 5 sample companies
--You WILL need an ACTIVE internet connection


How to run application:
->"npm install" on command line to install all dependencies
->"npm start" on command line to start application


HEAD OVER TO http://localhost:3000


REST API:

GET    http://localhost:3000/  					[API usage help]
GET    http://localhost:3000/list_all  				[sends JSON object with all symbols available in DB]
GET    http://localhost:3000/:symbol				[fetch all available financial information, returns "false" if symbol not in database]
GET    http://localhost:3000/:symbol/stockprice			[fetch stockprice in all exchanges]
GET    http://localhost:3000/:symbol/stockprice/:exchange	[fetch stockprice in ":exchange"]
POST   http://localhost:3000/create				[create new entry in database> formatting
								 set headers as:
								 {"Content-Type":"application/json"}
								 JSON in body, example:{"ceo":"Mukesh Ambani","sym":"RELIANCE","nse":"1,028.90","bse":"1,028.90"}	
								]
PUT    http://localhost:3000/:symbol/update/all			[update all entries in db for company with ":symbol"]
PUT    http://localhost:3000/:symbol/update/:field/:value	[update entry for ":field" with ":value" for ":symbol"  for all fields except "stockprice"]
DELETE http://localhost:3000/:symbol  				[delete db entry for ":symbol"]

