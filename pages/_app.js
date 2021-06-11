import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'slate-simple-editor/dist/index.css';

import "@/styles/main.scss";
import { UserProvider } from '@auth0/nextjs-auth0';

function MyApp({ Component, pageProps }) {
  return <UserProvider><Component {...pageProps} /></UserProvider>
}

export default MyApp
