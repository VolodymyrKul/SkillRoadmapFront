export class AcceptCertificate {
    constructor(
        public userSkillName? : string,
        public certificateTitle? : string,
        public skillLevel? : number,
        public dateOfIssue? : Date,
        public expiryDate? : Date,
        public recipientEmail? : string,
        public publisherEmail? : string
    ){}
}
