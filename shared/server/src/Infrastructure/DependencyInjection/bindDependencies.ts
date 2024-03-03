import { DependencyInjectionManager } from "@org/dependency-injection-manager";
import { WinstonLogger } from "../Loggers/WinstonLogger";


export const bindDepedencies = (dependencyInjectionManager: DependencyInjectionManager) => {
    dependencyInjectionManager.bindToContainer('Logger', WinstonLogger);
};