import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";
import { getCsrfToken } from "next-auth/react"
import router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../components/Navbar";

function Home() {

  return (
    <div className="">

      <Head>
        <title>Skywhireeb - Accueil</title>
      </Head>

      <Navbar/>

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
        </div>
        <ToastContainer limit={0} position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop pauseOnFocusLoss={false} closeOnClick rtl={false} theme="light"/>

      </div>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       csrfToken: await getCsrfToken(context),
//     },
//   }
// }

export default Home;
