import React from 'react'
import {message,Modal,Steps,Spin, Form,Select,Icon,Button,Tooltip} from "antd"
import {
    debounce,
    downloadUrl
} from "../../../../util/baseTool"
import { UPLOAD_URL } from '../../../../constants/Api'
import { fetchUpload } from '../../../../util/fetch'
const Step = Steps.Step;
const FormItem = Form.Item;
const Option = Select.Option;

class ImportCom extends React.Component {
    state = {
        current:0,
        loading:false,
        file:null,
        platform:[],
        site:[],
        accounts:[]
    }
    steps = [{
        title: '数据准备',
    }, {
        title: '操作结果',
    }];
    modalCancel = ()=>{
        this.resetCom()
        this.props.modalCancel()
    }
    changeNextCom = ()=>{
        this.setState({current:1})
    }
    resetCom = ()=>{
        this.props.form.setFieldsValue({platformCode:undefined})
        this.clearSiteFn()
        this.clearAccountsFn()
        this.setState({current:0,file:null})
    }
    testIsSearchSite = debounce((value)=>{
        var {changeSearchOptionAction} = this.props;
        var params = {
            modelName:"siteList",
            platformCode:value
        }
        return this.props.searchSite(params)
                .then(result=>{
                    if(result&&result.length){
                        this.setState({site:result})
                        this.siteOption.disabled = false ;
                        this.clearAccountsFn()
                    }else {
                        this.accountsOption.disabled = false ;
                        this.clearSiteFn()
                    }
                })
        
    },500)
    testIsSearchAccounts = debounce((value)=>{
        this.accountsOption.disabled = false ;
        this.setState({accounts:[]})
    },500)
    limitSelectedAccounts = {
        value:null,
        length:5,
        lock:true,
    }
    // sitePattern  false : 单选  true 多选
    // platformPattern  false : 单选  true 多选
    // accountsPattern  false : 单选  true 多选
    getOption =  (params)=>{
        var {sitePattern} = params
        var { platform,site,accounts} = this.state;
        platform && platform.length ? (this.platformOption.list = platform) :(this.platformOption.list = [])
        site && site.length ? (this.siteOption.list = site) :(this.siteOption.list = [])
        accounts && accounts.length ? (this.accountsOption.list = accounts) :(this.accountsOption.list = [])
        sitePattern ? (this.siteOption.multiple = 1) : (this.siteOption.multiple = 0)
        return [
            this.platformOption,
            this.siteOption,
            this.accountsOption
        ]
    }
    // 清除站点信息
    clearSiteFn = ()=>{
        this.siteOption.disabled = true;
        this.props.form.setFieldsValue({siteCode:undefined})
        this.setState({site:[]})
    }
    // 清除账号信息
    clearAccountsFn = ()=>{
        this.accountsOption.disabled = true
        this.props.form.setFieldsValue({accounts:undefined})
        this.setState({accounts:[]})
    }
    
    platformOption = {
        v:"platformCode",
        n:"	平台",
        onChange:(value)=>{
            if(value){
                this.testIsSearchSite(value)
            }
            this.clearSiteFn()
            this.clearAccountsFn()
        },
        onSelect:(value)=>{
            this.testIsSearchSite(value)
        },
        onFocus:()=>{
            var { platform} = this.state;
            if(platform && platform.length) return ;
            this.platformOption.search()
        },
        search:debounce(v=>{
            let {changeSearchOptionAction,searchPlatform} = this.props
            var params = {
                modelName:"platformList",
                name:v
            }
            return  searchPlatform(params)
                    .then(result=>{
                        this.clearSiteFn()
                        this.clearAccountsFn()
                        if(result&&result.length){
                            this.setState({platform:result})
                        }
                    })
        },500),
        getOption:(value)=>{
            return value.map((v,k)=>{
                return <Option value={v.code} key={v.code}>{v.name}</Option>
            })
        }
    }

    accountsOption = {
        v:"accounts",
        n:"销售账号",
        // multiple:true,
        disabled:true,
        selectedMount:null,
        // onChange:(value)=>{
        //     if(value && (value.length>this.limitSelectedAccounts.length)){
        //         let index = value.indexOf(this.limitSelectedAccounts.value)
        //         value.splice(index,1)
        //         return message.warning("销售账号最多可以选择5个")
        //     }
        // },
        // onSelect:(value)=>{
        //     this.limitSelectedAccounts.value = value
        // },
        onFocus:()=>{
            var { platform,site,accounts} = this.state
            if(accounts && accounts.length) return ;
            this.accountsOption.search()
        },
        search:debounce((v)=>{
            let {searchAccount,changeSearchOptionAction} = this.props
            var platformCode =this.props.form.getFieldValue("platformCode")
            var siteCode =this.props.form.getFieldValue("siteCode")
            if(!platformCode ) return ;
            var params = {
                modelName:"accountList",
                pageData:20,
                pageNumber:1,
                platformCode,
                account:v
            }
            if(siteCode){
                if(Array.isArray(siteCode) && siteCode.length){
                    params.country = siteCode.join(",")
                }else {
                    params.country = siteCode
                }
            }
            return searchAccount(params)
                .then(result=>{
                    if(result && result.length){
                        this.setState({accounts:result})
                    }else {
                        this.setState({accounts:[]})
                    }
                })
        },500),
        getOption:(value)=>{
            return value.map((v,k)=>{
                return <Option value={v.account} key={v.account}>{v.account}</Option>
            })
        }
    }

    
    siteOption = {
        v:"siteCode",
        n:"站点",
        disabled:true,
        onFocus:()=>{
            var { platform,site,accounts} = this.state
            if(site && site.length) return ;
            this.siteOption.search()
        },
        onChange:(value)=>{
            if(value){
                this.testIsSearchAccounts(value)
            }
            this.clearAccountsFn()
        },
        onSelect:(value)=>{
            this.testIsSearchAccounts(value)
        },
        search:debounce((v)=>{
            let {searchSite,changeSearchOptionAction} = this.props
            var platformCode =this.props.form.getFieldValue("platformCode")
            if(!platformCode) return ;
            var params = {
                pageData:20,
                pageNumber:1,
                modelName:"siteList",
                platformCode:platformCode,
                name:v
            }
            return searchSite(params)
            .then(result=>{
                this.clearAccountsFn()
                if(result && result.length){
                    this.setState({site:result})
                }else {
                    this.setState({site:[]})
                }
            })
        },500),
        getOption:(value)=>{
            return value.map((v,k)=>{
                return <Option value={v.code} key={v.code}>{v.code}</Option>
            })
        }
    }
    getFile = (e)=>{
        var { imgInfoAction } =this.props
        var files = e.target.files
        var file = files[0]
        var {type,size,name} = file;
        let testArr = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ,"application/vnd.ms-excel"];
        if(!testArr.includes(type) && !/^.+\.(xls|xlsx)$/.test(name)) {
            return message.warning("文件格式只支持 XLS,XLSX")
        }
        if(/\s/.test(name))  return message.warning("文件名不能包含空格")
        this.setState({
            file
        })
        e.target.value = "";
    }
    // 文件上传
    fileUpload = ()=>{
        var {file} = this.state
        if(!file) return message.warning("请选择文件");
        return fetchUpload(UPLOAD_URL, [file])
        .then(result=>{
            if(result.state == "000001" && result.data && result.data.length){
                var data = result.data[0]
                return {
                    fileName:data.filename,
                    filePath:data.path
                }
            }else {
                message.error(result.msg)
            }

        })

    }
    limitImport = true
    // 下一步
    next = ()=>{
        if(!this.limitImport) return ;
        var {site,file} = this.state;
        var {getFieldsValue} = this.props.form;
        var {importFileAction,getList} = this.props
        var data = getFieldsValue()
        // var arr = ["siteCode","accounts","platformCode"]
        if(!data.platformCode) return  message.warning("平台参数错误")
        if(data.siteCode && Array.isArray(data.siteCode)){
            data.siteCode = data.siteCode.join(",")
        }
        if((site.length && data.siteCode) ||(!site.length && !data.siteCode) ){
            if(!data.accounts){
                return  message.warning("账号参数错误")
            }
        }else {
            return  message.warning("站点参数错误")
        }
        if(!file) return message.warning("请选择文件");
        data.accounts = [data.accounts]
        this.limitImport = false
        if(data.platformCode === "LAZADA"){
            data.listingSites = data.siteCode
            data.siteCode = "MY"
        }
        this.fileUpload()
        .then(result=>{
            let params = {
                ...data,
                ...result
            }
            return importFileAction(params)
                    .then(result=>{
                        this.limitImport = true
                        if(result){
                            message.success(result.msg)
                            getList()
                            this.changeNextCom()
                        }
                    })
        })
        .catch(err=>{
            this.limitImport = true
        })
    }
    downLoadTemplate = {
        SHOPEE: downloadUrl('/download/publish/ShopeeTemplate.xlsx'),
        eBay: downloadUrl('/download/publish/ebay-batch-temp-1.xlsx'),
        LAZADA: downloadUrl('/download/publish/lazadaImportTemp1.xlsx'),
        JOOM:"",
        WALMART:"",
        Aliexpress: downloadUrl('/download/publish/smt_template.xlsx'),
        AMAZON: downloadUrl('/download/publish/amazon_template.xlsx'),
    }
    render(){
        const {visible} = this.props;
        const modalCancel = this.modalCancel;
        const { current,file,loading } = this.state;
        var {getFieldDecorator,getFieldValue} = this.props.form;
        const {steps} = this
        var platformCode = getFieldValue("platformCode")
        const option = this.getOption({
            sitePattern:platformCode === "LAZADA"
        })
        let tempLate = platformCode? this.downLoadTemplate[platformCode] : ""
        var date = (
            <div className="publish-batch-advanced margin-sm-top">
                {
                    option.map((value,k)=>{
                        let {n,v,getOption,search,disabled,placeholder,list,onSelect,onChange,multiple,onFocus} = value
                        return   (<div key={k} className="tweb-choice-select tweb-list-filter-item">
                            <div className="tweb-choice-select-n tweb-list-filter-item-title top7" >
                                <span><span className="red">* </span>{n}</span>：
                            </div>
                            <FormItem>
                                {getFieldDecorator(v)(
                                    <Select 
                                    showSearch
                                    onFocus = {onFocus || this.empty} 
                                    onChange ={onChange || this.empty}
                                    disabled={!!disabled || false}
                                    onSelect={onSelect || this.empty}
                                    mode={multiple?"multiple":null}
                                    placeholder={placeholder||"请输入搜索条件"}
                                    defaultActiveFirstOption={false}
                                    showArrow = {false}
                                    filterOption = {false}
                                    allowClear
                                    onSearch={search || this.empty} 
                                    notFoundContent={null}
                                    className="tweb-choice-select-v">
                                        {getOption(list)}
                                    </Select>
                                )}
                            </FormItem>
                        </div>)
                    })
                }
            </div>
        )
        var importComponent = (<div>
            <div>
                {date}
                <div className="tweb-choice-select tweb-list-filter-item">
                    <div className="tweb-choice-select-n tweb-list-filter-item-title" >
                    </div>
                    {
                        tempLate?
                        (
                        <a href={tempLate}>
                            <Icon type="download" />
                            下载导入模板
                        </a>)
                        :
                        (
                            <Tooltip placement="bottom" title={"请先选择站点或当前站点未上传模板"}>
                                <span>
                                    <Icon type="download" />
                                    下载导入模板
                                </span>
                            </Tooltip>
                        )
                    }
                </div>
                <div className="publish-batch-upload-com">
                    <div className="publish-batch-upload-com-btn">
                        <span><Icon type="plus"/>选择文件</span>
                        <input onChange={this.getFile} type="file"/>
                    </div>
                    {
                        file?<a href="javascript:;" className="margin-ss-top breakwrod" style={{display:"inline-block"}}>{file.name}</a>:null
                    }
                </div>
            </div>
            <div className="margin-ss-top clear">
                <Button onClick={this.next} className="pull-right">
                    <span>下一步</span>
                </Button>
                <Button onClick={modalCancel} className="pull-right margin-sm-right">
                    <span>取消</span>
                </Button>
            </div>
        </div>)
        let completed = (<div>
               <div className="publish-batch-import-result">
                    <Icon type="check-circle" className="publish-batch-import-success"/>
                    <p>操作成功</p>
                    <div className="text-center margin-ms-top">
                        <Button type="primary"  size="small" onClick={this.resetCom}  className="margin-sm-right">
                            <span>再次导入</span>
                        </Button>
                        <Button size="small" onClick={modalCancel}>
                            <span>关闭</span>
                        </Button>
                    </div>
               </div> 
            </div>)
        return (
            <Modal 
                title="导入"
                width={527}
                centered
                visible={visible}
                footer={null}
                maskClosable={false}
                onCancel={modalCancel}
                className="publish-batch-import">
                <Spin spinning={loading} delay={500} tip="Loading...">
                    <div>
                        <Steps style={{paddingLeft:"45px"}} current={current} labelPlacement={"vertical"}>
                            {steps.map(item => <Step key={item.title} title={item.title} />)}
                        </Steps>
                        {
                            current == 0 ?
                            importComponent :
                            completed
                        }
                    </div>
                </Spin>
            </Modal>
        )
    }
}

export default Form.create()(ImportCom)