import {
  createLogger,
  transports as wTransports,
  format,
  config as wConfig,
} from "winston";

import { env } from "../config";


const transports = [];

if (env !== "dev") {
  transports.push(
    new wTransports.File({
      filename: "errors.log",
      level: "error",
    }),
    new wTransports.File({
      filename: "warnings.log",
      level: "warnings",
    }),
    new wTransports.File({
      filename: "infos.log",
      level: "infos",
    })
  );
} else {
  transports.push(
    new wTransports.Console({
      format: format.combine(format.cli(), format.splat()),
    })
  );
}

export default createLogger({
  level: "silly",
  levels: wConfig.npm.levels,
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.json()
  ),
  transports,
});
