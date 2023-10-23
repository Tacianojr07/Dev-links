import { FormEvent, useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/input";
import { FiTrash } from "react-icons/fi";
import { db } from "../../services/FirebaseConnection";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";

interface linksProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

export function Admin() {
  const [input, setInput] = useState("");
  const [url, setUrl] = useState("");
  const [textColorInput, setTextColorInput] = useState("#f1f1f1");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212");

  const [links, setLinks] = useState<linksProps[]>([]);

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      const lista = [] as linksProps[];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        });
      });

      setLinks(lista);
    });

    return () => {
      unsub();
    };
  }, []);

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (input === "" || url === "") {
      alert("preencha todos os campos");
      return;
    }

    addDoc(collection(db, "links"), {
      name: input,
      url: url,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date(),
    })
      .then(() => {
        setInput("");
        setUrl("");
        console.log("Cadastrado com sucesso");
      })
      .catch((error) => {
        console.log("ERRO AO CADASTRAR NO BANCO " + error);
      });
  }

  async function handleDelete(id: string) {
    const docRef = doc(db, "links", id);
    await deleteDoc(docRef);
  }

  return (
    <div className="flex flex-col items-center min-h-screen pb-7 px-2">
      <Header />

      <form
        onSubmit={handleRegister}
        className="flex flex-col mt-8 mb-3 w-full max-w-xl"
      >
        <label className="text-white font-medium mt-2 mb-2">Nome do link</label>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite o nome do link"
        />

        <label className="text-white font-medium mt-2 mb-2">Nome da url</label>
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Digite a url"
        />

        <section className="flex my-2 gap-4">
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2">
              Cor do link
            </label>
            <input
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
              type="color"
            />
          </div>

          <div>
            <label className="text-white font-medium mt-2 mb-2">
              Fundo do link
            </label>
            <input
              value={backgroundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
              type="color"
            />
          </div>
        </section>
        {input !== "" && (
          <div className="flex flex-col  justify-start items-center mb-7 p-1 border border-gray-500 rounded">
            <label className="text-white font-medium mt-2 mb-2">
              veja com está ficando
            </label>

            <article
              className="flex flex-col items-center justify-between w-11/12 max-w-lg bg-zinc-900 rounded py-3 px-1"
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor: backgroundColorInput,
              }}
            >
              <p className="font-medium" style={{ color: textColorInput }}>
                {input}
              </p>
            </article>
          </div>
        )}

        <button
          type="submit"
          className=" mb-7 flex justify-center items-center h-9 bg-blue-600 gap-5 text-white font-medium text-center rounded-md"
        >
          Cadastrar
        </button>
      </form>

      <h2 className="font-bold text-white text-3xl mb-4">Meus links</h2>
      {links.map((link) => (
        <article
          key={link.id}
          style={{ backgroundColor: link.bg, color: link.color }}
          className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
        >
          <p>{link.name}</p>
          <div>
            <button
              onClick={() => handleDelete(link.id)}
              className="border border-dashed p-1"
            >
              <FiTrash size={18} color="#121212" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
