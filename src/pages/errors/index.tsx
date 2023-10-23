import { Link } from "react-router-dom";

export function ErrorPage() {
  return (
    <div className=" flex flex-col w-full h-screen items-center justify-center text-white">
      <h1 className="font-bold text-6xl mb-2">404</h1>
      <h1 className="font-bold text-4xl mb-4">página não encontrada</h1>
      <p className="italic text-xl mb-5">
        você tentou acessa uma página que não existe
      </p>

      <Link className="bg-gray-500/20 py-1 px-4 rounded-md" to={"/"}>
        voltar a página home
      </Link>
    </div>
  );
}
