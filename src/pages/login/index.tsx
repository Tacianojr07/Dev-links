import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";
import { FormEvent, useState } from "react";
import { auth } from "../../services/FirebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email === "" || password === "") {
      alert("preencha todos os campos!");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/admin", { replace: true });
        console.log("logado com sucesso");
      })
      .catch((error) => {
        console.log("ERRO:");
        console.log(error);
      });
  }

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <Link to="/">
        <h1 className="text-5xl font-bold text-white mt-11 mb-7">
          dev
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Link
          </span>
        </h1>
      </Link>

      <form
        onSubmit={handleLogin}
        className=" flex flex-col w-full max-w-xl px-2"
      >
        <Input
          type="email"
          placeholder="Digite seu email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white  text-lg font-medium rounded border-none h-9"
        >
          Acessar
        </button>
      </form>
    </div>
  );
}
