import { Logger } from "@org/types";
import { Container, } from "inversify";
import { WinstonLogger } from "../Loggers/WinstonLogger";


export const bindDepedencies = (projectContainer: Container) => {
    projectContainer.bind<Logger>('Logger').to(WinstonLogger);
};