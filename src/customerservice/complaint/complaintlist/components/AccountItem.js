import React from 'react';
import CommentSlider from '../../../common/components/CommentSlider';

export default class AccountItem extends React.Component {
    render() {
        const {
            indexDto,
            averIndexDto,
            averScoreDto,
            scoreDto,
            noSaleScoreClass,
            notReceivedClass,
            notMatchedClass,
            dsrDescriptionClass,
            dsrServiceClass,
            dsrLogisticsClass,
        } = this.props;
        return (
            <div>
                {/* 成交不卖率 */}
                <div className="account-behaviour-item">
                    <div className="add-label">成交不卖率(满分10分)</div>
                    <div className="add-content">
                        <p className="gray-text">考核期内，您的店铺成交不卖率是{indexDto.buy_not_sel_rate}，行业平均成交不卖率是{averIndexDto.buy_not_sel_rate}</p>
                        <div className={['account-chart', `chart-${noSaleScoreClass}`].join(' ')}>
                            <div className="account-chart-left">
                                <div>{scoreDto.buy_not_sel_score}分</div>
                                <div className="gray-text">成交不卖率：{indexDto.buy_not_sel_rate}</div>
                            </div>
                            <div className="account-chart-right">
                                <CommentSlider
                                    value={scoreDto.buy_not_sel_score}
                                    marks={[0, 10]}
                                    popover={['我的店铺', `服务分 ${scoreDto.buy_not_sel_score}`]}
                                    aver={averScoreDto.buy_not_sel_score}
                                    averPopover={['行业平均', `服务分 ${averScoreDto.buy_not_sel_score}`]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* 未收到货物纠纷提起率 */}
                <div className="account-behaviour-item">
                    <div className="add-label">未收到货物纠纷提起率(满分15分)</div>
                    <div className="add-content">
                        <p className="gray-text">考核期内，免责后的未收到货物纠纷提起率是{indexDto.nr_disclaimer_issue_rate}，行业平均未收到货物纠纷提起率是{averIndexDto.nr_disclaimer_issue_rate}</p>
                        <div className={['account-chart', `chart-${notReceivedClass}`].join(' ')}>
                            <div className="account-chart-left">
                                <div>{scoreDto.nr_issue_score}分</div>
                                <div className="gray-text">未收到货物纠纷提起率：{indexDto.nr_disclaimer_issue_rate}</div>
                            </div>
                            <div className="account-chart-right">
                                <CommentSlider
                                    value={scoreDto.nr_issue_score}
                                    marks={[0, 15]}
                                    popover={['我的店铺', `服务分 ${scoreDto.nr_issue_score}`]}
                                    aver={averScoreDto.nr_issue_score}
                                    averPopover={['行业平均', `服务分 ${averScoreDto.nr_issue_score}`]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* 货不对版纠纷提起率 */}
                <div className="account-behaviour-item">
                    <div className="add-label">货不对版纠纷提起率(满分15分)</div>
                    <div className="add-content">
                        <p className="gray-text">考核期内，免责后的货不对版纠纷提起率是{indexDto.snad_disclaimer_issue_rate}，行业平均货不对版纠纷提起率是{averIndexDto.snad_disclaimer_issue_rate}</p>
                        <div className={['account-chart', `chart-${notMatchedClass}`].join(' ')}>
                            <div className="account-chart-left">
                                <div>{scoreDto.snad_issue_score}分</div>
                                <div className="gray-text">货不对版纠纷提起率：{indexDto.snad_disclaimer_issue_rate}</div>
                            </div>
                            <div className="account-chart-right">
                                <CommentSlider
                                    value={scoreDto.snad_issue_score}
                                    marks={[0, 15]}
                                    popover={['我的店铺', `服务分 ${scoreDto.snad_issue_score}`]}
                                    aver={averScoreDto.snad_issue_score}
                                    averPopover={['行业平均', `服务分 ${averScoreDto.snad_issue_score}`]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* DSR商品描述 */}
                <div className="account-behaviour-item">
                    <div className="add-label">DSR商品描述(满分30分)</div>
                    <div className="add-content">
                        <p className="gray-text">
                            <span>考核期内，您的店铺DSR商品描述是{indexDto.dsr_prod_score}，行业平均DSR商品描述是{averIndexDto.dsr_prod_score}</span>
                            {/* <span className='low-score' onClick={this.handleViewLowScore}>点击查看中低分商品</span> */}
                        </p>
                        <div className={['account-chart', `chart-${dsrDescriptionClass}`].join(' ')}>
                            <div className="account-chart-left">
                                <div>{scoreDto.dsr_prod_score}分</div>
                                <div className="gray-text">DSR商品描述：{indexDto.dsr_prod_score}</div>
                            </div>
                            <div className="account-chart-right">
                                <CommentSlider
                                    value={scoreDto.dsr_prod_score}
                                    marks={[0, 30]}
                                    popover={['我的店铺', `服务分 ${scoreDto.dsr_prod_score}`]}
                                    aver={averScoreDto.dsr_prod_score}
                                    averPopover={['行业平均', `服务分 ${averScoreDto.dsr_prod_score}`]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* DSR卖家服务 */}
                <div className="account-behaviour-item">
                    <div className="add-label">DSR卖家服务(满分15分)</div>
                    <div className="add-content">
                        <p className="gray-text">考核期内，您的店铺DSR卖家服务是{indexDto.dsr_communicate_score}，行业平均DSR卖家服务是{averIndexDto.dsr_communicate_score}</p>
                        <div className={['account-chart', `chart-${dsrServiceClass}`].join(' ')}>
                            <div className="account-chart-left">
                                <div>{scoreDto.dsr_communicate_score}分</div>
                                <div className="gray-text">DSR卖家服务：{indexDto.dsr_communicate_score}</div>
                            </div>
                            <div className="account-chart-right">
                                <CommentSlider
                                    value={scoreDto.dsr_communicate_score}
                                    marks={[-30, 15]}
                                    popover={['我的店铺', `服务分 ${scoreDto.dsr_communicate_score}`]}
                                    aver={averScoreDto.dsr_communicate_score}
                                    averPopover={['行业平均', `服务分 ${averScoreDto.dsr_communicate_score}`]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* DSR物流服务 */}
                <div className="account-behaviour-item">
                    <div className="add-label">DSR物流服务(满分15分)</div>
                    <div className="add-content">
                        <p className="gray-text">考核期内，您的店铺DSR物流服务是{indexDto.dsr_logis_score_aft_disclaim}，行业平均DSR物流服务是{averIndexDto.dsr_logis_score_aft_disclaim}</p>
                        <div className={['account-chart', `chart-${dsrLogisticsClass}`].join(' ')}>
                            <div className="account-chart-left">
                                <div>{scoreDto.dsr_logis_score}分</div>
                                <div className="gray-text">DSR物流服务：{indexDto.dsr_logis_score_aft_disclaim}</div>
                            </div>
                            <div className="account-chart-right">
                                <CommentSlider
                                    value={scoreDto.dsr_logis_score}
                                    marks={[0, 15]}
                                    popover={['我的店铺', `服务分 ${scoreDto.dsr_logis_score}`]}
                                    aver={averScoreDto.dsr_logis_score}
                                    averPopover={['行业平均', `服务分 ${averScoreDto.dsr_logis_score}`]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
