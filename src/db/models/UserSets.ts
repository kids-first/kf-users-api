import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../config';

interface IUserSetAttributes {
    id: number;
    keycloak_id: string;
    tag: string;
    set_type: string;
    path: string;
    sort: any[];
    sqon: any;
    creation_date: Date;
    updated_date: Date;
}

export interface IUserSetsInput extends IUserSetAttributes {}
export interface IUserSetsOutput extends IUserSetAttributes {}

class UserSetModel extends Model<IUserSetAttributes, IUserSetsInput> implements IUserSetAttributes {
    public id!: number;
    public keycloak_id!: string;
    public tag!: string;
    public set_type!: string;
    public path!: string;
    public sort!: any[];
    public sqon!: any;
    public creation_date!: Date;
    public updated_date!: Date;
}

UserSetModel.init(
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
        tag: DataTypes.TEXT,
        set_type: DataTypes.TEXT,
        path: DataTypes.TEXT,
        sort: {
            type: DataTypes.ARRAY(DataTypes.JSONB),
            allowNull: false,
            defaultValue: [],
        },
        sqon: {
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
    { sequelize: sequelizeConnection, modelName: 'user_sets', timestamps: false },
);

export default UserSetModel;
