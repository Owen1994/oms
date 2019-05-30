/**
 *作者: 黄建峰
 */
import Loadable from 'react-loadable';
import LoadingComponent from '@/common/components/loading';


/**
 *作者: 黄建峰
 *功能描述: 合规模块
 *参数说明:
 *时间: 2019/2/12
 */
const Compliance = Loadable({
    loader: () => import('../components/App'),
    loading: LoadingComponent,
});


const routers = [
    {
        path: '/compliance/',
        component: Compliance
    },
];


export default routers;
