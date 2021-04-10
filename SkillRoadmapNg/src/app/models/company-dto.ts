export class CompanyDTO {
    constructor(
        public id: number,
        public name: string,
        public employeesCount: number,
        public description: string,
        public specialization: string,
        public address: string,
        public ContactPhone: string
    ){}
}
