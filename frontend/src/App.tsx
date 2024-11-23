import { useState } from 'react'
import './App.css'
import PhoneInput from './components/PhoneInput'
import { NavigateFunction, useNavigate } from 'react-router-dom'

const serverURL = import.meta.env.VITE_SERVER_URL || "http://localhost:8001"

interface UserData {
  firstName: string
  lastName: string
  dob: Date
  dialCode: string
  phoneNo: string
  email: string
}

async function handleFormSubmit(e: React.FormEvent, data: UserData, setAlertMsg: React.Dispatch<React.SetStateAction<string>>, setIsSubmitDisabled: React.Dispatch<React.SetStateAction<boolean>>, navigate: NavigateFunction) {
  e.preventDefault()
  setIsSubmitDisabled(true)

  if (data.firstName == "") {
    setAlertMsg("First Name cannot be empty.")
    return
  }

  if (data.lastName == "") {
    setAlertMsg("Last Name cannot be empty.")
    return
  }

  if (isNaN((new Date(data.dob)).getTime())) {
    setAlertMsg("Invalid Date.")
    return
  }

  if (data.phoneNo.length != 10 || !(/[0-9]{10}/.test(data.phoneNo))) {
    setAlertMsg("Invalid Phone Number.")
    return
  }

  if (data.email == "") {
    setAlertMsg("Invalid Email.")
    return
  }

  const res = await fetch(serverURL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
  if (res.status != 201) {
    const resMsg = (await res.json()).detail[0].msg
    setAlertMsg(resMsg)
    return
  }

  const resData = await res.json()

  return navigate("/user/" + resData.id, { replace: true })
}

export default function App() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [dialCode, setDialCode] = useState("+91")
  const [phoneNo, setPhoneNo] = useState("")
  const [email, setEmail] = useState("")
  const [alertMsg, setAlertMsg] = useState("")
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <form id='user-form' onSubmit={(e) => {
        handleFormSubmit(e, { firstName, lastName, dob: new Date(dateOfBirth), dialCode, phoneNo, email }, setAlertMsg, setIsSubmitDisabled, navigate)
        setIsSubmitDisabled(false)
      }}>
        <h1>Register Now</h1>
        <p id='alert-msg'>{alertMsg}</p>
        <label>First Name: </label>
        <input id='first-name' type='text' placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value.trim())}></input>
        <label>Last Name: </label>
        <input id='last-name' type='text' placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value.trim())}></input>
        <label>Date of Birth: </label>
        <input id='dob' type='date' value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}></input>
        <label>Phone No.: </label>
        <PhoneInput phoneNo={phoneNo} setPhoneNo={setPhoneNo} dialCode={dialCode} setDialCode={setDialCode}></PhoneInput>
        <label>Email: </label>
        <input id='email' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value.trim())}></input>
        <input id='submit' type='submit' disabled={isSubmitDisabled}></input>
      </form >
    </>
  )
}