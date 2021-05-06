export class TrainingMemberDTO {
    constructor(
        public id?: number,
        public idTraining?: number,
        public idMember?: number,
        public isEnded?: boolean,
        public trainingTitle?: string,
        public memberEmail?: string,
        public memberNSN?: string
    ){}
}
