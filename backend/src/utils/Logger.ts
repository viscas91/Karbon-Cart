import { Request, Response } from 'express';
import morgan from 'morgan';
import { createLogger, format, transports } from 'winston';
import "winston-daily-rotate-file";

const { combine, timestamp, prettyPrint } = format;

const fileRotateTransport = new transports.DailyRotateFile({
    filename: 'logs/combined-%DATE%.log',
    datePattern: "DD-MM-YYYY",
    maxFiles: "14d",
});

export const systemLogs = createLogger({
    level: "http",
    format: combine(
        timestamp({
            format: "DD-MM-YYYY hh:mm:ss.SSS A",
        }),
        prettyPrint()
    ),
    transports: [
        fileRotateTransport,
        new transports.File({
            level: "error",
            filename: "../logs/error.log",
        })
    ],
    exceptionHandlers: [
        new transports.File({ filename: "../logs/exception.log" }),
    ],
    rejectionHandlers: [
        new transports.File({ filename: "../logs/rejections.log" }),
    ]
});

export const morganMiddleware = morgan(
    function(tokens,req: Request,res: Response){
        return JSON.stringify({
            method: tokens.method(req, res),
            url: tokens.url(req, res),
            status: tokens.status(req, res),
            content_length: tokens.res(req, res, "content-length"),
            response_time: tokens["response-time"](req,res), 
        });
    },
    {
        stream: {
            write: (message) => {
                const data = JSON.parse(message);
                systemLogs.http('incoming-request', data);
            }
        }
    }
)