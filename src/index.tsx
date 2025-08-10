import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
//contexts
import { DataProvider } from './contexts/DataContext.tsx'
//App
import App from './App.tsx'
import { DateProvider } from './contexts/DateContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <DateProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </DateProvider>
    </BrowserRouter>
  </StrictMode>,
)
