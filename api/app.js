const express = require('express');
const mongoose = require('mongoose');

require('./models/home')
const Home = mongoose.model('Home')

const app = express()

app.use(express.json())

mongoose.connect('mongodb://localhost/bd_api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com MongoDB Ok")
}).catch((err) => {
    console.log("Erro na conexão! " + err)
})

app.get('/', (req, res) => {
    res.json({ name: "Hello Papito!"})
})

app.post('/', async (req, res) => {

    const dados = {
        "topTitle":"Minha empresa",
        "topSubtitle":"A solução que você precisa",
        "textBtn":"Saiba mais",
        "linkBtn":"http://localhost:8080/contact"
    }

    const duplicated = await Home.findOne({})
    if(duplicated){
        return res.status(400).json({
            error: true,
            message: "Já foi registrado"
        })
    }

    Home.create(dados, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: "Erro: Conteúdo não foi cadastrado!"
        })
    })
    return res.json({
        error: true,
        message: "Sucesso: Conteúdo cadastrado!"
    })
})

app.listen(8080, () => {
    console.log("server port:8080")
});


