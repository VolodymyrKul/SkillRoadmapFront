export class EmployerDTO {
    constructor(
        public id?: number,
        public firstname?: string,
        public lastname?: string,
        public email?: string,
        public password?: string,
        public role?: string,
        public idCompany?: number,
        public companyName?: string
    ){}
}
