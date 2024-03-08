import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  // Assuming this is where you determine if the user is authenticated
  let data = localStorage.getItem('token')
  // let token = JSON.stringify(data)
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          {data ? (
            <>
              <Route path="*" element={<DefaultLayout />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/404" element={<Page404 />} />
              <Route path="/500" element={<Page500 />} />
            </>
          )}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
