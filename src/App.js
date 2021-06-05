import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home/Home';
import SideNav from './containers/SideNav/SideNav';
import MasterData from './Pages/Masterdata/MasterData';
import Dealers from './Pages/Dealers/Dealers';
import Distributor from './Pages/Distributor/Ditributor';
import Tax from './Pages/Tax/Tax';
import DistributorOrder from './Pages/Distributor Order/DistributorOrder';
import OrderDetails from './Pages/OrderDetails/OrderDetails';

import DealerMargin from './Pages/DealerMargin/DealerMargin';
import Item from './Pages/Item/Item';
import Profile from './Pages/Dealers/Profile';
import InventoryVisibility from './Pages/InventoryVisibility/InventoryVisibility';

function App() {
  return (
    <Router>
      <>
        <div className='App'>
          <SideNav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/master_data' component={MasterData} />
            <Route exact path='/dealer' component={Dealers} />
            <Route path={`/dealer/:id`} component={Profile} />
            <Route exact path='/distributor' component={Distributor} />
            <Route exact path='/Tax' component={Tax} />
            <Route
              exact
              path='/disrtibutorOrder'
              component={DistributorOrder}
            />
            <Route path={`/orderDetails/:id`} component={OrderDetails} />
            <Route exact path='/DealerMargin' component={DealerMargin} />
            <Route path='/Item' component={Item} />
            <Route path='/inventoryVision' component={InventoryVisibility} />
          </Switch>
        </div>
      </>
    </Router>
  );
}

export default App;
