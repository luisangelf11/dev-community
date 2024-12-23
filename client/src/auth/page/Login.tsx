import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { Toaster } from "react-hot-toast";

export default function Login() {
  return (
    <section className="w-full h-screen flex flex-col gap-2 justify-center items-center">
      <LoginForm />
      <Link to='/register' className='text-xs text-blue-600 font-semibold'>Do you don't have an account? Register here🤩</Link>
      <Toaster />
    </section>
  )
}
