import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <div className='bg-blue-400 text-5xl text-center'>CUBE</div>
        {/* <Routes></Routes> */}
      </BrowserRouter>
    </>
  );
}

export default App;
