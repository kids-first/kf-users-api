export type TUser = {
    id: number;
    keycloak_id: string;
    first_name?: string;
    last_name?: string;
    era_commons_id?: string;
    nih_ned_id?: string;
    external_individual_fullname?: string;
    external_individual_email?: string;
    roles?: string[];
    affiliation?: string;
    portal_usages?: string[];
    research_area?: string;
    creation_date: Date;
    updated_date: Date;
    consent_date?: Date;
    accepted_terms: boolean;
    understand_disclaimer: boolean;
    completed_registration: boolean;
};

export type TUserInsert = Omit<TUser, 'id'>;
export type TUserUpdate = Partial<Omit<TUser, 'id' | 'keycloak_id'>>;