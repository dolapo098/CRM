import { createLogger, format, transports } from "winston";

//winston Logger: An npm library  used to logs to log paths  both console/files  https://www.npmjs.com/package/winston
export const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({
      level: "info",
      filename: "info.log",
    }),
    new transports.Console({
      level: "error",
    }),
    new transports.File({ level: "error", filename: "error.log" }),
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
