import { Logger } from "@org/types";
import { Container, ContainerModule } from "inversify";
import { WinstonLogger } from "../Loggers/WinstonLogger";


export const bindDepedencies = (principalContainer: Container, moduleContainers: ContainerModule[]) => {
    principalContainer.bind<Logger>('Logger').to(WinstonLogger);
    principalContainer.load(...moduleContainers);
};