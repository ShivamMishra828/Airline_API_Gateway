const express = require("express");
const morgan = require("morgan");
const apiRoutes = require("./routes");
const { ServerConfig, LoggerConfig } = require("./config");

const PORT = ServerConfig.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    morgan("myFormat", {
        stream: LoggerConfig.accessLogStream,
    })
);
app.use("/api", apiRoutes);

app.listen(PORT, () => {
    console.log(`Server is Up and Running on PORT:- ${PORT}`);
});
