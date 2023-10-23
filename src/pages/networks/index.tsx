import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/input";
import { db } from "../../services/FirebaseConnection";
import { getDoc, setDoc, doc } from "firebase/firestore";

export function Networks() {
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");

  useEffect(() => {
    const docRef = doc(db, "social", "link");
    getDoc(docRef).then((snapshot) => {
      if (snapshot.data() !== undefined) {
        setInstagram(snapshot.data()?.instagram);
        setLinkedin(snapshot.data()?.linkedin);
        setYoutube(snapshot.data()?.youtube);
      }
    });
  }, []);

  function handleCreateSocialMedia(e: FormEvent) {
    e.preventDefault();

    if (linkedin === "" || youtube === "" || instagram === "") {
      alert("preencha todos os campos");
    }

    setDoc(doc(db, "social", "link"), {
      linkedin: linkedin,
      instagram: instagram,
      youtube: youtube,
    })
      .then(() => {
        console.log("cadastrado com sucesso");
        setInstagram("");
        setLinkedin("");
        setYoutube("");
      })
      .catch((error) => {
        console.log("ERRO: " + error);
      });
  }

  return (
    <div className="flex flex-col items-center pb-7 px-2">
      <Header />
      <h1 className="text-white text-2xl font-medium mt-8 mb-2">
        Minhas redes sociais
      </h1>

      <form
        onSubmit={handleCreateSocialMedia}
        className="flex flex-col max-w-xl w-full"
      >
        <label className="text-white mt-2 mb-2 font-medium">Linkendin</label>
        <Input
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          type="url"
          placeholder="digite a url do Linkendin..."
        />
        <label className="text-white mt-2 mb-2 font-medium">Instagram</label>
        <Input
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          type="url"
          placeholder="digite a url do instagram..."
        />
        <label className="text-white mt-2 mb-2 font-medium">Youtube</label>
        <Input
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
          type="url"
          placeholder="digite a url do youtube..."
        />

        <button className="text-white bg-blue-600 h-9 rounded-md font-medium flex items-center justify-center mb-7 mt-2">
          Salvar links
        </button>
      </form>
    </div>
  );
}
