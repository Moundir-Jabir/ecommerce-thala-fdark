import React from 'react'

const FormInput = (props) => {
    const { onChange, value, name, type, error, placeholder } = props
    return (
        <div className="field input-field">
            <input onChange={onChange} value={value} type={type} name={name} placeholder={placeholder} />
            <small>{error}</small>
        </div>
    )
}

export default FormInput