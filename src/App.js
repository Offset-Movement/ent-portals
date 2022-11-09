/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   App.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgavillo <mgavillo@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/02/06 01:20:58 by mgavillo          #+#    #+#             */
/*   Updated: 2022/02/11 01:37:34 by mgavillo         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


import React, {useRef, useState, useEffect} from 'react';
import './popup.css'
import mapboxgl, {CameraOptions} from 'mapbox-gl';
// import cameraOptions from "com.mapbox.maps.dsl.cameraOptions";
// import mapAnimationOptions from "com.mapbox.maps.plugin.animation.MapAnimationOptions.Companion.mapAnimationOptions" ;
// import flyTo from "com.mapbox.maps.plugin.animation.flyTo";
import buildings from './buildings.json'
import {Threebox} from 'threebox-plugin'
import trees from './geojson_lnglat.php.json'
import Card from "./Card"
mapboxgl.accessToken = 'pk.eyJ1Ijoic3dhZ2d5bWFyaWUiLCJhIjoiY2t6YWIwMmJ4MDVsazJvc2F1OGgyZng3ZCJ9.DwdPX1NESbr-69ReQRu6XA';

console.log(trees.features[69000].properties.SOORT_KORT);
console.log(trees.features[69000].geometry.coordinates[0], trees.features[69000].geometry.coordinates[1]);

console.log(trees.features.length)
function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  // change start point to Vondelpark, Amsterdam
  const [lng, setLng] = useState('4.8672965666724375'); // 
  const [lat, setLat] = useState('52.35732625243595');
  
  const [zoom, setZoom] = useState(17);
  // const [lng, setLng] = useState(trees.features[69000].geometry.coordinates[0]);
  // const [lat, setLat] = useState(trees.features[69000].geometry.coordinates[1]);
  const [selectModel, setselectModel] = useState(null);
  const [popup, setPopup] = useState(0);

  // const camera = useRef(null)
  // const scene = useRef(null)
  // const renderer = useRef(null)

  useEffect(() => {
    // if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [lng, lat],
        zoom: zoom,
        pitch: 70,
      })

      map.current.on("style.load", () => {
      // const layers = map.current.getStyle().layers;
      // const labelLayerId = layers.find(
      // (layer) => layer.type === 'symbol' && layer.layout['text-field']).id;
      
      const onSelectedChange = (e) => {
        const selected = e.detail.selected;
        if (selected) {
          setselectModel(e.detail);
          console.log(e.detail);
          map.current.flyTo({
            center: e.detail.coordinates,
            zoom: 19,
            bearing: 0,
            pitch:70,
            speed: 1, 
            curve: 1, 
            easing: (t) => t,
            essential: true
            })
          setPopup(1);

        } else {
          setPopup(0);
          setselectModel(null);
        }
      };

      const addObject = (sorte, coordinates) => {
        const options = {
          obj: `/${sorte}.glb`,
          type: "gltf",
          scale: 1,
          units: "meters",
          rotation: { x: 90, y: Math.random() * 360, z: 0 },
          anchor: "center", //default rotation

        };

        window.tb.loadObj(options, (model) => {
          const tree = model.setCoords([coordinates[0], coordinates[1]])
          tree.fixedZoom = 1;
          tree.addEventListener("SelectedChange", onSelectedChange, false);
          // Listening to the events
          // tree.addEventListener("SelectedChange", onSelectedChange, false);
          // // tree.addEventListener('Wireframed', onWireframed, false);
          // // tree.addEventListener('IsPlayingChanged', onIsPlayingChanged, false);
          // // tree.addEventListener('ObjectDragged', onDraggedObject, false);
          // tree.addEventListener(
            //   "ObjectMouseOver",
            //   onObjectMouseOver,
            //   false
            // );
            // tree.addEventListener('ObjectMouseOut', onObjectMouseOut, false);
            // tree.addEventListener('ObjectChanged', onObjectChanged, false);

            window.tb.add(tree, sorte);
          });
      }

      map.current.addLayer({
        id: 'custom_layer',
        type: 'custom',
        renderingMode: '3d',
        onAdd: (m, gl) => {
          window.tb = new Threebox(m, gl, {
            defaultLights: true,
            // enableSelectingFeatures: true,
            enableSelectingObjects: true
            // enableDraggingObjects: true,
            // enableRotatingObjects: true
            // enableTooltips: true,
          });

          trees.features.forEach((e) => {
            if(e.properties.SOORT_KORT === "Populus")
            {
              addObject(e.properties.SOORT_KORT, e.geometry.coordinates)
            }
            if(e.properties.SOORT_KORT === "Salix"){
              addObject( e.properties.SOORT_KORT, e.geometry.coordinates)
            }
          })

          },
          render: (gl, metric) => {
            window.tb.update();
          }
        });
        map.current.addLayer(buildings);
      })
      
      map.current.on("load", (e) => {
        // console.log(e);
      });


      return () => {
        map.current.remove();
      }
    }, []);
    

    useEffect(() => {
      if (!map.current) return; // wait for map to initialize
      map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });
  return( 
    <div id="container">
      {/* <div className="sidebar">Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}</div> */}
      <div ref={mapContainer} className="map-container" style={{width: window.innerWidth, height: window.innerHeight}}/>
      {
        popup && <Card name={selectModel.userData.obj.slice(1, -4)}/>
      }
    </div>
  )
}

export default App;
