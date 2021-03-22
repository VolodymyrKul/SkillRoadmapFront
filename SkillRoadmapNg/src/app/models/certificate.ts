export class Certificate {
    constructor(
        public userSkill? : string,
        public certificateTitle? : string,
        public skillLevel? : number,
        public dateOfIssue? : Date,
        public expiryDate? : Date,
        public recipientNSN? : string,
        public publisherNSN? : string
    ){}
}
