const express = require('express');
const app = express()

app.get('/', (req, res) => {
    res.json({ name: "Hello Papito!"})
})

app.listen(8080, () => {
    console.log("server port:8080")
});


