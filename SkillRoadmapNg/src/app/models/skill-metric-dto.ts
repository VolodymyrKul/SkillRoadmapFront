export class SkillMetricDTO {
    constructor(
        public id?: number,
        public metricName?: string,
        public metricValue?: number,
        public metricInfluence?: number,
        public idUserSkill?: number,
        public skillName?: string
    ){}
}
