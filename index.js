const express = require("express");
const { engine } = require("express-handlebars");
const todos = require("./todos");

const app = express();

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
// Todos API Routes
app.use("/api/todos", require("./routes/api/todos"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
