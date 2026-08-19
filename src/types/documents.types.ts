export type Documents = {
    id: number,
    id_process: number,
    name: string,
    file: File,
    status: string,
    data_sed: Date,
    data_ass: Date
};

export type CreateDocument = Omit<Documents, "id">;
export type UpdateDocument = Partial<CreateDocument>;