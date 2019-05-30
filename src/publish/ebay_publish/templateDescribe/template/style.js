export default (bgcolor = '#f9fafd', fscolor = '#333333') => {
    return `
<style>
    body,
    div,
    dl,
    dt,
    dd,
    ul,
    ol,
    li,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    pre,
    form,
    fieldset,
    input,
    textarea,
    p,
    blockquote,
    th,
    td {
        margin: 0;
        padding: 0;
        box-sizing: border-box
    }

    table {
        border-collapse: collapse;
        border-spacing: 0
    }

    fieldset,
    img {
        border: 0
    }

    img {
        font-size: 0;
        display: block
    }

    address,
    caption,
    cite,
    code,
    dfn,
    em,
    strong,
    th,
    var {
        font-style: normal;
        font-weight: normal
    }

    ol,
    ul {
        list-style: none
    }

    caption,
    th {
        text-align: left
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-size: 100%;
        font-weight: normal
    }

    q:before,
    q:after {
        content: ''
    }

    abbr,
    acronym {
        border: 0
    }

    html,
    body {
        background-color: #fff;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
        line-height: 18px;
        color: #333
    }

    a {
        text-decoration: none;
        color: #333
    }

    a:hover {
        color: #000
    }

    .mt30 {
        margin-top: 30px
    }

    .mt20 {
        margin-top: 20px
    }

    .mt10 {
        margin-top: 10px
    }

    .pl40 {
        padding-left: 40px
    }

    .w80p {
        width: 80%
    }

    .clear::after {
        display: block;
        content: "";
        clear: both
    }

    .title-bgcolor {
        background-color: ${bgcolor};
    }

    .fscolor {
        color:${fscolor};
    }


    .info {
        overflow: hidden
    }

    .info > div >img {
        display:block;
        width:800px;
        margin:0 auto;
        margin-top: 10px;
    }

    .thin-border {
        border: 1px solid #eae9e9
    }

    .thin-border-bottom {
        border-bottom: 1px solid #eae9e9
    }

    .img-wrap img {
        display: block;
        width: 100%
    }
    
    .main {
        width: 1000px;
        padding: 20px;
        margin: 0 auto
    }

    .main h1 {
        font-size: 36px;
        width: 80%;
        line-height: 66px;
        text-align: center;
        margin: 0 auto;
        margin-bottom: 10px;
    }


    #store {
        display:none;
    }
    #wrapper {
        display: inline-block;
        padding-left: 270px;
        position: relative;
        vertical-align: bottom;
        margin-top: 20px;
    }

    #sidebar {
        float: left;
        width: 270px;
        margin-left: -270px;
        position: relative
    }

    #main {
        float: left;
        min-width: 990px
    }

    #main,
    #sidebar {
        min-height: 200px;
        height: auto !important;
        height: 200px
    }

    .title {
        height: 40px;
        line-height: 40px;
        text-align: center
    }

    .category ul {
        padding: 10px 20px;
        line-height: 30px
    }

    .c {
        overflow: hidden
    }

    .l {
        float: left;
        width: 70px;
        height: 70px
    }

    .r {
        padding-left: 80px;
        height: 70px
    }

    .recommend ul {
        padding: 15px
    }

    .recommend ul li {
        margin-bottom: 10px
    }

    .small-title {
        font-size: 14px;
        height: 35px;
        line-height: 35px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis
    }

    .price {
        height: 35px;
        line-height: 35px;
        font-size: 14px;
        color: red
    }

    .table table {
        table-layout: fixed;
        font-size: 14px;
        width: 100%;
        padding: 16px;
        line-height: 30px;
        border-collapse: collapse
    }

    .table table td {
        padding-left: 15px;
        line-height: 54px;
        height: 54px;
        border: 1px solid#eae9e9
    }

    .table table tr td:first-child {
        font-weight: 700
    }

    .table-title {
        height: 40px;
        line-height: 40px;
        padding-left: 15px;
        border-top: 1px solid#eae9e9;
        border-left: 1px solid#eae9e9;
        border-right: 1px solid#eae9e9
    }
    
    .description-content {
        line-height: 24px;
        word-wrap: break-word;
        width: 800px;
        margin: 0 auto;
        margin-top:20px;
    }

    .policy-title-unfold {
        text-align: left;
        font-weight: 700;
        font-size: 14px;
        padding-left: 15px
    }

    .policy-content {
        padding: 25px;
        color: #999
    }

    .policy-content img {
        width: 100%;
    }

    .policy-content table {
        width: 100%;
        padding: 16px;
        line-height: 30px;
        border-collapse: collapse
    }

    .policy-content table td {
        padding: 0 10px;
        border: 1px solid#eae9e9
    }

    .policy-toggle-tab {
        font-weight: 700;
        font-size: 14px
    }

    .policy-toggle-tab li {
        border-right: 1px solid#eae9e9;
        height: 40px;
        line-height: 40px;
        float: left;
        padding: 0 15px;
        cursor: pointer
    }

    .policy-toggle-tab li.active {
        background-color: #fff;
        position: relative
    }

    .policy-toggle-tab li.active::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: #4d7bfe;
        top: -1px;
        left: 0
    }

    .policy-toggle-tab li.active::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: #fff;
        bottom: -1px;
        left: 0
    }

    .policy.tab-content li {
        display: none;
        height: 0;
        overflow: hidden
    }

    .policy.tab-content li.active {
        display: block;
        height: auto;
        overflow: visible
    }

    .description-content {
        line-height: 24px;
        word-wrap: break-word;
        width: 800px;
        margin: 0 auto;
        margin-top:20px;
    }

    .toggle-small-img {
        width: 100%
    }

    .toggle-small-img li {
        width: 150px;
        float: left;
        overflow: hidden;
        padding-top: 20px;
        padding-right: 20px;
        cursor: pointer
    }

    .tabs {
        clear: both;
        width: 100%;
        float: left;
        list-style: none;
        position: relative;
        box-sizing: border-box;
        margin-top: 27px;
        margin-bottom: 3px
    }

    .tabs .tab-content {
        color:#333333;
    }

    .tabs::before {
        content: "";
        position: absolute;
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        top: 2px;
        left: 0;
        background-color: ${bgcolor};
        border-top: 1px solid #eae9e9;
        border-left: 1px solid #eae9e9;
        border-right: 1px solid #eae9e9
    }

    .tabs input[type=radio] {
        width: 0;
        visibility: hidden;
        display: none
    }

    .tabs label {
        padding: 0 20px;
        display: inline-block;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        position: relative;
        z-index: 1
    }

    .tabs [id^="tab"]:checked+label {
        background: #fff;
        border-bottom: 0;
        color: #1890ff;
        font-size: 14px;
        font-weight: 700;
        position: relative;
        z-index: 1;
        top: 1px;
        border-top: 2px solid #4d7bfe;
        border-left: 1px solid #e0e0e0;
        border-right: 1px solid #e0e0e0
    }

    #tab1:checked~#tab-content1,
    #tab2:checked~#tab-content2,
    #tab3:checked~#tab-content3,
    #tab4:checked~#tab-content4,
    #tab5:checked~#tab-content5 {
        display: block
    }

    .tab-content {
        display: none;
        width: 100%;
        float: left;
        padding: 20px;
        box-sizing: border-box;
        background-color: #fff;
        position: relative;
        top: 0;
        min-height: 200px;
        margin-bottom: 0;
        border: 1px solid #eae9e9
    }

    .tab-content img {
        width: 100%;
    }

    .gallery-container {
        background: #fff none repeat scroll 0 0;
        height: auto;
        width: 100%;
        padding-bottom: 19px
    }

    .gallery {
        position: relative;
        margin-top: 20px;
        margin-left: 4px
    }

    .thumbnails {
        width: 660px;
        margin-top: 15px;
        margin: 0 auto;
    }

    .thumbnails li {
        display: inline-block;
        width: 92px;
        margin-right: 15px;
        height: 92px;
        text-align: center;
        cursor: pointer;
        padding: 5px;
        border: 1px solid #fff
    }

    .thumbnails .item-container {
        position: relative;
        margin: 0;
        height: 100%
    }

    .thumbnails .thumb-image {
        bottom: 0;
        left: 0;
        margin: auto;
        max-height: 100%;
        max-width: 100%;
        position: absolute;
        right: 0;
        top: 0
    }

    .thumbnails .gallery-content {
        position: absolute;
        bottom: 110px;
        left: 0;
        top: 0;
        width: 100%;
        height: 600px;
        display: none;
        justify-content: center;
        max-width: 100%
    }

    .item-wrapper {
        height: 100%;
        position: relative;
        width: 100%
    }

    .thumbnails .gallery-content img {
        left: 0;
        bottom: 0;
        margin: auto;
        max-height: 100%;
        max-width: 100%;
        position: absolute;
        right: 0;
        top: 0
    }

    .thumbnails li:hover {
        border: 1px solid #d5d5d5
    }

    .thumbnails li:hover .item-container {
        position: relative
    }

    .thumbnails li:hover .item-container::after {
        content: "";
        position: absolute;
        top: 0;
        right: -22px;
        width: 15px;
        height: 100%;
        background-color: #fff
    }

    .thumbnails li.image1:hover .gallery-content#image1 {
        display: block
    }

    .thumbnails li:hover~.defaultimg {
        display: none
    }

    .white-box {
        background: white;
        width: 100%;
        height: 600px;
        max-width: 100%;
        margin-left: 0
    }

    .defaultimg {
        position: absolute;
        top: 0;
        left: 0;
        margin: 0 auto;
        max-height: 100%;
        text-align: center;
        width: 100%;
        height: 600px
    }

    .defaultimg img {
        margin: 0 auto;
        text-align: center;
        max-height: 100%;
        max-width: 600px
    }
</style>`
}

