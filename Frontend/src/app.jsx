import { Route,Routes,BrowserRouter } from 'react-router-dom';
import Login from './pages/login/login.jsx';

import {createRoot} from "react-dom/client";

const App = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login/>} />
            </Routes>
        </BrowserRouter>

    )
};







const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />)