import React, {useState, useEffect, useRef} from "react"
import "./Card.css"

const setProp = (ref, prop, value) => ref.current.style.setProperty(prop, value) 

export default function Card (props){
    const [cardActive, setCardActive] = useState(false);
    const [animation, setAnimation] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        setProp(ref, '--dx', '0deg');
        setProp(ref, '--dy', '0deg');
        setProp(ref, '--dp', '0deg');
        setAnimation(1)
        return(
            setAnimation(-1)
        )
    }, []);

    const onMouseMove = (e) =>{
        // if(cardActive){
            let width = ref.current.offsetWidth
		    let XRel = e.pageX - ref.current.offsetLeft
		    let YRel = e.pageY - ref.current.offsetTop
		
		    let YAngle = -(0.5 - (XRel / width)) * 40; 
		    let XAngle = (0.5 - (YRel / width)) * 40;
            // console.log(XAngle,Math.sqrt(XAngle * XAngle ))
            setProp(ref, '--dx', `${XAngle}deg`)
            setProp(ref, '--dy', `${YAngle}deg`)
            setProp(ref, '--dp', `${Math.sqrt(XAngle * XAngle ) + Math.sqrt(YAngle * YAngle ) / 2}%`)
        // }
    };
    const onPointerOut = (e) =>{
        setProp(ref, '--dx', '0deg')
        setProp(ref, '--dy', '0deg')
        setProp(ref, '--dp', '0%')
        setCardActive(false)
    };
    
    const onMouseEnter = () =>{
        setCardActive(true);
    }
    return(
        <div id="card-container" ref={ref} onMouseMove={onMouseMove} onMouseLeave={onPointerOut} onMouseEnter={onMouseEnter} animation={animation}>
            <div id="header-container">
                <img id="tree-img" src={"/Salix.png"} alt="tree"/>
                <div id="props-container">
                    <h1>{props.name}</h1>
                    <h2>more info</h2>
                    <div id="life"></div>
                    <div id="contribute-container">
                        <div class="contribute"></div>
                        <div class="contribute"></div>
                        <div class="contribute"></div>
                        <div class="contribute"></div>
                    </div>
                    <h3>{43} contributors took care of me</h3>
                </div>
            </div>
        </div>
    )
}