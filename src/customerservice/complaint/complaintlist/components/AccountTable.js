import React from 'react';
import { Spin } from 'antd';
import CommentSlider from '../../../common/components/CommentSlider';
import AccountItem from './AccountItem';
import AccountCharts from './AccountCharts';

export default class AccountTable extends React.Component {
    /**
     * 设置颜色
     * @param <Number> score 当前得分
     * @param <Number> aver 行业片平均分
     * @param <boolean> ifMinus 是否存在负数
     */
    setColor = (score, aver, ifMinus) => {
        score = +score;
        aver = +aver;
        ifMinus = +ifMinus;
        if (score >= aver) {
            return 'score-high';
        }
        if (ifMinus && score < 0) {
            return 'score-negative';
        }
        return 'score-low';
    }

    // 获取等级
    getLevel = (score) => {
        let desc = '';
        if (score < 60) {
            desc = '未及格';
        } else if (score >= 60 && score < 80) {
            desc = '及格';
        } else if (score >= 80 && score < 90) {
            desc = '良好';
        } else {
            desc = '优秀';
        }
        return desc;
    }

    render() {
        const { accountData, accountLoading } = this.props;
        const levelData = accountData.level ? accountData.level : {};
        const scoreData = accountData.score ? accountData.score.service_score_info_d_t_o : {};
        const indexDto = scoreData.index_d_t_o ? scoreData.index_d_t_o : {};
        const averIndexDto = scoreData.industry_avg_index_d_t_o ? scoreData.industry_avg_index_d_t_o : {};
        const averScoreDto = scoreData.industry_avg_score_d_t_o ? scoreData.industry_avg_score_d_t_o : {};
        const scoreDto = scoreData.score_d_t_o ? scoreData.score_d_t_o : {};
        const todayScoreClass = this.setColor(scoreDto.total_score, averScoreDto.total_score);
        const noSaleScoreClass = this.setColor(scoreDto.buy_not_sel_score, averScoreDto.buy_not_sel_score);
        const notReceivedClass = this.setColor(scoreDto.nr_issue_score, averScoreDto.nr_issue_score);
        const notMatchedClass = this.setColor(scoreDto.snad_issue_score, averScoreDto.snad_issue_score);
        const dsrDescriptionClass = this.setColor(scoreDto.dsr_prod_score, averScoreDto.dsr_prod_score);
        const dsrServiceClass = this.setColor(scoreDto.dsr_communicate_score, averScoreDto.dsr_communicate_score, true);
        const dsrLogisticsClass = this.setColor(scoreDto.dsr_logis_score, averScoreDto.dsr_logis_score);
        const monthLevel = this.getLevel(levelData.predict_avg_score);
        return (
            <div className="breadcrumb padding-sm overflow-hidden margin-sm-top">
                {Object.keys(accountData) <= 0
                    ? <p>暂无数据</p>
                    : (
                        <Spin spinning={accountLoading} delay={500}>
                            <div className="account-info-main">
                                <div className="account-tips">平台更新时间：“每日服务分”每日更新；“当月服务等级”下月3号前更新；“下月等级预估”每日更新</div>
                                {/* 当月服务等级 */}
                                <div className="account-behaviour-item">
                                    <div className="add-label">当月服务等级</div>
                                    <div className="add-content">
                                        <div className="month-level-words">
                                            <div className="pull-left">
                                                <span className="month-level-label">
                                                当月等级（{`${levelData.start_date}-${levelData.end_date}`}）
                                                </span>
                                                <span className="yellow-theme">{monthLevel}</span>
                                                <span>（上月每日服务分值：{levelData.avg_score}）</span>
                                            </div>
                                            <div className="next-month-predict pull-left">
                                                <span>下个月等级预估（{`${levelData.predict_start_date}-${levelData.predict_end_date}`}）：</span>
                                                <span className="yellow-theme">{this.getLevel(levelData.avg_score)}</span>
                                            </div>
                                        </div>
                                        <div className="month-level-chart">
                                            <div className={monthLevel === '不及格' ? 'active' : null}>不及格</div>
                                            <div className={monthLevel === '及格' ? 'active' : null}>及格</div>
                                            <div className={monthLevel === '良好' ? 'active' : null}>良好</div>
                                            <div className={monthLevel === '优秀' ? 'active' : null}>优秀</div>
                                        </div>
                                        <p className="gray-text">“当月服务等级”在每个月3号之前平台完成更新</p>
                                    </div>
                                </div>
                                {/* 每日服务分 */}
                                <div className="account-behaviour-item">
                                    <div className="add-label">
                                    每日服务分
                                        <span className="gray-text">（{`${scoreData.stat_start_date}-${scoreData.stat_end_date}，每日更新`}）</span>
                                    </div>
                                    <div className="add-content">
                                        <div className="score-mark">
                                            <div className="high-mark">高于行业平均水平</div>
                                            <div className="low-mark">低于行业平均水平</div>
                                            <div className="negative-mark">得分为负数</div>
                                        </div>
                                        <div className={['daily-slider', `chart-${todayScoreClass}`].join(' ')}>
                                            <CommentSlider
                                                value={scoreDto.total_score}
                                                marks={[-30, 0, 20, 40, 60, 80, 100]}
                                                popover={[`今日服务分 ${scoreDto.total_score}`, `主营二级行业平均分 ${averScoreDto.total_score}`]}
                                                isDailyScore
                                            />
                                        </div>
                                        <div className="calc-expression-container">
                                            <div className="calc-expression">
                                                <div className="calc-expression-total">
                                                    <div className={todayScoreClass}>
                                                        {scoreDto.total_score}
                                                    </div>
                                                    <div>满分100</div>
                                                </div>
                                                <div className="calc-expression-item">
                                                    <div className={noSaleScoreClass}>
                                                        {scoreDto.buy_not_sel_score}
                                                    </div>
                                                    <div>成交不卖率</div>
                                                </div>
                                                <div className="calc-expression-item">
                                                    <div className={notReceivedClass}>
                                                        {scoreDto.nr_issue_score}
                                                    </div>
                                                    <div>未收到货物纠纷提起率</div>
                                                </div>
                                                <div className="calc-expression-item">
                                                    <div className={notMatchedClass}>
                                                        {scoreDto.snad_issue_score}
                                                    </div>
                                                    <div>货不对版纠纷提起率</div>
                                                </div>
                                                <div className="calc-expression-item">
                                                    <div className={dsrDescriptionClass}>
                                                        {scoreDto.dsr_prod_score}
                                                    </div>
                                                    <div>DSR商品描述</div>
                                                </div>
                                                <div className="calc-expression-item">
                                                    <div className={dsrServiceClass}>
                                                        {scoreDto.dsr_communicate_score}
                                                    </div>
                                                    <div>DSR卖家服务</div>
                                                </div>
                                                <div className="calc-expression-dsr calc-expression-item">
                                                    <div className={dsrLogisticsClass}>
                                                        {scoreDto.dsr_logis_score}
                                                    </div>
                                                    <div>DSR物流服务</div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="gray-text">截止 {levelData.end_date}，您30天内的考核订单量为 {levelData.check_m_order_count} ，您的每日服务分考核周期是{levelData.appraise_period}天</p>
                                    </div>
                                </div>
                                {/* 图表列表 */}
                                <AccountItem
                                    {...this.props}
                                    indexDto={indexDto}
                                    averIndexDto={averIndexDto}
                                    averScoreDto={averScoreDto}
                                    scoreDto={scoreDto}
                                    noSaleScoreClass={noSaleScoreClass}
                                    notReceivedClass={notReceivedClass}
                                    notMatchedClass={notMatchedClass}
                                    dsrDescriptionClass={dsrDescriptionClass}
                                    dsrServiceClass={dsrServiceClass}
                                    dsrLogisticsClass={dsrLogisticsClass}
                                />
                                {/* 表现分折线图 */}
                                <AccountCharts
                                    {...this.props}
                                    levelData={levelData}
                                />
                            </div>
                        </Spin>
                    )
                }
            </div>
        );
    }
}
