import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';



@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {

  albums:any=[];
  artist:any={};

  id:String = this.route.snapshot.params['id'];
  private sub:any;

  constructor(private route: ActivatedRoute, private data:MusicDataService) { }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];  
      this.data.getArtistById(this.id).subscribe(data=>this.artist=data);
      this.data.getAlbumsByArtistId(this.id)
      .subscribe(data=>{
        data.items.forEach((item:any)=> {
          let isThere=false;
          if(this.albums.lenth==0){
            this.albums.push(item);
          }
          else{
            for(let i=0;i<this.albums.length;i++){
              if(item.name==this.albums[i].name || item.release_date==this.albums[i].release_date){
                isThere=true;
                break;
              }
            }
            if(!isThere) this.albums.push(item);
          }        
        });
      });
    });

  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
