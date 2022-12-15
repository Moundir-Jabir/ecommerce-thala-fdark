import React, { useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../config'
import toastr from 'toastr'
import 'toastr/build/toastr.css'
import FormCard from '../../components/forms/FormCard'

const ForgotPassword = () => {

  const [user, setUser] = useState({
    email: ""
  })

  const submit = (e) => {
    e.preventDefault()
    axios.post(`${API_URL}/auth/forgetpassword`, user)
      .then((res) => {
        toastr.success(res.data.message, 'Success', {
          positionClass: "toast-bottom-left"
        })
        setUser({ email: "" })
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

  const { email } = user
  const links = [
    { name: "Register", to: "/register", description: "Create new account ?" }
  ]
  let inputs = [
    { name: "email", value: email, type: "email", placeholder: "Enter Your Email", error: "" }
  ]
  return (
    <FormCard submit={submit} title="Forget Password" button="Reset Password" links={links} inputs={inputs} setState={setUser} state={user} />
  )
}

export default ForgotPassword