import { Component, OnInit, ViewChild } from '@angular/core';
import { } from 'googlemaps';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  marker: google.maps.Marker;



  constructor() { }

  ngOnInit() {
    const position = [40.629243, -73.943563];
    const centerPosition = [40.619243, -73.8963];
    const latLng = new google.maps.LatLng(position[0], position[1]);
    const mapProp = {
      center: new google.maps.LatLng(centerPosition[0], centerPosition[1]),
      zoom: 12,
      streetViewControl: false,
      scaleControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      draggable: false,
      animation: google.maps.Animation.DROP
    });

  }

}
