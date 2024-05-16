const express = require("express");
const morgan = require("morgan");
const apiRoutes = require("./routes");
const { ServerConfig, LoggerConfig } = require("./config");
const rateLimit = require("express-rate-limit");
const { createProxyMiddleware } = require("http-proxy-middleware");

const PORT = ServerConfig.PORT;
const app = express();
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 10,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    morgan("myFormat", {
        stream: LoggerConfig.accessLogStream,
    })
);
app.use(limiter);
app.use(
    "/flightsService",
    createProxyMiddleware({
        target: ServerConfig.FLIGHT_SERVICE,
        changeOrigin: true,
    })
);
app.use(
    "/bookingService",
    createProxyMiddleware({
        target: ServerConfig.BOOKING_SERVICE,
        changeOrigin: true,
    })
);
app.use("/api", apiRoutes);

app.listen(PORT, () => {
    console.log(`Server is Up and Running on PORT:- ${PORT}`);
});
