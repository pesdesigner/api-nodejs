const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

require('./models/home')
const Home = mongoose.model('Home')

require('./models/about')
const About = mongoose.model('About')

require('./models/contact')
const Contact = mongoose.model('Contact')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type, Authorization');
    app.use(cors());
    next();
});

// permitir uso de imagens
app.use(
    '/file',
    express.static(path.resolve(__dirname, 'tmp','uploads'))
);

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

app.get('/home', async (req, res) => {
    await Home.findOne({}).then((home) => {
        return res.json({
            error: false,
            home
        })
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum registro encontrado!"
        })
    })
})

app.post('/home', async (req, res) => {

    const dados = {
        "topTitle":"Minha empresa",
        "topSubtitle":"A solução que você precisa",
        "textBtn":"Saiba mais",
        "linkBtn":"http://localhost:8080/contact",
        "servTitle":"Nossos serviços",
        "servSubtitle":"Conheça todas os serviços oferecidos",
        "icon1":"code",
        "title1":"Serviço 1",
        "desc1":"And an even wittier subheading to boot. Jumpstart your marketing efforts with this example based on Apple’s marketing pages",
        "icon2":"laptop-code",
        "title2":"Serviço 2",
        "desc2":"And an even wittier subheading to boot. Jumpstart your marketing efforts with this example based on Apple’s marketing pages",
        "icon3":"mobile-alt",
        "title3":"Serviço 3",
        "desc3":"And an even wittier subheading to boot. Jumpstart your marketing efforts with this example based on Apple’s marketing pages"
    }

    const duplicated = await Home.findOne({})
    if(duplicated){
        return res.status(400).json({
            error: true,
            message: "Já foi registrado"
        })
    }

    await Home.create(dados, (err) => {
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

app.get('/about', (req, res) => {
    About.find({}).then((about) => {
        return res.json({
            about,
            urlFile: "http://localhost:8080/file/about/"
        });
    }).catch((err) => {
        return res.json({
            error: false,
            message: 'Nenhum registro encontrado'
        });
    })

});

app.post('/about', (req, res) => {
    About.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: 'Erro: conteúdo não pode ser cadastrado'
        })
    })
    return res.json({
        error: false,
        message: 'conteúdo cadastrado com sucesso!'
    })
});

app.post('/contact', async (req, res) => {
    await Contact.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Cadastro não efetuado"
        })
    })

    return res.json({
        error: true,
        message: "Dados cadastrados!"
    })

})

app.listen(8080, () => {
    console.log("server port:8080")
});


