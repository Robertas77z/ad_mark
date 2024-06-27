
import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import RegisterComponent from './components/RegisterComponent'
import LoginComponent from './components/LoginComponent'
import MainPage from './components/MainPage'
import "bootstrap/dist/css/bootstrap.min.css"
import AdminPage from './components/AdminPage'
import CategoryManagement from './components/CategoryManagement'
import CardManagement from './components/CardManagment'
import { isUserLoggedIn } from './services/AuthService'

function App() {
  function AuthenticatedRoute({ children }) {
    const isAuth = isUserLoggedIn();

    if (isAuth) {
      return children;
    }
    return <Navigate to="/" />;
  }

  return (
    <>
    <BrowserRouter>
    <Routes>
      {/* http://localhost:3000 */}
       <Route path='/' element = {<MainPage/>}></Route>
      {/* http://localhost:3000/register */}
      <Route path='/register' element = {<RegisterComponent/>}></Route>
      {/* http://localhost:3000/login */}
      <Route path='/login' element = {<LoginComponent/>}></Route>
      {/* http://localhost:3000/main */}
      <Route path='/main' element = {<MainPage/>}></Route>
       {/* http://localhost:3000/admin */}
      <Route path='/admin' 
      element={
        <AuthenticatedRoute>
      <AdminPage />
      </AuthenticatedRoute>
      } />
       {/* http://localhost:3000/CategoryManagement*/}
      <Route path="/CategoryManagement" 
      element={
        <AuthenticatedRoute>
      <CategoryManagement/>
      </AuthenticatedRoute>
      } />
       {/* http://localhost:3000/BookManagement*/}
      <Route path="/BookManagement" 
      element={
      <AuthenticatedRoute>
      <CardManagement/>
      </AuthenticatedRoute>
      } />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
