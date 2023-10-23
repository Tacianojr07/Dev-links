import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { auth } from "../../services/FirebaseConnection";
import { signOut } from "firebase/auth";

async function handleLogout() {
  await signOut(auth);
}

export function Header() {
  return (
    <header className="w-full max-w-2xl  mt-7 px-1">
      <nav className="w-full h-12 bg-white flex items-center justify-between rounded-md px-3">
        <div className="flex gap-4 font-medium">
          <Link to="/">Home</Link>
          <Link to="/admin">Links</Link>
          <Link to="/admin/networks">Redes Sociais</Link>
        </div>

        <button onClick={handleLogout}>
          <BiLogOut size={28} color="#db2629" />
        </button>
      </nav>
    </header>
  );
}
