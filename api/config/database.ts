import {Sequelize} from "sequelize";



// Config hard cause error in configs files from mac. To remove.
const db: Sequelize = new Sequelize(
    process.env.NODE_ENV === "development" ? `postgres://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_ADDRESS}:${process.env.DB_PORT}/${process.env.DB_NAME}` :
        `postgres://admin:root@localhost:5432/database_test`,
    {
        logging: false,
        define: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            underscored: true,
            freezeTableName: true,
        },
    }
);

async function initDatabase(): Promise<boolean> {

    require('../src/models');

    try {
        await db.authenticate();
        await db.sync({alter: true, force: false});
        return true;
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
    return false;
}

export {db, initDatabase};
