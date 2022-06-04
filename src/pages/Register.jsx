import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Btn from '../components/Btn'
import { useAuth } from "../context/Auth"

const Register = () => {

  const {signUp} = useAuth()
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async event => {
    event.preventDefault()
    try {
      setLoading(true)
      await signUp(nameRef.current.value, emailRef.current.value, passwordRef.current.value)
      navigate('/', {replace: true})
    } catch (error) {
      alert(error.message)
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-row justify-center items-center text-xl pt-20 p-5">
      <form onSubmit={submit} className="flex flex-col flex-1 sm:grow-0 sm:basis-1/2 md:basis-5/12 lg:basis-4/12 gap-4">
        <header className="text-5xl font-semibold mb-10 text-center">Sign Up</header>
        <div className="flex flex-col">
          <div>Name</div>
          <input type="name" ref={nameRef} required className="rounded-md border-2 text-lg p-1 px-2 flex-1" name="name" />
        </div>
        <div className="flex flex-col">
          <div>Email</div>
          <input type="email" ref={emailRef} required className="rounded-md border-2 text-lg p-1 px-2 flex-1" name="email" />
        </div>
        <div className="flex flex-col">
          <div>Password</div>
          <input type="password" ref={passwordRef} required className="rounded-md border-2 text-lg p-1 px-2 flex-1" name="password" />
        </div>

        <div className="flex flex-row justify-center mt-10">
          <Btn disabled={loading} type="submit" className="text-xl grow-0 text-white bg-blue-500 !px-5 !py-2">Submit</Btn>
        </div>

      </form>
    </div>
  )
}

export default Register