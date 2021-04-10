export class EmployeeDTO {
    constructor(
        public id: number,
        public firstname: string,
        public lastname: string,
        public email: string,
        public password: string,
        public role: string,
        public devLevel: string,
        public experience: number,
        public idMentor: number,
        public idCompany: number
    ){}
}
