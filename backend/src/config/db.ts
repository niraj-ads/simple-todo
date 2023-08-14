import { Sequelize } from 'sequelize';
import testConfig from '../../test-config';

type Dialect = 'postgres' | 'mysql' | 'sqlite' | 'mssql' | 'mariadb';

// Define DB credentials from environment variables
let config;
if (process.env.NODE_ENV === 'test') {
    config = testConfig;
} else {
    config = {
        DB_NAME: process.env.DB_NAME || '',
        DB_USERNAME: process.env.DB_USERNAME || '',
        DB_PASSWORD: process.env.DB_PASSWORD || '',
        DB_HOST: process.env.DB_HOST || '',
        DB_PORT: process.env.DB_PORT || '',
        DB_DIALECT: process.env.DB_DIALECT as Dialect,
    };
}

if (!config.DB_NAME || !config.DB_USERNAME || !config.DB_PASSWORD || !config.DB_HOST || !config.DB_PORT) {
    throw new Error('Missing required environment variables for database connection, make sure you have .env in your root folder');
}

// Configure Sequelize
export const sequelize: Sequelize = new Sequelize(config.DB_NAME, config.DB_USERNAME, config.DB_PASSWORD, {
    host: config.DB_HOST,
    port: Number(config.DB_PORT),
    dialect: config.DB_DIALECT,
    logging: false,
});


sequelize.authenticate()
    .catch((error) => {
        // Handle connection error
        console.error('Unable to connect to the database:', error);
        throw { status: 500, message: 'Unable to connect to the database' };
    });

export default sequelize;
