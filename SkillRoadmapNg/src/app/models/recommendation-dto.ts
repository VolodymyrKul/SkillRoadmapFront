export class RecommendationDTO {
    constructor(
        public id?: number,
        public idEmployee?: number,
        public invitation?: string,
        public isUsed?: boolean,
        public idTraining?: number,
        public employeeEmail?: string,
        public employeeNSN?: string,
        public trainingTitle?: string,
    ){}
}
