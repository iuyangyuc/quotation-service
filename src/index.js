require('dotenv').config();
const express = require('express');
const http = require('http');
const { selectQuotation } = require('./db-access');
const PORT = process.env.PORT;
const FILE_STORAGE_PORT = process.env.FILE_STORAGE_PORT;
const FILE_STORAGE_HOST = process.env.FILE_STORAGE_HOST;
const app = express();

app.get('/quotation', async (req, res) => {
    const result = await selectQuotation();
    res.status(200).json(result);
});
app.listen(PORT, () => {
    console.log(`Quotations server running on port ${PORT}`);
});

app.get("/image", async (req, res) => {
    const imagepath = req.query.path;
    const forwardrequest = http.request(
        {host: FILE_STORAGE_HOST,
        port: FILE_STORAGE_PORT,
        path: `/image?path=${imagepath}`,
        method: 'GET'
    }, (forwardresponse) => {
        res.writeHead(forwardresponse.statusCode, forwardresponse.headers);
        forwardresponse.pipe(res, {end: true});
    });
    req.pipe(forwardrequest, {end: true});
});