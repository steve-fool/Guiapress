const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");

//view engine
app.set("view engine", "ejs");

//static
app.use(express.static("public"));

//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//database
connection
    .authenticate()
    .then(() => {
        console.log("Connected to database");
    }).catch(erro => {
        console.log("Unable to connect to database " + erro);
    });

app.use(categoriesController);
app.use(articlesController);

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(8080, () => {
    console.log("Servidor rodando na rota >>> http://localhost:8080");
});