import React from 'react'

const Input = ({ label, type, ph }) => {
    return (
        <>
            <div className="input mt-4">
                <label for="exampleInputEmail1" className="form-label fw-bold text-capitalize">{label}</label>
                <input type={type} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={ph} />
            </div>
        </>
    )
}

export default Input
