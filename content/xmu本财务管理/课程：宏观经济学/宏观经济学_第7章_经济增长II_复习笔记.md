# 宏观经济学 第7章 经济增长 II

> [!summary] 来源与范围
> 根据课堂课件《第7章 经济增长II.pptx》第 1—69 页整理，内容承接“经济增长 I”中的基本索洛模型、黄金律与人口增长。整理日期：2026-10-21。

> [!note] 整理原则
> 按“技术进步版索洛模型 → 增长政策 → 生产率经验与收敛 → 内生增长 → 中国增长解释 → 资源环境与高质量发展”重组。历史数据仅反映课件给出的时期，不作为当前统计；简单核心图形使用内嵌 SVG 重绘。

## 知识地图

```text
经济增长 II
├── 技术进步版索洛模型
│   ├── 劳动效率 E 与效率工人 LE
│   ├── 每效率工人资本 k、产出 y
│   ├── 收支相抵投资 (δ+n+g)k
│   └── 稳态增长与黄金律
├── 促进增长的政策
│   ├── 评价储蓄率
│   ├── 提高储蓄
│   ├── 配置物质资本、基础设施与人力资本
│   └── 鼓励技术进步
├── 经验事实
│   ├── 生产率增长减缓与信息技术
│   ├── 均衡增长
│   ├── 绝对收敛与条件收敛
│   └── 资本与生产效率的跨国差异
├── 内生增长理论
│   ├── AK 模型
│   ├── Romer 的产品种类扩张模型
│   └── 两部门研发模型
└── 中国与发展专题
    ├── 中国经济增长的多种解释
    ├── 资源诅咒
    ├── 环境库兹涅茨曲线
    └── 高质量发展与根本因素
```

上一讲把技术水平视为常量，因此基本索洛模型的稳态人均产出不再增长。本讲引入持续提高的劳动效率，并进一步追问：技术进步从哪里来，不同国家为什么没有自动收敛到同一收入水平，以及制度、文化和地理如何通过资本、劳动与技术影响增长。

## 一 技术进步版索洛模型

### 1 劳动增广型技术进步

设 $E$ 为劳动效率（Labor Efficiency）。课件假定技术进步是劳动增广型（Labor-Augmenting），劳动效率按外生速率 $g$ 增长：

$$
\boxed{g=\frac{\Delta E}{E}}
$$

生产函数写为：

$$
\boxed{Y=F(K,L\times E)}
$$

- $Y$：总产出；
- $K$：资本存量；
- $L$：劳动人数；
- $E$：每名劳动者的效率；
- $LE$：效率工人数量。

劳动效率提高与劳动力数量增加都会扩大有效劳动投入，但含义不同：前者让同样数量的工人更有效率，后者只是增加工人数。

### 2 每效率工人口径

技术进步存在时，应把资本和产出除以效率工人数量：

$$
k=\frac{K}{LE},\qquad y=\frac{Y}{LE}
$$

于是每效率工人的生产函数与投资函数为：

$$
y=f(k),\qquad i=sy=sf(k)
$$

这里的 $k$ 与 $y$ 不再是普通“人均资本”和“人均产出”，而是==每效率工人资本和每效率工人产出==。

### 3 收支相抵投资与资本动态

保持 $k=K/(LE)$ 不变，需要同时补偿三种摊薄力量：

$$
\boxed{(\delta+n+g)k}
$$

- $\delta k$：补偿折旧；
- $nk$：为新增劳动者配备资本；
- $gk$：为技术进步带来的新增效率工人配备资本。

资本动态方程为：

$$
\boxed{\Delta k=sf(k)-(\delta+n+g)k}
$$

稳态条件：

$$
\boxed{sf(k^*)=(\delta+n+g)k^*}
$$

<figure style="margin:1.5rem auto;max-width:820px;text-align:center;">
  <svg viewBox="0 0 820 450" role="img" aria-labelledby="tech-solow-title tech-solow-desc" style="width:100%;height:auto;background:#fbfcfe;border:1px solid #d9e2ec;border-radius:12px;">
    <title id="tech-solow-title">技术进步版索洛模型的稳态图</title>
    <desc id="tech-solow-desc">横轴为每效率工人资本，纵轴为每效率工人投资。凹形储蓄投资曲线 sf(k) 与直线收支相抵投资曲线 (δ+n+g)k 相交于稳态资本 k星。</desc>
    <defs><marker id="tech-solow-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#334e68"/></marker></defs>
    <line x1="95" y1="370" x2="735" y2="370" stroke="#334e68" stroke-width="2.5" marker-end="url(#tech-solow-arrow)"/>
    <line x1="95" y1="370" x2="95" y2="52" stroke="#334e68" stroke-width="2.5" marker-end="url(#tech-solow-arrow)"/>
    <path d="M95 370 C220 185 430 120 690 100" fill="none" stroke="#2563eb" stroke-width="5"/>
    <line x1="95" y1="370" x2="690" y2="70" stroke="#dc2626" stroke-width="5"/>
    <circle cx="480" cy="176" r="8" fill="#111827"/>
    <line x1="480" y1="176" x2="480" y2="370" stroke="#64748b" stroke-width="1.8" stroke-dasharray="6 5"/>
    <text x="28" y="58" font-size="21" fill="#243b53" font-family="Arial, sans-serif">每效率工人投资</text>
    <text x="585" y="414" font-size="21" fill="#243b53" font-family="Arial, sans-serif">每效率工人资本 k</text>
    <text x="625" y="180" font-size="21" fill="#2563eb" font-family="Arial, sans-serif">sf(k)</text>
    <text x="505" y="78" font-size="21" fill="#dc2626" font-family="Arial, sans-serif">(δ+n+g)k</text>
    <text x="465" y="400" font-size="20" fill="#111827" font-family="Arial, sans-serif">k*</text>
    <text x="210" y="310" font-size="17" fill="#52606d" font-family="Arial, sans-serif">sf(k) &gt; (δ+n+g)k，k 增加</text>
    <text x="520" y="245" font-size="17" fill="#52606d" font-family="Arial, sans-serif">sf(k) &lt; (δ+n+g)k，k 减少</text>
  </svg>
  <figcaption style="margin-top:.55rem;color:#52606d;font-size:.92rem;">图 1：技术进步版索洛模型的稳态图。凹形曲线是实际投资 $sf(k)$，直线是收支相抵投资 $(\delta+n+g)k$；交点决定每效率工人资本的稳态。根据课件第 9 页重绘，引用许可待核对。</figcaption>
</figure>

### 4 稳态中的增长率

稳态不等于所有变量停止增长。停止增长的是每效率工人口径：

| 变量 | 定义 | 稳态增长率 |
|---|---|---:|
| 每效率工人资本 | $k=K/(LE)$ | 0 |
| 每效率工人产出 | $y=Y/(LE)$ | 0 |
| 人均资本 | $K/L=kE$ | $g$ |
| 人均产出 | $Y/L=yE$ | $g$ |
| 总资本 | $K=kEL$ | $n+g$ |
| 总产出 | $Y=yEL$ | $n+g$ |

> [!important] 核心结论
> 技术进步版索洛模型中，长期人均产出增长率由外生技术进步率 $g$ 决定。储蓄率改变稳态人均产出的水平，但不能永久改变其稳态增长率。

### 5 技术进步下的黄金律

稳态每效率工人消费为：

$$
c^*=f(k^*)-(\delta+n+g)k^*
$$

使稳态消费最大的黄金律条件为：

$$
\boxed{MPK=\delta+n+g}
$$

等价地：

$$
\boxed{MPK-\delta=n+g}
$$

净资本边际产出若高于 $n+g$，表明资本低于黄金律水平；提高储蓄率能够把经济推向资本更多、稳态消费更高的位置。反之，则资本可能过度积累。

## 二 促进经济增长的政策

### 1 用黄金律评价储蓄率

判断储蓄率是否合适，需要比较：

$$
MPK-\delta\quad\text{与}\quad n+g
$$

| 比较结果 | 资本相对黄金律的位置 | 储蓄率方向 |
|---|---|---|
| $MPK-\delta>n+g$ | 资本低于黄金律 | 可提高 $s$ |
| $MPK-\delta=n+g$ | 正好处于黄金律 | 维持 |
| $MPK-\delta<n+g$ | 资本高于黄金律 | 可降低 $s$ |

课件用美国历史数据演示估算方法：

$$
k=2.5y,\qquad \delta k=0.1y,\qquad MPK\times k=0.3y
$$

因此：

$$
\delta=\frac{0.1y}{2.5y}=0.04
$$

$$
MPK=\frac{0.3y}{2.5y}=0.12
$$

$$
MPK-\delta=0.12-0.04=0.08
$$

课件再用 $n+g=0.03$ 比较，得到：

$$
0.08>0.03
$$

所以该历史示例判断美国资本低于黄金律稳态，提高储蓄率能够提高过渡期增长并最终提高稳态消费。

> [!warning] 数据口径
> 以上数值是课件用于说明估算方法的历史事实，不代表当前美国经济。答题重点是推导与比较逻辑。

### 2 提高储蓄率的政策

课件列举两类政策：

- 提高公共储蓄：减少政府预算赤字或增加预算盈余；
- 激励私人储蓄：调整资本利得税、公司所得税、遗产税、消费税和退休账户税收优惠。

政策评价不能只看储蓄增加，还要考虑税收公平、财政约束、消费福利和资本流动。索洛模型说明提高储蓄的长期水平效应，但不自动证明某项具体税制一定有效。

### 3 配置不同类型的资本

现实中的资本至少包括：

1. 私人拥有的物质资本；
2. 公共基础设施；
3. 人力资本，即教育和训练形成的知识与技能。

一种思路是给予各行业和各种资本相同税收待遇，让市场把投资配置给边际产出最高的用途。另一种思路是产业政策，即政府鼓励存在正外部性的资本或行业。

> [!warning] 产业政策的难点
> 政府可能难以识别真正具有高社会回报的行业，也可能受到政治献金、寻租和信息不足影响。正外部性为政策提供理由，但不能保证政策实施一定成功。

### 4 鼓励技术进步

课件提出的工具包括：

- 专利制度，以暂时垄断收益奖励创新；
- 研发（Research and Development，R&D）税收激励；
- 资助大学基础研究；
- 对关键技术行业实施产业政策。

专利保护存在期限权衡：保护太弱会削弱创新激励，保护太强又会限制知识扩散和后续创新。

## 三 生产率增长的经验事实

### 1 生产率增长减缓

课件比较多个国家的人均产出年增长率：

| 国家 | 1948—1972 | 1972—1995 | 1995—2000 |
|---|---:|---:|---:|
| 加拿大 | 2.9% | 1.8% | 2.7% |
| 法国 | 4.3% | 1.6% | 2.2% |
| 德国 | 5.7% | 2.0% | 1.7% |
| 意大利 | 4.9% | 2.3% | 4.7% |
| 日本 | 8.2% | 2.6% | 1.1% |
| 英国 | 2.4% | 1.8% | 2.5% |
| 美国 | 2.2% | 1.5% | 2.9% |

多数国家在 1972—1995 年的增长率低于 1948—1972 年。课件讨论了四种可能解释：

- 衡量问题：部分生产率改善没有进入统计；
- 石油冲击：能源价格上涨与减速同期发生；
- 劳动力构成：大量新进入者平均经验较少；
- 创新机会变化：战后早期增长可能异常迅速。

这些解释各有不足，课件的结论是：无法把减速完全归因于单一因素。

### 2 信息技术与“新经济”

1995—2000 年部分国家生产率增长重新加快。课件认为信息技术影响总生产率需要时间，原因包括计算机产业早期占 GDP 比重较小，以及企业需要调整组织和流程后才能充分利用新技术。

> [!failure] 因果推断
> 时间上的同时发生不能单独证明因果关系。判断信息技术的贡献还需要增长核算、行业数据和反事实比较。

## 四 均衡增长与经济收敛

### 1 均衡增长的典型事实

技术进步版索洛模型预测：

- $Y/L$ 与 $K/L$ 都按 $g$ 增长，因此 $K/Y$ 长期相对稳定；
- 实际工资与劳动生产率大致以相同速度增长；
- 稳态中的实际资本租金相对稳定。

多种变量以稳定比例共同增长，称为均衡增长（Balanced Growth）。

### 2 追赶效应

若国家拥有相同稳态但初始资本不同，资本较少的国家因资本边际产出较高而增长更快，资本较多的国家增长较慢。这种初始收入与后续增长率的负相关称为追赶效应（Catch-up Effect）。

<figure style="margin:1.5rem auto;max-width:780px;text-align:center;">
  <svg viewBox="0 0 780 430" role="img" aria-labelledby="catchup-title catchup-desc" style="width:100%;height:auto;background:#fbfcfe;border:1px solid #d9e2ec;border-radius:12px;">
    <title id="catchup-title">经济增长的追赶线图</title>
    <desc id="catchup-desc">横轴为初始生产率或人均收入，纵轴为随后生产率或人均收入增长率。追赶线向右下倾斜，表示初始较穷的经济体增长较快，初始较富的经济体增长较慢。</desc>
    <defs><marker id="catchup-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#334e68"/></marker></defs>
    <line x1="100" y1="355" x2="700" y2="355" stroke="#334e68" stroke-width="2.5" marker-end="url(#catchup-arrow)"/>
    <line x1="100" y1="355" x2="100" y2="55" stroke="#334e68" stroke-width="2.5" marker-end="url(#catchup-arrow)"/>
    <line x1="160" y1="90" x2="640" y2="315" stroke="#64748b" stroke-width="5"/>
    <circle cx="240" cy="128" r="8" fill="#2563eb"/><line x1="240" y1="128" x2="240" y2="355" stroke="#2563eb" stroke-dasharray="6 5"/><line x1="100" y1="128" x2="240" y2="128" stroke="#2563eb" stroke-dasharray="6 5"/>
    <circle cx="565" cy="280" r="8" fill="#dc2626"/><line x1="565" y1="280" x2="565" y2="355" stroke="#dc2626" stroke-dasharray="6 5"/><line x1="100" y1="280" x2="565" y2="280" stroke="#dc2626" stroke-dasharray="6 5"/>
    <text x="30" y="65" font-size="20" fill="#243b53" font-family="Arial, sans-serif">后续增长率</text><text x="500" y="402" font-size="20" fill="#243b53" font-family="Arial, sans-serif">初始生产率或人均收入</text>
    <text x="255" y="112" font-size="18" fill="#1d4ed8" font-family="Arial, sans-serif">初始较穷，增长较快</text>
    <text x="470" y="260" font-size="18" fill="#dc2626" font-family="Arial, sans-serif">初始较富，增长较慢</text>
    <text x="440" y="155" font-size="19" fill="#52606d" font-family="Arial, sans-serif">追赶线</text>
  </svg>
  <figcaption style="margin-top:.55rem;color:#52606d;font-size:.92rem;">图 2：经济增长的追赶线图。向右下倾斜的追赶线表示在其他条件相同时，初始收入较低的经济体增长更快。根据课件第 31 页重绘，引用许可待核对。</figcaption>
</figure>

### 3 绝对收敛与条件收敛

课件比较了多组历史散点图：美国州之间、发达国家之间通常呈现明显负相关，而包含差异很大的发展中国家样本时，追赶关系并不明显。

<figure style="margin:1.5rem auto;max-width:900px;text-align:center;">
  <svg viewBox="0 0 900 400" role="img" aria-labelledby="convergence-evidence-title convergence-evidence-desc" style="width:100%;height:auto;background:#fbfcfe;border:1px solid #d9e2ec;border-radius:12px;">
    <title id="convergence-evidence-title">收敛证据的双面板示意散点图</title>
    <desc id="convergence-evidence-desc">左图表示美国州或制度条件相近的发达经济体，初始收入与随后增长率呈明显负相关；右图表示差异较大的发展中经济体，散点分散且负相关不明显。本图只重现课件趋势，不提供精确观测值。</desc>
    <g font-family="Arial, sans-serif">
      <text x="230" y="30" text-anchor="middle" font-size="20" font-weight="700" fill="#243b53">条件相近的经济体：追赶明显</text>
      <line x1="70" y1="335" x2="420" y2="335" stroke="#334e68" stroke-width="2"/><line x1="70" y1="335" x2="70" y2="65" stroke="#334e68" stroke-width="2"/>
      <line x1="105" y1="95" x2="390" y2="305" stroke="#2563eb" stroke-width="3"/>
      <g fill="#64748b"><circle cx="115" cy="105" r="6"/><circle cx="145" cy="132" r="6"/><circle cx="166" cy="125" r="6"/><circle cx="190" cy="170" r="6"/><circle cx="218" cy="178" r="6"/><circle cx="245" cy="220" r="6"/><circle cx="272" cy="210" r="6"/><circle cx="300" cy="252" r="6"/><circle cx="330" cy="270" r="6"/><circle cx="370" cy="292" r="6"/></g>
      <text x="230" y="375" text-anchor="middle" font-size="16" fill="#52606d">初始人均收入</text><text x="24" y="205" transform="rotate(-90 24 205)" text-anchor="middle" font-size="16" fill="#52606d">随后增长率</text>

      <text x="675" y="30" text-anchor="middle" font-size="20" font-weight="700" fill="#243b53">条件差异较大的经济体：关系不明显</text>
      <line x1="520" y1="335" x2="870" y2="335" stroke="#334e68" stroke-width="2"/><line x1="520" y1="335" x2="520" y2="65" stroke="#334e68" stroke-width="2"/>
      <line x1="550" y1="205" x2="835" y2="235" stroke="#dc2626" stroke-width="3" stroke-dasharray="7 5"/>
      <g fill="#64748b"><circle cx="555" cy="110" r="6"/><circle cx="578" cy="278" r="6"/><circle cx="600" cy="176" r="6"/><circle cx="625" cy="245" r="6"/><circle cx="650" cy="118" r="6"/><circle cx="675" cy="295" r="6"/><circle cx="700" cy="205" r="6"/><circle cx="728" cy="150" r="6"/><circle cx="755" cy="270" r="6"/><circle cx="785" cy="190" r="6"/><circle cx="820" cy="260" r="6"/><circle cx="840" cy="135" r="6"/></g>
      <text x="675" y="375" text-anchor="middle" font-size="16" fill="#52606d">初始人均收入</text><text x="474" y="205" transform="rotate(-90 474 205)" text-anchor="middle" font-size="16" fill="#52606d">随后增长率</text>
      <text x="450" y="396" text-anchor="middle" font-size="13" fill="#7b8794">示意重绘：只表达课件中的相关方向，不对应精确样本坐标</text>
    </g>
  </svg>
  <figcaption style="margin-top:.55rem;color:#52606d;font-size:.92rem;">图 3：收敛证据的双面板示意散点图。左图概括美国州和发达国家样本中的追赶关系，右图概括发展中经济体样本中不明显的无条件收敛。根据课件第 32—35 页的历史散点图重绘，仅保留趋势，引用许可待核对。</figcaption>
</figure>

- 绝对收敛：不加其他条件，穷国普遍比富国增长更快；
- 条件收敛：在储蓄率、人口增长率、人力资本和制度等条件相近时，初始较穷的国家向自己的稳态追赶。

课件引用的经验结论是：控制储蓄率、人口增长率和人力资本差异后，收入差距约以每年 2% 的速度缩小。这是条件收敛证据，不等于所有国家最终具有相同收入。

> [!failure] 常见误解
> 索洛模型预测的是向各自稳态收敛。若国家的储蓄率、人口增长、教育、制度和技术水平不同，它们的稳态本身就不同。

### 4 收入差异的直接来源

课件把国家间人均收入差异归纳为两类：

1. 人均物质资本和人力资本不同；
2. 生产效率，即生产函数高度不同。

两者可能相互强化：高效率提高资本回报并鼓励积累，资本积累也可能通过学习和知识外溢提高效率；制度等第三因素还可能同时影响二者。

## 五 内生增长理论

### 1 为什么需要内生增长模型

索洛模型用外生的 $g$ 解释长期人均增长，却没有说明技术进步率由什么决定。内生增长理论（Endogenous Growth Theory）尝试让知识、研发和长期增长率由模型内部的投资与决策产生。

### 2 AK 模型

最简单的内生增长生产函数为：

$$
\boxed{Y=AK}
$$

其中 $A$ 是每单位广义资本的产出。与索洛模型不同，资本边际产出为常数：

$$
MPK=A
$$

资本积累：

$$
\Delta K=sY-\delta K
$$

代入 $Y=AK$：

$$
\frac{\Delta K}{K}=sA-\delta
$$

由于 $Y$ 与 $K$ 成比例：

$$
\boxed{\frac{\Delta Y}{Y}=sA-\delta}
$$

若 $sA>\delta$，资本和产出可以持续增长。此时储蓄率不仅影响收入水平，也影响长期增长率。

> [!warning] 关键假设
> AK 模型必须放弃广义资本边际收益递减。若资本只指机器设备，该假设较强；若资本包括人力资本和知识外溢，则更容易解释。

### 3 Romer 内生技术进步模型

课件把经济划分为三个部门：

- 最终产品部门：完全竞争，使用劳动和多种专业化中间品；
- 中间产品部门：每种差异化产品由持有设计图的企业生产，存在垄断利润；
- R&D 部门：开发受专利保护的设计图，并把设计图卖给中间品生产者。

最终产品部门的生产函数为：

$$
\boxed{
Y_t=A L_t^{1-\alpha}\sum_{j=1}^{N_t}(X_{j,t})^\alpha
}
$$

- $0<\alpha<1$；
- $N_t$：时点 $t$ 可用的专业化中间品种类数；
- $X_{j,t}$：第 $j$ 种中间品投入；
- $L_t$：最终产品部门使用的劳动。

对单个中间品，边际产出递减；所有投入同时增加时，生产函数保持规模报酬不变。

若每种中间品投入相同，即 $X_{j,t}=X$：

$$
Y_t=A L_t^{1-\alpha}N_tX^\alpha
$$

也可写为：

$$
Y_t=A L_t^{1-\alpha}(N_tX)^\alpha N_t^{1-\alpha}
$$

若把所有中间品视为资本品，则：

$$
K_t=N_tX
$$

所以：

$$
\boxed{Y_t=A L_t^{1-\alpha}K_t^\alpha N_t^{1-\alpha}}
$$

在课件进一步采用的简化条件下，得到：

$$
Y_t=AXN_t
$$

直觉是：研发增加可用设计图和中间品种类 $N$，专业化提高最终产品生产率。因此，知识积累可以成为长期增长的内部来源。

### 4 两部门研发模型

课件的两部门模型包括制造企业和研究型大学：

- $u$：投入研究部门的劳动力比例；
- $(1-u)L$：投入制造部门的劳动力；
- 制造部门：$Y=F[K,(1-u)EL]$；
- 研究部门：$\Delta E=g(u)E$；
- 资本积累：$\Delta K=sY-\delta K$。

稳态中，人均产出与生活水平按：

$$
\boxed{\frac{\Delta E}{E}=g(u)}
$$

增长。储蓄率 $s$ 影响收入水平但不改变该模型中的长期增长率；研究劳动力比例 $u$ 同时影响收入水平与增长率。

提高 $u$ 存在当期与长期权衡：更多研究人员会减少当期制造劳动，却可能提高未来技术进步率。

### 5 现实中的研发投资

课件强调三点：

- 企业为获得利润而研发；
- 专利和先发优势使创新者能够取得暂时收益；
- 创新具有知识外溢，会降低后续创新成本。

研发政策因此要同时处理私人回报、社会回报和垄断成本。

## 六 中国经济增长的多种解释

课件把改革开放后的快速增长解释为多种机制共同作用，而不是单一因素。

### 1 高储蓄与资本积累

高储蓄率支持了大规模投资；改革初期资本存量较低，离稳态较远，因此资本深化带来较快增长。课件引用的历史增长核算认为，1979—2016 年资本积累贡献了 60.9% 的增长；该数值属于课件引用的特定研究和期间。

### 2 结构转型与人口红利

农村劳动力从低生产率农业部门转向较高生产率的城市工业部门，提高了总体劳动生产率。较低抚养比、充足劳动供给和高储蓄共同形成课件所称的人口红利。

### 3 后发优势与产业升级

技术模仿、引进和产业升级可以让后发经济体以较低成本吸收成熟技术。课件同时提及产业政策和符合比较优势的发展战略，但这些解释的适用范围与政策效果仍存在争论。

### 4 市场化改革与产权

渐进式改革、产权明晰和非国有经济发展改善了资源配置。课件引用研究把部分全要素生产率增长归因于市场化改革；这些比例依赖研究设计与样本，不宜直接推广到其他时期。

### 5 地方政府激励

行政分权、财政激励和官员考核可能推动地方政府改善基础设施、招商引资并支持企业，也可能诱发低价供地、隐性担保、重复建设和地方保护。理解这一机制需要同时看到激励效果与扭曲成本。

> [!important] 综合判断
> 中国增长可以由资本积累、劳动力转移、技术追赶、市场化改革和政府激励共同解释。不同机制在不同时期的重要性会变化，不能把某一篇研究的结论当作唯一答案。

## 七 自然资源、环境与高质量发展

### 1 资源诅咒

资源诅咒（Resource Curse）指资源丰富的经济体可能因资源依赖、寻租、冲突或制造业被挤出而增长较慢。课件列出三类机制：

- 社会行为：易得财富可能削弱积累与创新动机；
- 政治机制：租金增加寻租、腐败和冲突；
- 经济结构：优势资源部门可能挤出制造业和技术产业。

课件同时指出，中国不同层级与样本的研究结论并不一致。因此，资源丰富不是必然诅咒，关键在制度、产业结构和资源收益管理。

### 2 环境库兹涅茨曲线

环境库兹涅茨曲线（Environmental Kuznets Curve，EKC）描述污染与人均收入可能呈倒 U 型：发展早期污染随收入上升而增加，达到转折点后污染下降。

<figure style="margin:1.5rem auto;max-width:760px;text-align:center;">
  <svg viewBox="0 0 760 430" role="img" aria-labelledby="ekc-title ekc-desc" style="width:100%;height:auto;background:#fbfcfe;border:1px solid #d9e2ec;border-radius:12px;">
    <title id="ekc-title">环境库兹涅茨曲线图</title>
    <desc id="ekc-desc">横轴为人均收入，纵轴为环境污染。曲线呈倒U形，收入较低阶段污染上升，达到转折点后污染下降。图中标出规模效应、技术进步效应和结构效应。</desc>
    <defs><marker id="ekc-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#334e68"/></marker></defs>
    <line x1="90" y1="355" x2="690" y2="355" stroke="#334e68" stroke-width="2.5" marker-end="url(#ekc-arrow)"/><line x1="90" y1="355" x2="90" y2="55" stroke="#334e68" stroke-width="2.5" marker-end="url(#ekc-arrow)"/>
    <path d="M120 320 C235 275 275 105 385 92 C500 80 545 265 650 320" fill="none" stroke="#16a34a" stroke-width="6"/>
    <circle cx="385" cy="92" r="8" fill="#dc2626"/><line x1="385" y1="92" x2="385" y2="355" stroke="#dc2626" stroke-width="1.7" stroke-dasharray="6 5"/>
    <text x="25" y="65" font-size="21" fill="#243b53" font-family="Arial, sans-serif">环境污染</text><text x="565" y="400" font-size="21" fill="#243b53" font-family="Arial, sans-serif">人均收入</text>
    <text x="170" y="220" font-size="18" fill="#15803d" font-family="Arial, sans-serif">规模效应占主导</text><text x="455" y="220" font-size="18" fill="#15803d" font-family="Arial, sans-serif">技术与结构效应增强</text>
    <text x="400" y="80" font-size="18" fill="#dc2626" font-family="Arial, sans-serif">转折点</text>
  </svg>
  <figcaption style="margin-top:.55rem;color:#52606d;font-size:.92rem;">图 4：环境库兹涅茨曲线图。倒 U 型曲线表示污染可能先随收入上升而恶化，越过转折点后再改善；形成机制包括规模效应、技术进步效应和结构效应。根据课件第 61 页内容重绘，引用许可待核对。</figcaption>
</figure>

三种作用渠道：

1. 规模效应：产出扩大增加能源使用与污染排放；
2. 技术进步效应：环保投资、资源效率和清洁技术降低排放；
3. 结构效应：经济从农业转向重工业时污染可能上升，之后向服务业和清洁产业转型时污染下降。

> [!warning] EKC 不是自动规律
> 倒 U 型关系取决于污染指标、制度、技术、贸易和政策。经济增长本身不会保证环境自动改善。

### 3 高质量发展

课件区分：

- 增长速度：GDP、收入与产出规模的变化；
- 增长质量：产业结构、生产效率、福利分配和环境表现；
- 高质量发展：要求速度与质量协调，并强调特定发展阶段的约束与任务。

课件列出的阶段性背景包括进入中等收入阶段、要素约束收紧、技术转型压力和生态环境问题，因此政策关注从单纯追求增速转向供给侧改革、创新和资源配置效率。

## 八 理解增长的逻辑框架

课件最后把增长因素分为根本因素与直接因素：

<figure style="margin:1.5rem auto;max-width:860px;text-align:center;">
  <svg viewBox="0 0 860 360" role="img" aria-labelledby="growth-framework-title growth-framework-desc" style="width:100%;height:auto;background:#fbfcfe;border:1px solid #d9e2ec;border-radius:12px;">
    <title id="growth-framework-title">经济增长的根本因素与直接因素框架图</title>
    <desc id="growth-framework-desc">地理、文化和制度作为根本因素，影响资本、劳动和技术这些直接因素，直接因素再决定经济增长。</desc>
    <defs><marker id="framework-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#334e68"/></marker></defs>
    <g font-family="Arial, sans-serif" text-anchor="middle">
      <rect x="55" y="65" width="150" height="58" rx="6" fill="#e0f2fe" stroke="#0369a1" stroke-width="2"/><text x="130" y="101" font-size="20" fill="#0c4a6e">根本因素</text>
      <rect x="275" y="45" width="130" height="55" rx="6" fill="#fef3c7" stroke="#d97706"/><text x="340" y="79" font-size="19" fill="#92400e">地理</text>
      <rect x="435" y="45" width="130" height="55" rx="6" fill="#fef3c7" stroke="#d97706"/><text x="500" y="79" font-size="19" fill="#92400e">文化</text>
      <rect x="595" y="45" width="130" height="55" rx="6" fill="#fef3c7" stroke="#d97706"/><text x="660" y="79" font-size="19" fill="#92400e">制度</text>

      <rect x="55" y="180" width="150" height="58" rx="6" fill="#dcfce7" stroke="#15803d" stroke-width="2"/><text x="130" y="216" font-size="20" fill="#14532d">直接因素</text>
      <rect x="275" y="180" width="130" height="55" rx="6" fill="#ede9fe" stroke="#7c3aed"/><text x="340" y="214" font-size="19" fill="#5b21b6">资本</text>
      <rect x="435" y="180" width="130" height="55" rx="6" fill="#ede9fe" stroke="#7c3aed"/><text x="500" y="214" font-size="19" fill="#5b21b6">劳动</text>
      <rect x="595" y="180" width="130" height="55" rx="6" fill="#ede9fe" stroke="#7c3aed"/><text x="660" y="214" font-size="19" fill="#5b21b6">技术</text>
      <rect x="355" y="292" width="210" height="55" rx="6" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/><text x="460" y="326" font-size="21" fill="#991b1b">长期经济增长</text>
    </g>
    <path d="M205 94 H245 V25 H660" fill="none" stroke="#334e68" stroke-width="2"/>
    <line x1="340" y1="25" x2="340" y2="38" stroke="#334e68" stroke-width="2" marker-end="url(#framework-arrow)"/><line x1="500" y1="25" x2="500" y2="38" stroke="#334e68" stroke-width="2" marker-end="url(#framework-arrow)"/><line x1="660" y1="25" x2="660" y2="38" stroke="#334e68" stroke-width="2" marker-end="url(#framework-arrow)"/>
    <line x1="205" y1="209" x2="260" y2="209" stroke="#334e68" stroke-width="2"/>
    <line x1="340" y1="100" x2="340" y2="170" stroke="#334e68" stroke-width="2" marker-end="url(#framework-arrow)"/><line x1="500" y1="100" x2="500" y2="170" stroke="#334e68" stroke-width="2" marker-end="url(#framework-arrow)"/><line x1="660" y1="100" x2="660" y2="170" stroke="#334e68" stroke-width="2" marker-end="url(#framework-arrow)"/>
    <line x1="340" y1="235" x2="420" y2="285" stroke="#334e68" stroke-width="2" marker-end="url(#framework-arrow)"/><line x1="500" y1="235" x2="475" y2="285" stroke="#334e68" stroke-width="2" marker-end="url(#framework-arrow)"/><line x1="660" y1="235" x2="540" y2="285" stroke="#334e68" stroke-width="2" marker-end="url(#framework-arrow)"/>
  </svg>
  <figcaption style="margin-top:.55rem;color:#52606d;font-size:.92rem;">图 5：经济增长的根本因素与直接因素框架图。地理、文化和制度通过资本、劳动与技术影响长期经济增长。根据课件第 66 页重绘，引用许可待核对。</figcaption>
</figure>

这一框架提醒我们：资本、劳动与技术是生产函数中的直接投入，但它们的积累又受到产权、教育、政治稳定、社会规范和地理条件影响。解释增长时要区分“增长由什么直接产生”与“为什么这些投入在不同国家不同”。

## 九 模型比较与公式速查

### 1 三类模型比较

| 比较项目 | 技术进步版索洛模型 | AK 模型 | 两部门研发模型 |
|---|---|---|---|
| 长期增长来源 | 外生技术进步 $g$ | 广义资本积累 | 研究活动产生知识增长 |
| 边际收益 | 资本边际收益递减 | 广义资本边际收益不变 | 知识外溢抵消递减趋势 |
| 储蓄率 $s$ | 影响收入水平，不影响稳态人均增长率 | 影响长期增长率 | 影响收入水平 |
| 研发比例 $u$ | 模型中没有 | 通常未单列 | 影响水平和增长率 |
| 技术进步 | 外生 | 隐含在广义资本中 | 内生于研发决策 |

### 2 公式速查表

| 模块 | 公式 | 含义 |
|---|---|---|
| 技术进步率 | $g=\Delta E/E$ | 劳动效率增长率 |
| 生产函数 | $Y=F(K,LE)$ | 劳动增广型技术进步 |
| 每效率工人变量 | $k=K/(LE),\ y=Y/(LE)$ | 消除人口与效率规模 |
| 资本动态 | $\Delta k=sf(k)-(\delta+n+g)k$ | 实际投资减收支相抵投资 |
| 稳态 | $sf(k^*)=(\delta+n+g)k^*$ | 每效率工人资本不再变化 |
| 黄金律 | $MPK-\delta=n+g$ | 最大化稳态消费 |
| AK 生产函数 | $Y=AK$ | 广义资本无边际收益递减 |
| AK 增长率 | $\Delta Y/Y=sA-\delta$ | 储蓄率影响长期增长 |
| Romer 最终品 | $Y_t=AL_t^{1-\alpha}\sum_{j=1}^{N_t}X_{j,t}^{\alpha}$ | 产品种类扩张提高生产率 |
| 两部门知识积累 | $\Delta E=g(u)E$ | 研发劳动决定技术进步率 |

## 十 高频易错点

1. $k=K/(LE)$ 是每效率工人资本，不是普通人均资本 $K/L$。
2. 稳态中 $k$ 和 $y$ 不增长，但 $K/L$ 和 $Y/L$ 仍按 $g$ 增长。
3. 技术进步使收支相抵投资从 $(\delta+n)k$ 变为 $(\delta+n+g)k$。
4. 黄金律比较的是净边际产出 $MPK-\delta$ 与 $n+g$。
5. 提高储蓄率在索洛模型中只产生暂时增长加速，不永久提高稳态增长率。
6. 无条件收敛不明显不代表索洛模型必然失败，模型主要预测条件收敛。
7. AK 模型能产生永久增长，是因为取消了广义资本边际收益递减。
8. Romer 模型中的 $N$ 表示中间品或设计图种类，不是人口。
9. 研发劳动比例提高会减少当期制造劳动，存在跨期权衡。
10. 资源诅咒与 EKC 都是可能的经验关系，不是自动发生的普遍规律。

## 十一 自测题

1. 为什么技术进步版索洛模型使用每效率工人变量？
2. 推导并解释 $(\delta+n+g)k$ 的三个组成部分。
3. 稳态中每效率工人产出、人均产出和总产出分别按什么速度增长？
4. 已知 $k=3y$、$\delta k=0.15y$、$MPK\times k=0.36y$，计算 $\delta$、$MPK$ 与 $MPK-\delta$；若 $n+g=0.04$，判断资本相对黄金律的位置。
5. 为什么高储蓄率不能在索洛模型中永久提高人均产出增长率？
6. 区分绝对收敛与条件收敛。
7. AK 模型为何能产生内生的持续增长？
8. Romer 模型中，增加中间品种类 $N$ 为什么能提高产出？
9. 提高研究劳动力比例 $u$ 有什么当期成本和长期收益？
10. 用根本因素和直接因素框架解释制度如何影响经济增长。

### 自测题 4 参考答案

$$
\delta=\frac{0.15y}{3y}=0.05
$$

$$
MPK=\frac{0.36y}{3y}=0.12
$$

$$
MPK-\delta=0.12-0.05=0.07
$$

因为：

$$
0.07>0.04=n+g
$$

所以资本低于黄金律水平，提高储蓄率可以把经济推向资本更多、稳态消费更高的位置。该题为根据课件方法编写的假设案例。

## 十二 来源与待核对事项

### 来源

- 《第7章 经济增长II.pptx》，第 1—69 页，课堂课件；教师、作者和公开授权状态待核对。

### 待人工核对

- 课件第 2—3 页、30—35 页、53 页和 62 页含历史数据图。本文保留可确认的趋势与表格，不把目测坐标写成精确数据。
- 生产率、美国黄金律判断、中国增长贡献率和收敛速度均对应课件所列历史时期，不应直接作为当前数据。
- 中国经济增长、资源诅咒和制度解释部分汇集多种研究观点，本文只整理课件内容，不代表对争议结论作最终判断。
- 课件第 67—69 页属于延伸材料；其中诺贝尔奖与创新增长理论的图片未直接复制，公开引用许可待核对。
- 全部 SVG 均根据课件内容重绘，公开展示与改编许可待核对。
