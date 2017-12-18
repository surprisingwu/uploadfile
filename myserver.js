const express = require('express');
const router = express.Router();
const fs = require('fs')
const join = require('path').join
const app = express()
const routers = express.Router()
let data = {
        "msg": 0,
        "result": ""
    }
    /* GET home page. */
routers.get('/photos', (req, res) => {
    fs.readdir(join(__dirname, '/imgs'), (err, files) => {
        res.setHeader('Content-Type', 'text/plain')
        if (err) {
            data.msg = 1
            data.result = err
            res.end(JSON.stringify(data))
        }
        if (!files.length) {
            data.result = ''
            res.end(JSON.stringify(data))
        }
        let ret = []
        files.forEach((file) => {
            let tempObj = {}
            tempObj.name = file
            const filePath = join(__dirname, '/imgs/' + file)
            let fileData = fs.readFileSync(filePath, 'base64')
            tempObj.base64 = fileData
            ret.push(tempObj)
            data.result = ret
            res.end(JSON.stringify(data))
        })
    })
})

app.use('/user', routers)

app.listen('3000', '127.0.0.1', () => {
    console.log('Server listen at http://127.0.0.1:3000/user')
})