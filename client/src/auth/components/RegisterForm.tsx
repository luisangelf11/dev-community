import { ChangeEvent, FormEvent, useState } from "react";
import { styleForm, styleInput, styleLabel, styleTitle } from "../../config/styleForms";
import { IFormRegister } from "../../interfaces/auth";

export default function RegisterForm() {
  const initialState: IFormRegister = {
    username: "",
    password: "",
    lastname: "",
    name: "",
  };
  const [form, setForm] = useState<IFormRegister>(initialState);
  //change event
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  //Submit event
  const handleSubmit=(event: FormEvent)=>{
    event.preventDefault();
  }
  return (
    <form className={styleForm} onSubmit={handleSubmit}>
      <h2 className={styleTitle}>Register</h2>
      <label htmlFor="name" className={styleLabel}>
        Name:
      </label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Insert your name"
        className={styleInput}
        value={form.name}
        onChange={handleChange}
      />
      <label htmlFor="lastname" className={styleLabel}>
        Lastname:
      </label>
      <input
        type="text"
        name="lastname"
        id="lastname"
        className={styleInput}
        placeholder="Insert your lastname"
        value={form.lastname}
        onChange={handleChange}
      />
      <label htmlFor="username" className={styleLabel}>
        Username:
      </label>
      <input
        type="text"
        name="username"
        id="username"
        className={styleInput}
        placeholder="Insert your username"
        value={form.username}
        onChange={handleChange}
      />
      <label htmlFor="password" className={styleLabel}>
        Password:
      </label>
      <input
        type="password"
        name="password"
        className={styleInput}
        id="password"
        placeholder="Insert your password"
        value={form.password}
        onChange={handleChange}
      />
      <button className="text-white p-1 w-[60%] bg-blue-800 transition-all hover:bg-blue-700 rounded-sm text-xs uppercase font-semibold">
        Sign Up
      </button>
    </form>
  );
}
