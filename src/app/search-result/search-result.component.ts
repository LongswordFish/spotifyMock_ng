import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  results:any=[];
  searchQuery:any;
  sub:any;

  constructor(
    private route:ActivatedRoute,
    private data: MusicDataService
    ) { }

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || "";
      this.results=[];
      this.data.searchArtists(this.searchQuery)
      .subscribe(data=>{
        data.artists.items.forEach((item:any)=>{
          if(item.images!=null && item.images.length>0){
            this.results.push(item);
          }
        })
      });
    });
  }

  ngOnDestroy():void{
    this.sub.unsubscribe();
  }

}
