export class CommentDTO {
    constructor(
        public id?: number,
        public commentText?: string,
        public idEmployer?: number,
        public idUserSkill?: number,
        public employerEmail?: string,
        public employerNSN?: string,
        public skillName?: string
    ){}
}
