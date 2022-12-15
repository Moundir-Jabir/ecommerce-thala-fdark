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
    { name: "Forgot password?", to: "/forgotpassword", description: "" },
    { name: "Register", to: "/register", description: "Don't have an account?" }
  ]
  let inputs = [
    { name: "email", value: email, type: "email", error: "", placeholder: "Email" },
    { name: "password", value: password, type: "password", error: "", placeholder: "Password" }
  ]
  return (
    <FormCard submit={submit} title="Log in" button="Login" links={links} inputs={inputs} setState={setUser} state={user} />
  )
}

export default Login