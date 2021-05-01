import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  running: any;
  laps: any = [];
  timePaused = false;
  timeReset: boolean;

  timer: any = false;
  totalTimer: any = false;
  counter: number;


  constructor() { }

  timepast: any = {
    min: '00',
    sec: '00',
    ms: '00'
  };

  startTimer() {

    if (this.timer) {
      clearInterval(this.timer);
    }



    if (!this.totalTimer) {
      this.timerProgress();
    }

    this.timeReset = false;
    this.timer = false;
    this.timePaused = false;
  };



  // Timer Progress
  timerProgress() {

    let now = Date.now() - (this.counter || 0);


    // Setting the interval 
    this.totalTimer = setInterval(() => {
      this.counter = Date.now() - now;
      //console.log(this.counter);

      // Calculating minutes, seconds and milliseconds
      this.timepast.min = Math.floor((this.counter % (1000 * 60 * 60)) / (1000 * 60));
      this.timepast.sec = Math.floor((this.counter % (1000 * 60)) / 1000);
      this.timepast.ms = Math.floor((this.counter % 1000) / 10).toFixed(0);


      this.timepast.min = this.pad(this.timepast.min, 2);
      this.timepast.sec = this.pad(this.timepast.sec, 2);
      this.timepast.ms = this.pad(this.timepast.ms, 2);
      this.running = true;

    });

  };

  // Adding '0' 
  pad(num, size) {
    let s = num + "";
    while (s.length < size) {
      s = "0" + s;
    }
    return s;
  }

  stopTimer() {
    clearInterval(this.totalTimer);
    this.running = false;
    this.totalTimer = false;
    this.timePaused = true;

  };

  resetTimer() {
    this.counter = 0;
    this.running = false;
    this.timeReset = true;
    clearInterval(this.timer);
    clearInterval(this.totalTimer);
    this.totalTimer = false;
    this.timer = false;
    this.timepast = {
      min: '00',
      sec: '00',
      ms: '00'
    }
    this.laps = [];
  };

  LapTimeSplit() {
    let lapTime = this.timepast.min + ':' + this.timepast.sec + ':' + this.timepast.ms;
    this.laps.push(lapTime);
  };

}
