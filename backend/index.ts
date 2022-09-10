import express from "express";

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (_, res) => {
  res.render("index", {
    name: "Amir",
    age: 99,
    hobbies: ["Workout", "Coding", "Cleaning"],
  });
});

app.listen(3000, () => console.log("Listening at http://localhost:3000"));
