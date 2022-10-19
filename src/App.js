import Home from './Home';
import Enemy from './Enemy';
import Drop from './Drop';
import Skill from './Skill';
import About from './About';
import Forge from './Forge';
import Sheet from './Sheet';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import { useState } from 'react';


function App() {
  const [navBarWidth, setNavBarWidth] = useState(3.5);
  const [appMenuDeg, setAppMenuDeg] = useState(45);
  const [appMenuTranslate, setAppMenuTranslate] = useState(150);
  const clickAppMenu = ()=>{
    (appMenuDeg === 45) ? setAppMenuDeg(225): setAppMenuDeg(45);
    (appMenuTranslate === 150) ? setAppMenuTranslate(0) : setAppMenuTranslate(150);
  };

  return (
    <BrowserRouter>
        <div className='app-menu' onClick={clickAppMenu} style={{transform:'rotate('+appMenuDeg+'deg)'}}></div>
        <div>
          <nav className='app-menu-child'  style={{transform:'translateX('+appMenuTranslate+'%)'}}>
            <Link to="/"><i className='iconfont icon-home1'/></Link>
            <Link to="/enemy"><i className='iconfont icon-iconfontgongyichongwu'/></Link>
            <Link to="/drop"><i className='iconfont icon-material'/></Link>
            <Link to="/skill"><i className='iconfont icon-book'/></Link>
            <Link to="/forge"><i className='iconfont icon-about'/></Link>
            <Link to="/sheet"><i className='iconfont icon-about'/></Link>

            <Link to="/about"><i className='iconfont icon-about'/></Link>
          </nav>
        </div>

        <div className='side-menu' style={{width:navBarWidth + 'rem'}} onMouseOver={()=>setNavBarWidth(12)} onMouseOut={()=>setNavBarWidth(3.5)}>
          <nav className='header'>
            <Link to="/"><i className='iconfont icon-home1'/><span>首頁</span></Link>
            <Link to="/enemy"><i className='iconfont icon-iconfontgongyichongwu'/><span>怪物</span></Link>
            <Link to="/drop"><i className='iconfont icon-material'/><span>素材</span></Link>
            <Link to="/skill"><i className='iconfont icon-book'/><span>技能</span></Link>
            <Link to="/forge"><i className='iconfont icon-about'/><span>測名</span></Link>
            <Link to="/sheet"><i className='iconfont icon-about'/><span>測名表</span></Link>

            <Link to="/about"><i className='iconfont icon-about'/><span>關於</span></Link>
          </nav>
        </div>

        <div className='main-content'>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/enemy" element={<Enemy />}/>
            <Route path="/drop" element={<Drop />}/>
            <Route path="/skill" element={<Skill />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/forge" element={<Forge />}/>
            <Route path="/sheet" element={<Sheet />}/>
            <Route path="*" element={<p>找不到頁面</p>}/>
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
