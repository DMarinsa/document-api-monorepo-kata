import { DependencyInjectionManager } from "@org/dependency-injection-manager";
import { WinstonLogger } from "../Loggers/WinstonLogger";


export const bindDepedencies = (dependencyInjectionManager: DependencyInjectionManager) => {
    dependencyInjectionManager.bindConstant('PGConnectionConfig', {
        url: process.env['DATABASE_URL'],
    })
    dependencyInjectionManager.bindToContainer('Logger', WinstonLogger);
};