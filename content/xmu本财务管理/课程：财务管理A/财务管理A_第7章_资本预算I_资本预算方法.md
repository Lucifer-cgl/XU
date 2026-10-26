# 财务管理A 第7章 资本预算（I）：资本预算方法

> [!summary] 来源与范围
> 根据课堂课件《07-Capital Budgeting_I_Technigues(1).pdf》第 1—9 页整理。内容覆盖独立项目评价、互斥项目的排序冲突、资本限额，以及敏感性分析、场景分析、盈亏平衡分析和蒙特卡罗模拟。整理日期：2026-10-26。

> [!note] 整理原则
> 按“现金流 → PBP → IRR → NPV → PI → 互斥项目 → 资本限额 → 风险分析”的决策逻辑重组。公式沿用课件中的 $PBP$、$ICO$、$CF_t$、$IRR$、$NPV$、$PI$ 和 $k$；课件使用中文项目名的盈亏平衡公式继续保留中文，不另造字母。文件名中的 “Technigues” 疑为 “Techniques” 的拼写误差，本文采用“资本预算方法”。

## 知识地图

```text
资本预算方法
├── 独立项目评价
│   ├── 回收期 PBP
│   ├── 折现回收期
│   ├── 内部收益率 IRR 与修正内部收益率 MIRR
│   ├── 净现值 NPV
│   └── 盈利指数 PI
├── 互斥项目的潜在困难
│   ├── 投资规模差异
│   ├── 现金流模式差异
│   └── 项目寿命差异
├── 资本限额
│   └── 在预算约束下配置有限资本
└── 不确定性分析
    ├── 敏感性分析
    ├── 场景分析
    ├── 盈亏平衡分析
    └── 蒙特卡罗模拟
```

> [!important] 本章核心结论
> 对独立项目，净现值大于零意味着项目按要求收益率折现后仍能增加股东财富。回收期强调流动性，IRR 和 PI 提供比例信息，NPV 提供价值增量；当这些指标发生冲突时，尤其是互斥项目，通常应以 NPV 最大化作为首要标准。

## 一 资本预算决策的对象

### 1 项目之间的关系

- **独立项目（Independent Project）**：一个项目的接受或拒绝不影响其他项目；所有满足标准的项目都可以接受。
- **互斥项目（Mutually Exclusive Projects）**：接受其中一个项目，就必须拒绝一个或多个其他项目；最终只能选出一个方案或一个互不冲突的组合。
- **依赖项目（Dependent Projects）**：一个项目能否接受取决于另一个项目是否接受，例如厂房项目必须与配套设备项目共同实施。

判断项目关系很重要，因为同一个评价指标在独立项目和互斥项目中的用法不同。独立项目可以逐一与门槛比较，互斥项目还必须比较项目之间创造的价值。

### 2 BW 公司独立项目数据

课件以 Julie Miller 评估 BW 公司新项目为贯穿案例。保持课件原有方向：年份作列、现金流作行，单位为美元。

| 年末 | 0 | 1 | 2 | 3 | 4 | 5 |
|---:|---:|---:|---:|---:|---:|---:|
| 项目现金流 | -40,000 | 10,000 | 12,000 | 15,000 | 10,000 | 7,000 |
| 累计现金流入 | — | 10,000 | 22,000 | 37,000 | 47,000 | 54,000 |
| 累计净现金流 | -40,000 | -30,000 | -18,000 | -3,000 | 7,000 | 14,000 |

- 初始现金流出（Initial Cash Outlay，ICO）：40,000 美元；
- 要求的最低收益率（Hurdle Rate），也是适用贴现率 $k$：13%；
- 最长可接受回收期：3.5 年。

## 二 回收期与折现回收期

### 1 回收期是什么

回收期（Payback Period，PBP）是项目累计预期现金流入等于初始现金流出的时间。课件公式为：

$$
\boxed{PBP=a+\frac{b-c}{d}}
$$

- $a$：收回初始投资之前最后一个完整年份；
- $b$：初始现金流出；
- $c$：第 $a$ 年末的累计现金流入；
- $d$：下一年的现金流入。

BW 案例在第 3 年末累计收回 37,000 美元，尚差 3,000 美元，第 4 年流入 10,000 美元：

$$
\begin{aligned}
PBP
&=3+\frac{40{,}000-37{,}000}{10{,}000}\\
&=3.3\text{ 年}
\end{aligned}
$$

由于：

$$
3.3\text{ 年}<3.5\text{ 年}
$$

按照课件设定的 PBP 标准，应接受该项目。

### 2 回收期的优缺点

优点：

- 计算简单，容易理解；
- 能反映本金收回速度和项目流动性；
- 对较远期、较难预测的现金流赋予较低关注。

缺点：

- 普通 PBP 不考虑货币时间价值；
- 忽略回收期之后的现金流；
- 最长可接受回收期由管理层主观确定；
- 不能直接衡量项目为股东增加多少价值。

### 3 折现回收期

折现回收期先按要求收益率折现每期现金流，再计算累计折现现金流何时转正。BW 案例按 13% 折现：

| 年末 | 0 | 1 | 2 | 3 | 4 | 5 |
|---:|---:|---:|---:|---:|---:|---:|
| 原始现金流（千美元） | -40.00 | 10.00 | 12.00 | 15.00 | 10.00 | 7.00 |
| 折现现金流（千美元） | -40.00 | 8.85 | 9.40 | 10.40 | 6.13 | 3.80 |
| 累计折现现金流（千美元） | -40.00 | -31.15 | -21.75 | -11.36 | -5.22 | -1.42 |

第 5 年末累计折现现金流仍为负，因此项目在寿命内不能收回折现后的初始投资：

$$
\text{折现回收期}>5\text{ 年}
$$

按折现回收期标准应拒绝。折现回收期解决了 PBP 不考虑时间价值的问题，但仍忽略回收之后的现金流。

## 三 内部收益率

### 1 定义与公式

内部收益率（Internal Rate of Return，IRR）是使项目未来净现金流现值等于初始现金流出的贴现率：

$$
\boxed{
ICO=\frac{CF_1}{(1+IRR)^1}
+\frac{CF_2}{(1+IRR)^2}
+\cdots
+\frac{CF_n}{(1+IRR)^n}
}
$$

等价地，IRR 是使项目 $NPV=0$ 的贴现率。

BW 案例的求解方程为：

$$
40{,}000
=\frac{10{,}000}{(1+IRR)^1}
+\frac{12{,}000}{(1+IRR)^2}
+\frac{15{,}000}{(1+IRR)^3}
+\frac{10{,}000}{(1+IRR)^4}
+\frac{7{,}000}{(1+IRR)^5}
$$

课件给出：

$$
IRR=11.47\%
$$

由于 $11.47\%<13\%$，项目不能达到最低收益率，应拒绝。

### 2 IRR 的优缺点

优点：

- 考虑货币时间价值；
- 使用项目全部现金流；
- 结果是直观的收益率，便于与门槛收益率比较。

局限：

- 投资型现金流与融资型现金流的接受方向可能相反；
- 非常规现金流可能产生多个 IRR 或没有 IRR；
- 互斥项目存在规模、现金流时点和寿命差异时，IRR 排序可能与 NPV 冲突；
- IRR 较高不代表项目增加的财富一定更多。

### 3 修正内部收益率

修正内部收益率（Modified Internal Rate of Return，MIRR）通过调整现金流，使符号变化只出现一次且先负后正，以缓解多个 IRR 问题。课件列出折现法、再投资法和复合法，但强调 MIRR 的具体方法存在争议，并要求参见教材第 93—95 页。

> [!warning] 本课件没有统一 MIRR 公式
> 不同 MIRR 方法对负现金流折现和正现金流终值处理不同。答题时必须按题目或教材指定的方法计算，不能把某一种公式当成唯一写法。

## 四 净现值

### 1 定义与公式

净现值（Net Present Value，NPV）等于项目未来净现金流的现值减去初始现金流出：

$$
\boxed{
NPV=\frac{CF_1}{(1+k)^1}
+\frac{CF_2}{(1+k)^2}
+\cdots
+\frac{CF_n}{(1+k)^n}
-ICO
}
$$

- $CF_t$：第 $t$ 期净现金流；
- $k$：要求的最低收益率或适用贴现率；
- $ICO$：初始现金流出；
- $n$：项目寿命。

接受标准：

- $NPV>0$：项目按要求收益率折现后仍增加股东财富，接受；
- $NPV=0$：项目恰好达到要求收益率；
- $NPV<0$：项目不能达到要求收益率，拒绝。

### 2 BW 案例

课件使用 13% 的贴现率：

$$
\begin{aligned}
NPV={}&10{,}000(PVIF_{13\%,1})
+12{,}000(PVIF_{13\%,2})\\
&+15{,}000(PVIF_{13\%,3})
+10{,}000(PVIF_{13\%,4})\\
&+7{,}000(PVIF_{13\%,5})-40{,}000
\end{aligned}
$$

使用课件列示的三位小数现值因子：

$$
\begin{aligned}
NPV={}&10{,}000(0.885)+12{,}000(0.783)
+15{,}000(0.693)\\
&+10{,}000(0.613)+7{,}000(0.543)-40{,}000\\
={}&-1{,}428\text{ 美元}
\end{aligned}
$$

由于 $NPV<0$，应拒绝项目。

> [!warning] 课件中的取整差异
> 第 4 页逐项使用三位小数现值因子，得到 $-1{,}428$ 美元；第 5 页汇总表写作 $-1{,}424$ 美元。用完整精度折现的结果约为 $-1{,}424.42$ 美元，因此差异来自中间现值因子的取整。答题时应保留足够中间精度，并说明取整口径。

### 3 NPV 的优点

- 考虑货币时间价值和全部现金流；
- 直接表示项目增加或减少的财富金额；
- 可加总，不同独立项目的 NPV 可以相加；
- 假设中间现金流按要求收益率 $k$ 再投资，比按 IRR 再投资通常更稳健。

## 五 NPV 图与多个 IRR

### 1 普通投资项目的 NPV 图

NPV 图（Net Present Value Profile）以贴现率为横轴、NPV 为纵轴。BW 项目只有一次现金流符号变化，NPV 随贴现率上升而下降，并在 $IRR=11.47\%$ 处穿过横轴。

### 2 多个 IRR

课件非常规现金流为：

| 年末 | 0 | 1 | 2 | 3 |
|---:|---:|---:|---:|---:|
| 现金流 | -100 | 100 | 900 | -1,000 |

现金流符号发生两次变化，课件给出两个 IRR：12.95% 和 191.15%。符号变化次数表示可能的正 IRR 上限，并不保证一定出现同样数量的 IRR。

<figure style="margin:1.5rem auto;max-width:960px;text-align:center;">
  <svg viewBox="0 0 960 430" role="img" aria-labelledby="npv-profile-title npv-profile-desc" style="width:100%;height:auto;background:#fbfcfe;border:1px solid #d9e2ec;border-radius:12px;">
    <title id="npv-profile-title">普通项目与多个IRR项目的NPV双面板图</title>
    <desc id="npv-profile-desc">左图为BW普通投资项目，NPV随贴现率上升而下降，在11.47%处等于零；右图为非常规现金流项目，NPV曲线两次穿过横轴，对应12.95%和191.15%两个内部收益率。</desc>
    <defs><marker id="npv-axis-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#334e68"/></marker></defs>
    <g font-family="Arial, sans-serif">
      <text x="245" y="32" text-anchor="middle" font-size="21" font-weight="700" fill="#243b53">普通投资项目：一个 IRR</text>
      <line x1="70" y1="330" x2="440" y2="330" stroke="#334e68" stroke-width="2" marker-end="url(#npv-axis-arrow)"/><line x1="70" y1="330" x2="70" y2="60" stroke="#334e68" stroke-width="2" marker-end="url(#npv-axis-arrow)"/>
      <line x1="70" y1="250" x2="425" y2="250" stroke="#94a3b8" stroke-width="1.5"/><path d="M70 78 L128 130 L187 175 L245 215 L285 250 L328 282 L365 303" fill="none" stroke="#dc2626" stroke-width="4"/>
      <circle cx="285" cy="250" r="6" fill="#facc15" stroke="#111827"/><line x1="285" y1="250" x2="285" y2="330" stroke="#64748b" stroke-dasharray="6 5"/><text x="285" y="354" text-anchor="middle" font-size="16">11.47%</text><text x="300" y="238" font-size="16" fill="#7c3aed">IRR</text>
      <circle cx="328" cy="282" r="6" fill="#facc15" stroke="#111827"/><text x="338" y="302" font-size="16" fill="#15803d">NPV@13% &lt; 0</text>
      <text x="245" y="395" text-anchor="middle" font-size="17" fill="#52606d">贴现率</text><text x="28" y="195" transform="rotate(-90 28 195)" text-anchor="middle" font-size="17" fill="#52606d">净现值 NPV</text>
      <text x="715" y="32" text-anchor="middle" font-size="21" font-weight="700" fill="#243b53">非常规现金流：两个 IRR</text>
      <line x1="535" y1="330" x2="905" y2="330" stroke="#334e68" stroke-width="2" marker-end="url(#npv-axis-arrow)"/><line x1="535" y1="330" x2="535" y2="60" stroke="#334e68" stroke-width="2" marker-end="url(#npv-axis-arrow)"/>
      <line x1="535" y1="215" x2="890" y2="215" stroke="#94a3b8" stroke-width="1.5"/><path d="M535 330 C545 275 552 230 558 215 C590 125 650 90 710 125 C770 160 825 205 875 215 C887 219 894 223 900 228" fill="none" stroke="#dc2626" stroke-width="4"/>
      <circle cx="558" cy="215" r="6" fill="#facc15" stroke="#111827"/><circle cx="875" cy="215" r="6" fill="#facc15" stroke="#111827"/><line x1="558" y1="215" x2="558" y2="330" stroke="#64748b" stroke-dasharray="6 5"/><line x1="875" y1="215" x2="875" y2="330" stroke="#64748b" stroke-dasharray="6 5"/>
      <text x="558" y="354" text-anchor="middle" font-size="16">12.95%</text><text x="875" y="354" text-anchor="middle" font-size="16">191.15%</text><text x="715" y="395" text-anchor="middle" font-size="17" fill="#52606d">贴现率</text><text x="498" y="195" transform="rotate(-90 498 195)" text-anchor="middle" font-size="17" fill="#52606d">净现值 NPV</text>
    </g>
  </svg>
  <figcaption style="margin-top:.55rem;color:#52606d;font-size:.92rem;">图 1：NPV 双面板曲线图。左图说明普通投资项目的 NPV 随贴现率下降并在一个 IRR 处为零；右图说明非常规现金流可能产生多个 IRR。根据课件 PDF 第 4 页重绘；许可待核对。</figcaption>
</figure>

> [!important] 多个 IRR 时的决策
> 当 IRR 不唯一时，“IRR 是否高于门槛收益率”失去明确含义，应直接计算给定贴现率下的 NPV，或按题目指定的 MIRR 方法处理。

## 六 盈利指数

### 1 定义与公式

盈利指数（Profitability Index，PI）是项目未来净现金流现值与初始现金流出的比率：

$$
\boxed{
PI=\left[
\frac{CF_1}{(1+k)^1}
+\frac{CF_2}{(1+k)^2}
+\cdots
+\frac{CF_n}{(1+k)^n}
\right]\div ICO
}
$$

课件还给出：

$$
\boxed{PI=1+\frac{NPV}{ICO}}
$$

接受标准：$PI>1$ 接受，$PI=1$ 恰好达到要求收益率，$PI<1$ 拒绝。

BW 案例：

$$
PI=\frac{38{,}572}{40{,}000}=0.9643<1
$$

因此拒绝项目。

### 2 PI 的作用与局限

PI 衡量每 1 元初始投资带来的未来现金流现值，适合在资本受限时比较资金使用效率。但它只提供相对盈利能力，不直接显示增加的财富总额；规模不同的互斥项目可能出现 PI 较高而 NPV 较低的情况。

## 七 独立项目评价汇总

| 方法 | BW 项目结果 | 课件参照标准 | 决定 |
|---|---:|---:|---|
| PBP | 3.3 年 | 最长 3.5 年 | 接受 |
| 折现回收期 | 大于 5 年 | 项目期内收回 | 拒绝 |
| IRR | 11.47% | 13% | 拒绝 |
| NPV | 约 -1,424 美元 | 0 | 拒绝 |
| PI | 0.96 | 1.00 | 拒绝 |

PBP 单独给出接受结论，而其他三个考虑时间价值或完整现金流的指标均拒绝。这说明回收期只能作为流动性或风险的辅助指标，不能替代价值判断。

课件还提供第二个项目评价示例：

| 年末 | 0 | 1 | 2 | 3 | 4 |
|---:|---:|---:|---:|---:|---:|
| 现金流（美元） | -75,000 | 33,332 | 36,446 | 28,147 | 37,075 |
| 累计现金流（美元） | -75,000 | -41,668 | -5,222 | 22,925 | 60,000 |

在贴现率 16% 下，课件给出 $PBP=2.19$ 年、$IRR=28.40\%$、$NPV=19{,}328.69$ 美元、$PI=1.26$，四项指标均支持接受。

## 八 互斥项目的排序冲突

### 1 三类困难

互斥项目可能因以下差异产生 IRR、NPV 与 PI 排序冲突：

1. 投资规模不同；
2. 现金流出现时间不同；
3. 项目寿命不同。

课件提示项目寿命问题需结合教材第 95—99 页的增量现金流量方法学习，并以教材考试要求为准。

### 2 规模差异

| 年末 | 项目 S | 项目 L |
|---:|---:|---:|
| 0 | -100 | -100,000 |
| 1 | 0 | 0 |
| 2 | 400 | 156,250 |

按 10% 折现，课件结果为：

| 项目 | IRR | NPV | PI |
|---|---:|---:|---:|
| S | 100% | 231 | 3.31 |
| L | 25% | 29,132 | 1.29 |

项目 S 的 IRR 和 PI 更高，但项目 L 的 NPV 大得多。若两者互斥且企业目标是最大化股东财富，应选择 L；比例收益率不能替代财富增量。

### 3 现金流模式差异

| 年末 | 递减现金流项目 D | 递增现金流项目 I |
|---:|---:|---:|
| 0 | -1,200 | -1,200 |
| 1 | 1,000 | 100 |
| 2 | 500 | 600 |
| 3 | 100 | 1,080 |

课件在 10% 贴现率下给出：

| 项目 | IRR | NPV | PI |
|---|---:|---:|---:|
| D | 23% | 198 | 1.17 |
| I | 17% | 198 | 1.17 |

项目 I 的现金流较晚，因此对贴现率更敏感；项目 D 的现金流较早，在较高贴现率下更有优势。两条 NPV 曲线在约 10% 处相交，交点贴现率称为费雪交叉利率（Fisher’s Rate of Intersection）。

<figure style="margin:1.5rem auto;max-width:860px;text-align:center;">
  <svg viewBox="0 0 860 430" role="img" aria-labelledby="fisher-title fisher-desc" style="width:100%;height:auto;background:#fbfcfe;border:1px solid #d9e2ec;border-radius:12px;">
    <title id="fisher-title">项目D与项目I的NPV曲线及费雪交叉利率图</title>
    <desc id="fisher-desc">横轴为贴现率，纵轴为净现值。递增现金流项目I的曲线下降更快，递减现金流项目D的曲线下降较慢，两曲线在贴现率约10%且净现值约198处相交。</desc>
    <defs><marker id="fisher-axis-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#334e68"/></marker></defs>
    <g font-family="Arial, sans-serif">
      <line x1="95" y1="345" x2="785" y2="345" stroke="#334e68" stroke-width="2.5" marker-end="url(#fisher-axis-arrow)"/><line x1="95" y1="345" x2="95" y2="55" stroke="#334e68" stroke-width="2.5" marker-end="url(#fisher-axis-arrow)"/>
      <line x1="95" y1="290" x2="770" y2="290" stroke="#94a3b8" stroke-width="1.5"/>
      <path d="M95 130 C190 165 275 195 360 215 C500 250 610 282 745 312" fill="none" stroke="#dc2626" stroke-width="4"/><path d="M95 72 C190 125 275 175 360 215 C500 300 610 330 745 360" fill="none" stroke="#7c3aed" stroke-width="4"/>
      <circle cx="360" cy="215" r="7" fill="#facc15" stroke="#111827"/><line x1="360" y1="215" x2="360" y2="345" stroke="#64748b" stroke-dasharray="6 5"/><line x1="95" y1="215" x2="360" y2="215" stroke="#64748b" stroke-dasharray="6 5"/>
      <text x="360" y="372" text-anchor="middle" font-size="17" fill="#991b1b">10% 费雪交叉利率</text><text x="383" y="204" font-size="16" fill="#52606d">NPV≈198</text>
      <text x="650" y="278" font-size="20" font-weight="700" fill="#b91c1c">D</text><text x="650" y="340" font-size="20" font-weight="700" fill="#6d28d9">I</text>
      <text x="440" y="410" text-anchor="middle" font-size="18" fill="#52606d">贴现率</text><text x="35" y="205" transform="rotate(-90 35 205)" text-anchor="middle" font-size="18" fill="#52606d">净现值 NPV</text>
      <text x="190" y="110" font-size="17" fill="#6d28d9">k&lt;10%：I 更优</text><text x="570" y="235" font-size="17" fill="#b91c1c">k&gt;10%：D 更优</text>
    </g>
  </svg>
  <figcaption style="margin-top:.55rem;color:#52606d;font-size:.92rem;">图 2：互斥项目 NPV 曲线图。项目 I 的远期现金流占比更高，NPV 对贴现率更敏感；两条曲线在约 10% 处相交。根据课件 PDF 第 7 页重绘；许可待核对。</figcaption>
</figure>

> [!failure] 交叉利率不是项目收益率
> 费雪交叉利率是两个项目 NPV 相等时的贴现率，不是任一项目自身的 IRR。它用于解释排序为何随 $k$ 改变。

## 九 资本限额

### 1 含义

资本限额（Capital Rationing）指特定期间资本性支出的总规模受到预算限制。课件中 BW 公司本期最多投入 32,500 美元。

### 2 可选项目

保持课件原表方向：项目作行、指标作列。

| 项目 | ICO（美元） | IRR | NPV（美元） | PI |
|---|---:|---:|---:|---:|
| A | 500 | 18% | 50 | 1.10 |
| B | 5,000 | 25% | 6,500 | 2.30 |
| C | 5,000 | 37% | 5,500 | 2.10 |
| D | 7,500 | 20% | 5,000 | 1.67 |
| E | 12,500 | 26% | 500 | 1.04 |
| F | 15,000 | 28% | 21,000 | 2.40 |
| G | 17,500 | 19% | 7,500 | 1.43 |
| H | 25,000 | 15% | 6,000 | 1.24 |

课件比较三种排序：

| 排序方法 | 选择的项目 | 初始投资（美元） | 增加的价值（美元） |
|---|---|---:|---:|
| 按 IRR | C、F、E | 32,500 | 27,000 |
| 按 NPV | F、G | 32,500 | 28,500 |
| 按 PI | F、B、C、D | 32,500 | 38,000 |

在本例中，按 PI 排序恰好得到最高总 NPV，因为 PI 反映单位受限资本创造的现值。但若项目不可分割，简单按 PI 从高到低选取并不保证在所有数据下得到全局最优组合；严谨做法是比较所有可行组合或使用整数规划。

> [!important] 资本限额与普通互斥选择不同
> 没有资本约束时，独立项目只要 $NPV>0$ 就可以接受；有资本限额时，即使多个项目都为正 NPV，也要在预算内选择总 NPV 最大的可行组合。

## 十 考虑不确定性

### 1 敏感性分析

敏感性分析逐一改变销售单价、销售量、单位变动成本、固定成本或投资额等变量，观察 NPV 变化。课件以单个变量上下变动 5% 为例。

作用：识别 NPV 对哪些假设最敏感，从而确定哪些数据需要更多事前调查和事后控制。

局限：一次只改变一个变量，忽略变量之间可能同时变化或相互关联。

### 2 场景分析

场景分析同时改变一组相互一致的变量。课件给出三种场景，单位为百万美元：

| 项目 | 最乐观 | 最可能 | 最悲观 |
|---|---:|---:|---:|
| 概率 | 20% | 50% | 30% |
| 营运期税后现金流量 | 10.5 | 7.5 | 5.5 |
| NPV | 25.72 | 7.29 | -5.00 |

NPV 的期望值为：

$$
\begin{aligned}
E(NPV)
&=20\%\times25.72+50\%\times7.29+30\%\times(-5.00)\\
&=7.289\approx7.29\text{ 百万美元}
\end{aligned}
$$

期望 NPV 为正不代表项目没有风险；悲观情形下 NPV 为 -5.00 百万美元，仍需评估损失承受能力和概率假设。

### 3 盈亏平衡分析

课件区分会计利润盈亏平衡点与财务盈亏平衡点，并直接使用中文项目名称。

会计利润盈亏平衡点：

$$
\boxed{
\text{会计利润盈亏平衡点}
=\frac{\text{固定成本}+\text{折旧}}
{\text{销售单价}-\text{单位变动成本}}
}
$$

财务盈亏平衡点：

$$
\boxed{
\text{财务盈亏平衡点}
=\frac{
EAC+\text{固定成本}\times(1-\text{税率})+\text{折旧}\times\text{税率}
}{
(\text{销售单价}-\text{单位变动成本})\times(1-\text{税率})
}
}
$$

其中，课件把约当年均成本写为：

$$
\boxed{
EAC=\frac{\text{初始投资额}}{\text{年金系数}}
}
$$

会计盈亏平衡关注会计利润等于零，财务盈亏平衡关注项目 NPV 等于零。由于后者还要求补偿初始投资的资本成本，财务盈亏平衡销量通常高于会计盈亏平衡销量。

<figure style="margin:1.5rem auto;max-width:900px;text-align:center;">
  <svg viewBox="0 0 900 410" role="img" aria-labelledby="breakeven-title breakeven-desc" style="width:100%;height:auto;background:#fbfcfe;border:1px solid #d9e2ec;border-radius:12px;">
    <title id="breakeven-title">会计利润盈亏平衡与财务盈亏平衡双面板图</title>
    <desc id="breakeven-desc">左右两图横轴为产量、纵轴为金额。收入线从原点向上，成本线从固定成本截距向上。左图会计盈亏平衡量为2240，右图财务盈亏平衡量为2427，后者因包含约当年均成本而更高。</desc>
    <defs><marker id="be-axis-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#334e68"/></marker></defs>
    <g font-family="Arial, sans-serif">
      <text x="225" y="30" text-anchor="middle" font-size="21" font-weight="700" fill="#243b53">会计利润盈亏平衡</text>
      <line x1="70" y1="330" x2="415" y2="330" stroke="#334e68" stroke-width="2" marker-end="url(#be-axis-arrow)"/><line x1="70" y1="330" x2="70" y2="60" stroke="#334e68" stroke-width="2" marker-end="url(#be-axis-arrow)"/>
      <line x1="70" y1="330" x2="390" y2="78" stroke="#2563eb" stroke-width="4"/><line x1="70" y1="260" x2="390" y2="136" stroke="#dc2626" stroke-width="4"/>
      <circle cx="245" cy="192" r="7" fill="#111827"/><line x1="245" y1="192" x2="245" y2="330" stroke="#64748b" stroke-dasharray="6 5"/><line x1="70" y1="192" x2="245" y2="192" stroke="#64748b" stroke-dasharray="6 5"/>
      <text x="245" y="354" text-anchor="middle" font-size="16">2,240</text><text x="55" y="198" text-anchor="end" font-size="15">4,480</text><text x="55" y="265" text-anchor="end" font-size="15">2,240</text>
      <text x="320" y="105" font-size="16" fill="#1d4ed8">销售收入</text><text x="308" y="155" font-size="16" fill="#b91c1c">总成本</text><text x="80" y="252" font-size="15" fill="#52606d">固定成本（含折旧）</text>
      <text x="675" y="30" text-anchor="middle" font-size="21" font-weight="700" fill="#243b53">财务盈亏平衡</text>
      <line x1="520" y1="330" x2="865" y2="330" stroke="#334e68" stroke-width="2" marker-end="url(#be-axis-arrow)"/><line x1="520" y1="330" x2="520" y2="60" stroke="#334e68" stroke-width="2" marker-end="url(#be-axis-arrow)"/>
      <line x1="520" y1="330" x2="840" y2="78" stroke="#2563eb" stroke-width="4"/><line x1="520" y1="275" x2="840" y2="115" stroke="#dc2626" stroke-width="4"/>
      <circle cx="710" cy="180" r="7" fill="#111827"/><line x1="710" y1="180" x2="710" y2="330" stroke="#64748b" stroke-dasharray="6 5"/><line x1="520" y1="180" x2="710" y2="180" stroke="#64748b" stroke-dasharray="6 5"/>
      <text x="710" y="354" text-anchor="middle" font-size="16">2,427</text><text x="505" y="186" text-anchor="end" font-size="15">16,269</text><text x="505" y="280" text-anchor="end" font-size="15">5,932</text>
      <text x="770" y="105" font-size="16" fill="#1d4ed8">销售收入</text><text x="758" y="145" font-size="16" fill="#b91c1c">总成本现值</text><text x="535" y="266" font-size="15" fill="#52606d">固定成本现值（包括折旧）</text>
      <text x="450" y="395" text-anchor="middle" font-size="17" fill="#52606d">产量</text><text x="25" y="200" transform="rotate(-90 25 200)" text-anchor="middle" font-size="17" fill="#52606d">金额</text><text x="475" y="200" transform="rotate(-90 475 200)" text-anchor="middle" font-size="17" fill="#52606d">金额</text>
    </g>
  </svg>
  <figcaption style="margin-top:.55rem;color:#52606d;font-size:.92rem;">图 3：会计与财务盈亏平衡双面板图。收入线与相应成本线的交点分别决定会计利润为零和 NPV 为零的销量；财务盈亏平衡点更高。根据课件 PDF 第 9 页右上幻灯片重绘；许可待核对。</figcaption>
</figure>

### 4 蒙特卡罗模拟

课件给出的步骤为：

1. 定义基础模型；
2. 为模型中的每个变量指定一个概率分布；
3. 由计算机随机抽取变量并计算一次结果；
4. 重复抽样与计算；
5. 汇总净现值分布。

蒙特卡罗模拟输出的不是一个确定 NPV，而是一组可能 NPV 的分布，可用于估计亏损概率、波动范围和尾部风险。课件中的示意图没有提供原始数据，因此本文不凭目测重建精确分布。

## 十一 方法比较与公式速查

### 1 方法比较

| 方法 | 是否考虑时间价值 | 是否使用全部现金流 | 结果形式 | 主要用途 | 主要局限 |
|---|:---:|:---:|---|---|---|
| PBP | 否 | 否 | 年数 | 流动性与快速筛选 | 标准主观，忽略后期现金流 |
| 折现回收期 | 是 | 否 | 年数 | 折现后的资金回收风险 | 仍忽略回收后的现金流 |
| IRR | 是 | 是 | 收益率 | 与最低收益率比较 | 多个 IRR、互斥排序冲突 |
| NPV | 是 | 是 | 价值金额 | 衡量股东财富增量 | 对贴现率和现金流预测敏感 |
| PI | 是 | 是 | 相对比率 | 资本受限时衡量单位投资效率 | 可能偏向小项目 |

### 2 公式速查

| 内容 | 课件公式 | 判断 |
|---|---|---|
| 回收期 | $PBP=a+\dfrac{b-c}{d}$ | 小于最长可接受回收期则接受 |
| 内部收益率 | $ICO=\displaystyle\sum_{t=1}^{n}\dfrac{CF_t}{(1+IRR)^t}$ | $IRR$ 高于最低收益率则接受 |
| 净现值 | $NPV=\displaystyle\sum_{t=1}^{n}\dfrac{CF_t}{(1+k)^t}-ICO$ | $NPV>0$ 接受 |
| 盈利指数 | $PI=\left[\displaystyle\sum_{t=1}^{n}\dfrac{CF_t}{(1+k)^t}\right]\div ICO$ | $PI>1$ 接受 |
| PI 与 NPV | $PI=1+NPV/ICO$ | 两者对独立常规项目结论一致 |
| 期望 NPV | $E(NPV)=\displaystyle\sum p_iNPV_i$ | 同时观察期望值与损失情形 |

## 十二 高频易错点

1. 普通回收期不折现现金流，折现回收期才考虑时间价值。
2. 回收期只计算到收回初始投资，不能用它衡量全部项目价值。
3. IRR 是令 $NPV=0$ 的贴现率，不是任意年度会计利润率。
4. 非常规现金流可能存在多个 IRR，不能机械比较 IRR 与门槛收益率。
5. 互斥项目出现 IRR 与 NPV 冲突时，不能只选 IRR 较高者。
6. $PI$ 衡量相对收益，$NPV$ 衡量绝对财富增量。
7. 资本限额下要选总 NPV 最大的可行组合，不只是单个 NPV 最大的项目。
8. 敏感性分析一次改变一个变量，场景分析同时改变一组变量。
9. 正的期望 NPV 不代表每种情形下 NPV 都为正。
10. 中间现值因子过早取整会使最终 NPV 出现几美元的差异。

## 十三 自测题

1. 为什么 BW 项目的 PBP 支持接受，而 NPV 支持拒绝？
2. 折现回收期与普通回收期分别解决和保留了哪些问题？
3. 现金流符号变化两次是否必然产生两个 IRR？为什么？
4. 项目 S 的 IRR 和 PI 都高于项目 L，为什么互斥选择时仍可能选择 L？
5. 说明费雪交叉利率与项目 IRR 的区别。
6. 在 32,500 美元资本限额下，为什么课件中的 PI 排序组合增加价值最多？
7. 敏感性分析与场景分析的变量变动方式有什么不同？
8. 会计利润盈亏平衡点与财务盈亏平衡点分别令什么等于零？
9. 根据课件三种场景重新计算期望 NPV。

## 十四 来源与待核对事项

### 1 来源

- 《07-Capital Budgeting_I_Technigues(1).pdf》，第 1—9 页，课程课件；作者与公开授权状态待核对。

### 2 待人工核对

- [ ] 文件名中的 “Technigues” 疑为 “Techniques” 的拼写错误。
- [ ] BW 项目的 NPV 在逐项计算页为 -1,428 美元，在汇总页为 -1,424 美元；本文判断差异来自现值因子取整。
- [ ] 课件第 6 页提示项目寿命差异和增量现金流量以教材第 95—99 页及考试要求为准，本文未补造教材内容。
- [ ] 盈亏平衡图中的示例数值已按课件图面转录，具体案例的销售单价、税率等底层数据未在该页完整给出。
- [ ] 全部重绘图形的公开展示与改编许可待核对。

