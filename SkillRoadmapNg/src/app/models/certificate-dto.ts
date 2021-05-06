export class CertificateDTO {
    constructor(
        public id?: number,
        public idUserSkill?: number,
        public certificateTitle?: string,
        public skillLevel?: number,
        public dateOfIssue?: Date,
        public expiryDate?: Date,
        public idRecipient?: number,
        public idPublisher?: number,
        public skillName?: string,
        public recipientEmail?: string,
        public recipientNSN?: string,
        public publisherEmail?: string,
        public publisherNSN?: string
    ){}
}

