import {Logging, Entry} from '@google-cloud/logging';
import {LogEntry} from '@google-cloud/logging/build/src/entry';
import {IncomingMessage} from 'http';
import {isProd} from '@/util/isProd';

// https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#logseverity
export enum LogSeverity {
  DEFAULT = 0,
  DEBUG = 100,
  INFO = 200,
  NOTICE = 300,
  WARNING = 400,
  ERROR = 500,
  CRITICAL = 600,
  ALERT = 700,
  EMERGENCY = 800,
}

const loggingClient = new Logging();

export const log = (
  name: string,
  severity: LogSeverity,
  message: string | {[key: string]: any},
  httpRequest?: IncomingMessage,
) => {
  if (isProd()) {
    const newLog = loggingClient.log(name);
    const metadata: LogEntry = {
      severity,
    };
    if (httpRequest) {
      metadata.httpRequest = httpRequest;
    }
    const entry: Entry = newLog.entry(metadata, message);
    void newLog.write(entry);
    return;
  }

  const logMethod =
  severity === LogSeverity.ERROR
    ? console.error
    : severity === LogSeverity.WARNING
    ? console.warn
    : severity === LogSeverity.INFO
    ? console.info
    : severity === LogSeverity.DEBUG
    ? console.debug
    : console.log;

  logMethod(name, message);
};
