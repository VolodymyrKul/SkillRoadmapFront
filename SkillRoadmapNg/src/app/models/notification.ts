export class Notification {
    constructor(
        public notificationText? : string,
        public sendingDate? : Date,
        public employeeNSN? : string,
        public employerNSN? : string,
        public skillname? : string
    ){}
}
