import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainSection from './components/MainSection/MainSection.tsx';
import PageContainer from './components/PageContainer/PageContainer.tsx';
import Login from './components/Authentication/Login.tsx';
import Register from './components/Authentication/Register.tsx';
import ErrorPage from './components/ErrorPage/ErrorPage.tsx';
import ProfileRead from './components/ProfileRead/ProfileRead.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PageContainer />}>
          <Route index element={<MainSection />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          {/* // TODO: inside ProfileRead add ProfileRead - to get url: '/profile/edit' */}
          <Route path='/profile' element={<ProfileRead />} />

          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
