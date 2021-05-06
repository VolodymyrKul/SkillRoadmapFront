export class NotificationDTO {
    constructor(
        public id: number,
        public notificationText: string,
        public sendingDate: Date,
        public isRead: boolean,
        public idEmployee: number,
        public idEmployer: number,
        public idUserSkill: number,
        public employeeEmail: string,
        public employeeNSN: string,
        public employerEmail: string,
        public employerNSN: string,
        public skillName: string
    ){
    }
}
