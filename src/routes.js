import logo from './logo.svg';
import './App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Index from './pages/Index';
import GamePlay from './pages/GamePlay'
import GameOver from './pages/GameOver'
import GameWin from './pages/GameWin'
import { spring,AnimatedSwitch } from 'react-router-transition';
import {  } from 'react-router-dom';

function mapStyles(styles) {
  return {
    transform: `translateY(${styles.transform}%)`,
    opacity: styles.opacity
    
  };
}

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 22,
  });
}


const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 1.2,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8),
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};

function Routes() {
  return (
    <Router>
      <AnimatedSwitch
        // atEnter={bounceTransition.atEnter}
        // atLeave={bounceTransition.atLeave}
        // atActive={bounceTransition.atActive}
        atEnter={{ opacity: 0,transform:0 }}
        atLeave={{ opacity: 0,transform:-100}}
        atActive={{ opacity: 1, transform:0 }}
        mapStyles={mapStyles}
        className="route-wrapper"
      >
         {/*  */}
          <Route path="/gamewin" component={GameWin}/>
          <Route path="/gameover" component={GameOver}/>
          <Route path="/gameplay" component={GamePlay}/>
          <Route path="/" component={Index}/>
      </AnimatedSwitch>
    </Router>
  );
}

export default Routes;