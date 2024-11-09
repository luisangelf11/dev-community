import { ChangeEvent, FormEvent, useState } from "react";
import { authLogin } from "../../services/auth";
import { IFormAuth } from "../../interfaces/auth";
import { styleForm, styleInput, styleLabel, styleTitle } from "../../config/styleForms";

export default function LoginForm() {
  const initialState: IFormAuth = {
    username: "",
    password: "",
  };
  const [form, setForm] = useState<IFormAuth>(initialState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async(event: FormEvent) => {
    event.preventDefault();
    try {
       const {data} = await authLogin(form)
       console.log(data)
       setForm(initialState)
    } catch (error) {
      if(error instanceof Error)
      console.error(error)
    }
  };
 

  return (
    <form
      onSubmit={handleSubmit}
      className={styleForm}
    >
      <h2 className={styleTitle}>Login</h2>
      <label htmlFor="username" className={styleLabel}>
        Username:
      </label>
      <input
        type="text"
        id="username"
        name="username"
        value={form.username}
        placeholder="Insert your username"
        onChange={handleChange}
        className={styleInput}
      />
      <label htmlFor="password" className={styleLabel}>
        Password:
      </label>
      <input
        type="password"
        id="password"
        name="password"
        value={form.password}
        placeholder="Insert your password"
        onChange={handleChange}
        className={styleInput}
      />
      <button className="text-white p-1 w-[60%] bg-green-800 transition-all hover:bg-green-700 rounded-sm text-xs uppercase font-semibold">
        Sign in
      </button>
    </form>
  );
}
