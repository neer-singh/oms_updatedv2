import MasterData from '../images/masterdata.png';
import Dealer from '../images/dealer.png';
import Distributor from '../images/distributor.png';
import Inventory from '../images/inventory.png';
import User from '../images/user.png';
import Offers from '../images/offers.png';
import Target from '../images/target.png';
import InventoryVision from '../images/inventoryVision.png';
import Item from '../images/item.png';
import Tax from '../images/tax.png';
import DistributorMargin from '../images/distributor_margin.png';
import DealerMargin from '../images/dealer_margin.png';
import Order from '../images/order.png';

const data = [
  {
    title: 'Master Data',
    image: MasterData,
    link: '/master_data',
  },
  {
    title: 'Dealer',
    image: Dealer,
    link: 'dealer',
  },
  {
    title: 'Distributor',
    image: Distributor,
    link: 'distributor',
  },
  {
    title: 'inventory',
    image: Inventory,
    link: 'inventory',
  },
  {
    title: 'User',
    image: User,
    link: 'user',
  },
  {
    title: 'Offers',
    image: Offers,
    link: 'offers',
  },
  {
    title: 'Target',
    image: Target,
    link: 'target',
  },
  {
    title: 'Inventory Vision',
    image: InventoryVision,
    link: 'inventoryVision',
  },
  {
    title: 'Distributor Order',
    image: Order,
    link: 'disrtibutorOrder',
  },
];
const masterData = [
  { title: 'Item', image: Item, link: 'Item' },
  { title: 'Tax', image: Tax, link: 'Tax' },
  {
    title: 'Distributor Margin',
    image: DistributorMargin,
    link: 'DistributorMargin',
  },
  { title: 'Dealer Margin', image: DealerMargin, link: 'DealerMargin' },
];

export { data, masterData };
