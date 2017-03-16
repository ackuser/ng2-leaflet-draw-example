import { Component, OnInit } from '@angular/core';
import "leaflet";
import "leaflet-draw";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit() {

      let osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib}),
          map = L.map('map', {layers: [osm], center: L.latLng(-37.7772, 175.2756), zoom: 15 });

      let drawnItems = L.featureGroup();
      map.addLayer(drawnItems);

      let drawControl = new L.Control.Draw({
          position: 'topleft' ,
          draw: {
              polygon: {
                  allowIntersection: false,
                  drawError: {
                      color: '#b00b00',
                      timeout: 1000
                  },
                  shapeOptions: {
                      color: '#bada55'
                  },
                  showArea: true
              },
              polyline: {
                  metric: false
              },
              circle: {
                  shapeOptions: {
                      color: '#662d91'
                  }
              }
          },
          edit: {
              featureGroup: drawnItems
          }
      });
      map.addControl(drawControl);

      map.on('draw:created', (e: any) => {
          var drawEvent = (e as L.DrawEvents.Created);
          var type = drawEvent.layerType,
              layer = drawEvent.layer;

          drawnItems.addLayer(layer);
      });

      let examplePolygon: L.LatLngLiteral[] = [{lng: 0, lat: 0}, {lng: 10, lat: 0}, {lng: 10, lat: 10}, {lng: 0, lat: 10}, {lng: 0, lat: 0}];
      let examplePolygonArea: number = L.GeometryUtil.geodesicArea(examplePolygon);
      L.GeometryUtil.readableArea(examplePolygonArea, true);


  }

}
