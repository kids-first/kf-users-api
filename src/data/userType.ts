export type User = {
    id: number;
    keycloak_id: string;
    creation_date: Date;
    updated_date: Date;
    consent_date?: Date;
    understand_disclaimer: boolean;
};
