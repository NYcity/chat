var https = require('https');
var path = require("path");
var fs = require('fs');
const express = require('express')
const app = express()
const port = 8443

var privateKey = fs.readFileSync('./certificates/privkey.pem', 'utf8');
var certificate = fs.readFileSync('./certificates/cert.pem', 'utf8');
var credentials = { key: privateKey, cert: certificate };
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


app.get('/', function (req, res) {
    // res.header('Content-type', 'text/html');
    // res.sendFile(path.join(__dirname + '/index.html'));

    // res.sendFile(path.join(__dirname, './public', 'index.html'));
    res.sendFile('public/index.html', { root: __dirname });
});
// Expose the css and js resources as "resources"
app.use('/resources', express.static('./resources'));
app.use("/static", express.static('./js/'));