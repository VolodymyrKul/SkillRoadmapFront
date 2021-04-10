export class TrainingDTO {
    constructor(
        public id: number,
        public trainingTitle: string,
        public description: string,
        public startDate: Date,
        public endDate: Date,
        public trainingLevel: number,
        public payment: number,
        public idCoach: number,
        public idCategory: number
    ){}
}
