import { WinstonLogger } from "../Loggers/WinstonLogger";
import { DependencyInjectionManager } from "@org/dependency-injection";


export const bindDepedencies = (dependencyInjectionManager: DependencyInjectionManager) => {
    dependencyInjectionManager.bindToContainer('Logger', WinstonLogger);
};