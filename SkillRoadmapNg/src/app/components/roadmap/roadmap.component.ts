import { Component, OnInit } from '@angular/core';
import { UserSkillService } from '../../services/user-skill.service';
import { UserSkill } from '../../models/user-skill';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css']
})
export class RoadmapComponent implements OnInit {

  constructor(private userSkillService: UserSkillService) { }

  userSkills: UserSkill[] = [];
  ngOnInit(): void {
    const svg = document.getElementsByName("SkillSVG");
    for(var i = 300; i < 3600; i+=300){
      const line = document.createElementNS("http://www.w3.org/2000/svg","line");
      line.setAttribute("x1", i.toString());
      line.setAttribute("y1", "0");
      line.setAttribute("x2", i.toString());
      line.setAttribute("y2", "1000");
      line.setAttribute("style","stroke:rgb(194, 194, 163);stroke-width:1");
      svg[0].appendChild(line);
    }
    this.userSkillService.getByYear(1,2021)
    .subscribe((data: UserSkill[] | any) => {
      console.log(data);
      this.userSkills = data;
    })
  }

  drawSvg(){
    const svg = document.getElementsByName("SkillSVG");
    const rects = svg[0].querySelectorAll('[name="SkillRect"]');
    rects.forEach(elm => svg[0].removeChild(elm));
    const txts = svg[0].querySelectorAll('[name="SkillText"]');
    txts.forEach(elm => svg[0].removeChild(elm));
    /*while(svg[0].lastChild){
      svg[0].removeChild(svg[0].lastChild);
    }*/

    /*this.userSkills.forEach(skill => {
      console.log('Start: ' + new Date(skill.startDate).getMonth() + ' End: ' + new Date(skill.endDate).getMonth());
    });*/
    //console.log(this.userSkills[1].endDate);
    //console.log('Start: ' + new Date(this.userSkills[1].startDate).getMonth() + ' End: ' + new Date(this.userSkills[1].endDate).getMonth());
    const catskills: UserSkill[] = this.userSkills.filter(us => us?.idCategory === 1);
    console.log(catskills.length);
    catskills.forEach(skill => {
      const rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
      rect.setAttribute("name","SkillRect");
      const startMonth = new Date(skill.startDate).getMonth();
      const startDay = new Date(skill.startDate).getDate();
      const endMonth = new Date(skill.endDate).getMonth();
      const endDay = new Date(skill.endDate).getDate();
      const tmpyear = new Date(skill.startDate).getFullYear();
      const xpos = startMonth*300 + ((startDay-1)*1.0/this.daysInMonth(startMonth+1, tmpyear))*300;
      //console.log(xpos);
      rect.setAttribute("x", xpos.toString());
      const ypos = parseInt(this.getYPos(),10)+40;
      rect.setAttribute("y", ypos.toString());

      //const elmwidth = (endMonth-startMonth)*300 + (endDay+1-startDay)*1.0/this.daysInMonth(endMonth+1, tmpyear)*300;
      const elmwidth = (endMonth*300 + (endDay)*1.0/this.daysInMonth(endMonth+1, tmpyear)*300) - xpos;
      //console.log(elmwidth);
      rect.setAttribute("width", elmwidth.toString());
      rect.setAttribute("height","10");
      rect.setAttribute("style","fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)");
      svg[0].appendChild(rect);
      const txt = document.createElementNS("http://www.w3.org/2000/svg","text");
      txt.setAttribute("name", "SkillText");
      txt.setAttribute("fill", "red");
      txt.setAttribute("x", xpos.toString());
      txt.setAttribute("y", (ypos-10).toString());
      txt.innerHTML = skill.skillname.toString();
      svg[0].appendChild(txt);
    });
  }
  getYPos() : string{
    var svg = document.getElementsByName("SkillSVG")[0];
    var skills = svg.querySelectorAll('[name="SkillRect"]');
    if(skills.length > 0){
      var lastElm = skills.item(skills.length-1).getAttribute("y");
      return lastElm;
    }
    else{
      return '0';
    }
  }

  daysInMonth (month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }

  getallDays(){
    for(let i=1;i<13;i++){
      console.log(this.daysInMonth(i,2021));
    }
  }
}
