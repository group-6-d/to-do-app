import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TasksProvider from './providers/TasksProvider/TasksProvider';

import MainPage from './pages/MainPage/MainPage.tsx';
import PageContainer from './components/PageContainer/PageContainer.tsx';
import Login from './pages/Login';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage/ErrorPage.tsx';
import ProfileRead from './pages/ProfileRead/index.ts';
import ProfileEdit from './pages/ProfileEdit/ProfileEdit.tsx';

function App() {
  return (
    <BrowserRouter>
      <TasksProvider>
        <Routes>
          <Route path='/' element={<PageContainer />}>
            <Route index element={<MainPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<ProfileRead />} />
            <Route path='/profile/edit' element={<ProfileEdit />} />
            <Route path='*' element={<ErrorPage />} />
          </Route>
        </Routes>
      </TasksProvider>
    </BrowserRouter>
  );
}

export default App;
