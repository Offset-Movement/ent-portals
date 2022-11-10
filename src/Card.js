import React, { useState, useEffect, useRef } from "react";
import "./Card.css";

const setProp = (ref, prop, value) =>
  ref.current.style.setProperty(prop, value);

export default function Card(props) {
  const [cardActive, setCardActive] = useState(false);
  const [animation, setAnimation] = useState(0);
  const ref = useRef(null);
  const [careTakers, setCareTakers] = useState(0);

  useEffect(() => {
    setProp(ref, "--dx", "0deg");
    setProp(ref, "--dy", "0deg");
    setProp(ref, "--dp", "0deg");
    setAnimation(1);
    return setAnimation(-1);
  }, []);

  useEffect(() => {
    setCareTakers(getRandomInt(100));
  }, [careTakers]);

  const onMouseMove = (e) => {
    // if(cardActive){
    let width = ref.current.offsetWidth;
    let XRel = e.pageX - ref.current.offsetLeft;
    let YRel = e.pageY - ref.current.offsetTop;

    let YAngle = -(0.5 - XRel / width) * 40;
    let XAngle = (0.5 - YRel / width) * 40;
    // console.log(XAngle,Math.sqrt(XAngle * XAngle ))
    setProp(ref, "--dx", `${XAngle}deg`);
    setProp(ref, "--dy", `${YAngle}deg`);
    setProp(
      ref,
      "--dp",
      `${Math.sqrt(XAngle * XAngle) + Math.sqrt(YAngle * YAngle) / 2}%`
    );
    // }
  };
  const onPointerOut = (e) => {
    setProp(ref, "--dx", "0deg");
    setProp(ref, "--dy", "0deg");
    setProp(ref, "--dp", "0%");
    setCardActive(false);
  };

  const onMouseEnter = () => {
    setCardActive(true);
  };

  // to illustrate with different values,
  // for now we'll generate these numbers randomly
  // number of people that taken care of the plants.
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  return (
    <div
      id="card-container"
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onPointerOut}
      onMouseEnter={onMouseEnter}
      animation={animation}
    >
      <div id="header-container">
        <div id="props-container">
          <img id="tree-img" src={"/Salix.png"} alt="tree" />
          <h1 id="tree-name">{props.name}</h1>
          <h2 id="tree-did">did:0x0291</h2>
          {/* <div id="life"></div> */}
          {/* <div id="contribute-container">
                        <div class="contribute"></div>
                        <div class="contribute"></div>
                        <div class="contribute"></div>
                        <div class="contribute"></div>
                    </div> */}

          <h3 id="tree-message">{careTakers} contributors took care of me</h3>
        </div>
      </div>
    </div>
  );
}
