import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../config';

interface ISavedFilterAttributes {
    id: number;
    keycloak_id: string;
    title: string;
    tag: string;
    content: any;
    creation_date: Date;
    updated_date: Date;
}

export interface ISavedFilterInput extends ISavedFilterAttributes {}
export interface ISavedFilterOutput extends ISavedFilterAttributes {}

class SavedFilterModel extends Model<ISavedFilterAttributes, ISavedFilterInput> implements ISavedFilterAttributes {
    public id!: number;
    public keycloak_id!: string;
    public title!: string;
    public tag!: string;
    public content!: any;
    public creation_date!: Date;
    public updated_date!: Date;
}

SavedFilterModel.init(
    {
        id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        keycloak_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: DataTypes.TEXT,
        tag: DataTypes.TEXT,
        content: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: {},
        },
        creation_date: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },
        updated_date: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },
    },
    { sequelize: sequelizeConnection, modelName: 'saved_filters', timestamps: false },
);

export default SavedFilterModel;
