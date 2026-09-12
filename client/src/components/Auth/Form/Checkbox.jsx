import React from 'react'

const Checkbox = ({text}) => {
    return (
        <>
            <div className="mb-4 mt-4 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label fw-bold" for="exampleCheck1">{text}</label>
            </div>
        </>
    )
}

export default Checkbox
