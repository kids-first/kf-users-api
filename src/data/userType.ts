export type TUser = {
    id: number;
    keycloak_id: string;
    creation_date: Date;
    updated_date: Date;
    consent_date?: Date;
    understand_disclaimer: boolean;
};

export type TUserInsert = Omit<TUser, 'id'>;
export type TUserUpdate = Partial<Omit<TUser, 'id' | 'keycloak_id'>>;
