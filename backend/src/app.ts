import { NextFunction, Request, Response } from "express";
import express from "express";
import helmet from "helmet";
import requestSanitizer from "./middlewares/htmlSanitizerMiddleware";
import hpp from "hpp";
import path from "path";
import cors from "cors";
import { requestLogger } from "./middlewares/loggerMiddleware";
import { AppError, errorHandler } from "./services/errorService";
import duckRouter from "./api/duck/duckRouter";
import { requestLimiter } from "./services/rateLimiterService";

const isProdEnv = process.env.NODE_ENV === "production";

const app = express();

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
    },
  })
);

app.use(
  express.json({
    limit: "10kb",
  })
);

app.use(requestLimiter);
app.use(requestSanitizer);
app.use(
  hpp({
    whitelist: [], // add whitelisted query params here
  })
);

// cors
if (isProdEnv) {
  app.use(express.static(path.join(path.resolve(), "build", "public")));
} else {
  const corsOptions = {
    origin: [
      "http://127.0.0.1:8080",
      "http://localhost:8080",
      "http://127.0.0.1:5173",
      "http://localhost:5173",
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

if (!isProdEnv) {
  app.use((req: Request, res: Response, next: NextFunction) => {
    requestLogger(req, res, next);
  });
}

app.use("/api/duck", duckRouter);

app.get("/**", (req: Request, res: Response) => {
  res.sendFile(path.join(path.resolve(), "build", "public", "index.html"));
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

export default app;
