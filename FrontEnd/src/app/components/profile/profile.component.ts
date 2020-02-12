import { UserService } from './../../services/user.service';
import { Component, OnInit} from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private profile;
  private username;
  private mean_score = 0;
  private token;
  private decoded;
  private nb_watching;
  private nb_dropped;
  private nb_onhold;
  private nb_completed;
  private nb_planned;

  private doughnutChartLabels: Label[] = ['Completed', 'Watching', 'Dropped','On-Hold','Planned to watch'];
  private doughnutChartType: ChartType = 'doughnut';
  private doughnutChartColors: Array<any> = [
    { backgroundColor: ['#3333cc','#009900','#b30000','#ffcc00','#a6a6a6'] }
  ];
  private doughnutChartOptions: any = {
    rotation: 1 * Math.PI,
    circumference: 1 * Math.PI,
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false  
    }
  };
  private doughnutChartData: number[] = [0,0,0,0,0];

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  setVariables(w,d,o,c,p){
    this.nb_watching = w;
    this.nb_dropped = d;
    this.nb_onhold = o;
    this.nb_completed = c;
    this.nb_planned = p;
    return this.nb_completed;
  }
  

  ngOnInit() {

    this.username = this.route.snapshot.paramMap.get('username');

    if(localStorage.getItem("token") != null){
      this.token = localStorage.getItem("token");
      this.decoded = jwt_decode(this.token);
    }

    this.userService.getByUsername(this.username)
      .subscribe(response => {
        
        var nb_elements = 0;
        this.profile = response;
        this.nb_watching = 0;
        this.nb_dropped = 0;
        this.nb_onhold = 0;
        this.nb_completed = 0;
        this.nb_planned = 0;
        
        for(var i=0;i<this.profile.length;i++){
          for(var j=0;j<this.profile[i].scoreRelations.length;j++){
            this.mean_score += this.profile[i].scoreRelations[j].score;
            nb_elements++;

            switch(this.profile[i].scoreRelations[j].status) {
              case "Completed":
                this.nb_completed++;
                break;
              case "Watching":
                this.nb_watching++;
                break;
              case "On-Hold":
                this.nb_onhold++;
                break;
              case "Plan to watch":
                this.nb_planned++;
                break;
              case "Dropped":
                this.nb_dropped++;
                break;
            } 
          }
        }
        this.mean_score = this.mean_score/nb_elements;
        this.doughnutChartData = [this.nb_completed, this.nb_watching, this.nb_dropped,this.nb_onhold,this.nb_planned];
      });
  }
}
