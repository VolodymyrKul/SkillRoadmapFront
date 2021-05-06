export class UserSkillDTO {
    constructor(
        public id?: number,
        public skillname?: string,
        public startDate?: Date,
        public endDate?: Date,
        public idCategory?: number,
        public skillLevel?: number,
        public idEmployee?: number,
        public categoryTitle?: string,
        public employeeEmail?: string,
        public employeeNSN?: string,
        public isUserSkill?: boolean
    ){}
}
