const express = require('express');
const cors = require('cors');
const request = require('request');

const NODE_ENV = process.env.NODE_ENV || 'development';
const VITE_APP_URL = process.env.VITE_APP_URL.replace(/\/+$/, '');

const whitelist = [ VITE_APP_URL ]
const proxy = express.Router({ mergeParams: true });

if (NODE_ENV === 'development') {
  whitelist.push('http://localhost:8080')
  whitelist.push('http://localhost:8081')
}

proxy.use('/', cors({
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`${origin} not allowed by CORS`));
    }
  },
  optionsSuccessStatus: 200
}), (req, res) => {
  const url = req.url.substring(1);
  const req2 = request(url);

  req.pipe(req2).pipe(res);
});

module.exports = proxy;
