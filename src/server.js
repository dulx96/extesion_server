var express = require('express')
var fetch = require('node-fetch')
var axios = require('axios')
const FormData = require('form-data')
let HOST = 3000
process.argv.forEach((val, index, array) => {
    if (val === '-H') HOST = array[index + 1]
})
app = express()

jsObject = {}
const username = 'fbadoctor@gmail.com'
const password = 'Avengers@2018'

app.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send('hello world')
})
app.get('/jsLogin', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const result = await loginJS(username, password)
    jsObject = result
    console.log('login')
    res.json(result)
})
app.get('/jsAuth', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('auth')
    res.json(jsObject)
})

const loginJS = async (username, password) => {
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    formData.append('app', 'jsp')
    try {
        const result = await fetch('https://junglescoutpro.herokuapp.com/api/v1/users/initial_authentication', {
            method: 'POST',
            mode: 'no-cors',
            body: formData,
            header: {
                'Content-Type': 'application/json'
            }
        })
        return json = await result.json()
    } catch (e) {
    }

}
app.listen(HOST)
