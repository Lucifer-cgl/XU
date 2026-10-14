# 财务管理A 第6章 营运资本管理（I）：流动资产

> [!summary] 来源与范围
> 根据 XM Teacher 课堂课件《06-Working capital management_I_current assets(1).pdf》第 1—11 页整理，内容覆盖现金管理、存货管理与信用管理。整理日期：2026-10-14。

> [!note] 整理原则
> 本文按“为什么持有流动资产 → 如何确定持有规模 → 如何监控与调整”的决策逻辑重组。课件数据、公式和案例均标注其所在 PDF 页；补充的解释属于归纳说明，不代表教师原话。图形根据课件重绘，引用许可待核对。

## 知识地图

```text
营运资本管理（I）：流动资产
├── 现金管理
│   ├── 持有动机
│   ├── 收支管理与浮账
│   ├── 暂时性现金剩余
│   └── 有价证券选择与收益率
├── 存货管理
│   ├── ABC 分类控制
│   ├── 订多少：EOQ
│   ├── 何时订：订货点
│   ├── 不确定性：安全存货
│   └── JIT
└── 信用管理
    ├── 事前：信用分析、信用标准与信用条件
    ├── 决策：现金折扣、ACP、政策 NPV、坏账概率
    └── 事后：保理、账龄表、财务比率与收账政策
```

流动资产是可在一年内或一个营业周期内转化为现金或投入使用的资产。课件把主要流动资产及其管理任务对应如下：

| 流动资产 | 对应管理任务 |
|---|---|
| 现金、银行存款、短期投资 | 现金管理 |
| 应收账款 | 信用管理 |
| 存货 | 存货管理 |

> [!important] 本章共同主线
> 现金、存货和应收账款都能提高经营的灵活性，却也会占用资金、牺牲收益。管理目标不是把它们一味压到最低，而是在流动性、收益性和风险之间寻找成本最低或价值最高的持有水平。

## 一 现金管理

### 1 现金的范围、特性与持有动机

现金是具有普遍可接受性、可随时购买其他资产或清偿债务的交换媒介。课件口径包括：

- 库存现金；
- 银行存款和其他货币资金；
- 现金等价物。

现金是流动性最强、收益性最低的资产。企业持有现金的三种动机来自凯恩斯：

| 动机 | 含义 | 典型用途 |
|---|---|---|
| 交易性动机 | 满足日常经营收付款 | 工资、货款、税费 |
| 谨慎性动机 | 应对无法准确预测的现金缺口 | 销售骤降、临时维修、回款延误 |
| 投机性动机 | 等待有利的投资或采购机会 | 价格下跌时买入资产或存货 |

### 2 现金收支与浮账

传统支票结算从付款方寄出支票到银行最终清算，依次经历：

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 210" role="img" aria-labelledby="float-title float-desc" style="max-width: 900px; width: 100%; height: auto;">
  <title id="float-title">支票结算过程与三类浮账</title>
  <desc id="float-desc">从付款方寄出支票，经收款方收到和存入支票，到银行清算，依次形成邮寄浮账、处理浮账和清算浮账。</desc>
  <defs>
    <marker id="float-arrow" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0,0 L10,4 L0,8 Z" fill="#155e75"/></marker>
  </defs>
  <style>
    .fbox{fill:#f8fafc;stroke:#334155;stroke-width:2}.fhead{font:600 17px sans-serif;fill:#0f172a}.fsub{font:14px sans-serif;fill:#475569}.flabel{font:600 15px sans-serif;fill:#7e22ce}.fline{stroke:#155e75;stroke-width:4;marker-end:url(#float-arrow)}
  </style>
  <rect class="fbox" x="20" y="25" width="170" height="62" rx="8"/><text class="fhead" x="105" y="50" text-anchor="middle">付款方寄出支票</text><text class="fsub" x="105" y="73" text-anchor="middle">账面可能已扣款</text>
  <rect class="fbox" x="250" y="25" width="170" height="62" rx="8"/><text class="fhead" x="335" y="50" text-anchor="middle">收款方收到支票</text><text class="fsub" x="335" y="73" text-anchor="middle">尚未存入银行</text>
  <rect class="fbox" x="480" y="25" width="170" height="62" rx="8"/><text class="fhead" x="565" y="50" text-anchor="middle">收款方存入支票</text><text class="fsub" x="565" y="73" text-anchor="middle">银行处理中</text>
  <rect class="fbox" x="710" y="25" width="170" height="62" rx="8"/><text class="fhead" x="795" y="50" text-anchor="middle">银行完成清算</text><text class="fsub" x="795" y="73" text-anchor="middle">资金最终到账</text>
  <line class="fline" x1="190" y1="120" x2="245" y2="120"/><line class="fline" x1="420" y1="120" x2="475" y2="120"/><line class="fline" x1="650" y1="120" x2="705" y2="120"/>
  <text class="flabel" x="220" y="154" text-anchor="middle">邮寄浮账</text><text class="flabel" x="450" y="154" text-anchor="middle">处理浮账</text><text class="flabel" x="680" y="154" text-anchor="middle">清算浮账</text>
  <text class="fsub" x="450" y="190" text-anchor="middle">浮账（Float）＝资金转移过程中因时间延迟形成的账面差异</text>
</svg>
<figcaption>图 1 支票结算过程与浮账构成｜来源：《06-Working capital management_I_current assets(1)》第 1—2 页｜根据课件重绘｜许可待核对</figcaption>
</figure>

浮账（Float）泛指资金转移过程中的时间延迟。站在企业角度可分为：

- **收取的浮账**：企业已收到付款信息，但资金尚未成为可用银行余额；时间越长，对企业越不利。
- **支付的浮账**：企业账面已确认支付，但银行尚未实际扣款；时间越长，企业暂时可使用的资金越多。

课件用同一笔周一发生的 5 万元存款和 8 万元提款说明公司账与银行账的时间差。表格保持课件原方向：星期作列，项目作行，单位为万元。

**公司账**

| 项目 | 周一 | 周二 | 周三 | 周四 | 周五 | 周六 | 周日 |
|---|---:|---:|---:|---:|---:|---:|---:|
| 期初 | 25 | 22 | 22 | 22 | 22 | 22 | 22 |
| 存款 | +5 | — | — | — | — | — | — |
| 提款 | -8 | — | — | — | — | — | — |
| **期末** | **22** | **22** | **22** | **22** | **22** | **22** | **22** |

平均期末余额为 22 万元。

**银行账**

| 项目 | 周一 | 周二 | 周三 | 周四 | 周五 | 周六 | 周日 |
|---|---:|---:|---:|---:|---:|---:|---:|
| 期初 | 25 | 25 | 30 | 30 | 30 | 22 | 22 |
| 存款 | — | +5 | — | — | — | — | — |
| 提款 | — | — | — | — | -8 | — | — |
| **期末** | **25** | **30** | **30** | **30** | **22** | **22** | **22** |

平均期末余额为：

$$
\frac{25+30+30+30+22+22+22}{7}=25.857\text{ 万元}
$$

公司账平均余额只有 22 万元，而银行账平均余额为 25.857 万元，差异来自存款与提款实际入账时间不同。

#### 浮账的价值

课件采用的简化计算式为：

$$
\text{浮账价值}=\text{金额}\times\text{时滞}\times\frac{\text{年利率}}{365}
$$

若金额为 100,000 元，邮寄、处理、清算分别耗时 4 天、1 天、1 天，市场年利率为 3%，则：

$$
100{,}000\times6\times\frac{3\%}{365}\approx49\text{ 元}
$$

- 对收取的浮账，价值记为 $-49$ 元：应加速收款，减少时滞。
- 对支付的浮账，价值记为 $+49$ 元：可在合法、合约和声誉允许的范围内管理付款时点。

> [!warning] 管理边界
> “延缓付款”不等于逾期付款。任何现金管理收益都必须同时考虑法律、道德、供应商关系和企业声誉成本。电子支付也会显著压缩传统支票浮账。

### 3 暂时性现金剩余与有价证券组合

暂时性现金剩余通常来自两类情况：

1. 季节性或周期性经营：现金顺差时买入有价证券，现金逆差时卖出证券或向银行借款。
2. 已计划或可能发生的大额支出：例如购置固定资产、支付股利、偿还到期本息或应对可能的败诉。

课件把有价证券投资组合分成三部分：

| 组合部分 | 目的 | 首要标准 | 课件建议工具 |
|---|---|---|---|
| 备用现金部分（Ready Cash Segment，R$） | 防止意外现金短缺 | 安全性、流动性 | 国库券 |
| 可控现金部分（Controllable Cash Segment，C$） | 匹配已知的缴税、分红、还本付息等现金流出 | 期限匹配、收益性 | 可转让定期存单、回购协议、银行承兑汇票、欧洲美元等 |
| 自由现金部分（Free Cash Segment，F$） | 投资尚未指定用途的多余现金 | 风险—收益权衡 | 各类货币市场工具 |

短期证券选择要看四项特征：

- **到期日**：利率上升时证券价格下降；其他条件相同时，到期越长，价格对利率越敏感。
- **违约风险**：发行人不能依约还本付息的可能性。
- **市场流动性**：能否快速、低损耗地变现。
- **税收**：某些政府债券利息可能享有税收优惠。

### 4 国库券收益率：BEY 与 EAY

美国国库券（Treasury Bill，T-bill）通常期限较短，以低于面值的价格贴现发行，到期按面值兑付。

债券等价收益率（Bond Equivalent Yield，BEY）：

$$
BEY=\frac{FA-PP}{PP}\times\frac{365}{DM}
$$

其中：

| 符号 | 含义 | 单位 |
|---|---|---|
| $FA$ | 证券面值（Face Amount） | 元或美元 |
| $PP$ | 买价（Purchase Price） | 与面值相同 |
| $DM$ | 距到期日的天数（Days to Maturity） | 天 |

课件例题：面值 1,000 美元、期限 13 周即 91 天的国库券，买价为 990 美元：

$$
BEY=\frac{1{,}000-990}{990}\times\frac{365}{91}=4.05\%
$$

实际年收益率（Equivalent Annual Yield，EAY；课件亦写作 EAR）：

$$
EAY=\left(1+\frac{BEY}{365/DM}\right)^{365/DM}-1
$$

代入上例：

$$
EAY=\left(1+\frac{0.0405}{365/91}\right)^{365/91}-1=4.11\%
$$

EAY 高于 BEY，是因为 EAY 计入了一年内按相同周期收益率复利再投资的效果。

### 5 常见货币市场工具

| 工具 | 核心特征 |
|---|---|
| 中期国库券（Treasury Notes） | 原始期限通常为 2—10 年 |
| 长期国库券（Treasury Bonds） | 原始期限通常超过 10 年 |
| 银行承兑汇票（Bankers’ Acceptances，BAs） | 银行承诺到期向持有人支付面值的短期贸易票据 |
| 回购协议（Repurchase Agreements，Repos） | 先出售证券并约定日后以更高价格购回，常以国库券作标的 |
| 联邦机构证券（Federal Agency Securities） | 美国联邦机构或政府支持企业发行的债务证券 |
| 商业票据（Commercial Paper） | 大型企业发行的短期无担保本票；课件指出期限不超过 270 天可避免 SEC 注册 |
| 欧洲商业票据（European Commercial Paper） | 期限可延伸至一年，二级市场相对活跃 |
| 可转让定期存单（Negotiable Certificates of Deposit，CDs） | 银行或储蓄机构发行的大额、可转让定期存款凭证 |
| 欧洲美元（Eurodollars） | 存放在美国境外银行的美元存款，不受美国本土银行监管规则直接约束 |
| 货币市场优先股（Money Market Preferred Stock） | 股息率按定期拍卖重设的优先股 |

## 二 存货管理

### 1 存货的作用与成本权衡

存货连接产品生产与销售，包括原材料、在产品、产成品以及在途存货。持有存货可以提升采购、生产计划和客户服务的灵活性，但也会发生资金占用、仓储、保险、损耗和过时等成本。

因此，存货管理的基本问题是：

- 对哪些存货实施更严格控制？
- 每次订多少？
- 什么时候订？
- 如何应对需求或交货期的不确定性？

### 2 ABC 存货控制法

ABC 法按存货价值的重要程度进行差别化控制，而不是给所有品项相同的管理强度。

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 430" role="img" aria-labelledby="abc-title abc-desc" style="max-width: 760px; width: 100%; height: auto;">
  <title id="abc-title">ABC 存货控制曲线</title>
  <desc id="abc-desc">横轴为存货品项累计百分比，纵轴为存货价值累计百分比。前约百分之十五的 A 类品项贡献约百分之七十的价值，至约百分之四十五的 A、B 类品项累计贡献约百分之九十，余下为 C 类。</desc>
  <defs><marker id="axis-arrow" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><path d="M0,0 L9,3.5 L0,7 Z" fill="#0f172a"/></marker></defs>
  <style>.axis{stroke:#0f172a;stroke-width:2;marker-end:url(#axis-arrow)}.grid{stroke:#94a3b8;stroke-width:1;stroke-dasharray:5 5}.curve{fill:none;stroke:#0f766e;stroke-width:4}.txt{font:15px sans-serif;fill:#0f172a}.zone{font:700 26px sans-serif;fill:#7c3aed}</style>
  <line class="axis" x1="95" y1="350" x2="690" y2="350"/><line class="axis" x1="95" y1="350" x2="95" y2="45"/>
  <line class="grid" x1="184" y1="350" x2="184" y2="137"/><line class="grid" x1="363" y1="350" x2="363" y2="76"/><line class="grid" x1="95" y1="137" x2="184" y2="137"/><line class="grid" x1="95" y1="76" x2="363" y2="76"/>
  <path class="curve" d="M95 350 C130 220,150 165,184 137 C235 100,295 82,363 76 C470 64,585 57,675 55"/>
  <text class="txt" x="85" y="371" text-anchor="end">0</text><text class="txt" x="184" y="371" text-anchor="middle">15</text><text class="txt" x="363" y="371" text-anchor="middle">45</text><text class="txt" x="675" y="371" text-anchor="middle">100</text>
  <text class="txt" x="78" y="142" text-anchor="end">70</text><text class="txt" x="78" y="81" text-anchor="end">90</text><text class="txt" x="78" y="58" text-anchor="end">100</text>
  <text class="zone" x="140" y="300">A</text><text class="zone" x="270" y="205">B</text><text class="zone" x="520" y="130">C</text>
  <text class="txt" x="390" y="410" text-anchor="middle">存货品项累计百分比（%）</text><text class="txt" transform="translate(28 215) rotate(-90)" text-anchor="middle">存货价值累计百分比（%）</text>
</svg>
<figcaption>图 2 ABC 存货控制曲线｜来源：《06-Working capital management_I_current assets(1)》第 5 页｜根据课件重绘｜许可待核对</figcaption>
</figure>

课件给出的分界是：A 类约占 15% 的品项、贡献约 70% 的价值；A、B 两类合计约占 45% 的品项、贡献约 90% 的价值；其余为 C 类。A 类应检查得更频繁、更严格，B、C 类可适当降低控制强度。

> [!warning] 分类依据
> ABC 中的 A、B、C 反映的是价值重要性，不等同于物理数量、体积或缺货风险。实际管理还应结合关键零部件的不可替代性和供应风险。

### 3 订多少：经济订货量 EOQ

设：

- $S$：计划期存货总消耗量，单位/期；
- $O$：每次订货成本，元/次；
- $C$：计划期每单位持有成本，元/单位·期；
- $Q$：每次订货量，单位。

若需求均匀、每次到货后库存由 $Q$ 线性降至 0，平均存货为 $Q/2$。总相关存货成本为：

$$
T(Q)=C\frac{Q}{2}+O\frac{S}{Q}
$$

其中第一项是持有成本，随订货量增加；第二项是订货成本，随订货量增加而下降。令总成本最小，可得经济订货量（Economic Order Quantity，EOQ）：

$$
Q^*=\sqrt{\frac{2OS}{C}}
$$

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 470" role="img" aria-labelledby="eoq-title eoq-desc" style="max-width: 820px; width: 100%; height: auto;">
  <title id="eoq-title">EOQ 下的订货成本、持有成本与总存货成本</title>
  <desc id="eoq-desc">横轴为订货规模，纵轴为成本。订货成本随订货规模下降，持有成本上升，两者之和形成 U 形总成本曲线，在 Q 星处最低。</desc>
  <defs><marker id="eoq-arrow" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><path d="M0,0 L9,3.5 L0,7 Z" fill="#0f172a"/></marker></defs>
  <style>.ea{stroke:#0f172a;stroke-width:2;marker-end:url(#eoq-arrow)}.ec1{fill:none;stroke:#2563eb;stroke-width:4}.ec2{fill:none;stroke:#b45309;stroke-width:4}.ec3{fill:none;stroke:#16a34a;stroke-width:4}.ed{stroke:#64748b;stroke-width:1.5;stroke-dasharray:6 5}.et{font:15px sans-serif;fill:#0f172a}.eb{font:700 16px sans-serif}</style>
  <line class="ea" x1="85" y1="385" x2="755" y2="385"/><line class="ea" x1="85" y1="385" x2="85" y2="45"/>
  <path class="ec1" d="M115 95 C180 145,300 205,394 231 C500 265,610 320,700 345"/><path class="ec2" d="M115 355 L700 95"/><path class="ec3" d="M115 55 C225 135,310 178,394 165 C505 148,600 82,700 45"/>
  <line class="ed" x1="394" y1="385" x2="394" y2="165"/>
  <circle cx="394" cy="165" r="6" fill="#111827"/><text class="et eb" x="394" y="414" text-anchor="middle">Q*</text>
  <text class="et" x="425" y="448" text-anchor="middle">订货规模 Q</text><text class="et" transform="translate(30 220) rotate(-90)" text-anchor="middle">成本</text>
  <text class="et eb" x="545" y="105" fill="#16a34a">总存货成本</text><text class="et eb" x="590" y="215" fill="#b45309">总持有成本</text><text class="et eb" x="535" y="326" fill="#2563eb">总订货成本</text>
  <text class="et" x="410" y="150">最低点</text>
</svg>
<figcaption>图 3 EOQ 总成本关系｜来源：《06-Working capital management_I_current assets(1)》第 6 页｜根据课件重绘｜许可待核对</figcaption>
</figure>

#### Basket Wonders 例题

已知 100 天内均匀消耗织物 10,000 码，每次订货成本 200 美元，每码在该 100 天计划期内的持有成本为 1 美元：

$$
Q^*=\sqrt{\frac{2\times200\times10{,}000}{1}}=2{,}000\text{ 码}
$$

这表示在课件假设成立时，每次订购 2,000 码使订货成本与持有成本之和最低。

> [!warning] EOQ 的适用前提
> 基本模型假设需求稳定、交货期确定、到货即时、无数量折扣且不允许缺货。现实中若这些条件不成立，应把缺货成本、安全存货、折扣或产能约束纳入模型。

### 4 何时订：订货点与安全存货

需求和交货期确定时，订货点（Order Point，OP）为：

$$
OP=\text{交货期}\times\text{日消耗量}
$$

在 Basket Wonders 例题中，交货期为 2 天，日消耗量为：

$$
\frac{10{,}000}{100}=100\text{ 码/天}
$$

因此：

$$
OP=2\times100=200\text{ 码}
$$

也就是说，当库存降到 200 码时下单，正常情况下两天后库存恰好降到 0，新一批 2,000 码同时到货。

需求或交货期不确定时，订货点为：

$$
OP=(\text{平均交货期}\times\text{平均日消耗量})+\text{安全存货量}
$$

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 470" role="img" aria-labelledby="safety-title safety-desc" style="max-width: 940px; width: 100%; height: auto;">
  <title id="safety-title">订货点、安全存货与交货延误</title>
  <desc id="safety-desc">左图为有 200 单位安全存货时在第 18 天下单，第 20 天到货；右图为实际交货期延长至 3 天，在第 21 天到货，企业临时动用了安全存货，但未发生缺货。</desc>
  <defs><marker id="ss-arrow" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><path d="M0,0 L9,3.5 L0,7 Z" fill="#0f172a"/></marker></defs>
  <style>.sa{stroke:#0f172a;stroke-width:2;marker-end:url(#ss-arrow)}.stock{fill:none;stroke:#16a34a;stroke-width:4}.sgrid{stroke:#64748b;stroke-width:1.3;stroke-dasharray:5 4}.ssafe{fill:#f9a8d4;opacity:.55}.st{font:14px sans-serif;fill:#0f172a}.sb{font:700 15px sans-serif;fill:#166534}</style>
  <rect class="ssafe" x="65" y="344" width="350" height="35"/><rect class="ssafe" x="535" y="344" width="350" height="35"/>
  <line class="sa" x1="65" y1="380" x2="425" y2="380"/><line class="sa" x1="65" y1="380" x2="65" y2="45"/><line class="sa" x1="535" y1="380" x2="895" y2="380"/><line class="sa" x1="535" y1="380" x2="535" y2="45"/>
  <path class="stock" d="M65 72 L330 344 L330 72 L415 158"/><path class="stock" d="M535 72 L820 362 L820 72"/>
  <line class="sgrid" x1="304" y1="380" x2="304" y2="329"/><line class="sgrid" x1="330" y1="380" x2="330" y2="72"/><line class="sgrid" x1="779" y1="380" x2="779" y2="329"/><line class="sgrid" x1="820" y1="380" x2="820" y2="72"/>
  <line class="sgrid" x1="65" y1="329" x2="330" y2="329"/><line class="sgrid" x1="535" y1="329" x2="820" y2="329"/>
  <text class="sb" x="240" y="35" text-anchor="middle">正常交货：第 20 天到货</text><text class="sb" x="710" y="35" text-anchor="middle">延误交货：第 21 天到货</text>
  <text class="st" x="304" y="401" text-anchor="middle">18</text><text class="st" x="330" y="421" text-anchor="middle">20</text><text class="st" x="779" y="401" text-anchor="middle">18</text><text class="st" x="820" y="421" text-anchor="middle">21</text>
  <text class="st" x="52" y="334" text-anchor="end">400</text><text class="st" x="52" y="367" text-anchor="end">200</text><text class="st" x="522" y="334" text-anchor="end">400</text><text class="st" x="522" y="367" text-anchor="end">200</text>
  <text class="st" x="240" y="367" text-anchor="middle">安全存货 200</text><text class="st" x="710" y="367" text-anchor="middle">动用安全存货（低于 200）</text>
  <text class="st" x="240" y="440" text-anchor="middle">天数</text><text class="st" x="710" y="440" text-anchor="middle">天数</text>
</svg>
<figcaption>图 4 安全存货条件下的订货点与交货延误｜来源：《06-Working capital management_I_current assets(1)》第 7 页｜根据课件重绘｜许可待核对</figcaption>
</figure>

若安全存货为 200 码，则订货点为 $200+200=400$ 码。课件进一步假设实际交货期从 2 天延长到 3 天：企业会在第 20—21 天动用安全存货，但仍可避免立即缺货。

合适的安全存货量取决于：

- 存货需求的不确定性；
- 交货期的不确定性；
- 缺货成本；
- 持有存货的成本。

### 5 适时工作制 JIT

适时工作制（Just-in-Time，JIT）是在刚好需要时取得存货并投入生产的管理方法。它能降低库存占用，但依赖：

- 准确的生产与存货信息系统；
- 高效采购；
- 可靠供应商；
- 有效的存货处理系统。

JIT 是供应链管理（Supply Chain Management，SCM）的一个环节。库存更少也意味着缓冲更薄，因此供应中断时风险可能更集中。

## 三 信用管理

### 1 应收账款的产生与管理框架

不同销售条件决定何时收款：

- 先付款后交货（Cash Before Delivery，C.B.D.）；
- 交货时付款（Cash on Delivery，C.O.D.）；
- 商业信用（Trade Credit）：先交货、后收款，由此形成应收账款。

应收账款管理分成两个阶段：

| 阶段 | 工作 |
|---|---|
| 事前管理 | 信用分析；制定信用标准和信用条件 |
| 事后管理 | 监督与控制；制定收账政策 |

### 2 信用分析：5Cs 与评分

5Cs 原则从五个方面判断客户信用：

| C | 中文 | 判断重点 |
|---|---|---|
| Character | 品德 | 是否有按约付款的意愿和历史记录 |
| Capacity | 能力 | 经营现金流能否支持偿债 |
| Capital | 资本 | 财务实力、资本结构和损失吸收能力 |
| Collateral | 抵押品 | 是否有可用担保或抵押物 |
| Condition / Cycle | 状况／周期 | 行业、宏观环境和商业周期对客户的影响 |

信用分析的基本流程是“搜集信息 → 评价财务实力和信用状况 → 确定风险等级 → 结合公司战略确定信用标准”。信息可来自财务报表、信用等级报告、历史交易经验、企业间信息、银行资信资料和实地考察。

课件以邓白氏（D&B）评级系统说明加权评分法。评分项包括付款记录、流动比率、资产负债率、股本结构、销售额、获利能力、经营年限、管理者简历、诉讼、财务增长趋势、房产和职工人数等。

$$
\text{平均信用风险系数}=\frac{\text{累计加权值}}{\text{累计权重}}
$$

| 风险系数 | 符号 | 风险水平 | 对策 |
|---:|:---:|---|---|
| 1.0—1.5 | RS1 | 可忽略 | 可放松信用政策 |
| 1.5—2.5 | RS2 | 很小 | 可以信用交易 |
| 2.5—3.5 | RS3 | 中等 | 信用交易，但须监控 |
| 3.5—4.5 | RS4 | 高于平均 | 信用交易，须密切关注 |
| 4.5—5.5 | RS5 | 较高 | 寻求担保 |
| 5.5—6.0 | RS6 | 高 | 现金交易 |

需特别关注的风险信号包括交易记录恶化、管理者更迭和法律纠纷。

### 3 信用标准与信用条件

信用条件包含：

- 信用期限（Credit Period）；
- 现金折扣（Cash Discount）；
- 信用金额（Size of the Account）；
- 允许的坏账概率（Probability of Default）。

#### 现金折扣的年成本

“3/10，Net 60，May 1 dating”表示：发票从 5 月 1 日起生效，最迟 6 月 30 日付清；若 5 月 10 日前付款，可享受 3% 现金折扣。

若折扣率为 $d$，折扣期为 $D$ 天，净付款期为 $N$ 天，则放弃折扣的单期成本为：

$$
y=\frac{d}{1-d}
$$

用单利法换算成年成本：

$$
\text{年成本}_{\text{simple}}=y\times\frac{365}{N-D}
$$

用复利法换算为实际年成本：

$$
EAR=(1+y)^{365/(N-D)}-1
$$

> [!tip] 决策直觉
> 放弃现金折扣相当于为延迟付款融入一笔短期资金。若其年化成本高于可获得的其他短期融资成本，通常应借入较便宜的资金并在折扣期内付款。

#### 现金折扣对 ACP 和应收账款的影响

一家公司当前信用条件为 Net 30，平均收账期（Average Collection Period，ACP）为 30 天。若改为“2/10，Net 30”，预计 50% 客户在第 10 天付款，其余 50% 仍在第 30 天付款，则：

$$
ACP_{new}=0.5\times10+0.5\times30=20\text{ 天}
$$

若折扣前年销售额为 1,500 万美元：

$$
\text{平均日销售额}=\frac{15{,}000{,}000}{365}=41{,}095.89\text{ 美元/天}
$$

应收账款减少：

$$
41{,}095.89\times(30-20)=410{,}959\text{ 美元}
$$

这只是资金占用减少额；完整决策还应比较折扣成本、坏账变化、销售增长和回款加速带来的收益。

### 4 从现金销售改为赊销：政策 NPV

课件考虑从现金政策改为 Net 30。设：

| 符号 | 含义 |
|---|---|
| $P$ | 单位售价 |
| $v$ | 单位变动成本 |
| $Q$ | 当前每月销售量 |
| $Q'$ | 新政策下每月销售量 |
| $R$ | 必要月报酬率 |

新政策带来的每月增量现金流为：

$$
\Delta CF=(P-v)(Q'-Q)
$$

若把增量现金流视为永续年金，其现值为：

$$
PV(\Delta CF)=\frac{(P-v)(Q'-Q)}{R}
$$

课件把政策变更的初始成本写为原本当月可收回的销售收入加新增销售的变动成本：

$$
\text{初始成本}=PQ+v(Q'-Q)
$$

因此：

$$
NPV=-\left[PQ+v(Q'-Q)\right]+\frac{(P-v)(Q'-Q)}{R}
$$

例题中，$P=100$ 美元，$v=40$ 美元，$Q=1{,}000$，$Q'=1{,}050$，$R=1.5\%$：

$$
\Delta CF=(100-40)(1{,}050-1{,}000)=3{,}000\text{ 美元}
$$

$$
PV(\Delta CF)=\frac{3{,}000}{0.015}=200{,}000\text{ 美元}
$$

$$
\text{初始成本}=100\times1{,}000+40\times50=102{,}000\text{ 美元}
$$

$$
NPV=200{,}000-102{,}000=98{,}000\text{ 美元}
$$

因为 NPV 为正，课件结论是应变更政策。

> [!warning] 模型口径
> 该课件模型把新增月现金流视为永续且不变，并使用月报酬率折现。若销售增长只持续有限期、成本结构变化或坏账率上升，应重新建立现金流预测，不能直接套用永续年金。

### 5 考虑坏账概率

设客户违约概率为 $\pi$，单位价格为 $P$，单位变动成本为 $v$，单期必要报酬率为 $R$。

**一次性销售：**

$$
NPV=-v+\frac{(1-\pi)P}{1+R}
$$

课件例题：$v=50$ 美元，$P=110$ 美元，$\pi=15\%$，$R=1\%$：

$$
NPV=-50+\frac{(1-0.15)\times110}{1.01}=42.57\text{ 美元}
$$

令 NPV 为 0，可求盈亏平衡的违约概率：

$$
\pi^*=1-\frac{v(1+R)}{P}=54.09\%
$$

只要预计违约概率低于 54.09%，在该简化口径下授信仍有正 NPV。

**重复性销售：**课件假设回头客未来反复贡献毛利，给出：

$$
NPV=-v+\frac{(1-\pi)(P-v)}{R}
$$

代入同一组数据：

$$
NPV=-50+\frac{(1-0.15)(110-50)}{0.01}=5{,}050\text{ 美元}
$$

这说明长期客户关系可能显著提高授信价值，但结论高度依赖“持续重复购买、毛利稳定”等假设。

### 6 最优信用政策

放宽信用会带来两类方向相反的成本：

- **持有成本（Carrying Costs）**：应收账款占用、催收、坏账等，随授信规模扩大而上升。
- **机会成本（Opportunity Costs）**：拒绝信用导致的销售损失，随授信规模扩大而下降。

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 470" role="img" aria-labelledby="credit-title credit-desc" style="max-width: 820px; width: 100%; height: auto;">
  <title id="credit-title">最优信用政策的总信用成本曲线</title>
  <desc id="credit-desc">横轴为授信规模，纵轴为成本。持有成本随授信扩大而上升，机会成本下降，总信用成本为 U 形，在虚线标出的授信规模处最低。</desc>
  <defs><marker id="cr-arrow" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><path d="M0,0 L9,3.5 L0,7 Z" fill="#0f172a"/></marker></defs>
  <style>.ca{stroke:#0f172a;stroke-width:2;marker-end:url(#cr-arrow)}.cc1{fill:none;stroke:#2563eb;stroke-width:4}.cc2{fill:none;stroke:#a16207;stroke-width:4}.cc3{fill:none;stroke:#dc2626;stroke-width:4}.cd{stroke:#64748b;stroke-width:1.5;stroke-dasharray:6 5}.ct{font:15px sans-serif;fill:#0f172a}.cb{font:700 16px sans-serif}</style>
  <line class="ca" x1="85" y1="385" x2="755" y2="385"/><line class="ca" x1="85" y1="385" x2="85" y2="45"/>
  <path class="cc1" d="M120 350 C230 330,320 280,400 240 C500 190,610 130,700 95"/><path class="cc2" d="M120 90 C175 190,300 225,400 240 C510 270,610 320,700 345"/><path class="cc3" d="M120 55 C225 135,315 178,400 165 C510 148,605 83,700 48"/>
  <line class="cd" x1="400" y1="385" x2="400" y2="165"/><circle cx="400" cy="165" r="6" fill="#111827"/>
  <text class="ct cb" x="400" y="416" text-anchor="middle">最优授信规模</text><text class="ct" x="420" y="451" text-anchor="middle">授信规模</text><text class="ct" transform="translate(30 220) rotate(-90)" text-anchor="middle">成本</text>
  <text class="ct cb" x="545" y="105" fill="#dc2626">总信用成本</text><text class="ct cb" x="575" y="215" fill="#2563eb">持有成本</text><text class="ct cb" x="540" y="335" fill="#a16207">机会成本</text>
</svg>
<figcaption>图 5 最优信用政策的总信用成本曲线｜来源：《06-Working capital management_I_current assets(1)》第 10 页｜根据课件重绘｜许可待核对</figcaption>
</figure>

课件示意图把持有成本曲线与机会成本曲线的交点、总信用成本最低点画在同一授信规模上。最优信用政策位于总信用成本最低点，而不是“零坏账”或“销售额最大”的位置。

> [!note] 图形的经济含义
> 两条分成本曲线在课件示意图中相交于最优授信规模，但一般优化条件并不是“两项成本金额必须相等”，而是授信规模再增加一单位所造成的边际持有成本，恰好抵消边际机会成本的下降，即总信用成本的一阶变化为 0。

### 7 应收账款的监督与收账政策

#### 保理与账龄表

保理（Factoring）可能组合提供：

- 信用保护（Credit Protection）；
- 应收账款簿记（Accounts Receivable Bookkeeping）；
- 收账服务（Collection Services）；
- 融资（Financing）。

账龄表（Aging Schedule）按拖欠时间区间列示客户欠款比例。它能发现“平均收账期看似稳定，但逾期结构已经恶化”的情况，是 ACP 的重要补充。

#### 财务比率

平均收账期或赊销天数（Days Sales Outstanding，DSO）：

$$
ACP=DSO=\frac{\text{应收账款}}{\text{平均日赊销额}}
$$

应收账款周转率：

$$
\text{应收账款周转率}=\frac{\text{赊销额}}{\text{平均应收账款}}
$$

课件例：若 ACP 为 30 天，平均日赊销额为 1,000 元，则平均应收账款余额为：

$$
1{,}000\times30=30{,}000\text{ 元}
$$

四川长虹案例中的图表数据如下。保持课件原方向：期间作列，指标作行。

| 指标 | 2001 上半年 | 2001 下半年 | 2002 上半年 | 2002 下半年 | 2003 上半年 |
|---|---:|---:|---:|---:|---:|
| 平均收账期（天） | 66 | 61 | 96 | 116 | 139 |

| 指标 | 2000 | 2001 | 2002 | 2003 | 2004 |
|---|---:|---:|---:|---:|---:|
| 销售收入（亿元） | 107 | 95 | 126 | 141 | 115 |
| 净利润（亿元） | 1.2 | 0.9 | 1.8 | 2.1 | -36.8 |

平均收账期由 66 天总体上升至 139 天；2004 年销售收入仍有 115 亿元时，净利润已降至 -36.8 亿元。课件同时提示“销售收入高速增长、利润高速增长、经营活动现金流持续为负”，说明账面增长不等于回款质量改善，必须把收入、利润、应收账款与现金流联合分析。

#### 收账政策的渐进顺序

课件给出的催收强度依次提高：

1. 寄送书面催款函；
2. 致电财务经理；
3. 措辞更严厉的催款函；
4. 专人登门拜访；
5. 法庭诉讼。

催收越强，回款可能越快，但也可能损害客户关系并增加成本，因此应按账龄、金额、客户价值和违约风险分层处理。

## 四 公式速查表

| 主题 | 公式 | 用途 |
|---|---|---|
| 浮账价值 | $\text{金额}\times\text{时滞}\times\text{年利率}/365$ | 衡量结算延迟的资金时间价值 |
| 债券等价收益率 | $BEY=\dfrac{FA-PP}{PP}\dfrac{365}{DM}$ | 将贴现收益年化，不计复利 |
| 实际年收益率 | $EAY=\left(1+\dfrac{BEY}{365/DM}\right)^{365/DM}-1$ | 计入周期内复利 |
| 总存货成本 | $T=CQ/2+OS/Q$ | 平衡持有成本与订货成本 |
| 经济订货量 | $Q^*=\sqrt{2OS/C}$ | 求使总相关存货成本最低的订货量 |
| 确定条件下订货点 | $OP=L\times d$ | 交货期内预计消耗量 |
| 不确定条件下订货点 | $OP=\bar L\times\bar d+SS$ | 加入安全存货 |
| 放弃折扣单期成本 | $y=d/(1-d)$ | 衡量延迟付款的隐含融资成本 |
| 放弃折扣实际年成本 | $EAR=(1+y)^{365/(N-D)}-1$ | 与其他年化融资成本比较 |
| 平均收账期 | $ACP=\text{应收账款}/\text{平均日赊销额}$ | 衡量平均回款速度 |
| 应收账款周转率 | $\text{赊销额}/\text{平均应收账款}$ | 衡量应收账款周转效率 |

## 五 易错点与答题顺序

### 1 易错点

1. 把公司账余额等同于银行可用余额，忽略浮账。
2. 把 BEY 当成复利有效年利率；BEY 不计周期复利，EAY 才计入。
3. 在 EOQ 公式中混用期间口径：$S$ 和 $C$ 必须对应同一个计划期。
4. 把 EOQ 当成订货点；EOQ 回答“订多少”，OP 回答“何时订”。
5. 需求或交货期不确定时仍只用 $OP=Ld$，漏掉安全存货。
6. 把“2/10，Net 30”误解为 2% 的年利率；2% 是为提前 20 天付款提供的价格折扣。
7. 只看销售或利润增长，不核对应收账款、ACP 与经营现金流。
8. 认为最优信用政策等于零坏账；过严政策可能造成更大的销售机会损失。

### 2 计算题推荐顺序

**EOQ 与订货点：**

1. 统一 $S$、$C$ 的期间与单位；
2. 计算 $Q^*$；
3. 计算日消耗量；
4. 计算交货期需求；
5. 如有不确定性，再加安全存货。

**信用政策：**

1. 识别新增销售量与单位贡献毛利；
2. 计算增量经营现金流；
3. 明确是有限期还是永续；
4. 计算新增资金占用、坏账、折扣和催收成本；
5. 以 NPV 或总成本最低作决策，而非只看销售增长。

## 六 自测题

1. 为什么现金同时具有“流动性最强”和“收益性最低”的特征？
2. 同一笔支票为什么会使公司账与银行账在数日内不同？
3. 面值 10,000 元、买价 9,850 元、距到期 120 天的贴现证券，其 BEY 如何计算？
4. 解释 ABC 曲线为什么通常前段陡、后段平。
5. 若年需求量为 18,000 件，每次订货成本 80 元，单位年持有成本 5 元，EOQ 是多少？
6. 日均需求 60 件、平均交货期 4 天、安全存货 100 件，订货点是多少？
7. 为什么 JIT 能减少资金占用，却可能放大供应中断风险？
8. “2/10，Net 30”中，放弃折扣相当于为多少天的延期付款融资？
9. 信用政策放宽为何会同时降低机会成本、提高持有成本？
10. 若销售收入和净利润增长，但 ACP 延长、经营现金流持续为负，可能说明什么？

### 自测题参考答案

1. 现金可立即用于支付，几乎没有变现摩擦；但持有现金通常不能获得与长期投资相当的收益。
2. 支票经历邮寄、处理和清算时滞，公司记账与银行实际入账或扣账的时点不同。
3. $BEY=[(10{,}000-9{,}850)/9{,}850]\times(365/120)\approx4.63\%$。
4. 少量高价值 A 类品项贡献大部分存货价值，之后大量低价值 C 类品项只增加少量累计价值。
5. $Q^*=\sqrt{2\times80\times18{,}000/5}\approx759$ 件。
6. $OP=4\times60+100=340$ 件。
7. JIT 降低平均库存和持有成本，但安全缓冲变小，对供应商、物流和信息系统可靠性要求更高。
8. $30-10=20$ 天。
9. 授信扩大可减少因拒绝信用而失去的销售，却增加应收账款占用、坏账和管理成本。
10. 收入确认快于现金回收，应收账款积压或回款质量恶化；需进一步查看账龄、坏账和收入确认质量。

## 七 来源与待核对事项

### 来源

- XM Teacher：《06-Working capital management_I_current assets(1).pdf》，第 1—11 页，课堂课件。
- 本文图 1—5 均根据上述课件重绘；未取得公开改编许可，许可状态待核对。

### 待人工核对

- 课件将 EAY 的另一名称写为 “Efficient Annual Rate”，常见教材通常使用 “Effective Annual Rate”；本文保留 EAY 计算逻辑，但该英文全称需结合任课教师口径确认。
- 课件中的美国货币市场工具、期限与监管表述具有特定市场和时间背景，实际使用时需按当前制度更新。
- 邓白氏风险系数表为课件教学示例，不应直接替代企业当前采用的正式信用评级模型。
- 四川长虹案例图中的销售收入与净利润单位、统计口径应结合原年报进一步核对；本文只使用课件可明确辨认的趋势与 ACP 数值。
- 所有公式和案例结果需由课程学习者结合教师课堂讲解复核后使用。
