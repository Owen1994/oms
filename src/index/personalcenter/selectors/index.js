export const parseTempData = (tempData) => {
    if(!tempData|| !tempData.lstDataRuleSys){
        return { lstDataRuleSys: []};
    }
    tempData.lstDataRuleSys = tempData.lstDataRuleSys.map(rule => {
        const entityItem = {sysKey: rule.sysKey, sysName: rule.sysName};
        if(rule.row&&rule.row.subWhereClause){
            entityItem.subWhereClause = rule.row.subWhereClause.map(clause => {
                if(clause.operValuesArr){
                    clause.operValuesArr = clause.operValuesArr
                                                 .filter(item => item)
                                                 .map(operValues => {
                                                    if(typeof operValues !=='object'){
                                                        operValues = JSON.parse(operValues)
                                                    }
                                                    return operValues
                                                 })
                }
                return clause;
            })
        }
        return entityItem;
    })
    return tempData;
}