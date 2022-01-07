export type TUser = {
    id: number;
    keycloak_id: string;
    first_name?: string;
    last_name?: string;
    era_commons_id?: string;
    nih_ned_id?: string;
    occupation?: string[];
    affiliation?: string;
    research_area?: string;
    portal_usages?: string[];
    creation_date: Date;
    updated_date: Date;
    consent_date?: Date;
    understand_disclaimer: boolean;
};

export type TUserInsert = Omit<TUser, 'id'>;
export type TUserUpdate = Partial<Omit<TUser, 'id' | 'keycloak_id'>>;
