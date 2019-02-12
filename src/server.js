var express = require('express')
var fetch = require('node-fetch')
var axios = require('axios')
const FormData = require('form-data')
// check Host parameter
let HOST = 3000
process.argv.forEach((val, index, array) => {
    if (val === '-H') HOST = array[index + 1]
})

app = express()

global.jsObject = {}
global.lastTimeLogin = 0
const username = 'fbadoctor@gmail.com'
const password = 'Avengers@2018'

app.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send('hello world')
})
app.get('/movie', (req, res) => {
    res.redirect('http://35.221.210.237:8000/')
})

app.get('/jsLogin', async (req, res) => {
    let result
    result = await loginJS(username, password)

    res.header("Access-Control-Allow-Origin", "*");
    res.json(result)
})
app.get('/jsAuth', async (req, res) => {
    // let tokenValid = await checkUser()

    let result
    if (typeof jsObject.daily_token ==='undefined' || jsObject.daily_token.length === 0) {
        console.log('token not valid')
        result =  await loginJS(username, password)

    } else {
        result = jsObject
    }
    res.header("Access-Control-Allow-Origin", "*");
    console.log('auth')
    res.json(result)
})
app.get('/jsCheckToken', async (req, res) => {
    res.json(await checkUser())
})
const checkUser = async () => {
    try {
        console.log('check token' + jsObject.daily_token)
        const result = await fetch('https://junglescoutpro.herokuapp.com/api/v1/users/authenticate?username='+username, {
            method: 'GET',
            credentials: 'include',
            header: {
                Authorization: `${jsObject.daily_token}`
            },
        })
        const json = await result.json()
        console.log(json)
        if (json && typeof json.code != "undefined" && json.code == -1) {
            return false
        } else if (json && !json.status) {
            return false
        } else {
            return true
        }
    } catch (e) {
        console.log(e.message)
        return false
    }
}

const loginJS = async (username, password) => {
    //if too many request
    if (Date.now() - lastTimeLogin < 4000) {
        return jsObject
    }
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    formData.append('app', 'jsp')
    try {
        console.log('logging')
        const result = await fetch('https://junglescoutpro.herokuapp.com/api/v1/users/initial_authentication', {
            method: 'POST',
            mode: 'no-cors',
            body: formData,
            header: {
                'Content-Type': 'application/json'
            }
        })
        lastTimeLogin = Date.now()
        jsObject = await result.json()
        return jsObject
    } catch (e) {
    }

}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

app.listen(HOST)
