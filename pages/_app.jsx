import { useFoucFix } from "@/hooks/useFoucFix";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
  useFoucFix();
  return <Component {...pageProps} />;
}
