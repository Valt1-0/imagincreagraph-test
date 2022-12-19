import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { getCsrfToken } from "next-auth/react";
import whisky from "../public/assets/img/whisky2.jpg";
import { useState } from "react";
import router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function Index() {
  const { data: session } = useSession();

  const { status } = useSession();
  
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  // window is available, we can access localStorage
  //     localStorage.setItem("session-info", JSON.stringify(session));
  //   }
  // }, [session]);

  console.log(session, status);

  const [test, setTest] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const signInUser = async (e) => {
    e.preventDefault();

    let options = { redirect: false, username, email, test, password };
    const res = await signIn("credentials", options);
    setMessage(null);
    if (!res.error) {
      toast.success("Connexion en cours", { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, progress: undefined, theme: "light" });
      setTimeout(() => {
        router.push("/home");
      }, 3000);
    }
    if (
      res.error == "Veuillez saisir un mot de passe" ||
      "Vous n'êtes pas encore inscrit"
    ) {
      toast.info(res.error, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, progress: undefined, theme: "light" });
    }
    if (res.error == "Mot de passe incorrect") {
      toast.error(res.error, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, progress: undefined, theme: "light" });
    }
  };

  return (
    <div className="">
      <Head>
        <title>Skywhireeb - Connexion</title>
      </Head>

      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
            <a
              href="#"
              className="bg-black text-white font-bold text-xl p-4 rounded "
            >
              <em>Skywhireeb</em>
            </a>
          </div>

          <div className="flex flex-col md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-underline text-3xl">Bienvenue</p>
            <form
              method="post"
              action="/api/auth/callback/credentials"
              className="flex flex-col items-center pt-3 md:pt-1"
            >
              {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}
              <div className="flex flex-col pt-4">
                <label htmlFor="email" className="text-lg">
                  Adresse mail
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-d border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:bg-white focus:border-black focus:shadow-outline"
                />
              </div>

              <div className="flex flex-col pt-4">
                <label htmlFor="password" className="text-lg">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="***********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:bg-white focus:border-black focus:shadow-outline"
                />
              </div>
              <p style={{ color: "red" }}>{message}</p>

              <input
                type="submit"
                value="Connexion"
                onClick={(e) => signInUser(e)}
                className="bg-black text-white w-2/4 font-bold text-lg hover:bg-gray-700 p-2 mt-8"
              />
            </form>
            <div className="text-center pt-12 pb-12">
              <p>
                Vous ne possédez pas de compte ?{" "}
                <Link href="/register" className="underline font-semibold">
                  <em>Inscrivez-vous </em>
                </Link>
              </p>
            </div>
          </div>
        </div>
        <ToastContainer
          limit={0}
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          pauseOnFocusLoss={false}
          closeOnClick
          rtl={false}
          theme="light"
        />

        <div className="w-1/2 shadow-3xl">
          <Image
            className="object-cover w-full h-screen hidden md:block"
            src={whisky}
            alt="Picture of the author"
            width={500}
            height={500}
            priority="false"
          />
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       csrfToken: await getCsrfToken(context),
//     },
//   };
// }

export default Index;
