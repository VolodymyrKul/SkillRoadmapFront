export class Training {
    constructor(
        public trainingTitle? : string,
        public description? : string,
        public startDate? : Date,
        public endDate? : Date,
        public trainingLevel? : number,
        public payment? : number,
        public coachEmail? : string,
        public categoryName? : string
    ){}
}
