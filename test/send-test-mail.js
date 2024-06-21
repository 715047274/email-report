const testMail = require('./send-email')
const path = require("path");
const fs = require("fs");


const chartPath = path.join(__dirname,'data' ,'chart.html');
const chartContent = fs.readFileSync(chartPath, 'utf-8');


testMail(chartContent);