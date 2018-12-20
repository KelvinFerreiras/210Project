
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
//import { UserService, UserDetails} from '../../../shared/user.service';
import { Cell } from './classes/cell'
import { Controls } from './enums/controls';


import * as io from 'socket.io-client'


@Component({
  selector: 'snake',
  templateUrl: './snakegame.component.html',
  styleUrls: ['./snakegame.component.css']
})
export class SnakeGameComponent implements OnInit {

    @ViewChild('SnakeCanvas') canvasElement: ElementRef

    public width = 800;
    public height = 450;
    //public socket = io();
    private context: CanvasRenderingContext2D;
    //details: UserDetails;
    //userResults: string;
    playerId;
    player: Cell;
    socket = io('http://localhost:3001');
    
    constructor(/*private userService: UserService*/) { 
    }


  ngOnInit() {
    

    this.player = new Cell(250 * Math.random(),250*Math.random(),25,this.playerId);
    this.socket.emit('join',this.player)
     this.context = this.canvasElement.nativeElement.getContext('2d');
     this.socket.on('state', (stuff) => {
       this.drawAll(stuff);
      console.log("retrieved update");
     // and redraw the game
   }); 
      this.drawComponents();
      /* this.userService.userProfile().subscribe(user => {
        this.details = user.user;
      }, (err) => {
        console.error(err);
      }); */

      //this.playerId = this.details.username.toString;
      
      

  }
  

  drawComponents(): void {
    // room board 
    this.context.fillStyle = 'rgb(0,200,200)';
    this.context.fillRect(0, 0, this.width, this.height);
    this.drawPlayer(this.player);

    
    setInterval(() => this.drawComponents(), 1 / 60);
      
  }

  drawPlayer(player: Cell): void{
    this.context.fillStyle = 'rgb(255,0,0)'
    this.context.fillRect(player.getX(),player.getY(),player.getSize(),player.getSize());
    this.context.fillStyle = 'rgb(255,255,255)'
    this.context.fillText(player.getName(),(player.getX()-player.getSize()),player.getY()-2); 
  }

  drawAll(players: Cell[]){
    this.drawPlayer(this.player)
    players.forEach((p) => {this.drawPlayer(p)})
  }

  @HostListener('window:keydown', ['$event'])
  keyDown(event: KeyboardEvent) {
    if (event.keyCode == Controls.Up) {
        this.player.move("up");
       this.socket.emit('update',this.player);
    }
    if (event.keyCode == Controls.Down) {
        this.player.move("down");
       this.socket.emit('update',this.player);
    }
    if (event.keyCode == Controls.Left) {
        this.player.move("left");
      this.socket.emit('update',this.player);
    }
    if (event.keyCode == Controls.Right) {
        this.player.move("right");
      this.socket.emit('update',this.player);
    }

  }



}
