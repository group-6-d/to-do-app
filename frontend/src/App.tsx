import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TasksProvider from './providers/TasksProvider/TasksProvider';
import UserProvider from './providers/UserProvider/UserProvider';
import { ThemeContextProvider } from './context/ThemeContext.tsx';
import SelectedCategoriesProvider from './context/SelectedCategoriesContext.tsx';
import { CategoriesProvider } from './context/CategoryContext.tsx';

import ProtectedRoute from './routeProtection/ProtectedRoute.tsx';
import UnprotectedRoute from './routeProtection/UnprotectedRoute.tsx';

import StartPage from './pages/StartPage/StartPage.tsx';
import MainPage from './pages/MainPage/MainPage.tsx';
import PageContainer from './components/PageContainer/PageContainer.tsx';
import Login from './pages/Login';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage/ErrorPage.tsx';
import ProfileRead from './pages/ProfileRead/index.ts';
import ProfileEdit from './pages/ProfileEdit/ProfileEdit.tsx';

function App() {
  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <UserProvider>
          <CategoriesProvider>
            <TasksProvider>
              <SelectedCategoriesProvider>
                <Routes>
                  <Route path='/' element={<StartPage />} />
                  <Route
                    path='/register'
                    element={<UnprotectedRoute element={<Register />} />}
                  />
                  <Route
                    path='/login'
                    element={<UnprotectedRoute element={<Login />} />}
                  />
                  <Route element={<PageContainer />}>
                    <Route
                      path='/dashboard'
                      element={<ProtectedRoute element={<MainPage />} />}
                    />
                    <Route
                      path='/profile'
                      element={<ProtectedRoute element={<ProfileRead />} />}
                    />
                    <Route
                      path='/profile/edit'
                      element={<ProtectedRoute element={<ProfileEdit />} />}
                    />
                  </Route>

                  <Route path='*' element={<ErrorPage />} />
                </Routes>
              </SelectedCategoriesProvider>
            </TasksProvider>
          </CategoriesProvider>
        </UserProvider>
      </BrowserRouter>
    </ThemeContextProvider>
  );
}

export default App;
