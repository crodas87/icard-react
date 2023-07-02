import {ClientLayout,BasicLayout} from '../layout';
import {SelectTable,Categories,Products,Cart,OrderHistory} from '../Pages/Client';


const routesClient = [
    {
        path: "/",
        layout: BasicLayout,
        component: SelectTable,
        exact:true
        
    },
    {
        path: "/client/:tableNumber",
        layout: ClientLayout,
        component: Categories,
    },
    {
        path: "/client/:tableNumber/cart",
        layout: ClientLayout,
        component: Cart,
    },
    {
        path: "/client/:tableNumber/orders",
        layout: ClientLayout,
        component: OrderHistory,
    },
    {
        path: "/client/:tableNumber/:idCategory",
        layout: ClientLayout,
        component: Products,
    },


];

export default routesClient;