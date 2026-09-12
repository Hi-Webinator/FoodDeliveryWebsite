import React from 'react';

const Outils = ({ text, icon,alt }) => {
    return (
        <>
            <div className="outil me-4">
                <span className="btn w-100  fw-bold d-flex align-items-center ">
                    <div className="icon me-3">
                        <img src={icon} alt={alt} className="img-fluid" />
                    </div>
                    {text}
                </span>
            </div>
        </>
    )
}

export default Outils
