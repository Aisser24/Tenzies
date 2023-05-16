import React from "react";


const Die = ({ value, isHeld, handleClick, id }) => {
    const style = {
        backgroundColor: isHeld ? "#59E391" : "white"
    }

    return (
        <div 
            className="die" 
            style={style}
            onClick={handleClick}
        >
            {value}
        </div>
    )
}

export default Die