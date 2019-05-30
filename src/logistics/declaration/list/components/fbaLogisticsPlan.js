/**
 * 作者: 陈林
 * 描述: 获取FBA物流计划单弹窗内容
 * 时间: 2018/6/27 0027 下午 2:59
 **/
import React from 'react'
import {timestampFromat} from "../../../../util/baseTool";
import {
    Table,
    Spin,
    message
} from 'antd'


export default class FbaLogisticsPlan extends React.Component{
    state = {
        fbaOreder:{},
        loading: true,
    }

    componentDidMount(){
        this.props.getFbaList()
    }

    /**
     * 作者: 陈林
     * 描述: 获取FBA物流计划单(已生成过的物流计划单数据)
     * 时间: 2018/6/26 0026 上午 10:16
     **/
    unGeneratedArrayColumns = [
        {
        title: '物流计划单号',
        dataIndex: 'orderId',
        width: 150,
    }, {
        title: '物流状态',
        dataIndex: 'logstaus',
        width: 80,
    }, {
        title: '目的国',
        dataIndex: 'destCountry',
        width: 80,
    },{
        title: '物流渠道',
        dataIndex: 'logChannels',
        width: 110,
    },{
        title: '创建时间',
        dataIndex: 'createTime',
        width: 180,
        render: text => timestampFromat(text, 2)
    }];

    /**
     * 作者: 陈林
     * 描述: 已经生成过的物流计划单数据
     * 时间: 2018/6/26 0026 下午 4:59
     **/
    generatedArrayColumns = [
        {
        title: '物流计划单号',
        dataIndex: 'orderId',
        width: 130,
    }, {
        title: '物流状态',
        dataIndex: 'logstaus',
        width: 75,
    }, {
        title: '目的国',
        dataIndex: 'destCountry',
        width: 75,
        },{
        title: '物流渠道',
        dataIndex: 'logChannels',
        width: 110,
    },{
        title: '创建时间',
        dataIndex: 'createTime',
        width: 145,
        render: text => timestampFromat(text, 2)
    },{
        title: '生成报关单时间',
        dataIndex: 'createOrderTime',
        width: 145,
        render: text => timestampFromat(text, 2)
    }];

    /**
     * 作者: pzt
     * 描述: 给表格数据添加key值
     * 时间: 2018/7/7 14:21
     * @params <Array> 后台返回的数据，数组格式
     **/
    addKey = (arr) => {
        if(arr instanceof Array){
            if(arr && arr.length > 0){
                arr = arr.map(v=>{
                    if(v.id){
                        v.key = v.id;
                    }else{
                        v.key = v.orderId;
                    }
                    return v
                })
            }
        }else{
            arr = [];
            message.error("后台返回的数据格式有误！")
        }
        return arr;
    }


    render(){
      const fbaOreder = this.props.fbaOrder || {};
      const generatedArrayData = fbaOreder.generatedArray || [];
      const unGeneratedArrayData = fbaOreder.unGeneratedArray || [];
        //FBA物流计划单
        let clrowSelection1 = {
            selectedRowKeys: this.props.clrowSelection1,
            onChange: (selectedRowKeys) => {
                this.props.getFbaId('unGeneratedArray',selectedRowKeys,'clrowSelection1')
            }
        };
        let  clrowSelection2 = {
            selectedRowKeys: this.props.clrowSelection2,
            onChange: (selectedRowKeys) => {
                this.props.getFbaId('generatedArray',selectedRowKeys,'clrowSelection2')
            }
        };
      return(
          <div className="lgt-fba_logistics_plan">
              <Spin spinning={this.props.fbaLoading}>
                  <p className="margin-ss-bottom">请选择要生成报关单的物流计划单数据：</p>
                  <div className="table-header-scroll">
                      <Table
                          columns={this.unGeneratedArrayColumns}
                          dataSource={this.addKey(unGeneratedArrayData)}
                          rowSelection={clrowSelection2}
                          pagination={false}
                          bordered={true}
                          size="small"
                          scroll={{x: 731,y: 210}}
                      />
                  </div>
                  <p className="margin-ss-bottom margin-ss-top">
                      以下为已经生成过的物流计划单数据，勾选将覆盖原数据
                  </p>
                  <div className="table-header-scroll">
                      <Table
                          columns={this.generatedArrayColumns}
                          dataSource={this.addKey(generatedArrayData)}
                          rowSelection={clrowSelection1}
                          pagination={false}
                          bordered={true}
                          size="small"
                          scroll={{x: 731,y: 210}}
                      />
                  </div>
              </Spin>
          </div>
      )
          }
}