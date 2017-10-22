import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { QueueService } from '../shared/queue.service';
import { YoutubeService } from '../shared/youtube.service';
import { HubService } from '../shared/hub.service';
import { UsersService } from '../shared/users.service';
import { User } from '../objects/user';
import { Song } from '../objects/song';
import { Hub } from '../objects/hub';
import { YTSong } from '../objects/YTsong';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable } from 'angularfire2/database';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'lsl-user-hub-view',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './user-hub-view.component.html',
  styleUrls: ['./user-hub-view.component.css'],
  providers: [QueueService, YoutubeService]
})
export class UserHubViewComponent {

  public songList: FirebaseListObservable<YTSong[]>;
  public queueList: FirebaseListObservable<Song[]>;
  public isQueue: boolean = true;
  public isSongs: boolean = false;
  public currentHub: Hub;
  public songs: Song[];
  public ytsongs: YTSong[];
  public users: User[];
  public  hubn: string ='';

  constructor(
    private route: ActivatedRoute,
    public usersService: UsersService,
    public queueService: QueueService,
    public youtubeService: YoutubeService,
    public hubService: HubService) {

   }

   ngOnInit() {
     this.queueService.getQueue(this.hubService.currentHub.name).subscribe(items => {
       this.sortQueue(items);
     });
     this.hubn = this.hubService.currentHub.name;

     // listen for if user gets kicked out
     this.usersService.listenForBoot();
   }

   sortQueue(items) {
     this.songs = items;
     this.songs.sort((a, b) => {
       let ar: number = a.rank;
       let br: number = b.rank;
       let ad: Date = a.time_added;
       let bd: Date = b.time_added;
       if (ar < br) return 1;
       else if (ar > br) return -1;
       else if (ad < bd) return -1;
       else if (ad > bd) return 1;
       else return 0;
     });
   }

  onSongClicked(youtubeItem) {
    if (!this.isSongs) return;
    var title = youtubeItem.song_name;
    var thumbnail = youtubeItem.thumbnail; //there are other sizes
    var videoId = youtubeItem.video_id;
    this.queueService.addSong(title, thumbnail, videoId, this.hubService.currentHub.name);
    this.onSelected("queue");
  }

  onSelected(tab: string) {
    if (tab == "songs") {
      this.isQueue = false;
      this.isSongs = true;
      this.ytsongs = [];
    }
    else if (tab == "queue") {
      this.isSongs = false;
      this.isQueue = true;
      this.queueService.getQueue(this.hubService.currentHub.name).subscribe(items => {
        this.sortQueue(items);
      });
    }
  }

  onSearch(input: string) {
    this.ytsongs = [];
    this.ytsongs = this.youtubeService.search(input);
  }

  upvote(song) {
    this.queueService.upvote(song);
  }

  downvote(song) {
    this.queueService.downvote(song);
  }

}
