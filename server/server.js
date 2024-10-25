const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const quizRoutes = require("./routes/quizRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/quizzes", quizRoutes);

mongoose.connect("mongodb://localhost:27017/quizapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(() => console.log("MongoDB подключена"))
.catch((error) => console.error("Ошибка подключения к MongoDB:", error));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
