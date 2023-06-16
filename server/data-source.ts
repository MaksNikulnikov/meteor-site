import { DataSource } from "typeorm";
import { Translation } from "./models/Translation";

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: '185.143.172.214',
    port: 3306,
    username: 'meteor_test',
    password: 'Vnh6s3p1e5EKUoRS3oja',
    database: 'meteor_test',
    entities: [Translation],
    synchronize: true,
    logging: true,
})