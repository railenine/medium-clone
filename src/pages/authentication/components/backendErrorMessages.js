import React from "react";

const BackendErrorMessages = ({backendErrors}) => {
    const errMsges = Object.keys(backendErrors).map(name => {
        const messages = backendErrors[name].join(' ')
        return `${name} ${messages}`
    })
    console.log(errMsges)
    return <ul className='error-messages'>
        {errMsges.map(errMsg => (
            <li key={errMsg}>{errMsg}</li>
        ))}
    </ul>
}

export default BackendErrorMessages;