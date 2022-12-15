import React from 'react'
import FormInput from './FormInput'
import { Link } from 'react-router-dom'

const FormCard = (props) => {

    const { submit, title, button, links, inputs, setState, state } = props

    const update = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    return (
        <section class="container forms">
            <div class="form signup">
                <div class="form-content">
                    <h1 className='header'>{title}</h1>
                    <form onSubmit={submit}>
                        {
                            inputs.map((input, i) => (
                                <FormInput key={i} onChange={update} value={input.value} name={input.name} type={input.type} placeholder={input.placeholder} error={input.error} />
                            ))
                        }
                        <div class="field button-field">
                            <button type='submit'>{button}</button>
                        </div>
                    </form>
                    {
                        links.map((link, i) => {
                            return (
                                <div key={i} className="form-link">
                                    <span>{link.description} <Link to={link.to} className="link login-link">{link.name}</Link></span>
                                </div>
                            )
                        }
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default FormCard