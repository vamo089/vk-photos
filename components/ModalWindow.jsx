import React from 'react';

function ModalWindow(props) {
    function next_img() {
        props.ChangeImg(props.id + 1)
    }
    function prev_img() {
        props.ChangeImg(props.id - 1)
    }
    return (

        <div className="modales">
            <input className="modal-open" id="modal" type="checkbox" hidden />
                <div className="modal-wrap" aria-hidden="true" role="dialog">
                    <label className="modal-overlay" htmlFor="modal"> </label>
                    <div className="modal-dialog">
                        <div className="modal-header">
                            <h2> </h2>
                            <label className="btn-close" htmlFor="modal" aria-hidden="true">×</label>
                        </div>
                        <div className="modal-body">
                            <img onClick={next_img} data-id={props.id} src={props.src} alt="from vk"/>
                            <div onClick={prev_img} className="arrowl"> </div>
                            <div onClick={next_img} className="arrowr"> </div>
                        </div>
                        <div className="modal-footer">
                            <div className="likes"><span>{props.likes ? props.likes.count : ''}</span></div>
                            <div className="comments"><span>{props.comments ? props.comments.count : ''}</span></div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default ModalWindow;
