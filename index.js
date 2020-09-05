const os         = require('os')
const path       = require('path')
const fs         = require('fs')
const exec       = require('child_process').exec
const express    = require('express')
const app        = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const dotenv     = require('dotenv').config()

//Sets middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Sets our app to use the handlebars engine
app.set('view engine', 'handlebars');

//Sets handlebars configurations (we will go through them later on)
app.engine('handlebars', handlebars({
    layoutsDir: path.join(__dirname,'views/layout'),
}));

//Sets a basic route
app.get('/', (req, res) => {
    fs.readdir(path.join(process.env.SOURCE_FOLDER), {}, (err, files) => {
        res.render('main', {
            layout: 'index',
            files: files,
            listExists: true
        });
    })
});

app.post('/move', async (req, res) => {
    const { currentName, newName } = req.body

    const source = path.join(process.env.SOURCE_FOLDER,currentName)
    const destination = path.join(process.env.DESTINATION_FOLDER, newName)

    exec(`mv '${source}' '${destination}'`, (err, stdout, stderr) => {
        if(err) res.json(err)

        res.json({
            status: 'ok',
            stdout,
            stderr
        })
    })
})

//Makes the app listen to port process.env.PORT |3000
app.listen(process.env.PORT, () => console.log(`App listening to port ${process.env.PORT} | Source: ${process.env.SOURCE_FOLDER} | Destination: ${process.env.DESTINATION_FOLDER}`));