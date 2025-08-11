import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
//contexts
import { DataProvider } from './contexts/DataContext.tsx'
//App
import App from './App.tsx'
import { DateProvider } from './contexts/DateContext.tsx'
import { ComputedDataProvider } from './contexts/ComputedDataContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <DateProvider>
        <DataProvider>
          <ComputedDataProvider>
            <App />
          </ComputedDataProvider>
        </DataProvider>
      </DateProvider>
    </BrowserRouter>
  </StrictMode>,
)
