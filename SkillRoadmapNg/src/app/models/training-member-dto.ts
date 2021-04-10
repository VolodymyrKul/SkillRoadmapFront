export class TrainingMemberDTO {
    constructor(
        public id: number,
        public idTraining: number,
        public idMember: number,
        public isEnded: boolean
    ){}
}
