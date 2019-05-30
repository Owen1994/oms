export const parseTempData = (tempData) => {
    if (!tempData || !tempData.lstDataRuleSys) {
        return { lstDataRuleSys: [] };
    }
    tempData.lstDataRuleSys = tempData.lstDataRuleSys.map((rule) => {
        if (rule.row && rule.row.subWhereClause) {
            rule.row.subWhereClause = rule.row.subWhereClause.map((clause) => {
                if (clause.operValues && typeof clause.operValues !== 'object') {
                    clause.operValues = JSON.parse(clause.operValues);
                }
                if (clause.operValuesArr) {
                    clause.operValuesArr = clause.operValuesArr
                        .filter(item => item)
                        .map((operValues) => {
                            if (typeof operValues !== 'object') {
                                operValues = JSON.parse(operValues);
                            }
                            return operValues;
                        });
                }
                return clause;
            });
        }
        return rule;
    });
    return tempData;
};
