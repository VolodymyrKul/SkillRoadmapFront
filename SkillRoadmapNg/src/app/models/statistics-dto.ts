export class StatisticsDTO {
    constructor(
        public id?: number,
        public idEmployee?: number,
        public statYear?: number,
        public newSkillCount?: number,
        public studyingTime?: number,
        public averageSkillLevel?: number,
        public betterThanPercent?: number,
        public employeeEmail?: string,
        public employeeNSN?: string
    ){}
}
