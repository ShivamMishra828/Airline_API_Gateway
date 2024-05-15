const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

const accessLogStream = fs.createWriteStream(
    path.join(__dirname + "../../../", "access.log"),
    { flags: "a" }
);

morgan.format(
    "myFormat",
    "[:date[web]] ':method :url' :status :response-time ms ':user-agent'"
);

module.exports = {
    accessLogStream,
};
