import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'hub-main',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './hub-main.component.html',
  styleUrls: ['./hub-main.component.css']
})

export class HubMainComponent implements OnInit {
  player: YT.Player;
  private id: string = 'qDuKsiwS5xw';

  savePlayer (player) {
    this.player = player;
    console.log('player instance', player)
  }

  onStateChange(event) {
    console.log('player state', event.data);
  }

  constructor() { }

  ngOnInit() {
  }

}
