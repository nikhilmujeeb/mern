const express = require("express");
const session = require("express-session");
const path = require("path");
const collection = require("./config");
const bcrypt = require("bcrypt");

const app = express();

app.use(session({
    secret: 'your_secret_key', 
    resave: false,
    saveUninitialized: true,
}));

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    };

    const existingUser = await collection.findOne({ name: data.name });

    if (existingUser) {
        res.send('User already exists. Please choose a different username.');
    } else {
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword;
        await collection.insertMany(data);

        res.redirect("/");
    }
});

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            return res.send("User not found");
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (!isPasswordMatch) {
            return res.send("Wrong password");
        } else {
            req.session.user = check;
            res.redirect("/home");
        }
    } catch {
        res.send("Invalid login details");
    }
});


app.get("/home", (req, res) => {
    if (req.session.user) {
        res.render("home", { username: req.session.user.name });
    } else {
        res.redirect("/");
    }
});

app.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect("/home");
        }
        res.redirect("/");
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
