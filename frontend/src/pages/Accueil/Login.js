import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../config'
import toastr from 'toastr'
import 'toastr/build/toastr.css'
import { login } from '../../helpers'
import FormCard from '../../components/forms/FormCard'

const Login = () => {

  const navigate = useNavigate()

  const [user, setUser] = useState({
    email: "", password: ""
  })

  const submit = (e) => {
    e.preventDefault()
    axios.post(`${API_URL}/auth/login`, user)
      .then((res) => {
        toastr.success('User logged successfuly', 'Login', {
          positionClass: "toast-bottom-left"
        })
        login(res.data.user, res.data.token)
        navigate('/dashboard')
      })
      .catch((err) => {
        if (err.response.data.erreur) {
          toastr.warning(err.response.data.erreur, 'Please Check form !', {
            positionClass: "toast-bottom-left"
          })
        } else {
          toastr.warning("Problem connection", 'Sorry !', {
            positionClass: "toast-bottom-left"
          })
        }
      })
  }
  const { email, password } = user
  const links = [
    { link: "Register Now!", to: "/register" },
    { link: "Forgot password ?", to: "/forgotpassword" }
  ]
  let inputs = [
    { name: "email", value: email, type: "email", icon: "mail_outline", label: "Email", error: "" },
    { name: "password", value: password, type: "password", icon: "lock_outline", label: "Password", error: "" }
  ]
  return (
    <FormCard submit={submit} title="Login" description="" button="Login" links={links} inputs={inputs} setState={setUser} state={user} />
  )
}

export default Login