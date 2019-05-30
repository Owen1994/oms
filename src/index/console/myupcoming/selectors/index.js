import { createSelector } from 'reselect';

import { timestampFromat } from '../../../../util/baseTool';

const getTasks = state => state.tasks;

const getOrders = state => state.orders;

/**
 * 待核查任务列表数据转换
 */
export const parseTasks = createSelector(
    [getTasks],
    (tasks) => {
        tasks.list = tasks.list.map((task) => {
            if (task.arrivalTime) {
                task.arrivalTime = timestampFromat(Number.parseInt(task.arrivalTime, 10), 0);
            } else {
                task.arrivalTime = '--';
            }
            return task;
        });
        return tasks;
    },
);


/**
 * 待核查任务列表数据转换
 */
export const parseOrders = createSelector(
    [getOrders],
    (orders) => {
        orders.list = orders.list.map((order) => {
            if (order.arrivalTime) {
                order.arrivalTime = timestampFromat(Number.parseInt(order.arrivalTime, 10), 0);
            } else {
                order.arrivalTime = '--';
            }
            return order;
        });
        return orders;
    },
);
