export interface Patient {
    id?: string;
    name: string;
    address: string;
    email: string;
    document_photo: File | string;
    phone_number: string;
}

export interface IFormInput {
    name: string,
    email: string,
    phone: string,
    document: File;
    address: string;
}
