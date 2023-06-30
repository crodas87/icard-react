import routesAdmin from "./routes.admin";
import routesClient from "./routes.client";
import {Error404} from '../Pages';
import {BasicLayout} from '../layout'
const routes = [...routesAdmin, ...routesClient,{
    path:"*",
    layout: BasicLayout,
    component: Error404,
},
];

export default routes;