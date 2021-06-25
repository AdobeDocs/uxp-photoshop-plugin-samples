import React, {useState} from "react";

import { ColorPicker } from "../components/ColorPicker.jsx";
import map from "../assets/map.png";

export const Demos = () => {
    const [ clickedToPlay, setClickedToPlay ] = useState(false);
    return (
        <>
            <ColorPicker />
            <div style={{position: "relative", width:400, height:300}}>
                { !clickedToPlay ? (
                    <>
                        <img src={map} width={400} height={300}/>
                        <div onClick={() => setClickedToPlay(true)} style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", backgroundColor: "rgba(0,0,0,0.5)"}}>
                            <div style={{margin: "auto auto", fill: "rgba(255,255,255,0.75)"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="72" viewBox="0 0 18 18" width="72" >
                                    <rect id="Canvas" fill="#ff13dc" opacity="0" width="18" height="18" /><path class="a" d="M9,1a8,8,0,1,0,8,8A8,8,0,0,0,9,1Zm4.2685,8.43L7.255,12.93A.50009.50009,0,0,1,7,13H6.5a.5.5,0,0,1-.5-.5v-7A.5.5,0,0,1,6.5,5H7a.50009.50009,0,0,1,.255.07l6.0135,3.5a.5.5,0,0,1,0,.86Z" />
                                </svg>
                            </div>
                            <span style={{backgroundColor: "rgba(0,0,0,0.33)", padding: "8px", textAlign: "center", fontSize: "12px", color: "rgba(255,255,255,0.90)", fontWeight: "bold"}}>Touch to interact</span>
                        </div>
                    </>
                ) : (
                    <webview src="https://www.google.com/maps?pb=!1m18!1m12!1m3!1d198790.64009510571!2d-104.89844390728756!3d38.875868020883544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8713412ea1e6d22b%3A0x418eeb92f5e86b13!2sColorado%20Springs%2C%20CO!5e0!3m2!1sen!2sus!4v1617051447582!5m2!1sen!2sus" width="400" height="300" ></webview>
                )}
            </div>
        </>
    )
}