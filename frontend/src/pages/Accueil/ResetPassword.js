import React from 'react'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../config'
import toastr from 'toastr'
import 'toastr/build/toastr.css'
import FormCard from '../../components/forms/FormCard'

const ResetPassword = () => {

  const navigate = useNavigate()

  const [user, setUser] = useState({
    password: "", password2: ""
  })
  const [error, setError] = useState({
    passwordError: "", password2Error: ""
  })

  const submit = (e) => {
    e.preventDefault()
    let newError = {}
    if (password.length >= 8 && password.length <= 20)
      newError.passwordError = ""
    else
      newError.passwordError = "new password should be between 8 and 20 caracters"
    if (password == password2)
      newError.password2Error = ""
    else
      newError.password2Error = "invalid password"
    setError({ ...error, ...newError })
    if (newError.passwordError == "" && newError.password2Error == "") {
      axios.patch(`${API_URL}/auth/resetpassword/${token}`, user)
        .then((res) => {
          toastr.success(res.data.message, 'Success', {
            positionClass: "toast-bottom-left"
          })
          navigate('/login')
        })
        .catch((err) => {
          if (err.response.data.erreur) {
            toastr.warning(err.response.data.erreur, 'Warning !', {
              positionClass: "toast-bottom-left"
            })
          } else {
            toastr.warning("Token expired, please fill in the form of forgotpassword", 'Warning !', {
              positionClass: "toast-bottom-left"
            })
          }
        })
    }
  }

  const { password, password2 } = user
  const { passwordError, password2Error } = error
  let { token } = useParams()
  let inputs = [
    { name: "password", value: password, type: "password", placeholder: "New Password", error: passwordError },
    { name: "password2", value: password2, type: "password", placeholder: "Validate password", error: password2Error },
  ]

  return (
    <FormCard submit={submit} title="Reset Password" links={[]} button="Reset Password" inputs={inputs} setState={setUser} state={user} />
  )
}

export default ResetPassword