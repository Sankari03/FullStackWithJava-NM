import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'music-player';

  audioObject = new Audio();
  audioEvents = [
    'ended',
    "error",
    'play',
    'playing',
    'pause',
    'timeupdate',
    'canplay',
    'loadedmetadata',
    'loadstart'
  ];

  files=[
    {
    url: '.\\assets\\Melliname.mp3',
    name: 'Song 1'
    },
    {
      url: '.\\assets\\Saayali.mp3',
      name: 'Song 2'
    },
    {
      url: '.\\assets\\Scars to your beautiful.mp3',
      name: 'Song 3'
    },

  ];

  currentTime = '00:00';
  duration = '00:00';
  seek = 0;
  currentSong: { name: string } = { name: '' };
  
  streamObserver(url : any){
    return new Observable(observer=>{
      this.audioObject.src = url;
      this.audioObject.load();
      this.audioObject.play();

      const handler = (event : Event)=>{
        console.log(event);
        this.seek = this.audioObject.currentTime;
        this.duration = this.timeFormat(this.audioObject.duration);
        this.currentTime = this.timeFormat(this.audioObject.currentTime);
      }

      this.addevent(this.audioObject, this.audioEvents, handler)

      return () =>{
        this.audioObject.pause();
        this.audioObject.currentTime=0;

        this.removeEvent(this.audioObject, this.audioEvents, handler);
      }
    });
  }


  openFile(url: any, name: string){
    this.streamObserver(url).subscribe(event => {});
    this.currentSong.name = name;
  }

  play(){
    this.audioObject.play();
    console.log("Clicked Play Button")
  }
  pause(){
    this.audioObject.pause();
    console.log("Clicked Pause Button")
  }
  stop(){
    this.audioObject.pause();
    this.audioObject.currentTime = 0;
    console.log("Clicked Stop Button")
  }

  setVolume(ev: any){
    this.audioObject.volume = ev.target.value;
    console.log(ev.target.value);
  }

  setSeekTo(ev: any){
    this.audioObject.currentTime= ev.target.value;
  }

  addevent(obj: any, events: any, handler: any){
    events.forEach((event: any) => {
      obj.addEventListener(event, handler);
    });
  }

  removeEvent(obj: any, events: any, handler: any){
    events.forEach((event: any) => {
      obj.removeEventListener(event, handler);
    });
  }

  timeFormat(time: any, format='mm:ss'){
    const momentTime = time*1000;
    return moment.utc(momentTime).format(format)
  }
}
