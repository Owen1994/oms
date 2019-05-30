/**
 *作者: 黄建峰
 */
import Loadable from 'react-loadable';
import LoadingComponent from '@/common/components/loading';


/**
 *作者: 黄建峰
 *功能描述: 刊登模块
 *参数说明:
 *时间: 2018/4/27
 */
const CustomerserviceComponent = Loadable({
    loader: () => import('../components/App'),
    loading: LoadingComponent,
});


const routers = [
    {
        path: '/customerservice/',
        component: CustomerserviceComponent,
    },
];


export default routers;
