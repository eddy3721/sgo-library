import Home from './Home';
import Enemy from './Enemy';
import Drop from './Drop';
import Skill from './Skill';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [navBarWidth, setNavBarWidth] = useState(3.5);

  return (
    <BrowserRouter>
        <div className='side-menu' style={{width:navBarWidth + 'rem'}} onMouseOver={()=>setNavBarWidth(12)} onMouseOut={()=>setNavBarWidth(3.5)}>
          <nav className='header'>
            <Link to="/"><i className='iconfont icon-home1'/><span>首頁</span></Link>
            <Link to="/enemy"><i className='iconfont icon-iconfontgongyichongwu'/><span>怪物</span></Link>
            <Link to="/drop"><i className='iconfont icon-material'/><span>素材</span></Link>
            <Link to="/skill"><i className='iconfont icon-book'/><span>技能</span></Link>
          </nav>
        </div>
        
        <div className='main-content'>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/enemy" element={<Enemy />}/>
            <Route path="/drop" element={<Drop />}/>
            <Route path="/skill" element={<Skill />}/>
            <Route path="*" element={<p>找不到頁面</p>}/>
          </Routes>
        </div>
        
    </BrowserRouter>
  );
}

export default App;
