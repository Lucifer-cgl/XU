# 财务管理A 第6章 营运资本管理（II）：短期融资与净营运资本

> [!summary] 来源与范围
> 根据《06-Working capital management_II_Short-term Financing & NWC(1).pdf》第 1—6 页整理。原资料为 PowerPoint 讲义式 PDF，每个 PDF 页面包含多张幻灯片。整理日期：2026-10-21。

> [!note] 整理原则
> 按“短期融资成本 → 净营运资本 → 流动资产投资政策 → 流动资产融资策略 → 现金周期与 EFN”重组。课件中的公式、例题、表格与承担推导作用的图形均予以保留或重建；补充解释不视为教师原话。

## 知识地图

```text
营运资本管理（II）
├── 短期融资与资金成本
│   ├── 信用贷款、担保贷款与其他工具
│   ├── 实际资金成本
│   ├── 放弃现金折扣的成本
│   └── 额度费、预扣利息与补偿性存款
├── 净营运资本与短期财务政策
│   ├── 资金来源与资金运用
│   ├── 流动资产投资：弹性或紧缩
│   └── 流动资产融资：保守、匹配或激进
└── 营运资本与外部融资需求 EFN
    ├── 经营周期与现金周期
    ├── 存货、应收账款与应付账款天数
    └── 改善周转以缩小资金缺口
```

本章关注资产负债表的短期部分：企业一方面要决定持有多少现金、存货和应收账款，另一方面要决定用多少流动负债为这些资产融资。==流动性越充足，经营中断风险通常越低，但资金占用和融资成本可能越高；政策选择本质上是收益与风险的权衡。==

## 一 短期融资与实际资金成本

### 1 短期融资工具

短期融资工具是期限通常不超过一年的借款或融资安排。课件将其分为三类：

| 类别 | 典型工具 | 核心特征 |
|---|---|---|
| 信用贷款 | 银行信用额度、短期借款 | 主要依赖借款人的信用与还款能力 |
| 担保贷款 | 应收账款融资、存货抵押融资 | 以特定流动资产提供担保 |
| 其他来源 | 银行承兑汇票、商业票据 | 借助银行信用或资本市场融资 |

选择工具时不能只看合同利率，还应检查额度费、承诺费、预扣利息、补偿性存款和实际占用期，因为这些项目会改变真正可使用的资金。

### 2 实际资金成本的一般公式

课件采用的基本口径为：

$$
\boxed{
\text{实际资金成本率}
=\frac{\text{利息}+\text{其他费用}}{\text{实际可使用资金}}
}
$$

- 分子是取得资金必须承担的全部融资成本；
- 分母不是合同额度，而是企业真正能够使用的现金；
- 预扣利息和补偿性存款会减少分母，因此即使名义利率不变，实际资金成本也会上升。

若融资期间为 $t$ 天，期间成本率为 $y$，课件主要用单利法年化：

$$
\boxed{k_{\text{annual,simple}}=y\times\frac{365}{t}}
$$

若需要考虑复利，则有效年利率（Effective Annual Rate，EAR）为：

$$
\boxed{EAR=(1+y)^{365/t}-1}
$$

> [!warning] 年化口径
> 课件例题使用单利年化。考试或实践若明确要求 EAR，应使用复利公式；两种结果不能混写。

### 3 应付账款与信用条件

应付账款是企业购买材料、商品或接受劳务后尚未支付的款项。通过延期付款取得的资金属于商业信用融资，其成本取决于信用期限（Credit Period）和现金折扣（Cash Discount）。

信用条件“2/10，Net 30”表示：

- 在发票日起 10 天内付款，可享受 2% 的现金折扣；
- 不取折扣时，应在第 30 天全额付款；
- 放弃折扣相当于为第 10 天至第 30 天这 20 天的延期付款支付隐含利息。

#### 放弃现金折扣的成本

设：

- $DR$：现金折扣率（Discount Rate）；
- $T_{cp}$：信用期限天数；
- $T_{dp}$：现金折扣期限天数。

课件使用的单利年化成本为：

$$
\boxed{
k_{\text{trade credit}}
=\frac{DR}{1-DR}\times\frac{365}{T_{cp}-T_{dp}}
}
$$

对“2/10，Net 30”：

$$
\begin{aligned}
k_{\text{trade credit}}
&=\frac{2\%}{1-2\%}\times\frac{365}{30-10}\\
&\approx37.2\%
\end{aligned}
$$

> [!important] 决策含义
> 若企业能以明显低于 37.2% 的年成本借到短期资金，通常应借款并在折扣期内付款，而不是放弃折扣。但仍要同时比较手续费、信用风险与现金安排。

> [!failure] 常见错误
> 分母应是实际支付的 $1-DR$，而不是 1；占用天数是 $T_{cp}-T_{dp}$，不是完整信用期限 $T_{cp}$。

### 4 银行贷款实际成本例题

课件给出的贷款额度为 2,000,000 元，年利率 6.903%，借款人实际只使用 1,200,000 元；未使用部分收取 0.5% 的额度费（Commission）。

#### 情形一：只考虑利息

若使用完整 2,000,000 元且无其他费用：

$$
\text{利息}=2{,}000{,}000\times6.903\%=138{,}060\text{ 元}
$$

$$
k=\frac{138{,}060}{2{,}000{,}000}=6.903\%
$$

此时实际资金成本等于名义利率。

#### 情形二：实际使用 1,200,000 元并支付额度费

未使用额度为 800,000 元：

$$
\text{额度费}=(2{,}000{,}000-1{,}200{,}000)\times0.5\%=4{,}000\text{ 元}
$$

$$
\text{利息}=1{,}200{,}000\times6.903\%=82{,}836\text{ 元}
$$

$$
k=\frac{4{,}000+82{,}836}{1{,}200{,}000}\approx7.24\%
$$

#### 情形三：利息预扣

$$
\text{实际可用资金}=1{,}200{,}000-82{,}836=1{,}117{,}164\text{ 元}
$$

$$
k=\frac{4{,}000+82{,}836}{1{,}117{,}164}\approx7.77\%
$$

#### 情形四：利息预扣并保持 20% 补偿性存款

假设补偿性存款不计息：

$$
\text{实际可用资金}
=1{,}200{,}000(1-20\%)-82{,}836
=877{,}164\text{ 元}
$$

$$
k=\frac{4{,}000+82{,}836}{877{,}164}\approx9.90\%
$$

| 融资安排 | 总成本（元） | 实际可用资金（元） | 实际资金成本 |
|---|---:|---:|---:|
| 只按名义利率、全额使用 | 138,060 | 2,000,000 | 6.903% |
| 部分使用并收额度费 | 86,836 | 1,200,000 | 7.24% |
| 再加利息预扣 | 86,836 | 1,117,164 | 7.77% |
| 再加 20% 补偿性存款 | 86,836 | 877,164 | 9.90% |

==费用未变而可用资金不断减少，实际资金成本便由 7.24% 上升至 9.90%。==这正是短期融资不能只看名义利率的原因。

## 二 净营运资本与资金来源、运用

### 1 净营运资本的含义

净营运资本（Net Working Capital，NWC）是流动资产减流动负债：

$$
\boxed{NWC=CA-CL}
$$

其中，$CA$ 为流动资产，$CL$ 为流动负债。它反映长期资本在支持固定资产后，还剩多少用于流动资产。

由资产负债表恒等式可得：

$$
\boxed{NWC+FA=LTD+E}
$$

- $FA$：固定资产；
- $LTD$：长期负债；
- $E$：所有者权益。

继续拆分流动资产：

$$
NWC=Cash+OCA-CL
$$

所以：

$$
\boxed{Cash=LTD+E+CL-OCA-FA}
$$

其中，$OCA$ 是除现金以外的其他流动资产。

### 2 资金来源与资金运用

课件用资产负债表方向判断现金增减，原表方向保持如下：

| 项目 | 资产（除现金外） | 负债与权益 |
|---|:---:|:---:|
| 资金来源（增加现金） | − | + |
| 资金运用（减少现金） | + | − |

直觉是：出售或减少非现金资产会释放现金；增加负债或权益会带来现金。反之，购买资产或偿还负债、回购权益会使用现金。

> [!failure] 易错点
> “资产增加”不等于“资金来源”。对现金流量判断而言，除现金外的资产增加是资金运用。

## 三 在流动资产上的投资

### 1 弹性政策与紧缩政策

流动资产投资政策回答“为支持既定销售额，应持有多少流动资产”。课件以“流动资产／收入”衡量投资强度：

- 弹性政策（Flexible Policy）：比率高，现金、存货和应收账款较多；
- 紧缩政策（Restrictive Policy）：比率低，现金、存货和应收账款较少。

具体表现如下：

| 项目 | 弹性政策 | 紧缩政策 |
|---|---|---|
| 现金和有价证券 | 余额高 | 余额低，甚至不投资有价证券 |
| 存货 | 投资规模大 | 投资规模小 |
| 信用政策 | 较宽松，应收账款多 | 不赊销或严格赊销，应收账款少 |
| 流动性 | 高 | 低 |
| 预期收益 | 低 | 高 |
| 风险 | 低 | 高 |

<figure style="margin:1.5rem auto;max-width:820px;text-align:center;">
  <svg viewBox="0 0 820 430" role="img" aria-labelledby="ca-policy-title ca-policy-desc" style="width:100%;height:auto;background:#fbfcfe;border:1px solid #d9e2ec;border-radius:12px;">
    <title id="ca-policy-title">流动资产投资政策曲线图</title>
    <desc id="ca-policy-desc">横轴为产出，纵轴为流动资产规模。弹性政策A曲线最高，政策B居中，紧缩政策C最低；在相同产出下，弹性政策持有更多流动资产。</desc>
    <defs><marker id="ca-axis-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#334e68"/></marker></defs>
    <line x1="105" y1="350" x2="735" y2="350" stroke="#334e68" stroke-width="2.5" marker-end="url(#ca-axis-arrow)"/>
    <line x1="105" y1="350" x2="105" y2="55" stroke="#334e68" stroke-width="2.5" marker-end="url(#ca-axis-arrow)"/>
    <path d="M105 350 C180 182 380 105 690 76" fill="none" stroke="#dc2626" stroke-width="5"/>
    <path d="M105 350 C190 220 395 150 690 126" fill="none" stroke="#16a34a" stroke-width="5"/>
    <path d="M105 350 C205 255 410 205 690 183" fill="none" stroke="#2563eb" stroke-width="5"/>
    <line x1="475" y1="350" x2="475" y2="126" stroke="#64748b" stroke-width="1.5" stroke-dasharray="6 5"/>
    <circle cx="475" cy="118" r="6" fill="#dc2626"/><circle cx="475" cy="147" r="6" fill="#16a34a"/><circle cx="475" cy="195" r="6" fill="#2563eb"/>
    <text x="25" y="70" font-size="20" fill="#243b53" font-family="Arial, sans-serif">流动资产规模</text>
    <text x="645" y="395" font-size="20" fill="#243b53" font-family="Arial, sans-serif">产出（销量）</text>
    <text x="615" y="72" font-size="19" fill="#dc2626" font-family="Arial, sans-serif">政策 A：弹性</text>
    <text x="615" y="126" font-size="19" fill="#16a34a" font-family="Arial, sans-serif">政策 B：中等</text>
    <text x="615" y="184" font-size="19" fill="#2563eb" font-family="Arial, sans-serif">政策 C：紧缩</text>
    <text x="430" y="382" font-size="17" fill="#52606d" font-family="Arial, sans-serif">同一产出水平</text>
  </svg>
  <figcaption style="margin-top:.55rem;color:#52606d;font-size:.92rem;">图 1：流动资产投资政策曲线图。在相同产出下，弹性政策 A 的流动资产规模最高，紧缩政策 C 最低。根据课件 PDF 第 4 页重绘，引用许可待核对。</figcaption>
</figure>

### 2 成本权衡

持有较多流动资产会增加持有成本，但能降低现金短缺、缺货、停产和失去客户等短缺成本；持有较少流动资产则方向相反。

<figure style="margin:1.5rem auto;max-width:900px;text-align:center;">
  <svg viewBox="0 0 900 390" role="img" aria-labelledby="ca-cost-title ca-cost-desc" style="width:100%;height:auto;background:#fbfcfe;border:1px solid #d9e2ec;border-radius:12px;">
    <title id="ca-cost-title">流动资产持有成本与短缺成本权衡图</title>
    <desc id="ca-cost-desc">左右两个子图均以流动资产规模为横轴、成本为纵轴。持有成本向右上升，短缺成本向右下降，总成本呈U形；左图最低点对应较高流动资产规模的弹性政策，右图对应较低规模的紧缩政策。</desc>
    <defs><marker id="cost-axis-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#334e68"/></marker></defs>
    <g font-family="Arial, sans-serif">
      <text x="225" y="30" text-anchor="middle" font-size="21" font-weight="700" fill="#243b53">弹性政策：最低点偏右</text>
      <line x1="70" y1="320" x2="410" y2="320" stroke="#334e68" stroke-width="2" marker-end="url(#cost-axis-arrow)"/><line x1="70" y1="320" x2="70" y2="65" stroke="#334e68" stroke-width="2" marker-end="url(#cost-axis-arrow)"/>
      <path d="M90 295 Q200 270 273 210 Q330 150 385 92" fill="none" stroke="#16a34a" stroke-width="4"/><text x="315" y="125" font-size="16" fill="#15803d">持有成本</text>
      <path d="M90 90 Q180 165 273 210 Q330 260 385 295" fill="none" stroke="#2563eb" stroke-width="4"/><text x="95" y="112" font-size="16" fill="#1d4ed8">短缺成本</text>
      <path d="M92 95 Q180 250 273 270 Q330 255 387 105" fill="none" stroke="#dc2626" stroke-width="4"/><text x="310" y="90" font-size="16" fill="#dc2626">总成本</text>
      <line x1="273" y1="320" x2="273" y2="210" stroke="#64748b" stroke-dasharray="5 4"/><text x="255" y="346" font-size="16" fill="#52606d">CA*</text>

      <text x="675" y="30" text-anchor="middle" font-size="21" font-weight="700" fill="#243b53">紧缩政策：最低点偏左</text>
      <line x1="520" y1="320" x2="860" y2="320" stroke="#334e68" stroke-width="2" marker-end="url(#cost-axis-arrow)"/><line x1="520" y1="320" x2="520" y2="65" stroke="#334e68" stroke-width="2" marker-end="url(#cost-axis-arrow)"/>
      <path d="M540 295 Q600 270 650 210 Q740 145 835 92" fill="none" stroke="#16a34a" stroke-width="4"/><text x="765" y="125" font-size="16" fill="#15803d">持有成本</text>
      <path d="M540 90 Q590 160 650 210 Q740 275 835 295" fill="none" stroke="#2563eb" stroke-width="4"/><text x="545" y="112" font-size="16" fill="#1d4ed8">短缺成本</text>
      <path d="M542 95 Q600 250 650 270 Q730 265 837 115" fill="none" stroke="#dc2626" stroke-width="4"/><text x="760" y="99" font-size="16" fill="#dc2626">总成本</text>
      <line x1="650" y1="320" x2="650" y2="210" stroke="#64748b" stroke-dasharray="5 4"/><text x="632" y="346" font-size="16" fill="#52606d">CA*</text>
      <text x="450" y="378" text-anchor="middle" font-size="17" fill="#52606d">流动资产规模增加 → 持有成本上升、短缺成本下降</text>
    </g>
  </svg>
  <figcaption style="margin-top:.55rem;color:#52606d;font-size:.92rem;">图 2：流动资产成本权衡图。两幅子图都展示持有成本、短缺成本和总成本；最优流动资产规模位于总成本最低点。根据课件 PDF 第 4 页重绘，引用许可待核对。</figcaption>
</figure>

> [!warning] 并非流动资产越少越好
> 紧缩政策可能提高资产收益率，但也会提高缺货、停产、违约和客户流失风险。最优政策取决于业务波动、供应链可靠性、融资能力与客户信用需求。

## 四 流动资产的融资策略

### 1 永久性与暂时性流动资产

- 永久性流动资产：即使在业务低谷也必须维持的最低流动资产；
- 暂时性流动资产：因季节性销售、临时采购或短期扩张而超过永久性水平的部分。

<figure style="margin:1.5rem auto;max-width:820px;text-align:center;">
  <svg viewBox="0 0 820 390" role="img" aria-labelledby="permanent-temporary-title permanent-temporary-desc" style="width:100%;height:auto;background:#fbfcfe;border:1px solid #d9e2ec;border-radius:12px;">
    <title id="permanent-temporary-title">永久性与暂时性流动资产构成图</title>
    <desc id="permanent-temporary-desc">横轴为时间，纵轴为金额。向右上升的直线表示永久性流动资产，波动曲线表示流动资产总额；两者之间的区域是暂时性流动资产。</desc>
    <defs><marker id="pt-axis-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#334e68"/></marker></defs>
    <line x1="90" y1="325" x2="735" y2="325" stroke="#334e68" stroke-width="2.5" marker-end="url(#pt-axis-arrow)"/><line x1="90" y1="325" x2="90" y2="55" stroke="#334e68" stroke-width="2.5" marker-end="url(#pt-axis-arrow)"/>
    <path d="M105 263 L700 150" fill="none" stroke="#dc2626" stroke-width="4"/>
    <path d="M105 220 C155 155 205 238 255 182 C305 125 355 204 405 135 C455 75 510 166 560 112 C615 53 666 95 700 92" fill="none" stroke="#16a34a" stroke-width="5"/>
    <path d="M105 220 C155 155 205 238 255 182 C305 125 355 204 405 135 C455 75 510 166 560 112 C615 53 666 95 700 92 L700 150 L105 263 Z" fill="#dcfce7" opacity=".7"/>
    <text x="25" y="67" font-size="20" fill="#243b53" font-family="Arial, sans-serif">金额</text><text x="670" y="370" font-size="20" fill="#243b53" font-family="Arial, sans-serif">时间</text>
    <text x="535" y="75" font-size="18" fill="#15803d" font-family="Arial, sans-serif">流动资产总额</text>
    <text x="500" y="185" font-size="18" fill="#dc2626" font-family="Arial, sans-serif">永久性流动资产</text>
    <text x="355" y="115" font-size="18" fill="#166534" font-family="Arial, sans-serif">暂时性流动资产</text>
  </svg>
  <figcaption style="margin-top:.55rem;color:#52606d;font-size:.92rem;">图 3：永久性与暂时性流动资产构成图。流动资产总额围绕持续增长的永久性基础波动，曲线与基础线之间为暂时性需求。根据课件 PDF 第 4 页重绘，引用许可待核对。</figcaption>
</figure>

### 2 三种融资策略

流动资产融资政策回答“永久性和暂时性资产分别由短期还是长期资金支持”。

<figure style="margin:1.5rem auto;max-width:960px;text-align:center;">
  <svg viewBox="0 0 960 470" role="img" aria-labelledby="financing-strategy-title financing-strategy-desc" style="width:100%;height:auto;background:#fbfcfe;border:1px solid #d9e2ec;border-radius:12px;">
    <title id="financing-strategy-title">流动资产三种融资策略比较图</title>
    <desc id="financing-strategy-desc">三个子图从左到右分别为理想期限匹配、保守策略和激进策略。每图横轴为时间、纵轴为金额；蓝线为固定资产，红线为永久性流动资产边界，绿线为流动资产总额，黑色竖向箭头表示长期融资覆盖水平。</desc>
    <defs><marker id="fs-axis-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#334e68"/></marker></defs>
    <g font-family="Arial, sans-serif" font-size="14">
      <text x="165" y="28" text-anchor="middle" font-size="19" font-weight="700" fill="#243b53">① 理想的期限匹配</text>
      <line x1="40" y1="385" x2="290" y2="385" stroke="#334e68" stroke-width="2" marker-end="url(#fs-axis-arrow)"/><line x1="40" y1="385" x2="40" y2="65" stroke="#334e68" stroke-width="2" marker-end="url(#fs-axis-arrow)"/>
      <path d="M55 325 L275 282" fill="none" stroke="#2563eb" stroke-width="3"/><path d="M55 262 L275 210" fill="none" stroke="#dc2626" stroke-width="3"/>
      <path d="M55 237 C85 190 115 249 145 196 C175 148 205 222 235 157 C250 130 264 132 275 139" fill="none" stroke="#16a34a" stroke-width="4"/>
      <line x1="228" y1="385" x2="228" y2="220" stroke="#111827" stroke-width="2" marker-end="url(#fs-axis-arrow)"/><text x="151" y="410" text-anchor="middle" fill="#52606d">短期融资覆盖波动部分</text>
      <text x="60" y="343" fill="#2563eb">固定资产</text><text x="61" y="279" fill="#dc2626">永久性流动资产</text><text x="175" y="171" fill="#15803d">暂时性流动资产</text>

      <text x="480" y="28" text-anchor="middle" font-size="19" font-weight="700" fill="#243b53">② 保守策略</text>
      <line x1="355" y1="385" x2="605" y2="385" stroke="#334e68" stroke-width="2" marker-end="url(#fs-axis-arrow)"/><line x1="355" y1="385" x2="355" y2="65" stroke="#334e68" stroke-width="2" marker-end="url(#fs-axis-arrow)"/>
      <path d="M370 325 L590 282" fill="none" stroke="#2563eb" stroke-width="3"/><path d="M370 262 L590 210" fill="none" stroke="#dc2626" stroke-width="3"/>
      <path d="M370 237 C400 190 430 249 460 196 C490 148 520 222 550 157 C565 130 579 132 590 139" fill="none" stroke="#16a34a" stroke-width="4"/>
      <line x1="543" y1="385" x2="543" y2="165" stroke="#111827" stroke-width="2" marker-end="url(#fs-axis-arrow)"/><text x="480" y="410" text-anchor="middle" fill="#52606d">长期资金覆盖部分临时需求</text>
      <text x="375" y="343" fill="#2563eb">固定资产</text><text x="376" y="279" fill="#dc2626">永久性流动资产</text><text x="490" y="171" fill="#15803d">暂时性流动资产</text>

      <text x="795" y="28" text-anchor="middle" font-size="19" font-weight="700" fill="#243b53">③ 激进策略</text>
      <line x1="670" y1="385" x2="920" y2="385" stroke="#334e68" stroke-width="2" marker-end="url(#fs-axis-arrow)"/><line x1="670" y1="385" x2="670" y2="65" stroke="#334e68" stroke-width="2" marker-end="url(#fs-axis-arrow)"/>
      <path d="M685 325 L905 282" fill="none" stroke="#2563eb" stroke-width="3"/><path d="M685 262 L905 210" fill="none" stroke="#dc2626" stroke-width="3"/>
      <path d="M685 237 C715 190 745 249 775 196 C805 148 835 222 865 157 C880 130 894 132 905 139" fill="none" stroke="#16a34a" stroke-width="4"/>
      <line x1="858" y1="385" x2="858" y2="247" stroke="#111827" stroke-width="2" marker-end="url(#fs-axis-arrow)"/><text x="795" y="410" text-anchor="middle" fill="#52606d">短期资金覆盖部分永久需求</text>
      <text x="690" y="343" fill="#2563eb">固定资产</text><text x="691" y="279" fill="#dc2626">永久性流动资产</text><text x="805" y="171" fill="#15803d">暂时性流动资产</text>
      <text x="480" y="451" text-anchor="middle" font-size="16" fill="#52606d">从保守到激进：长期融资占比下降，短期再融资风险上升</text>
    </g>
  </svg>
  <figcaption style="margin-top:.55rem;color:#52606d;font-size:.92rem;">图 4：流动资产融资策略三联比较图。左图为理想期限匹配，中图为保守策略，右图为激进策略；三图均区分固定资产、永久性流动资产和暂时性流动资产。根据课件 PDF 第 4—5 页重绘，引用许可待核对。</figcaption>
</figure>

三种策略的含义：

| 策略 | 长期融资覆盖范围 | 短期融资覆盖范围 | 主要特点 |
|---|---|---|---|
| 理想期限匹配 | 固定资产和永久性流动资产 | 暂时性流动资产 | 资产期限与资金期限相配 |
| 保守策略 | 固定资产、永久性流动资产及部分暂时性流动资产 | 剩余暂时性流动资产 | 流动性较高，成本可能较高 |
| 激进策略 | 固定资产及部分永久性流动资产 | 暂时性资产及部分永久性资产 | 成本可能较低，再融资风险较高 |

### 3 资产与资本的期限匹配

课件原表的行列方向保持如下：

| 资产期限 \ 融资期限 | 短期融资 | 长期融资 |
|---|---|---|
| 短期（暂时性）资产 | 中等风险—收益 | 低风险—收益 |
| 长期（永久性）资产 | 高风险—收益 | 中等风险—收益 |

期限错配的关键风险是：如果用短期资金支持长期资产，企业必须频繁续借，可能在利率上升或信用收紧时无法滚动融资。反过来，用长期资金长期覆盖短期波动需求会降低风险，但可能造成闲置资金和较高融资成本。

## 五 营运资本管理与 EFN

### 1 经营周期与现金周期

经营周期（Operating Cycle）从购买原材料开始，到收回销售现金为止：

$$
\boxed{
\text{经营周期}=\text{存货周转天数}+\text{应收账款周转天数}
}
$$

现金周期（Cash Conversion Cycle，CCC）从支付采购款开始，到收回销售现金为止：

$$
\boxed{
\text{现金周期}
=\text{存货周转天数}+\text{应收账款周转天数}-\text{应付账款支付期}
}
$$

<figure style="margin:1.5rem auto;max-width:900px;text-align:center;">
  <svg viewBox="0 0 900 390" role="img" aria-labelledby="cash-cycle-title cash-cycle-desc" style="width:100%;height:auto;background:#fbfcfe;border:1px solid #d9e2ec;border-radius:12px;">
    <title id="cash-cycle-title">经营周期与现金周期时间轴图</title>
    <desc id="cash-cycle-desc">时间轴依次标出赊购原材料、支付采购款、产成品赊销和收回现金。经营周期从赊购原材料到现金回收，现金周期从支付采购款到现金回收。</desc>
    <defs><marker id="cc-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#334e68"/></marker></defs>
    <line x1="80" y1="220" x2="825" y2="220" stroke="#334e68" stroke-width="3" marker-end="url(#cc-arrow)"/>
    <g stroke="#334e68" stroke-width="2"><line x1="120" y1="205" x2="120" y2="235"/><line x1="315" y1="205" x2="315" y2="235"/><line x1="530" y1="205" x2="530" y2="235"/><line x1="760" y1="205" x2="760" y2="235"/></g>
    <g font-family="Arial, sans-serif" font-size="17" fill="#243b53" text-anchor="middle"><text x="120" y="264">赊购原材料</text><text x="315" y="264">支付采购款</text><text x="530" y="264">产成品赊销</text><text x="760" y="264">收回现金</text></g>
    <line x1="120" y1="110" x2="760" y2="110" stroke="#2563eb" stroke-width="5" marker-end="url(#cc-arrow)"/>
    <text x="440" y="92" text-anchor="middle" font-size="20" fill="#1d4ed8" font-family="Arial, sans-serif">经营周期 = 存货周转天数 + 应收账款周转天数</text>
    <line x1="315" y1="170" x2="760" y2="170" stroke="#dc2626" stroke-width="5" marker-end="url(#cc-arrow)"/>
    <text x="538" y="153" text-anchor="middle" font-size="20" fill="#dc2626" font-family="Arial, sans-serif">现金周期</text>
    <line x1="120" y1="305" x2="530" y2="305" stroke="#16a34a" stroke-width="4" marker-end="url(#cc-arrow)"/><text x="325" y="334" text-anchor="middle" font-size="18" fill="#15803d" font-family="Arial, sans-serif">存货周期</text>
    <line x1="530" y1="305" x2="760" y2="305" stroke="#7c3aed" stroke-width="4" marker-end="url(#cc-arrow)"/><text x="645" y="334" text-anchor="middle" font-size="18" fill="#6d28d9" font-family="Arial, sans-serif">应收账款周期</text>
    <line x1="120" y1="365" x2="315" y2="365" stroke="#d97706" stroke-width="4" marker-end="url(#cc-arrow)"/><text x="218" y="352" text-anchor="middle" font-size="18" fill="#b45309" font-family="Arial, sans-serif">应付账款周期</text>
  </svg>
  <figcaption style="margin-top:.55rem;color:#52606d;font-size:.92rem;">图 5：经营周期与现金周期时间轴图。经营周期从赊购原材料至现金回收，现金周期则从实际支付采购款开始。根据课件 PDF 第 5 页重绘，引用许可待核对。</figcaption>
</figure>

### 2 课件中的企业比较

| 企业 | 存货周转天数 | 应收账款周转天数 | 应付账款支付期 | 经营周期 | 现金周期 |
|---|---:|---:|---:|---:|---:|
| 法拉电子 | 93 天 | 161 天 | 53 天 | 254 天 | 201 天 |
| 江海股份 | 92 天 | 130 天 | 96 天 | 222 天 | 126 天 |
| 亚马逊 | 52 天 | 27 天 | 113 天 | 79 天 | −34 天 |

亚马逊案例中的现金周期为负，表示企业通常在向供应商付款前已经从客户处收回现金。这会显著降低营运资本占用，但结果依赖强议价能力、快速周转和稳定销售，不能机械复制到所有企业。

### 3 营运资本如何影响外部融资需求

外部融资需求（External Financing Needed，EFN）是预测资产需求超过预测自发负债、留存收益及已有融资来源的缺口。营运资本管理可以通过以下方式改变 EFN：

- 缩短收款期，降低应收账款；
- 加速存货周转，降低存货占用；
- 在不损害信用的前提下延长付款期，提高应付账款；
- 管理预收账款、预付账款等其他经营性项目；
- 必要时调整增长目标与费用结构。

这些措施并非免费：收款过严可能流失客户，压低存货可能增加缺货风险，延迟付款可能失去折扣或损害供应商关系。

### 4 R&E 供应公司案例

课件设定 R&E 供应公司的原预测 EFN 为 142.2 万美元，而银行不能提供超过 100 万美元的贷款。信贷人员与管理层协商后作出以下调整：

1. 应收账款收款期由 51 天缩短至 47 天；
2. 应付账款付款期由 59 天延长至 60 天；
3. 因更严格的信用政策与放弃部分及时付款折扣，销售增长率由 25% 降至 20%；
4. 行政、销售和管理费用率由 12% 上升至 12.5%。

重新预测的资产负债表保持课件原有“项目在左、金额和依据在右”的方向：

| 项目 | 金额（千美元） | 预测依据 |
|---|---:|---|
| **资产** |  |  |
| 现金与有价证券 | 1,220 | 18 天销售量 |
| 应收账款 | 3,185 | 收款期 47 天 |
| 存货 | 2,364 | 周转 9 次 |
| 预付费用 | 20 | 大致估算 |
| **流动资产小计** | **6,789** |  |
| 固定资产净值 | 280 | 资本性支出计划 |
| **资产合计** | **7,069** |  |
| **负债与股东权益** |  |  |
| 银行借款 | 0 |  |
| 应付账款 | 3,497 | 付款期 60 天 |
| 长期负债的即将到期部分 | 100 | 借款协议 |
| 应付工资 | 22 | 薪酬规定 |
| **流动负债小计** | **3,619** |  |
| 长期负债 | 660 |  |
| 普通股 | 150 |  |
| 留存收益 | 1,657 | 留存比例 50% |
| **负债与股东权益合计** | **6,086** |  |
| **外部融资需要量** | **982** | $7{,}069-6{,}086$，取课件数值 |

<figure style="margin:1.5rem auto;max-width:820px;text-align:center;">
  <svg viewBox="0 0 820 390" role="img" aria-labelledby="efn-comparison-title efn-comparison-desc" style="width:100%;height:auto;background:#fbfcfe;border:1px solid #d9e2ec;border-radius:12px;">
    <title id="efn-comparison-title">R&amp;E 供应公司调整前后 EFN 比较图</title>
    <desc id="efn-comparison-desc">左侧为原预测，资产763万美元、负债436万美元、股东权益185万美元，EFN约142万美元；右侧为调整后预测，资产707万美元、负债428万美元、股东权益181万美元，EFN约98万美元。</desc>
    <g font-family="Arial, sans-serif">
      <text x="215" y="38" text-anchor="middle" font-size="22" font-weight="700" fill="#243b53">调整前</text>
      <rect x="95" y="80" width="110" height="230" fill="#f97316" rx="6"/><text x="150" y="128" text-anchor="middle" font-size="18" fill="white">资产</text><text x="150" y="158" text-anchor="middle" font-size="21" font-weight="700" fill="white">$763万</text>
      <rect x="230" y="80" width="110" height="132" fill="#ef4444" rx="6"/><text x="285" y="120" text-anchor="middle" font-size="17" fill="white">负债</text><text x="285" y="148" text-anchor="middle" font-size="19" font-weight="700" fill="white">$436万</text>
      <rect x="230" y="212" width="110" height="56" fill="#dc2626" rx="4"/><text x="285" y="246" text-anchor="middle" font-size="16" fill="white">权益 $185万</text>
      <rect x="230" y="268" width="110" height="42" fill="#facc15" rx="4"/><text x="285" y="295" text-anchor="middle" font-size="16" font-weight="700" fill="#713f12">EFN $142万</text>

      <text x="605" y="38" text-anchor="middle" font-size="22" font-weight="700" fill="#243b53">改善营运资本管理后</text>
      <rect x="485" y="96" width="110" height="214" fill="#f97316" rx="6"/><text x="540" y="140" text-anchor="middle" font-size="18" fill="white">资产</text><text x="540" y="170" text-anchor="middle" font-size="21" font-weight="700" fill="white">$707万</text>
      <rect x="620" y="96" width="110" height="130" fill="#ef4444" rx="6"/><text x="675" y="135" text-anchor="middle" font-size="17" fill="white">负债</text><text x="675" y="163" text-anchor="middle" font-size="19" font-weight="700" fill="white">$428万</text>
      <rect x="620" y="226" width="110" height="54" fill="#dc2626" rx="4"/><text x="675" y="259" text-anchor="middle" font-size="16" fill="white">权益 $181万</text>
      <rect x="620" y="280" width="110" height="30" fill="#facc15" rx="4"/><text x="675" y="301" text-anchor="middle" font-size="15" font-weight="700" fill="#713f12">EFN $98万</text>
      <path d="M365 195 L450 195" stroke="#16a34a" stroke-width="5"/><path d="M450 195 L430 184 L430 206 Z" fill="#16a34a"/>
      <text x="408" y="174" text-anchor="middle" font-size="18" fill="#15803d">资金缺口下降</text>
      <text x="410" y="357" text-anchor="middle" font-size="19" fill="#243b53">EFN：约 142 万美元 → 约 98 万美元</text>
    </g>
  </svg>
  <figcaption style="margin-top:.55rem;color:#52606d;font-size:.92rem;">图 6：R&amp;E 供应公司调整前后 EFN 结构比较图。左图为原预测，右图为改善营运资本管理后的预测，资金缺口由约 142 万美元降至约 98 万美元。根据课件 PDF 第 6 页重绘，引用许可待核对。</figcaption>
</figure>

> [!important] 案例结论
> 改善周转可以减少资产占用并增加经营性融资，从而降低 EFN；但本案例也显示，信用政策收紧和付款期延长可能牺牲销售增长、费用率或折扣，因此必须比较节约的融资成本与经营损失。

## 六 公式速查表

| 模块 | 公式 | 含义 |
|---|---|---|
| 实际资金成本 | $(利息+其他费用)/实际可用资金$ | 以真正可支配的现金为分母 |
| 单利年化 | $y\times365/t$ | 课件采用的年化方法 |
| 有效年利率 | $(1+y)^{365/t}-1$ | 考虑复利的年化成本 |
| 放弃现金折扣成本 | $\frac{DR}{1-DR}\frac{365}{T_{cp}-T_{dp}}$ | 商业信用隐含成本 |
| 净营运资本 | $NWC=CA-CL$ | 流动资产减流动负债 |
| 长期资本关系 | $NWC+FA=LTD+E$ | 长期资本支持固定资产与 NWC |
| 现金恒等式 | $Cash=LTD+E+CL-OCA-FA$ | 资金来源与资金运用关系 |
| 经营周期 | $DIO+DSO$ | 从购入存货到收回现金 |
| 现金周期 | $DIO+DSO-DPO$ | 企业现金被经营活动占用的天数 |

其中：

- $DIO$：存货周转天数；
- $DSO$：应收账款周转天数；
- $DPO$：应付账款支付期；
- $CA$、$CL$：流动资产与流动负债；
- $FA$、$LTD$、$E$：固定资产、长期负债和所有者权益。

## 七 高频易错点与答题顺序

### 1 高频易错点

1. 实际资金成本的分母是实际可用资金，不一定等于合同额度或实际借款额。
2. 预扣利息和补偿性存款主要通过压低分母提高实际资金成本。
3. “2/10，Net 30”的融资期是 20 天，而不是 10 天或 30 天。
4. 弹性流动资产政策流动性高、风险低，但预期收益也较低。
5. 激进融资策略会用短期资金支持部分永久性资产，再融资风险最高。
6. 经营周期不扣除应付账款天数；现金周期才扣除。
7. 负现金周期不等于企业没有风险，它仍依赖销售回款、库存周转和供应商信用。
8. 降低 EFN 不等于无成本，信用收紧、压库存与延迟付款都可能影响经营。

### 2 计算题推荐顺序

```text
确认题目要求的成本口径与期间
          ↓
列出利息、费用、预扣项目和受限资金
          ↓
计算实际可用资金
          ↓
期间成本 = 总成本 ÷ 实际可用资金
          ↓
按单利或复利要求年化
          ↓
解释结果对融资决策的含义
```

## 八 自测题

1. 为什么银行贷款的实际资金成本可能高于合同利率？
2. 解释“2/10，Net 30”，并计算放弃折扣的单利年化成本。
3. 贷款额度 100 万元，实际使用 70 万元，未使用额度费为 0.4%，年利率为 6%，利息预扣。计算实际资金成本。
4. 分别说明弹性和紧缩的流动资产投资政策对流动性、收益和风险的影响。
5. 比较期限匹配、保守和激进三种融资策略。
6. 某企业存货周转天数 60 天、应收账款周转天数 45 天、应付账款支付期 50 天，计算经营周期和现金周期。
7. 为什么缩短收款期、加速存货周转和延长付款期可以降低 EFN？这些措施分别可能带来什么代价？

### 自测题 3 参考答案

$$
\text{额度费}=(1{,}000{,}000-700{,}000)\times0.4\%=1{,}200\text{ 元}
$$

$$
\text{利息}=700{,}000\times6\%=42{,}000\text{ 元}
$$

$$
\text{实际可用资金}=700{,}000-42{,}000=658{,}000\text{ 元}
$$

$$
k=\frac{42{,}000+1{,}200}{658{,}000}\approx6.57\%
$$

该结果高于 6% 的名义利率，因为额度费增加了分子，预扣利息减少了分母。此题为根据课件方法编写的假设案例。

### 自测题 6 参考答案

$$
\text{经营周期}=60+45=105\text{ 天}
$$

$$
\text{现金周期}=60+45-50=55\text{ 天}
$$

企业从支付采购款到收回销售现金，平均需要垫付资金 55 天。

## 九 来源与待核对事项

### 来源

- 《06-Working capital management_II_Short-term Financing & NWC(1).pdf》，第 1—6 页，课程课件；作者与公开授权状态待核对。

### 待人工核对

- 课件未标明教师、作者和教材版本，正式发布前应补充来源信息。
- R&E 案例中调整前数据在汇总图中采用约数；本文按课件显示的“142.2 万美元降至 98.2 万美元”表述，未反推未展示的完整原预测报表。
- 企业现金周期数据属于课件当时的示例，不应视为当前经营数据。
- 全部图形均根据课件重绘，公开展示与改编许可待核对。
