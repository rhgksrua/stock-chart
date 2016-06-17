# FCC Chart The Stock Market

This is an freecodecamp.com project built with ReactJS and socket.io.
Adding and removing stocks are updated in real time.
All the stocks added are stored in database.  The app will not fetch new data if data exists
in the database or is older than 10 days.

## Getting Started

`npm install`

`webpack` or `webpack --watch`

* Uses API from [quandl.com](quandl.com).  Need to obtain an API key and set it as an
environment variable `STOCK_API_KEY`. You can set the environment variable using `.env` (uses `dotenv` package)
, but you can set your environment variable anyway you want.


## Demo

[Demo](http://fcc-stock-chart.herokuapp.com/)