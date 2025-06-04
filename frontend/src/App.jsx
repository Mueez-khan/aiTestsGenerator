import { Routes, Route } from "react-router-dom"
import NavBar from "./pages/NavBar"
import ProtectedRoutes from "./pages/ProtectedRoutes"
import Login from "./pages/Login"
import Register from "./pages/Register"
import PromptPage from "./PromptPage"
import AllGeneratedCode from "./pages/AllGeneratedCode"
import FavoriteImages from "./pages/FavoriteImages"
import SingleStory from "./pages/SingleStory"

function App() {






  return (
    <div className="min-h-screen bg-gray-700 flex flex-col">
     {/* <div className={token ? "mb-6 block" : "hidden"}> */}
     <NavBar />
     {/* </div> */}
      <main className="flex-grow flex flex-col justify-center items-center p-4">
        <Routes>
          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoutes />}>
            <Route index element={<PromptPage />} />
            <Route path="generatedTests" element={<AllGeneratedCode />} />
            <Route path="favoriteTests" element={<FavoriteImages />} />
            <Route path="singlePost/:id" element={<SingleStory />} />
          </Route>

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 404 Route (Optional) */}
          <Route 
            path="*" 
            element={
              <div className="text-center text-white">
                <h2 className="text-2xl">404 - Page Not Found</h2>
                <p>The page you are looking for does not exist.</p>
              </div>
            } 
          />
        </Routes>
      </main>
    </div>
  )
}

export default App