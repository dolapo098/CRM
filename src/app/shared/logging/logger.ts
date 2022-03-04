import { createLogger, format, transports } from "winston";

//winston Logger: obj used to write info and errors on console/files
export const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({
      level: "info",
      filename: "info.log",
    }),
    new transports.Console(),
    new transports.File({ filename: "error.log", level: "error" }),
  ],
  exceptionHandlers: [
    new transports.Console({
      level: "error",
    }),
    new transports.File({ level: "error", filename: "exceptions.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.timestamp(), format.json()),
    })
  );
}
