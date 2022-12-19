import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
          <Component {...pageProps} />
    </SessionProvider>
  )
}

// Get average runtime of successful runs in seconds


// function Auth({ children }) {
//   // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
//   const { status } = useSession({ required: true })

//   if (status === "loading") {
//     return <div>Loading...</div>
//   }

//   return children
// }