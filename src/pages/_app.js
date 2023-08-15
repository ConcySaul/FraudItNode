import { QueryClient, QueryClientProvider } from 'react-query';
import './reset.css'

const queryClient = new QueryClient();

 export default function MyApp({ Component, pageProps }) {
  <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
  </QueryClientProvider>
}