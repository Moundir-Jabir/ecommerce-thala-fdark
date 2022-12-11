import React, { Fragment } from 'react'

const FormInput = (props) => {
    const { onChange, value, name, type, icon, label, error } = props
    return (
        <div className="row margin">
            <div className="input-field col s12">
                {
                    (type == 'select') ? (
                        <select className='role' onChange={onChange} name={name} id={name}>
                            {
                                props.options.map((option, i) => (
                                    <option key={i} value={option}>{option}</option>
                                ))
                            }
                        </select>
                    ) : (
                        <Fragment>
                            <i className="material-icons prefix pt-2">{icon}</i>
                            <input onChange={onChange} value={value} name={name} id={name} type={type} />
                            <label htmlFor={name}>{label}</label>
                        </Fragment>
                    )
                }
                <small className="errorTxt2"><div className="error">{error}</div></small>
            </div>
        </div>
    )
}

export default FormInput