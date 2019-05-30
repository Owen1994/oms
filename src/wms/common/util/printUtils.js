import * as QRCode from 'qrcode.react';
import React from 'react';
import SimpleBarcode from '../components/SimpleBarcode';

export const printSkuStyle = {
    wmsPrintSkuBody: {
        width: '100mm',
    },
    wmsPrintSkuRow: {
        pageBreakAfter: 'always',
        height: '21mm',
        display: 'flex',
    },
    wmsPrintSkuStart: { // 每行第一个sku
        width: '33.3mm',
        height: '21mm',
        paddingLeft: '1mm',
        paddingRight: '1mm',
        paddingTop: '1mm',
        border: '#e9e9e9 solid 0.3mm',
        WebkitBoxSizing: 'border-box',
        boxSizing: 'border-box',
    },
    wmsPrintSkuCenter: { // 每行第二个sku
        width: '33.3mm',
        height: '21mm',
        paddingLeft: '1.5mm',
        paddingRight: '1mm',
        paddingTop: '1mm',
        border: '#e9e9e9 solid 0.3mm',
        WebkitBoxSizing: 'border-box',
        boxSizing: 'border-box',
    },
    wmsPrintSkuEnd: { // 每行第三个sku
        width: '33.3mm',
        height: '21mm',
        paddingLeft: '2.5mm',
        paddingTop: '1mm',
        border: '#e9e9e9 solid 0.3mm',
        WebkitBoxSizing: 'border-box',
        boxSizing: 'border-box',
    },

    label1: {
        marginLeft: '0.8mm',
        fontSize: '0.8em',
        color: '#333333',
        wordBreak: 'break-all',
        lineHeight: 1,
    },

    label2: {
        marginLeft: '0.8mm',
        fontSize: '0.7em',
        color: '#333333',
        wordBreak: 'break-all',
        lineHeight: 1,
    },
    // label3: {
    //     marginTop: '1mm',
    //     fontSize: '0.6em',
    //     color: '#333333',
    //     textAlign: 'left',
    //     wordBreak: 'break-all',
    //     lineHeight: 1,
    // },
    skuLabelBold: {
        marginTop: '1mm',
        fontSize: '1em',
        color: '#333333',
        textAlign: 'left',
        wordBreak: 'break-all',
        lineHeight: 1,
        fontWeight: 'bold',
        wordWrap: 'break-word',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: '2',
        WebkitBoxOrient: 'vertical',
    },
};
// 生成sku标签
export const createSkuLabel = (values, number) => {
    if (values.remarks) {
        return (
            <div>
                {values.remarks.map((t, i) => <div key={i.toString()} style={printSkuStyle.label1}>{t}</div>)}
            </div>
        );
    }
    const skuSpilt = values.sku.split('_');
    if (skuSpilt.length < 3) {
        return null;
    }
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <QRCode
                    renderAs="svg"
                    size={40}
                    value={values.sku || ''}
                />
                <div style={{ textAlign: 'left' }}>
                    <div style={printSkuStyle.label2}>{skuSpilt[1]}</div>
                    <div style={printSkuStyle.label2}> {skuSpilt[2]}</div>
                    <div style={printSkuStyle.label1}>{number}</div>
                </div>
            </div>
            <div style={printSkuStyle.skuLabelBold}>{skuSpilt[0]}</div>
        </div>
    );
};

// 生成sku打印内容
export const createSkuPrintContent = (printInfoArr = [], number) => (
    <div>
        {
            printInfoArr.map((item, index) => (
                <div key={index.toString()}>
                    <div
                        style={printSkuStyle.wmsPrintSkuRow}
                        key={`${index.toString()}`}
                    >
                        {item.start ? (
                            <div style={printSkuStyle.wmsPrintSkuStart}>
                                {createSkuLabel(item.start, number)}
                            </div>
                        ) : null}
                        {item.center ? (
                            <div style={printSkuStyle.wmsPrintSkuCenter}>
                                {createSkuLabel(item.center, number)}
                            </div>
                        ) : null}
                        {item.end ? (
                            <div style={printSkuStyle.wmsPrintSkuEnd}>
                                {createSkuLabel(item.end, number)}
                            </div>
                        ) : null}
                    </div>
                </div>
            ))
        }
    </div>
);

export const print100x100LabelStyle = {
    wmsPrintBox: {
        padding: '2.5mm',
        border: '#000 solid 1mm',
        height: '98mm',
        width: '98mm',
    },
    title: {
        color: '#333333',
        fontSize: '2.5mm',
        fontWeight: 'bold',
        textAlign: 'center',
        borderBottom: '#EAE9E9 solid 0.5mm',
        paddingBottom: '1.5mm',
        marginBottom: '1.5mm',
    },
    contentItem: {
        display: 'flex',
    },
    textLabel: {
        width: '33%',
        color: '#333333',
        fontSize: '3.5mm',
        textAlign: 'right',
        lineHeight: '6.5mm',
        paddingRight: '1mm',
    },
    textLabelBold: {
        width: '33%',
        color: '#333333',
        fontSize: '3.5mm',
        textAlign: 'right',
        lineHeight: '9.5mm',
        paddingRight: '1mm',
    },
    textContent: {
        width: '66%',
        color: '#333333',
        fontSize: '4mm',
        textAlign: 'left',
        lineHeight: '6.5mm',
        paddingLeft: '1mm',
        wordWrap: 'break-word',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: '2',
        WebkitBoxOrient: 'vertical',
    },
    textContentBold: {// 加粗的
        width: '66%',
        color: '#333333',
        fontSize: '9mm',
        fontWeight: 'bold',
        textAlign: 'left',
        lineHeight: '9.5mm',
        paddingLeft: '1mm',
        wordWrap: 'break-word',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: '2',
        WebkitBoxOrient: 'vertical',
    },
};
export const printBoxLabelStyle = {
    wmsPrintBox: {
        padding: '0 2.5mm',
        border: '#000 solid 1mm',
        height: '98mm',
        width: '98mm',
    },
    title: {
        color: '#333333',
        fontSize: '2.5mm',
        fontWeight: 'bold',
        textAlign: 'center',
        borderBottom: '#EAE9E9 solid 0.5mm',
        paddingBottom: '1.5mm',
        marginBottom: '1.5mm',
    },
    contentItem: {
        display: 'flex',
    },
    contentItem_50: {
        display: 'flex',
        width: '50%',
    },
    textLabel: {
        width: '25%',
        color: '#333333',
        fontSize: '3mm',
        textAlign: 'right',
        lineHeight: '5.5mm',
        paddingRight: '1mm',
    },
    textContent: {
        width: '75%',
        color: '#333333',
        fontSize: '4mm',
        textAlign: 'left',
        lineHeight: '5.5mm',
        paddingLeft: '1mm',
        wordWrap: 'break-word',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: '2',
        WebkitBoxOrient: 'vertical',
    },
    textLabelBold: {
        width: '25%',
        color: '#333333',
        fontSize: '3mm',
        textAlign: 'right',
        lineHeight: '9.5mm',
        paddingRight: '1mm',
    },
    textContentBold: {// 加粗的
        width: '75%',
        color: '#333333',
        fontSize: '9mm',
        fontWeight: 'bold',
        textAlign: 'left',
        lineHeight: '9.5mm',
        paddingLeft: '1mm',
        wordWrap: 'break-word',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: '2',
        WebkitBoxOrient: 'vertical',
    },
};

/**
 * 打印箱唛打印条目样式
 */
export const createBoxLabel = (values, number) => (
    <div
        style={printBoxLabelStyle.wmsPrintBox}
        key={number.toString()}
    >
        <div
            style={{
                ...printBoxLabelStyle.textLabel,
                textAlign: 'right',
                width: '100%',
                height: '5.5mm',
            }}
        >
            {values.cardNumber ? `卡板号:${values.cardNumber}` : null}
        </div>
        <div style={printBoxLabelStyle.title}>
            <SimpleBarcode
                label={number}
                height="45"
                width="1.5"
                displayValue={false}
                labelStyle={{ fontSize: '4mm', marginTop: '1mm' }}
            />
        </div>
        <div>
            {/* <div style={printBoxLabelStyle.contentItem}> */}
            {/* <div style={printBoxLabelStyle.textLabel}>Part Number:</div> */}
            {/* <div style={printBoxLabelStyle.textContent}>{values.partNumber}</div> */}
            {/* </div> */}
            <div style={printBoxLabelStyle.contentItem}>
                <div style={printBoxLabelStyle.textLabelBold}>SKU:</div>
                <div style={printBoxLabelStyle.textContentBold}>{values.sku}</div>
            </div>
            <div style={printBoxLabelStyle.contentItem}>
                <div style={printBoxLabelStyle.textLabel}>产品名称:</div>
                <div style={printBoxLabelStyle.textContent}>{values.cnName}</div>
            </div>
            <div style={printBoxLabelStyle.contentItem}>
                <div style={printBoxLabelStyle.textLabelBold}>合格量:</div>
                <div style={printBoxLabelStyle.textContentBold}>{values.number}</div>
            </div>
            <div style={printBoxLabelStyle.contentItem}>
                <div style={printBoxLabelStyle.contentItem_50}>
                    <div style={{ ...printBoxLabelStyle.textLabel, width: '50%' }}>采购员:</div>
                    <div style={{ ...printBoxLabelStyle.textContent, width: '50%' }}>{values.buyer}</div>
                </div>
                <div style={printBoxLabelStyle.contentItem_50}>
                    <div style={{ ...printBoxLabelStyle.textLabel, width: '50%' }}>质检员:</div>
                    <div style={{ ...printBoxLabelStyle.textContent, width: '50%' }}>{values.qualityInspector}</div>
                </div>
            </div>
            <div style={printBoxLabelStyle.contentItem}>
                <div style={printBoxLabelStyle.contentItem_50}>
                    <div style={{ ...printBoxLabelStyle.textLabel, width: '50%' }}>对图员:</div>
                    <div style={{ ...printBoxLabelStyle.textContent, width: '50%' }}>{values.checkPictureStaff}</div>
                </div>
                <div style={printBoxLabelStyle.contentItem_50}>
                    <div style={{ ...printBoxLabelStyle.textLabel, width: '50%' }}>操作编码:</div>
                    <div style={{ ...printBoxLabelStyle.textContent, width: '50%' }}>{values.operationDate}</div>
                </div>
            </div>
            <div style={printBoxLabelStyle.contentItem}>
                <div style={printBoxLabelStyle.textLabelBold}>推荐储位:</div>
                <div style={printBoxLabelStyle.textContentBold}>{values.recommendStorage}</div>
            </div>
        </div>
    </div>
);

// 异常标签
export const printErrorLabel = (values, index) => (
    <div
        key={index.toString()}
        style={{ ...print100x100LabelStyle.wmsPrintBox, borderColor: values.type === '1' ? '#FF0000' : '#419D19' }}
    >
        <div style={print100x100LabelStyle.title}>
            <div style={{ fontSize: '5mm' }}>{values.type === '1' ? '不良品标签' : '多收合格标签'}</div>
            {values.errorCode ? (
                <SimpleBarcode
                    label={values.errorCode}
                    height="45"
                    width="1.5"
                    displayValue={false}
                    labelStyle={{ fontSize: '4mm', marginTop: '1mm' }}
                />
            ) : null}
        </div>
        <div>
            <div style={print100x100LabelStyle.contentItem}>
                <div style={print100x100LabelStyle.textLabel}>采购单号:</div>
                <div style={print100x100LabelStyle.textContent}>{values.purchaseOrderNo}</div>
            </div>
            <div style={print100x100LabelStyle.contentItem}>
                <div style={print100x100LabelStyle.textLabel}>SKU:</div>
                <div style={print100x100LabelStyle.textContent}>{values.sku}</div>
            </div>
            <div style={print100x100LabelStyle.contentItem}>
                <div style={print100x100LabelStyle.textLabel}>产品名称:</div>
                <div style={print100x100LabelStyle.textContent}>{values.productName}</div>
            </div>
            {values.badNumber ? (
                <div style={print100x100LabelStyle.contentItem}>
                    <div style={print100x100LabelStyle.textLabelBold}>不良品数量:</div>
                    <div style={print100x100LabelStyle.textContentBold}>{values.badNumber}</div>
                </div>
            ) : null}
            {values.overchargedNumber ? (
                <div style={print100x100LabelStyle.contentItem}>
                    <div style={print100x100LabelStyle.textLabelBold}>多收数量:</div>
                    <div style={print100x100LabelStyle.textContentBold}>{values.overchargedNumber}</div>
                </div>
            ) : null}
            <div style={print100x100LabelStyle.contentItem}>
                <div style={print100x100LabelStyle.textLabel}>采购员:</div>
                <div style={print100x100LabelStyle.textContent}>{values.buyer}</div>
            </div>
            {values.type === '1' ? (
                <div style={print100x100LabelStyle.contentItem}>
                    <div style={{
                        ...print100x100LabelStyle.textLabel,
                        WebkitLineClamp: '',
                        lineHeight: '4.5mm',
                    }}
                    >
                        不良原因:
                    </div>
                    <div style={{
                        ...print100x100LabelStyle.textContent,
                        WebkitLineClamp: '',
                        fontSize: '3mm',
                        lineHeight: '4.5mm',
                        fontWeight: 'bold',
                    }}
                    >
                        {values.badReasons}
                    </div>
                </div>
            ) : null}
            {values.qualityInspector ? (
                <div style={print100x100LabelStyle.contentItem}>
                    <div style={print100x100LabelStyle.textLabel}>质检员:</div>
                    <div style={print100x100LabelStyle.textContent}>{values.qualityInspector}</div>
                </div>
            ) : null}
            {values.qualityInspectorTime ? (
                <div style={print100x100LabelStyle.contentItem}>
                    <div style={print100x100LabelStyle.textLabel}>质检日期:</div>
                    <div style={print100x100LabelStyle.textContent}>{values.qualityInspectorTime}</div>
                </div>
            ) : null}
        </div>
    </div>
);

export const printBarcodeStyle = {
    wmsPrintBarcodeContent: {
        textAlign: '-webkit-center',
        width: '100mm',
    },
    wmsPrintBarcode: {
        width: '100mm',
        textAlign: '-webkit-center',
        border: '#EAE9E9 solid 1px',
        borderRadius: '3px',
        padding: '1mm',
        paddingTop: '10mm',
    },
    wmsPrintBarcodeRow: {
        height: '50mm',
        display: 'flex',
        textAlign: 'center',
    },
};
