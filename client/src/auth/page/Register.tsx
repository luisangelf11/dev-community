import { Link } from 'react-router-dom'
import RegisterForm from '../components/RegisterForm'
import { Toaster } from 'react-hot-toast'

export default function Register() {
  return (
    <div className="w-full h-screen flex flex-col gap-2 justify-center items-center">
        <RegisterForm />
        <Link to='/login' className='text-xs text-blue-600 font-semibold'>I have an account👨‍💻</Link>
        <Toaster />
    </div>
  )
}
