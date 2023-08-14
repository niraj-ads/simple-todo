import {Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes} from 'sequelize';
import sequelize from "../config/db";

// Defining the Task class extending Sequelize's Model
// order of InferAttributes & InferCreationAttributes is important.
class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {
    declare id?: CreationOptional<number>; //Unique task identifier
    declare title: string; // Title of the task
    declare description?: string; // Description of the task (optional)
    declare due_date?: Date; // Due date of the task (optional)
    declare status: string; // Current status of the task
}

// Initializing the Task class with the attributes and configuration
Task.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            validate: {
                isUnique: async function(value: any) {
                    const existingTask = await Task.findOne({ where: { id: value } });
                    if (existingTask) {
                        throw new Error(`ID must be unique! - Remove the id field or change the value!`);
                    }
                }
            }
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Title is required!'
                },
                notEmpty: {
                    msg: 'Title cannot be empty!'
                },
                len: {
                    args: [0, 255],
                    msg: "Title should be between 0 and 255 characters!"
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
        },
        due_date: {
            type: DataTypes.DATE,
        },
        status: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'pending', // Assuming the default status
            validate: {
                len: {
                    args: [0, 20],
                    msg: "Status should be between 0 and 20 characters!",
                }
            }
        },
    },
    {
        sequelize, // The Sequelize instance used to connect to the database
        tableName: 'tasks', // The name of the table in the database
        timestamps: true, // Enables automatic handling of createdAt and updatedAt timestamps,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

export default Task;