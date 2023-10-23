import { useState, useEffect } from "react";
import { Social } from "../../components/Social";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { db } from "../../services/FirebaseConnection";
import {
  getDocs,
  getDoc,
  query,
  orderBy,
  collection,
  doc,
} from "firebase/firestore";

interface linkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SocialLinksProps {
  facebook: string;
  youtube: string;
  instagram: string;
}

export function Home() {
  const [links, setLinks] = useState<linkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinksProps>();
  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    getDocs(queryRef).then((snapshot) => {
      const lista = [] as linkProps[];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data()?.name,
          url: doc.data()?.url,
          bg: doc.data()?.bg,
          color: doc.data()?.color,
        });
      });
      setLinks(lista);
    });
  }, []);

  useEffect(() => {
    function loadSociaMidia() {
      const docRef = doc(db, "social", "link");

      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setSocialLinks({
            facebook: snapshot.data()?.facebook,
            instagram: snapshot.data()?.instagram,
            youtube: snapshot.data()?.youtube,
          });
        }
      });
    }

    loadSociaMidia();
  }, []);

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className=" md:text-4xl text-white text-3xl font-bold mt-20 ">
        TJ DEV
      </h1>
      <span className="mb-5 mt-3 text-gray-50">Acesse meus links</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map((link) => (
          <section
            style={{ backgroundColor: link.bg }}
            key={link.id}
            className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer"
          >
            <a href={link.url} target="_blank">
              <p className="text-base md:text-lg" style={{ color: link.color }}>
                {link.name}
              </p>
            </a>
          </section>
        ))}

        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className="flex justify-center gap-3 my-4">
            <Social url="https://github.com/tacianojr07">
              <FaGithub size={35} color="#FFF" />
            </Social>
            <Social url="https://www.instagram.com/tacianojr_07/">
              <FaInstagram size={35} color="#FFF" />
            </Social>
            <Social url="https://www.linkedin.com/in/taciano-siqueira-262a95204/">
              <FaLinkedin size={35} color="#FFF" />
            </Social>
          </footer>
        )}
      </main>
    </div>
  );
}
