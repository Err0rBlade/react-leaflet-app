import React, { Component } from "react";
import {
  Map,
  TileLayer,
  LayersControl,
  Circle,
  ZoomControl,
} from "react-leaflet";
import Routing from "./RoutingMachine";
import clusters from "../data/clusters";

export default class LeafletMap extends Component {
  state = {
    lat: 19.221,
    lng: 72.852,
    zoom: 13,
    isMapInit: false,
  };
  saveMap = (map) => {
    this.map = map;
    this.setState({
      isMapInit: true,
    });
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map //displays leaflet map
        style={{ height: "100vh" }}
        center={position}
        zoom={this.state.zoom}
        ref={this.saveMap}
        zoomControl={false}
      >
        {/* LayersControl adds on button on the map to change tiles */}
        <LayersControl position="bottomleft">
          <LayersControl.BaseLayer name="ThunderForest.MobileAtlas">
            <TileLayer
              attribution='<a href="http://www.thunderforest.com/">Thunderforest</a>'
              url="https://{s}.tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=aa300fabe275445892aab04bcb7788ef"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Stamen Toner Light">
            <TileLayer
              attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>'
              url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Stamen Toner Dark">
            <TileLayer
              attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>'
              url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="ESRI Imagery">
            <TileLayer
              attribution="Tiles &copy; Esri "
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="DarkMatter">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a> '
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Stadia Dark">
            <TileLayer
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer checked name="Open Street Map Hot">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Jawg Matrix">
            <TileLayer
              attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token=fbUoPDPBjGOGkVH427A87tNkCtoQnDuXhFNXAm6HK3AwWjzHPoQIfBlBatXZyI5f"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        {/* ZoomControl adds a button on the map to zoom in/out */}
        <ZoomControl position="bottomleft" />
        {/* in map/data, we import the json data of clusters generated by python custering algorithm */}
        {/* the clusters variable is used here to plot a <Circle/> at each cluster coord */}
        {clusters.map((clusters) => {
          return (
            <Circle
              center={[clusters["lng"], clusters["lat"]]}
              radius={420} //nice
              color="#00000099"
            />
          );
        })}
        {this.state.isMapInit && <Routing map={this.map} />}
      </Map>
    );
  }
}
