# 宏观经济学专题：从索洛到 RBC——增长与波动

> [!summary] 来源与范围
> 根据合并课件《从索罗到RBC_增长与波动_合并课件_v1.html》第 1—35 页新建。内容覆盖索洛模型、Ramsey—Cass—Koopmans 模型、随机增长模型和实际经济周期理论（Real Business Cycle Theory，RBC）。整理日期：2026-10-28。课件没有列出完整参考文献，因此本文同时对照 Ramsey（1928）、Kydland 与 Prescott（1982）、Hansen（1985）的原始论文核对模型定位；公式仍以课件使用的离散时间写法为主。

> [!note] 与现有笔记的关系
> 第 7 章笔记分别解释索洛模型和长期增长，第 8 章笔记解释 AD—AS 与短期价格黏性。本专题关心另一条主线：怎样从外生储蓄的增长模型，走到家庭跨期最优化，再把随机技术冲击、劳动选择和数据矩加入模型。重复的基础公式只保留理解这条主线所需的部分。

## 一 四个模型怎样衔接

<figure style="margin:1.5rem auto;max-width:900px;text-align:center">
<svg viewBox="0 0 900 300" role="img" aria-labelledby="rbc-road-title rbc-road-desc" style="width:100%;height:auto;background:#fbfcfe;border:1px solid #d9e2ec;border-radius:10px">
  <title id="rbc-road-title">从索洛到实际经济周期模型的演进图</title>
  <desc id="rbc-road-desc">索洛模型加入家庭跨期最优化成为Ramsey型增长模型；再加入随机技术过程成为随机增长模型；再加入劳动闲暇选择、竞争均衡和校准形成基准RBC模型。</desc>
  <defs><marker id="rbc-road-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9 Z" fill="#334e68"/></marker></defs>
  <g font-family="Arial, Microsoft YaHei, sans-serif">
    <rect x="35" y="92" width="175" height="92" rx="9" fill="#eaf2ff" stroke="#2563eb"/><text x="122" y="126" text-anchor="middle" font-size="22" font-weight="700" fill="#243b53">索洛模型</text><text x="122" y="157" text-anchor="middle" font-size="16" fill="#52606d">外生储蓄率 s</text>
    <rect x="250" y="92" width="175" height="92" rx="9" fill="#ecfdf5" stroke="#0f766e"/><text x="337" y="126" text-anchor="middle" font-size="22" font-weight="700" fill="#243b53">Ramsey 模型</text><text x="337" y="157" text-anchor="middle" font-size="16" fill="#52606d">消费与储蓄最优化</text>
    <rect x="465" y="92" width="175" height="92" rx="9" fill="#fff7ed" stroke="#b45309"/><text x="552" y="126" text-anchor="middle" font-size="21" font-weight="700" fill="#243b53">随机增长模型</text><text x="552" y="157" text-anchor="middle" font-size="16" fill="#52606d">预期与技术冲击</text>
    <rect x="680" y="92" width="175" height="92" rx="9" fill="#f5f3ff" stroke="#7c3aed"/><text x="767" y="126" text-anchor="middle" font-size="22" font-weight="700" fill="#243b53">基准 RBC</text><text x="767" y="157" text-anchor="middle" font-size="16" fill="#52606d">劳动选择与校准</text>
    <line x1="210" y1="138" x2="243" y2="138" stroke="#334e68" stroke-width="2.5" marker-end="url(#rbc-road-arrow)"/><line x1="425" y1="138" x2="458" y2="138" stroke="#334e68" stroke-width="2.5" marker-end="url(#rbc-road-arrow)"/><line x1="640" y1="138" x2="673" y2="138" stroke="#334e68" stroke-width="2.5" marker-end="url(#rbc-road-arrow)"/>
    <text x="227" y="69" text-anchor="middle" font-size="14" fill="#52606d">加入目标函数</text><text x="442" y="69" text-anchor="middle" font-size="14" fill="#52606d">加入不确定性</text><text x="657" y="69" text-anchor="middle" font-size="14" fill="#52606d">加入劳动选择和数据纪律</text>
    <text x="450" y="245" text-anchor="middle" font-size="17" fill="#243b53">共同骨架：生产函数、资源约束、资本积累与竞争均衡</text>
  </g>
</svg>
<figcaption>图 1：从索洛模型到基准 RBC 的模型演进图。每一步保留前面的资源约束并增加新的决策或随机因素；根据合并课件第 2—3、34 页重绘，许可待核对。</figcaption>
</figure>

| 模型 | 新增内容 | 核心内生变量 | 主要回答的问题 |
|---|---|---|---|
| 索洛模型 | 外生储蓄率、人口增长和折旧 | 资本存量 | 资本向哪个稳态收敛 |
| Ramsey—Cass—Koopmans | 家庭最大化跨期效用 | 消费、储蓄路径 | 家庭为什么储蓄，最优路径怎样形成 |
| 随机增长模型 | 随机生产率与条件期望 | 状态依赖的消费、投资规则 | 不确定性如何进入跨期决策 |
| 基准 RBC | 劳动—闲暇选择、竞争均衡、校准 | 消费、投资、劳动、产出 | 实际冲击如何产生可与数据比较的共同波动 |

> [!warning] 模型关系不能说得过强
> 课件把“把储蓄率按住，Ramsey 就退回索洛”称为严格的特例关系。更准确地说：两者共享生产技术与资本积累方程；若移除家庭最优化并改为外生固定储蓄率，就回到索洛式动态。这个替换改变了模型的决策结构，不能仅靠在 Ramsey 欧拉方程中固定一个参数完成。

> [!tip] 先记住同一个故事
> 把整个专题想成一个人经营椰子岛。索洛先规定“每年固定留下 20% 的椰子当种子”，只问椰子树最终有多少；Ramsey 让岛民自己权衡今天吃和明天种；随机 Ramsey 告诉他明天天气未知，只能提前写好不同天气下的应对规则；RBC 再让他决定每天工作多久，并拿岛上的产出、消费、投资和就业波动去对照真实经济。后面的公式都在回答这个故事中的一个具体选择。

## 二 第一幕：索洛模型给出增长方向

### 1 生产与资本积累

课件使用不含技术进步的柯布—道格拉斯生产函数：

$$
Y_t=AK_t^{\alpha}L_t^{1-\alpha},\qquad 0<\alpha<1
$$

除以劳动人口 $L_t$，令 $k_t=K_t/L_t$、$y_t=Y_t/L_t$：

$$
y_t=Ak_t^{\alpha}
$$

课件把离散时间变化写成近似式：

$$
\boxed{\Delta k_t=sAk_t^{\alpha}-(n+\delta)k_t}
$$

- $s$：储蓄率，索洛模型中外生给定；
- $n$：劳动人口增长率；
- $\delta$：资本折旧率；
- $sAk_t^\alpha$：人均实际投资；
- $(n+\delta)k_t$：维持人均资本所需的“收支相抵投资”。

这一式忽略了离散时间中 $n\delta$ 等乘积项，适合把 $n$、$\delta$ 看作较小增长率时的课堂近似。若按精确离散时间写法，分母中的人口增长要保持一致。

> [!example] 像给浴缸放水
> 储蓄投资 $sAk^\alpha$ 是水龙头，折旧和新增人口需要的资本 $(n+\delta)k$ 是出水口。资本少时，新增一台机器很有用，进水通常快于出水，人均资本上升；资本多时，边际产出下降而维护负担变大，出水逐渐追上进水。两者相等时水位稳定，这就是稳态。

### 2 稳态与黄金律

稳态 $k^*$ 满足：

$$
sA(k^*)^{\alpha}=(n+\delta)k^*
$$

因此在课件采用的无技术进步近似下：

$$
\boxed{\frac{K}{Y}=\frac{s}{n+\delta}}
$$

黄金律资本使稳态人均消费最大，其条件是：

$$
\boxed{MPK=\alpha A(k_{GR}^*)^{\alpha-1}=n+\delta}
$$

稳态回答“给定 $s$ 后会停在哪里”，黄金律回答“哪个稳态的消费最高”。索洛模型可以比较两者，却没有目标函数来解释家庭为什么选择某个 $s$。

> [!example] 课件数值的口径
> 令 $s=0.2$、$\alpha=0.36$、$n=0$、$\delta=0.025$。索洛稳态给出 $K/Y=8$；黄金律给出 $K/Y=\alpha/\delta=14.4$。如果一期代表季度，二者分别约为年产出的 2 倍与 3.6 倍；课件第 6 页未先说明频率，直接比较时必须补上单位。

## 三 第二幕：Ramsey 模型内生化储蓄

### 1 家庭的跨期问题

为避免人口权重与人均约束混用，本节先写课件数值例子采用的 $n=0$ 基准：

$$
\max_{\{c_t,k_{t+1}\}}\sum_{t=0}^{\infty}\beta^t
\frac{c_t^{1-\theta}-1}{1-\theta}
$$

约束为：

$$
k_{t+1}=(1-\delta)k_t+Ak_t^{\alpha}-c_t
$$

- $0<\beta<1$：主观贴现因子，越大表示越重视未来；
- $\theta>0$：相对风险厌恶系数；在确定性消费问题中，跨期替代弹性为 $1/\theta$；
- $c_t$：第 $t$ 期人均消费；
- $k_{t+1}$：家庭选择留到下一期的人均资本。

若加入人口增长，目标函数究竟是按“每人效用”还是“总人口效用”加总，资本约束又按总量还是人均量写，必须同时说明。课件第 9—10 页令 $\tilde\beta=\beta(1+n)$，但欧拉方程没有保留人均资本约束中的 $1+n$；在 $n\ne0$ 时需要统一归一化，不能混用。

### 2 欧拉方程与横截条件

拉格朗日一阶条件给出：

$$
u'(c_t)=\beta u'(c_{t+1})
\left[\alpha A k_{t+1}^{\alpha-1}+1-\delta\right]
$$

CRRA 效用下：

$$
\boxed{c_t^{-\theta}=\beta c_{t+1}^{-\theta}
\left[MPK_{t+1}+1-\delta\right]}
$$

直觉是：今天放弃一单位消费的边际效用，必须等于把它变成资本后，明天本金加收益所带来的折现边际效用。若一边更高，家庭仍能通过跨期搬动消费提高效用。

横截条件排除为了无穷远资本而永久压低消费的路径。离散时间常见写法是：

$$
\lim_{t\to\infty}\beta^t u'(c_t)k_{t+1}=0
$$

其精确形式会随总量／人均量和人口权重的写法变化。它不是普通的“终点资本等于零”，而是要求无穷远处没有具有正现值、却永不用于消费的剩余资产。

> [!example] 欧拉方程在比较哪两口饭
> 假设少吃今天的一口饭可以换成资本，明天连本带利得到 1.04 口。是否值得，不能只看 1.04 大于 1：还要看家庭有多重视明天，以及明天已经吃得多不多。明天很富足时，额外一口的边际效用很低；家庭可能宁愿今天吃。欧拉方程正是在比较“今天这一口的边际满足”与“明天回报折现后的边际满足”。

### 3 修正黄金律与稳态

稳态消费不变时，欧拉方程化为：

$$
\boxed{MPK^*=\frac{1}{\beta}-1+\delta}
$$

柯布—道格拉斯生产下 $MPK=\alpha Y/K$，所以：

$$
\boxed{\frac{K}{Y}=\frac{\alpha\beta}{1-\beta+\beta\delta}}
$$

按课件数值 $\alpha=0.36$、$\beta=0.99$、$\delta=0.025$，季度 $K/Y\approx10.3$，换成年产出约为 2.6。它低于黄金律季度比率 14.4，因为有限耐心使家庭不愿为最大化遥远稳态消费而积累那么多资本。

### 4 鞍点路径

<figure style="margin:1.5rem auto;max-width:760px;text-align:center">
<svg viewBox="0 0 760 440" role="img" aria-labelledby="ramsey-phase-title ramsey-phase-desc" style="width:100%;height:auto;background:#fbfcfe;border:1px solid #d9e2ec;border-radius:10px">
  <title id="ramsey-phase-title">Ramsey模型相位图</title>
  <desc id="ramsey-phase-desc">横轴为资本k，纵轴为消费c。资本不变线是一条先升后降的曲线，消费不变线是稳态资本处的竖线，交点E为稳态。鞍点路径从左下和右上方向收敛到E。</desc>
  <defs><marker id="phase-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#334e68"/></marker></defs>
  <line x1="90" y1="365" x2="690" y2="365" stroke="#334e68" stroke-width="2.5" marker-end="url(#phase-arrow)"/><line x1="90" y1="365" x2="90" y2="50" stroke="#334e68" stroke-width="2.5" marker-end="url(#phase-arrow)"/>
  <path d="M95 350 C180 190 310 95 430 130 C530 160 610 245 675 340" fill="none" stroke="#2563eb" stroke-width="4"/><line x1="430" y1="365" x2="430" y2="70" stroke="#dc2626" stroke-width="4"/>
  <path d="M115 330 C220 285 330 215 430 130 C520 100 600 82 670 70" fill="none" stroke="#0f766e" stroke-width="4"/>
  <circle cx="430" cy="130" r="7" fill="#111827"/><text x="444" y="121" font-size="21" fill="#111827">E</text><text x="500" y="180" font-size="17" fill="#0f766e">鞍点路径</text><text x="535" y="298" font-size="17" fill="#2563eb">Δk=0</text><text x="442" y="92" font-size="17" fill="#dc2626">Δc=0</text><text x="700" y="374" font-size="20" fill="#243b53">k</text><text x="74" y="43" font-size="20" fill="#243b53">c</text><text x="411" y="393" font-size="18" fill="#243b53">k*</text>
</svg>
<figcaption>图 2：Ramsey 模型相位图。给定初始资本后，只有位于稳定臂上的初始消费会收敛到稳态 E；根据合并课件第 12 页重绘，许可待核对。</figcaption>
</figure>

$\Delta k=0$ 曲线表示消费恰好等于净产出；$\Delta c=0$ 竖线由修正黄金律决定。资本是预定状态变量，初始 $k_0$ 已给定，而消费可以跳跃。高于稳定臂时消费过多、资本可能耗尽；低于稳定臂并不简单等于“资本必然堆到无穷”，其精确发散方向取决于所在区域，但非稳定路径会违反可行性或横截条件。

## 四 第三幕：随机增长模型加入不确定性

### 1 技术过程与条件期望

用 $z_t=\ln A_t$ 表示对数生产率，课件设定：

$$
\boxed{z_t=\rho z_{t-1}+\varepsilon_t},\qquad
\varepsilon_t\sim N(0,\sigma_\varepsilon^2),\quad |\rho|<1
$$

- $\rho$：技术冲击持续性；它与前一篇 CES 模型中的替代参数同名但含义完全不同；
- $\varepsilon_t$：第 $t$ 期无法由既有信息预测的新冲击；
- $\sigma_\varepsilon$：冲击的标准差。

若 $\rho=0.95$，冲击半衰期约为：

$$
h=\frac{\ln(0.5)}{\ln(0.95)}\approx13.5\text{ 个季度}
$$

欧拉方程变成条件期望：

$$
\boxed{u'(C_t)=\beta E_t\left\{u'(C_{t+1})
\left[MPK_{t+1}+1-\delta\right]\right\}}
$$

$E_t$ 表示使用第 $t$ 期已有信息形成期望。家庭不再选择一条预先知道的确定路径，而是选择策略函数：

$$
C_t=g(K_t,A_t),\qquad K_{t+1}=h(K_t,A_t)
$$

> [!example] 从行程表变成应急手册
> 确定性 Ramsey 像提前写好未来十天每天吃多少；随机模型则像先写规则：“库存充足且天气好，就多投资；库存偏低且台风来临，就优先维持消费。”家庭不知道明天抽到哪种天气，但知道每种状态下怎样行动。策略函数 $g,h$ 就是这本应急手册。

### 2 线性化和稳定性

在确定性稳态附近，常用对数偏离：

$$
\hat X_t=\ln\left(\frac{X_t}{\bar X}\right)
$$

当偏离较小时，$100\hat X_t$ 近似为变量高于稳态的百分比。线性化后的系统可写为：

$$
\hat z_{t+1}\approx M\hat z_t+N\varepsilon_{t+1}
$$

课件用“一根特征值在单位圆内、一根在单位圆外”解释二维鞍点。一般的 Blanchard—Kahn 条件是：**不稳定根的数量应与可跳跃变量的数量匹配**，并非任何更高维模型都固定为一内一外。

## 五 第四幕：RBC 把增长模型用于周期

### 1 “孤岛故事”对应哪些方程

<figure style="margin:1.5rem auto;max-width:900px;text-align:center">
<svg viewBox="0 0 900 400" role="img" aria-labelledby="island-title island-desc" style="width:100%;height:auto;background:#fbfcfe;border:1px solid #d9e2ec;border-radius:10px">
  <title id="island-title">RBC孤岛故事与模型变量对应图</title>
  <desc id="island-desc">技术A、资本K和劳动L进入生产函数形成产出Y；产出分为消费C和投资I；投资经过资本积累形成下一期资本；家庭在劳动与闲暇、消费与投资之间选择。</desc>
  <defs><marker id="island-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9 Z" fill="#334e68"/></marker></defs>
  <g font-family="Arial, Microsoft YaHei, sans-serif">
    <rect x="55" y="55" width="145" height="62" rx="8" fill="#fff7ed" stroke="#b45309"/><text x="128" y="91" text-anchor="middle" font-size="19">天气／技术 A</text>
    <rect x="55" y="165" width="145" height="62" rx="8" fill="#eaf2ff" stroke="#2563eb"/><text x="128" y="201" text-anchor="middle" font-size="19">渔网／资本 K</text>
    <rect x="55" y="275" width="145" height="62" rx="8" fill="#ecfdf5" stroke="#0f766e"/><text x="128" y="311" text-anchor="middle" font-size="19">工作／劳动 L</text>
    <rect x="330" y="165" width="170" height="62" rx="8" fill="#f5f3ff" stroke="#7c3aed"/><text x="415" y="201" text-anchor="middle" font-size="20">椰子／产出 Y</text>
    <rect x="650" y="85" width="150" height="62" rx="8" fill="#fff1f2" stroke="#be123c"/><text x="725" y="121" text-anchor="middle" font-size="20">消费 C</text>
    <rect x="650" y="245" width="150" height="62" rx="8" fill="#eef2ff" stroke="#4f46e5"/><text x="725" y="281" text-anchor="middle" font-size="20">投资 I</text>
    <line x1="200" y1="86" x2="325" y2="180" stroke="#334e68" stroke-width="2.5" marker-end="url(#island-arrow)"/><line x1="200" y1="196" x2="323" y2="196" stroke="#334e68" stroke-width="2.5" marker-end="url(#island-arrow)"/><line x1="200" y1="306" x2="325" y2="212" stroke="#334e68" stroke-width="2.5" marker-end="url(#island-arrow)"/>
    <line x1="500" y1="185" x2="643" y2="125" stroke="#334e68" stroke-width="2.5" marker-end="url(#island-arrow)"/><line x1="500" y1="208" x2="643" y2="264" stroke="#334e68" stroke-width="2.5" marker-end="url(#island-arrow)"/><path d="M725 307 C710 365 250 370 130 235" fill="none" stroke="#4f46e5" stroke-width="2.5" stroke-dasharray="7 5" marker-end="url(#island-arrow)"/>
    <text x="395" y="145" text-anchor="middle" font-size="16" fill="#52606d">Y=A KᵅL¹⁻ᵅ</text><text x="450" y="351" text-anchor="middle" font-size="16" fill="#4f46e5">投资形成下一期资本</text>
  </g>
</svg>
<figcaption>图 3：RBC 孤岛故事与模型变量对应图。课件中的天气、渔网、劳动、椰子分别对应技术、资本、劳动和产出；根据第 19—24 页重绘，许可待核对。</figcaption>
</figure>

孤岛是竞争经济的计划者问题表示。它帮助理解资源约束，却不能说明现实经济没有市场、政府或货币；这些因素只是被基准模型暂时排除。

> [!example] 一颗椰子的两种去向
> 今天收获 100 颗椰子。如果吃掉 80 颗，剩下 20 颗用于育苗和织网，那么 $C=80$、$I=20$，恰好满足 $Y=C+I$。投资不会凭空增加今天的资源，它只是用今天少消费换取未来更高的生产能力。台风使同样的树、网和工时只能收获 80 颗时，资源约束仍成立，但岛民必须重新安排消费、投资与劳动。

### 2 基准 RBC 的四组方程

家庭效用：

$$
E_0\sum_{t=0}^{\infty}\beta^t
\left[\frac{C_t^{1-\theta}-1}{1-\theta}
-\psi\frac{L_t^{1+\gamma}}{1+\gamma}\right]
$$

生产函数：

$$
Y_t=A_tK_t^{\alpha}L_t^{1-\alpha}
$$

资本积累与资源约束：

$$
K_{t+1}=(1-\delta)K_t+I_t,qquad
\boxed{Y_t=C_t+I_t}
$$

技术过程：

$$
\ln A_t=\rho\ln A_{t-1}+\varepsilon_t
$$

这里 $L_t$ 是劳动时间或就业投入，闲暇在总时间归一化为 1 时为 $1-L_t$。$\psi$ 决定劳动负效用的权重，$\gamma$ 控制劳动供给曲率。生产函数规模报酬不变，使竞争性厂商支付的工资和资本租金分别等于边际产出。

### 3 两个核心最优条件

跨期欧拉方程：

$$
\boxed{\frac{1}{C_t}=\beta E_t\left[
\frac{1}{C_{t+1}}
\left(\alpha\frac{Y_{t+1}}{K_{t+1}}+1-\delta\right)
\right]}
$$

这是课件在 $\theta=1$、即对数消费效用下的写法。若 $\theta\ne1$，$1/C_t$ 应改为 $C_t^{-\theta}$。

劳动—闲暇的一阶条件：

$$
\boxed{\psi L_t^{\gamma}
=C_t^{-\theta}(1-\alpha)\frac{Y_t}{L_t}}
$$

左边是多劳动一单位的边际负效用，右边是实际工资带来的消费边际效用。课件第 27 页写成 $1/C_t$，同样隐含 $\theta=1$。

<figure style="margin:1.5rem auto;max-width:760px;text-align:center">
<svg viewBox="0 0 760 420" role="img" aria-labelledby="labor-choice-title labor-choice-desc" style="width:100%;height:auto;background:#fbfcfe;border:1px solid #d9e2ec;border-radius:10px">
  <title id="labor-choice-title">劳动闲暇最优选择图</title>
  <desc id="labor-choice-desc">横轴为劳动时间，纵轴为产出和边际价值。生产函数随劳动增加而上升但逐渐变平；边际劳动产出曲线向下，劳动边际负效用曲线向上，两者交点决定最优劳动。</desc>
  <line x1="90" y1="350" x2="690" y2="350" stroke="#334e68" stroke-width="2.5"/><line x1="90" y1="350" x2="90" y2="55" stroke="#334e68" stroke-width="2.5"/>
  <path d="M95 340 C210 185 390 105 660 82" fill="none" stroke="#2563eb" stroke-width="4"/><path d="M125 105 C260 165 430 235 640 310" fill="none" stroke="#0f766e" stroke-width="3.5"/><path d="M125 315 C280 285 440 220 640 95" fill="none" stroke="#dc2626" stroke-width="3.5"/>
  <circle cx="406.5" cy="222.5" r="7" fill="#111827"/><line x1="406.5" y1="222.5" x2="406.5" y2="350" stroke="#64748b" stroke-width="2" stroke-dasharray="6 5"/>
  <text x="510" y="105" font-size="18" fill="#2563eb">Y(L)</text><text x="545" y="286" font-size="17" fill="#0f766e">MPL×边际效用</text><text x="535" y="130" font-size="17" fill="#dc2626">劳动边际负效用</text><text x="418" y="211" font-size="18">最优 L*</text><text x="540" y="385" font-size="19">劳动时间 L</text><text x="25" y="48" font-size="18">产出／边际值</text>
</svg>
<figcaption>图 4：劳动—闲暇最优选择图。最优劳动满足劳动边际负效用等于实际工资带来的消费边际效用；同时展示劳动边际产出递减。根据合并课件第 20、27、29 页组合重绘，许可待核对。</figcaption>
</figure>

### 4 稳态资本产出比

在 $\theta=1$ 且确定性稳态中，欧拉方程给出：

$$
\boxed{\frac{K}{Y}=\frac{\alpha\beta}{1-\beta+\beta\delta}}
$$

代入 $\alpha=0.36$、$\beta=0.99$、$\delta=0.025$，得到季度口径 $K/Y\approx10.3$；除以 4 后约为年产出的 2.6 倍。它与 Ramsey 稳态相同，因为基准 RBC 的确定性稳态仍是新古典增长模型；RBC 的新增内容主要体现在稳态附近的随机波动。

## 六 技术冲击怎样变成经济波动

### 1 传导链

正向生产率冲击使同样资本和劳动能够生产更多产出，并提高劳动与资本的边际产出。家庭和企业随之调整劳动、消费与投资。投资增加会积累资本，因此即使技术冲击开始衰减，产出效应仍可能延续。

这一过程可按时间读：冲击发生当期，生产效率和要素回报先改变；家庭通常平滑消费，不会把新增产出全部吃掉，因此投资反应更大；新增投资随后转化为资本，让冲击的影响延续若干期。图形比较的是响应方向、峰值和衰减速度，而不是预测某年 GDP 的精确数值。

<figure style="margin:1.5rem auto;max-width:900px;text-align:center">
<svg viewBox="0 0 900 310" role="img" aria-labelledby="shock-chain-title shock-chain-desc" style="width:100%;height:auto;background:#fbfcfe;border:1px solid #d9e2ec;border-radius:10px">
  <title id="shock-chain-title">技术冲击传导链与示意脉冲响应</title>
  <desc id="shock-chain-desc">上半部分显示技术上升提高劳动边际产出，推动劳动、投资和产出变化；下半部分显示技术、产出、投资和消费在冲击后逐渐回到稳态的示意路径，投资波动最大，消费最平滑。</desc>
  <defs><marker id="shock-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#334e68"/></marker></defs>
  <g font-family="Arial, Microsoft YaHei, sans-serif" font-size="16" fill="#243b53">
    <rect x="35" y="28" width="145" height="48" rx="7" fill="#fff7ed" stroke="#b45309"/><text x="107" y="58" text-anchor="middle">技术 A 上升</text><rect x="230" y="28" width="165" height="48" rx="7" fill="#ecfdf5" stroke="#0f766e"/><text x="312" y="58" text-anchor="middle">边际产出提高</text><rect x="445" y="28" width="165" height="48" rx="7" fill="#eaf2ff" stroke="#2563eb"/><text x="527" y="58" text-anchor="middle">劳动与投资调整</text><rect x="660" y="28" width="195" height="48" rx="7" fill="#f5f3ff" stroke="#7c3aed"/><text x="757" y="58" text-anchor="middle">产出与资本动态响应</text>
    <line x1="180" y1="52" x2="223" y2="52" stroke="#334e68" stroke-width="2.3" marker-end="url(#shock-arrow)"/><line x1="395" y1="52" x2="438" y2="52" stroke="#334e68" stroke-width="2.3" marker-end="url(#shock-arrow)"/><line x1="610" y1="52" x2="653" y2="52" stroke="#334e68" stroke-width="2.3" marker-end="url(#shock-arrow)"/>
  </g>
  <line x1="70" y1="246" x2="835" y2="246" stroke="#334e68" stroke-width="2"/><line x1="70" y1="246" x2="70" y2="112" stroke="#334e68" stroke-width="2"/>
  <path d="M70 246 L105 142 C170 175 260 208 390 229 C520 240 680 244 825 246" fill="none" stroke="#b45309" stroke-width="3"/><path d="M70 246 L105 165 C185 190 290 217 430 234 C580 242 710 245 825 246" fill="none" stroke="#2563eb" stroke-width="3"/><path d="M70 246 L105 115 C170 160 260 205 395 230 C545 242 700 245 825 246" fill="none" stroke="#dc2626" stroke-width="3"/><path d="M70 246 L105 205 C210 216 330 230 480 239 C620 244 735 246 825 246" fill="none" stroke="#0f766e" stroke-width="3"/>
  <text x="720" y="128" font-size="15" fill="#dc2626">投资</text><text x="720" y="151" font-size="15" fill="#b45309">技术</text><text x="720" y="174" font-size="15" fill="#2563eb">产出</text><text x="720" y="197" font-size="15" fill="#0f766e">消费</text><text x="735" y="278" font-size="17">冲击后的季度</text><text x="20" y="105" font-size="16">偏离稳态</text>
</svg>
<figcaption>图 5：技术冲击传导链与示意脉冲响应图。曲线只表达课件给出的相对形状：投资反应较大、消费较平滑、影响逐渐衰减；没有原始数值，不应用于读取精确峰值。根据合并课件第 22—23、31 页重绘，许可待核对。</figcaption>
</figure>

> [!warning] 冲击响应不是自动成立的方向表
> 正向技术冲击对劳动的收入效应和替代效应方向相反；劳动是否增加、增加多少，取决于偏好、冲击持续性和模型参数。课件用“技术上升 → 劳动供给增加”概括基准校准的结果，不是任何偏好设定下的恒等式。

### 2 Solow 残差与“技术冲击”

由生产函数倒推：

$$
\boxed{\ln A_t=\ln Y_t-\alpha\ln K_t-(1-\alpha)\ln L_t}
$$

这一残差包含未被资本和劳动解释的所有变化，包括技术、产能利用率、劳动强度、测量误差和遗漏投入。因此把它全部称为外生技术冲击，是 RBC 的识别假设，不是数据直接证明的事实。

## 七 校准、矩匹配与实证评价

### 1 课件的基准参数

| 参数 | 课件取值 | 作用 | 口径提醒 |
|---|---:|---|---|
| $\alpha$ | 0.36 | 资本产出弹性／收入份额 | 对应美国长期份额的典型校准 |
| $\beta$ | 0.99 | 季度贴现因子 | 与季度实际回报率相联系 |
| $\delta$ | 0.025 | 季度折旧率 | 不能直接写成精确年折旧 10%；复合年折旧约 $1-(1-0.025)^4\approx9.63\%$ |
| $\theta$ | 1 | 对数消费效用 | 跨期替代弹性等于 1 |
| $\gamma$ | 设定 | 劳动供给曲率 | 需用微观或宏观证据说明选择 |
| $\rho$ | 0.95 | 技术过程持续性 | 与替代弹性参数无关 |
| $\sigma_\varepsilon$ | 0.007 | 技术创新标准差 | 单位取决于对数过程和季度频率 |

校准（calibration）选取参数，使稳态比率或模型矩与长期事实接近；估计（estimation）用明确的统计模型从样本推断参数及不确定性。二者都可用于检验模型，但输出和统计含义不同。

课件第 32 页列出相对产出波动的示例：产出 1.0、消费 0.5、投资 3.0、就业 0.9，并以“上条为数据、下条为模型”比较矩。原 HTML 没给出样本期、滤波方法、模型对应数值或误差范围，因此无法从该页复算标题所说的“七成”。这句话应列为**待核对**，不能直接当成论文结论。Kydland 与 Prescott 1982 年原文的目标确实是比较周期方差、协方差与产出自协方差，但原论文模型还包含多期建设和非时间可分效用，不能与课件四方程的简化基准模型完全等同。

### 2 不可分劳动扩展

课件引用 Hansen 式不可分劳动，把个体劳动选择简化为“工作固定时长或不工作”，总劳动波动主要来自就业人数变化。聚合后常写成：

$$
U=\ln C-BN
$$

$N$ 是就业概率或就业人口比例，$B$ 是工作的效用成本。Hansen（1985）的原文强调：在劳动不可分时，工时波动来自就业人数而非每名就业者工时变化；这能提高模型的总劳动波动，但依赖彩票安排和完全风险共享等强假设。

### 3 RBC 做对了什么，又忽略了什么

| 贡献 | 限制 |
|---|---|
| 把增长理论与周期分析放入同一个动态一般均衡框架 | 基准模型把价格和工资视为灵活，难解释非自愿失业 |
| 从家庭和厂商最优化推导总量方程 | 代表性家庭会掩盖财富、流动性和风险差异 |
| 强调消费、投资、劳动和产出的共同运动 | Solow 残差不等于纯技术，冲击识别较弱 |
| 使用校准、模拟和矩比较检验数量表现 | 货币、名义刚性、金融摩擦和需求冲击被基准模型排除 |

RBC 不是说所有现实衰退都由“技术退步”造成，而是提出一个可量化的基准：在竞争市场和灵活价格下，实际冲击能解释多少周期事实？后来的新凯恩斯 DSGE 模型正是在这一动态最优化骨架上加入名义刚性和多种摩擦。

## 八 公式速查

| 模块 | 核心公式 | 主要用途 |
|---|---|---|
| 索洛资本动态 | $\Delta k=sAk^\alpha-(n+\delta)k$ | 给定储蓄率时求资本收敛方向 |
| 索洛黄金律 | $MPK=n+\delta$ | 最大化稳态消费 |
| Ramsey 欧拉方程 | $u'(c_t)=\beta E_t[u'(c_{t+1})R_{t+1}]$ | 最优地跨期配置消费 |
| 修正黄金律 | $MPK=1/\beta-1+\delta$ | 求最优增长模型稳态资本 |
| 技术过程 | $\ln A_t=\rho\ln A_{t-1}+\varepsilon_t$ | 描述冲击持续与创新 |
| RBC 劳动条件 | $-u_L/u_C=MPL$ | 选择劳动与闲暇 |
| 资源约束 | $Y=C+I$ | 保证总量计划一致 |
| Solow 残差 | $\ln A=\ln Y-\alpha\ln K-(1-\alpha)\ln L$ | 倒推未被投入解释的产出部分 |

> [!failure] 高频易错点
> 1. 索洛稳态与黄金律不是同一资本水平。  
> 2. $K/Y$ 必须注明季度或年度口径。  
> 3. 欧拉方程中的 $1/C_t$ 隐含 $\theta=1$；一般式是 $C_t^{-\theta}$。  
> 4. 随机稳态附近变量波动，不等于每一期都满足确定性稳态。  
> 5. Solow 残差是核算剩余，不能自动解释为纯技术。  
> 6. 校准接近若干数据矩，不等于完成因果识别或福利证明。

## 九 来源与待核对事项

- 《从索罗到RBC_增长与波动_合并课件_v1.html》，第 1—35 页。HTML 未列作者、制作机构、原始统计数据或图形许可，均待核对。
- F. P. Ramsey, “[A Mathematical Theory of Saving](https://academic.oup.com/ej/article-abstract/38/152/543/5282967),” *The Economic Journal*, 1928, 38(152): 543—559。
- Finn E. Kydland and Edward C. Prescott, “[Time to Build and Aggregate Fluctuations](https://www.minneapolisfed.org/~/media/files/research/prescott/papers/timetobuild.pdf),” *Econometrica*, 1982, 50(6): 1345—1370。原文模型包含多期资本建设与非时间可分效用，本文将课件四方程模型称为“基准 RBC”，不冒充原论文全部设定。
- Gary D. Hansen, “[Indivisible Labor and the Business Cycle](https://citeseerx.ist.psu.edu/document?doi=e8081b45962783b7ca72dcbfe256be39045a32b4&repid=rep1&type=pdf),” *Journal of Monetary Economics*, 1985, 16(3): 309—327。
- 待人工核对：课件第 9—10 页人口增长下的贴现因子归一化；第 30—32 页参数来源、样本期、滤波方法、数据矩与模型矩的逐项数值；“解释七成波动”的具体定义与出处。
