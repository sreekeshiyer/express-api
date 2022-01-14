const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const todos = require("./todos");

const app = express();

// Init middleware
// app.use(logger);

// Handlebars Middleware
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get("/", (req, res) =>
    res.render("index", {
        title: "Todo List",
        todos,
    })
);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Members API Routes
app.use("/api/todos", require("./routes/api/todos"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
