import { DependencyInjectionManager } from "@org/dependency-injection-manager";
import { WinstonLogger } from "../Loggers/WinstonLogger";
import { PGConnector } from "@org/pg-connector";

export const bindDepedencies = (dependencyInjectionManager: DependencyInjectionManager) => {
    dependencyInjectionManager.bindConstant('PGConnectionConfig', {
        url: process.env['DATABASE_URL'],
    })
    dependencyInjectionManager.bindToContainer('Logger', WinstonLogger);
    dependencyInjectionManager.bindToContainer('PgConnector', PGConnector);
};