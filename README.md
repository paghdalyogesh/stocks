# react : Greek calculator

//https://www.nseindia.com/get-quotes/derivatives?symbol=NIFTY&identifier=OPTIDXNIFTY11-06-2020CE10200.00
//https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY
//https://www.nseindia.com/api/option-chain-equities?symbol=SBIN

  "proxy":  "https://www.nseindia.com/",

production build - npm run build NODE_ENV=production

"build": "set \"GENERATE_SOURCEMAP=false\" && react-scripts build"
command line : > npm run deploy


ProxyPass "/api" "https://www.nseindia.com/api"
ProxyPassReverse "/api" "https://www.nseindia.com/api"

ProxyPass         "/mirror/foo/" "http://backend.example.com/"
ProxyPassReverse  "/mirror/foo/" "http://backend.example.com/"


<VirtualHost *:80>
ServerName https://tradeweb2020.000webhostapp.com/
DocumentRoot /storage/ssd5/868/14153868/public_html
ProxyPreserveHost On
ProxyPass /api https://www.nseindia.com/api
ProxyPassReverse /api https://www.nseindia.com/api
</VirtualHost>

"scripts": {
    "start": "npm run development",
    "development": "NODE_ENV=development concurrently --kill-others \"npm run client\" \"npm run server\"",
    "production": "npm run build && NODE_ENV=production npm run server",
    "client": "react-scripts start",
    "server": "node server/server.js",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
