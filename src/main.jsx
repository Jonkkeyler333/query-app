import ReactDOM from 'react-dom/client'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { NofificationContextProvider } from './NotificationContext'
import App from './App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <NofificationContextProvider>
    <QueryClientProvider client={queryClient}>
    <App/> 
    </QueryClientProvider>
  </NofificationContextProvider>
)