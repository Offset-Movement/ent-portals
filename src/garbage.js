//   const addTree = (_map, gl) => {
//     scene.current = new THREE.Scene()
//     camera.current = new THREE.Camera()
// // create two three.js lights to illuminate the model
//     const directionalLight = new THREE.DirectionalLight(0xffffff);
//     directionalLight.position.set(0, -70, 100).normalize();
//     scene.current.add(directionalLight);

//     const directionalLight2 = new THREE.DirectionalLight(0xffffff);
//     directionalLight2.position.set(0, 70, 100).normalize();
//     scene.current.add(directionalLight2);

// // use the three.js GLTF loader to add the 3D model to the three.js scene
//     const loader = new GLTFLoader();
//     loader.load('/tree.gltf', (gltf) => {
//       scene.current.add(gltf.scene);});
//       // map.current= _map
// // use the Mapbox GL JS map canvas for three.js
//     renderer.current =  new THREE.WebGLRenderer({
//       canvas: map.current.getCanvas(),
//       context: gl,
//       antialias: true})
//       renderer.current.autoClear = false
//       renderer.current.shadowMap.enabled = true
//   }

//   const renderFun = (gl, matrix) => {
//     const modelOrigin = [148.9819, -35.39847];
//     const modelAltitude = 0;
//     const modelRotate = [Math.PI / 2, 0, 0];

//     const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
//       modelOrigin,
//       modelAltitude
//     );

// // transformation parameters to position, rotate and scale the 3D model onto the map
//     const modelTransform = {
//         translateX: modelAsMercatorCoordinate.x,
//         translateY: modelAsMercatorCoordinate.y,
//         translateZ: modelAsMercatorCoordinate.z,
//         rotateX: modelRotate[0],
//         rotateY: modelRotate[1],
//         rotateZ: modelRotate[2],
//         scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
//     };

//     const rotationX = new THREE.Matrix4().makeRotationAxis(
//       new THREE.Vector3(1, 0, 0), modelTransform.rotateX );
//       const rotationY = new THREE.Matrix4().makeRotationAxis(
//       new THREE.Vector3(0, 1, 0), modelTransform.rotateY );
//       const rotationZ = new THREE.Matrix4().makeRotationAxis(
//       new THREE.Vector3(0, 0, 1), modelTransform.rotateZ);

//       const m = new THREE.Matrix4().fromArray(matrix);
//       const l = new THREE.Matrix4().makeTranslation(
//         modelTransform.translateX,
//         modelTransform.translateY,
//         modelTransform.translateZ
//       ).scale(new THREE.Vector3(
//           modelTransform.scale,
//           -modelTransform.scale,
//           modelTransform.scale))
//       .multiply(rotationX)
//       .multiply(rotationY)
//       .multiply(rotationZ);
//       camera.current.projectionMatrix = m.multiply(l);
//       renderer.current.resetState();
//       renderer.current.render(scene.current, camera.current);
//       map.current.triggerRepaint()
//     }


        // configuration of the custom layer for a 3D model per the CustomLayerInterface
        // const customLayer = {
        //   id: '3d-model',
        //   type: 'custom',
        //   renderingMode: '3d',
        //   onAdd: function (_map, gl){addTree(_map, gl)},
        //   render: function (gl, matrix){renderFun(gl, matrix)}
        // }
        
        // map.current.addLayer(customLayer, 'waterway-label');