export class SkillUnitDTO {
    constructor(
        public id?: number,
        public unitname?: string,
        public startDate?: Date,
        public endDate?: Date,
        public unitLevel?: number,
        public idUserSkill?: number,
        public skillName?: string
    ){}
}
