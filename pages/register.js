import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import whisky from "../public/assets/img/whisky2.jpg";
import { useState } from "react";
import router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const signUpUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    let data = await res.json();
    if (data.message == "Cette adresse mail est déjà utilisée") {
      toast.info(data.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, progress: undefined, theme: "light",});
    }
    if (data.message == "Votre compte à bien été créé") {
      let options = { redirect: false, username, email, password };
      toast.success(data.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, progress: undefined, theme: "light",});
      const res = await signIn("credentials", options);
      setTimeout(() => {
        router.push('/');
      }, 5000);
    }
  };

  return (
    <div className="">
      <Head>
        <title>Skywhireeb - Inscription</title>
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
              className="flex flex-col items-center pt-3 md:pt-1"
              onSubmit="event.preventDefault();"
            >
              <div className="flex flex-col pt-4">
                <label htmlFor="username" className="text-lg">
                  Nom d&apos;utilisateur
                </label>
                <input
                  type="username"
                  id="username"
                  placeholder="John Doe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="shadow appearance-d border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:bg-white focus:border-black focus:shadow-outline"
                />
              </div>

              <div className="flex flex-col pt-4">
                <label htmlFor="email" className="text-lg">
                  Adresse mail
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="john.doe@gmail.com"
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
                  placeholder="***************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:bg-white focus:border-black focus:shadow-outline"
                />
              </div>
              <br />
              <p style={{ color: "red" }}>{message}</p>

              <input
                type="submit"
                value="S'inscrire"
                onClick={(e) => signUpUser(e)}
                className="bg-black text-white w-2/4 font-bold text-lg hover:bg-gray-700 p-2 mt-8"
              />
            </form>
            <div className="text-center pt-12 pb-12">
              <p>
                Vous possédez déjà un compte ?{" "}
                <Link href="/" className="underline font-semibold">
                  <br />
                  <em>Se connecter</em>
                </Link>
              </p>
            </div>
          </div>
        </div>
        <ToastContainer limit={0} position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop pauseOnFocusLoss={false} closeOnClick rtl={false} theme="light"/>

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

export default Register;
