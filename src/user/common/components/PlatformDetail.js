import React from 'react';

const PlatformDetail = ({ operValuesArr=[] }) => (
    operValuesArr ? operValuesArr.map((_v, _i) => (
        <div className="pt" key={_i}>
            <div className="ptTitle">
                {_v.platformName ? `${_v.platformName} :` : ''}
            </div>
            <div className="ptText">
                {
                    _v.lstShop ? _v.lstShop.map((m, n) => (
                        <div key={n}>
                            <div className="subAccount">
                                        ( <a>{m.shopName}</a> ){m.lstSite ? m.lstSite.map((o, p) => {
                                    const siteArr = [];
                                    siteArr.push(`"${o.siteName}"`);
                                    return (
                                        siteArr.join('')
                                    );
                                }) : '"所有站点"'}
                            </div>
                            {n == _v.lstShop.length - 1 ? '' : <span className="margin-ss-left margin-ss-right v-line">|</span>}
                        </div>
                    )) : '所有账号'
                }
            </div>
        </div>
    )) : null
);

export default PlatformDetail;
