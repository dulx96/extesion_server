var express = require('express')
var fetch = require('node-fetch')
const FormData = require('form-data')
var app = express()

var jsObject = {}
const username = 'fbadoctor@gmail.com'
const password = 'Avengers@2018'

app.get('/', (req, res) => {
    res.send('hello world')
})
app.post('/jsLogin', async (req, res) => {
    const result = await loginJS(username, password)
    jsObject = result
    res.json(result)
})

const loginJS = async (username, password) => {
    const formData = new FormData()
    formData.append('username',username)
    formData.append('password', password)
    formData.append('app', 'jsp')
    try {
        const result = await fetch('https://junglescoutpro.herokuapp.com/api/v1/users/initial_authentication', {
            method: 'POST',
            mode:'no-cors',
            body: formData,
            header: {
                'Content-Type': 'application/json'
            }
        })
        return json =  await result.json()
    } catch (e) {
    }

}

const reAuth = async () => {

}
app.listen(3000)
