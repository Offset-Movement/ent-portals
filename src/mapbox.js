        // map.current.addLayer({
        //   id: 'custom_layer',
        //   type: 'custom',
        //   renderingMode: '3d',
        //   onAdd: (m, gl) => {
        //     window.tb = new Threebox(m, gl, {
        //       defaultLights: true,
        //       // enableSelectingFeatures: true,
        //       enableSelectingObjects: true,
        //       enableDraggingObjects: true,
        //       enableRotatingObjects: true
        //       // enableTooltips: true,
        //     });
        //     const options = {
        //       obj: "/tree.glb",
        //       type: "gltf",
        //       scale: 20,
        //       units: "meters",
        //       rotation: { x: 90, y: 0, z: 0 },
        //       anchor: "center" //default rotation
        //     };
        //     window.tb.loadObj(options, (model) => {
        //       const soldier = model.setCoords([lng, lat]);
        //       soldier.fixedZoom = 1;
        //       // Listening to the events
        //       // soldier.addEventListener("SelectedChange", onSelectedChange, false);
        //       // // soldier.addEventListener('Wireframed', onWireframed, false);
        //       // // soldier.addEventListener('IsPlayingChanged', onIsPlayingChanged, false);
        //       // // soldier.addEventListener('ObjectDragged', onDraggedObject, false);
        //       // soldier.addEventListener(
        //       //   "ObjectMouseOver",
        //       //   onObjectMouseOver,
        //       //   false
        //       // );
        //       // soldier.addEventListener('ObjectMouseOut', onObjectMouseOut, false);
        //       // soldier.addEventListener('ObjectChanged', onObjectChanged, false);
  
        //       window.tb.add(soldier, "soldier");
        //     });
        //   },
        //   render: (gl, metric) => {
        //     window.tb.update();
        //   }
        // });