import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favourites: Array<any>=[]; 
  sub:any;

  constructor(private data:MusicDataService) { }

  ngOnInit(): void {
  
    this.sub=this.data.getFavourites()
    .subscribe(data=>{
      this.favourites=data.tracks;
    });

  }

  removeFromFavourites(id:String):void{
    this.sub=this.data.removeFromFavouritesyId(id)
    .subscribe(data=>{
      this.favourites=data.tracks;
      
    });
  }


  ngOnDestroy():void{
    this.sub.unsubscribe();
  }
}
