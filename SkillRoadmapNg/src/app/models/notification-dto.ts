export class NotificationDTO {
    constructor(
        public id: number,
        public notificationText: string,
        public sendingDate: Date,
        public isRead: boolean,
        public idEmployee: number,
        public idEmployer: number,
        public idUserSkill: number
    ){
    }
}
