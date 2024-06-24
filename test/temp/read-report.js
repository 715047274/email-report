const fs = require('fs');
const path = require('path');
const bjson = require('big-json');
const fileLocation = path.join(__dirname,'..' ,'data','report_sample2.json')
const fileLocationRemote = 'http://nan4dfc1tst04.custadds.com:8080/job/sanity-test-payroll-ui/94/execution/node/3/ws/cypress/reports/index.json'
const readStream = fs.createReadStream(fileLocation) // => readStream);
const parseStream = bjson.createParseStream();
const models = require('../../src/db/models/index')


parseStream.on('data', async function(data) {
    // => receive reconstructed POJO
    //console.log(data)
    const task = await models.Task.findAll()
    console.log(task)

});
readStream.pipe(parseStream);
