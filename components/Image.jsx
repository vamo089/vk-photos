import React from 'react';

function Image(props) {
    function imageid() {
        props.OpenClose(props.id)
    }

    return (
        <label htmlFor="modal">
            <div onClick={imageid} className="image-field">
                <img src={props.src} alt='screnshot'/>
            </div>
        </label>
    )
}

export default Image;
