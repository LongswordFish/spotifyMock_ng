import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  album:any;
  id:String = this.route.snapshot.params['id'];
  private sub:any;

  constructor(
    private matSnackBar:MatSnackBar, 
    private data:MusicDataService,
    private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
 

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.data.getAlbumById(this.id).subscribe(data=>this.album=data);  
    });

    //this.data.getAlbumById(this.id).subscribe(data=>this.album=data);
  }

  ngOnDestroy():void{
    this.sub.unsubscribe();
  }

  addToFavourites(trackID:String):void{
    if(this.data.addToFavourites(trackID)){
      this.matSnackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
    }
  } 

}



