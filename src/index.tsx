import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
//contexts
import { DataProvider } from './contexts/DataContext.tsx'
//App
import App from './App.tsx'
import { DateProvider } from './contexts/DateContext.tsx'
import { ComputedDataProvider } from './contexts/ComputedDataContext.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { CurrencyProvider } from './contexts/CurrencyContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DateProvider>
          <DataProvider>
            <CurrencyProvider>
              <ComputedDataProvider>
                <App />
              </ComputedDataProvider>
            </CurrencyProvider>
          </DataProvider>
        </DateProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
