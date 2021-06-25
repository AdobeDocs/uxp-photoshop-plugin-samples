import React, { useRef, useState, useEffect } from "react";

import "./FancySlider.css";

const getPanelRoot = el => {
    let thisEl = el;
    while (thisEl) {
        if (thisEl.tagName === "BODY" || 
            thisEl.tagName === "UXP-PANEL" || 
            thisEl.tagName === "DIALOG") {
                return thisEl;
            }
        thisEl = thisEl.parentElement;
    }
    return null;
}

export const FancySlider = ({value = 50, min = 0, max = 100, step = 1, style, trackStyle, nubStyle, onChange, onInput} = {}) => {

    const [_value, _setValue] = useState(value);

    useEffect(() => {
        _setValue(value)
    }, [value]);

    const nubEl = useRef(null);
    const sliderEl = useRef(null);

    let origX, origWidth, origLeft;

    const nubPosition = () => {
        const length = (max - min) || 100;
        const pct = (_value / length) * 100;
        return pct;
    }

    const correctedValue = (value, roundTo = step) => {
        let toNearestStep = Math.round(value / roundTo) * roundTo;
        if (toNearestStep < min)
            return min;
        if (toNearestStep > max)
            return max;
        return toNearestStep;
    }

    const onPointerMove = evt => {
        const pct = (evt.clientX - origLeft) / origWidth;
        const newValue = min + (pct * (max - min));
        const modifiedStep = evt.shiftKey ? step * 10 : step;
        const adjustedValue = correctedValue(newValue, modifiedStep);
        _setValue(adjustedValue);
        onInput && onInput(adjustedValue);
    }

    const onPointerUp = evt => {
        if (sliderEl.current.releasePointerCapture) {
            sliderEl.current.releasePointerCapture(evt.pointerId);
            sliderEl.current.removeEventListener("pointermove", onPointerMove);
        } else {
            getPanelRoot(sliderEl.current).removeEventListener("pointermove", onPointerMove);        
            getPanelRoot(sliderEl.current).removeEventListener("pointerup", onPointerUp);        
        }
    }

    const onPointerDown = evt => {
        origX = evt.clientX - evt.currentTarget.offsetLeft ;
        origLeft = evt.currentTarget.offsetLeft;
        origWidth = evt.currentTarget.clientWidth;
        if (evt.currentTarget !== evt.target) {
            const pct = origX / origWidth;
            const newValue = min + (pct * (max - min));
            _setValue(correctedValue(newValue));
            onInput && onInput(_value);
        }
        if (sliderEl.current.setPointerCapture) {
            sliderEl.current.setPointerCapture(evt.pointerId);
            sliderEl.current.addEventListener("pointermove", onPointerMove);
        } else {
            getPanelRoot(sliderEl.current).addEventListener("pointermove", onPointerMove);        
            getPanelRoot(sliderEl.current).addEventListener("pointerup", onPointerUp);        
        }
    }

    const onKeyDown = evt => {
        const modifiedStep = evt.shiftKey ? step * 10 : step;
        if (evt.key === "ArrowUp" || evt.key === "ArrowLeft") {
            const adjustedValue = correctedValue(_value - modifiedStep, modifiedStep);
            _setValue(adjustedValue);
            onInput & onInput(adjustedValue);
        }
        if (evt.key === "ArrowDown" || evt.key === "ArrowRight") {
            const adjustedValue = correctedValue(_value + modifiedStep, modifiedStep);
            _setValue(adjustedValue);
            onInput & onInput(adjustedValue);
        }
    }

    return (
        <div className="fancy-slider" style={style} ref={sliderEl}
             onPointerDown={onPointerDown} 
             onPointerUp={onPointerUp}
             onKeyDown={onKeyDown}
             tabIndex="0"
             >
            <div className="slider-track" style={trackStyle}></div>
            <div ref={nubEl} className="slider-nub" 
                 style={Object.assign({}, nubStyle, {left: `${nubPosition()}%`})}></div>
        </div>
    );
}