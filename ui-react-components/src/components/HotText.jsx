import React, { useRef, useState, useEffect } from "react";

import "./HotText.css";

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

export const HotText = ({value = 50, min = 0, max = 100, step = 1, style, placeholder, onChange, onInput} = {}) => {

    const [_value, _setValue] = useState(value);
    const [_inputMode, _setInputMode] = useState(false);
    const [_ignoreClick, _setIgnoreClick] = useState(false);

    useEffect(() => {
        _setValue(value)
    }, [value]);

    useEffect(() => {
        if (_inputMode) editorEl.current.focus();
    }, [_inputMode])

    const hotTextEl = useRef(null);
    const editorEl = useRef(null);

    let origX, origY, origLeft, origTop;

    const correctedValue = (value, roundTo = step) => {
        let toNearestStep = Math.round(value / roundTo) * roundTo;
        if (toNearestStep < min)
            return min;
        if (toNearestStep > max)
            return max;
        return toNearestStep;
    }

    const onPointerMove = evt => {
        const newX = evt.clientX - origLeft;
        const newY = evt.clientY - origTop;
        const direction = Math.sign(newX - origX);

        if (direction === 0) return;
        const delta = Math.sqrt(Math.abs(origX - newX) ** 2 + Math.abs(origY - newY) ** 2);

        const newValue = _value + (delta * direction) / (evt.ctrlKey ? 100 : 5);
        const modifiedStep = evt.shiftKey ? step * 10 : step;
        const adjustedValue = correctedValue(newValue, modifiedStep);

        if (adjustedValue !== _value) {
            _setIgnoreClick(true);
        }

        _setValue(adjustedValue);
        onInput && onInput(adjustedValue);

    }

    const onPointerUp = evt => {
        setTimeout(() => _setIgnoreClick(false), 10);
        if (hotTextEl.current.releasePointerCapture) {
            hotTextEl.current.releasePointerCapture(evt.pointerId);
            hotTextEl.current.removeEventListener("pointermove", onPointerMove);
        } else {
            getPanelRoot(hotTextEl.current).removeEventListener("pointermove", onPointerMove);        
            getPanelRoot(hotTextEl.current).removeEventListener("pointerup", onPointerUp);        
        }
    }

    const onPointerDown = evt => {
        _setIgnoreClick(false);
        origX = evt.clientX - evt.currentTarget.offsetLeft;
        origY = evt.clientY - evt.currentTarget.offsetTop;
        origLeft = evt.currentTarget.offsetLeft;
        origTop = evt.currentTarget.offsetTop;

        if (hotTextEl.current.setPointerCapture) {
            hotTextEl.current.setPointerCapture(evt.pointerId);
            hotTextEl.current.addEventListener("pointermove", onPointerMove);
        } else {
            getPanelRoot(hotTextEl.current).addEventListener("pointermove", onPointerMove);        
            getPanelRoot(hotTextEl.current).addEventListener("pointerup", onPointerUp);        
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

    const onClick = evt => {
        if (_ignoreClick) return;
        if (!_inputMode) {
            _setInputMode(true);

            editorEl.current.focus();
        }
    }

    const onBlur = evt => {
        if (_inputMode) {
            _setInputMode(false);
            onChange && onChange(_value);
        }
    }

    const onEditorInput = evt => {
        _setValue(correctedValue(Number(evt.target.value)));
    }

    const onEditorChange = evt => {
        _setValue(correctedValue(Number(evt.target.value)));
    }

    return (
        <div className="hot-text" style={style} ref={hotTextEl}
             onPointerDown={onPointerDown} 
             onPointerUp={onPointerUp}
             onKeyDown={onKeyDown}
             onClick={onClick}
             tabIndex="0"
             >
            { _inputMode ? (
                <sp-textfield ref={editorEl} className="hot-text-input" placeholder={placeholder} value={_value} onInput={onEditorInput} onChange={onEditorChange} onBlur={onBlur}></sp-textfield>
            ) : (
                <div className="hot-text-value">{_value}</div>
            )}
        </div>
    );
}