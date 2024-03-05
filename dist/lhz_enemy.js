"use strict";
/**
 * 識別難易度計算機
 */
class Difficulty {
    static normal(cr) {
        return Difficulty.values.normal[cr];
    }
    static hard(cr) {
        return Difficulty.values.hard[cr];
    }
    static veryHard(cr) {
        return Difficulty.values.very_hard[cr];
    }
}
Difficulty.values = {
    "normal": [0, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10, 10, 12, 12, 12, 13, 13, 13, 14, 14, 14, 15, 15, 15, 16, 16, 17],
    "hard": [0, 9, 9, 10, 10, 10, 12, 12, 12, 13, 13, 13, 14, 15, 15, 16, 16, 16, 17, 17, 18, 19, 19, 19, 20, 20, 21, 22, 22, 23, 23],
    "very_hard": [0, 11, 11, 13, 13, 13, 14, 15, 16, 16, 17, 18, 18, 19, 20, 20, 21, 22, 22, 23, 23, 25, 25, 25, 26, 27, 28, 28, 29, 30, 30],
};
/**
 * 基本攻撃手段の攻撃種別
 */
class AttackType {
    /**
     * コンストラクタ
     * @param {string} tag 付加されるタグ
     * @param {string} role 対抗手段
     * @param {string} type 攻撃種別
     * @memberof AttackType
     */
    constructor(tag, role, type) {
        this.tag = tag;
        this.role = role;
        this.type = type;
    }
}
AttackType.MELEE = new AttackType("白兵攻撃", "回避", "物理");
AttackType.SHOOTING = new AttackType("射撃攻撃", "回避", "物理");
AttackType.MAGICAL = new AttackType("魔法攻撃", "抵抗", "魔法");
/**
 * 攻撃対象
 */
class SkillTarget {
    /**
     * コンストラクタ
     * @param {string} label 表示名
     */
    constructor(label) {
        this.label = label;
    }
}
SkillTarget.SINGLE = new SkillTarget("単体");
SkillTarget.TARGET2 = new SkillTarget("2体");
SkillTarget.TARGET3 = new SkillTarget("3体");
SkillTarget.TARGET4 = new SkillTarget("4体");
SkillTarget.MULTI = new SkillTarget("範囲（選択）");
SkillTarget.MULTI1 = new SkillTarget("広範囲1（選択）");
SkillTarget.MULTI20 = new SkillTarget("広範囲20（選択）");
/**
 * 射程
 */
class SkillRange {
    /**
     * コンストラクタ
     * @param {string} label 表示名
     * @param {string} label 射程
     */
    constructor(label, value) {
        this.label = label;
        this.value = value;
    }
}
SkillRange.EMPTY = new SkillRange("", -1);
SkillRange.SQ0 = new SkillRange("至近", 0);
SkillRange.SQ1 = new SkillRange("1Sq", 1);
SkillRange.SQ2 = new SkillRange("2Sq", 2);
SkillRange.SQ3 = new SkillRange("3Sq", 3);
SkillRange.SQ4 = new SkillRange("4Sq", 4);
/**
 * エネミーランク
 */
class EnemyRank {
    /**
     * コンストラクタ
     * @param {string} label 表示名
     * @param {string} tag 付加されるタグ
     * @param {number} hpCoef HP係数
     * @param {number} goldCoef Gold係数
     */
    constructor(label, tag, hpCoef, goldCoef) {
        this.label = label;
        this.tag = tag;
        this.hpCoef = hpCoef;
        this.goldCoef = goldCoef;
        EnemyRank._values.push(this);
    }
    /**
     * エネミーランク一覧を取得
     * @static
     * @returns {Array < EnemyRank >} エネミーランク一覧
     */
    static getValues() {
        return this._values;
    }
}
EnemyRank._values = new Array();
EnemyRank.MOB = new EnemyRank("モブ", "モブ", 0.5, 0.5);
EnemyRank.NORMAL = new EnemyRank("ノーマル", null, 1, 1);
EnemyRank.BOSS1 = new EnemyRank("ボス（ソロ）", "ボス", 4, 4);
EnemyRank.BOSS2 = new EnemyRank("ボス（群れ）", "ボス", 2, 4);
/**
 * 大種族
 */
class EnemyRace {
    /**
     * コンストラクタ
     * @param {string} label 表示名
     */
    constructor(label) {
        this.label = label;
        EnemyRace._values.push(this);
    }
    /**
     * 大種族一覧を取得
     * @static
     * @returns {Array < EnemyRace >} 大種族一覧
     */
    static getValues() {
        return this._values;
    }
}
EnemyRace._values = new Array();
EnemyRace.DEMI_HUMAN = new EnemyRace("人型");
EnemyRace.NATURE = new EnemyRace("自然");
EnemyRace.SPILIT = new EnemyRace("精霊");
EnemyRace.CRYPTID = new EnemyRace("幻獣");
EnemyRace.UNDEAD = new EnemyRace("不死");
EnemyRace.ARTIFICIAL = new EnemyRace("人造");
EnemyRace.HUMAN = new EnemyRace("人間");
EnemyRace.GIMIC = new EnemyRace("ギミック");
/**
 * 知名度
 */
class Popularity {
    /**
     * コンストラクタ
     * @param {string} label 表示名
     * @param {number} value 識別難易度の基本値
     */
    constructor(label, value) {
        this.label = label;
        this.value = value;
        Popularity._values.push(this);
    }
    /**
     * 識別難易度を取得
     * @param {number} cr 対象エネミーのCR
     * @returns {string} 識別難易度
     */
    getDifficulty(cr) {
        if (this === Popularity.R1) {
            return "自動";
        }
        else {
            return Math.floor(this.value + (cr - 1) / 3 + 1);
        }
    }
    /**
     * 知名度一覧を取得
     * @static
     * @returns {Array < Popularity >} 知名度一覧
     */
    static getValues() {
        return this._values;
    }
}
Popularity._values = new Array();
Popularity.R1 = new Popularity("超有名", 0);
Popularity.R2 = new Popularity("有名", 2);
Popularity.R3 = new Popularity("一般的", 4);
Popularity.R4 = new Popularity("普通", 6);
Popularity.R5 = new Popularity("珍しい", 7);
Popularity.R6 = new Popularity("無名", 9);
Popularity.R7 = new Popularity("秘密", 12);
/// <reference path="./types.ts" />
/**
 * エネミータイプ
 */
class EnemyType {
    /**
     * コンストラクタ
     * @param {string} label 表示名
     * @param {string} num ナンバー
     */
    constructor(label, num) {
        this.label = label;
        this.num = num;
        this.name = "Type-" + this.num + " " + this.label;
        switch (num) {
            case 1:
                this._str = 7;
                this._dex = 3;
                this._pow = 4;
                this._int = 2;
                this._avoidCoef = 1.2;
                this._avoidFix = 4;
                this._resistCoef = 1.1;
                this._resistFix = 2;
                this._pdCoef = 2.2;
                this._pdFix = 8;
                this._mdCoef = 1.7;
                this._mdFix = 2;
                this._hpCoef = 8.5;
                this._hpFix = 48;
                this._actionFix = -2;
                this._hateCr = 0;
                this._hateFix = 1;
                this._damageAllCoef = 1;
                this._aggressionCoef = 0.55;
                this._basicAttackType = AttackType.MELEE;
                this._basicAttackRoleFix = 2;
                this._basicAttackRoleDice = 2;
                this._basicAttackTarget = SkillTarget.SINGLE;
                this._basicAttackRange = SkillRange.SQ0;
                this._funtion = "【物理防御力】と【最大ＨＰ】に秀でる反面【行動力】は低いエネミーです。クラスで言うと〈守護戦士〉にちかいでしょう。仲間を守る特技やＰＣの移動を阻害する特技を与えるべきです。このＥタイプのエネミーは倒しにくい反面、ＰＣに脅威を感じさせることには向いていません。過剰に出すとセッションが停滞します。またソロボスにも向きません。『ＬＨＺ』記載の代表的なエネミーは〈鉄躯緑鬼〉（P４４４）です。";
                break;
            case 2:
                this._str = 7;
                this._dex = 4;
                this._pow = 2;
                this._int = 3;
                this._avoidCoef = 1.1;
                this._avoidFix = 4;
                this._resistCoef = 1.1;
                this._resistFix = 2;
                this._pdCoef = 1.7;
                this._pdFix = 5;
                this._mdCoef = 1.7;
                this._mdFix = 1;
                this._hpCoef = 8.4;
                this._hpFix = 45;
                this._actionFix = -2;
                this._hateCr = 2;
                this._hateFix = 1;
                this._damageAllCoef = 1;
                this._aggressionCoef = 0.55;
                this._basicAttackType = AttackType.MELEE;
                this._basicAttackRoleFix = 2;
                this._basicAttackRoleDice = 2;
                this._basicAttackTarget = SkillTarget.SINGLE;
                this._basicAttackRange = SkillRange.SQ0;
                this._funtion = "アーマラーほどではありませんが、【物理防御力】と【最大ＨＰ】に秀で、【行動力】は低いエネミーです。クラスで言うと〈武士〉にちかいでしょう。仲間を守る特技や反撃する特技を与えるべきです。このＥタイプのエネミーはＰＣに先に倒してしまおうと思わせることに向いています。比較的ソロボスにむいています。『ＬＨＺ』記載の代表的なエネミーは〈吸血鬼〉（P４５７）です。";
                break;
            case 3:
                this._str = 7;
                this._dex = 4;
                this._pow = 2;
                this._int = 3;
                this._avoidCoef = 1.1;
                this._avoidFix = 2;
                this._resistCoef = 1.1;
                this._resistFix = 4;
                this._pdCoef = 0.9;
                this._pdFix = 2;
                this._mdCoef = 1.3;
                this._mdFix = 3;
                this._hpCoef = 7.5;
                this._hpFix = 45;
                this._actionFix = 0;
                this._hateCr = 0;
                this._hateFix = 1;
                this._damageAllCoef = 1;
                this._aggressionCoef = 0.55;
                this._basicAttackType = AttackType.MELEE;
                this._basicAttackRoleFix = 2;
                this._basicAttackRoleDice = 2;
                this._basicAttackTarget = SkillTarget.SINGLE;
                this._basicAttackRange = SkillRange.SQ0;
                this._funtion = "【最大ＨＰ】と［防御判定］に秀でる反面、【防御力】が低いエネミーです。仲間を守る特技やＰＣの妨害、反撃をする特技を与えるべきです。このＥタイプのエネミーはかなり倒しにくい反面、ＰＣに脅威を感じさせることには向いていません。過剰に出すとセッションが停滞します。〈武闘家〉と似た特性をもっていますが、ヘイトルールの存在もありエネミーの役割やデザインは〈武闘家〉からはなれ、ある種の妨害役と考えるべきです。またボスそのものにも向いていません。『ＬＨＺ』記載の代表的なエネミーは〈屍食少女〉（P４３６）です。";
                break;
            case 4:
                this._str = 4;
                this._dex = 2;
                this._pow = 7;
                this._int = 3;
                this._avoidCoef = 1.2;
                this._avoidFix = 2;
                this._resistCoef = 1.1;
                this._resistFix = 7;
                this._pdCoef = 1.5;
                this._pdFix = 3;
                this._mdCoef = 1.8;
                this._mdFix = 5;
                this._hpCoef = 5.0;
                this._hpFix = 35;
                this._actionFix = 2;
                this._hateCr = 0;
                this._hateFix = 1;
                this._damageAllCoef = 1;
                this._aggressionCoef = 0.55;
                this._basicAttackType = AttackType.MAGICAL;
                this._basicAttackRoleFix = 2;
                this._basicAttackRoleDice = 2;
                this._basicAttackTarget = SkillTarget.SINGLE;
                this._basicAttackRange = SkillRange.SQ4;
                this._funtion = "【抵抗値】と【行動力】に秀でる反面、物理的な攻撃に弱いエネミーです。クラスで言うと〈吟遊詩人〉〈付与術師〉にちかいでしょう。仲間をサポートする特技やＰＣにさまざまな妨害を行なう特技を与えるべきです。CR３以上の環境では、強力なBSや地形支配の要素をもつこともあります。このＥタイプのエネミーは、単体でＰＣに脅威を感じさせることは難しいでしょう。群れボスに向いています。『ＬＨＺ』記載の代表的なエネミーは〈棘茨イタチ〉（P４２４）です。";
                break;
            case 5:
                this._str = 3;
                this._dex = 2;
                this._pow = 7;
                this._int = 4;
                this._avoidCoef = 1.2;
                this._avoidFix = 2;
                this._resistCoef = 1.1;
                this._resistFix = 7;
                this._pdCoef = 1.8;
                this._pdFix = 8;
                this._mdCoef = 1.7;
                this._mdFix = 1;
                this._hpCoef = 6.0;
                this._hpFix = 30;
                this._actionFix = -2;
                this._hateCr = 0;
                this._hateFix = 1;
                this._damageAllCoef = 1;
                this._aggressionCoef = 0.55;
                this._basicAttackType = AttackType.MELEE;
                this._basicAttackRoleFix = 2;
                this._basicAttackRoleDice = 2;
                this._basicAttackTarget = SkillTarget.SINGLE;
                this._basicAttackRange = SkillRange.SQ2;
                this._funtion = "【抵抗値】に秀で、【防御力】もやや高いものの、トータルではあまり打たれづよくないエネミーです。仲間を守る特技を中心に与えるべきです。このＥタイプのエネミーは攻撃が得意ではないため、単体でＰＣに脅威を感じさせることは難しいでしょう。〈施療神官〉〈森呪使い〉〈神祇官〉にちかいEタイプですが過剰な回復能力は戦闘に停滞をもたらす可能性もあります。支援系の能力に切り替えるなどの工夫が必要でしょう。群れボスに向いています。『ＬＨＺ』記載の代表的なエネミーは〈一角獣〉（P４４９）です。";
                break;
            case 6:
                this._str = 4;
                this._dex = 7;
                this._pow = 2;
                this._int = 3;
                this._avoidCoef = 1.2;
                this._avoidFix = 7;
                this._resistCoef = 1.1;
                this._resistFix = 2;
                this._pdCoef = 1.7;
                this._pdFix = 5;
                this._mdCoef = 1.5;
                this._mdFix = 3;
                this._hpCoef = 6.0;
                this._hpFix = 30;
                this._actionFix = 0;
                this._hateCr = 0;
                this._hateFix = 2;
                this._damageAllCoef = 1;
                this._aggressionCoef = 0.85;
                this._basicAttackType = AttackType.MELEE;
                this._basicAttackRoleFix = 1;
                this._basicAttackRoleDice = 3;
                this._basicAttackTarget = SkillTarget.SINGLE;
                this._basicAttackRange = SkillRange.SQ0;
                this._funtion = "【回避値】が高く、もっとも高い物理ダメージを与えることができるエネミーです。クラスで言うと〈暗殺者〉〈盗剣士〉にちかいでしょう。ＢＳや追加ダメージを与える特技、自身の移動を強化する特技を与えるべきです。このＥタイプのエネミーは、ＰＣに脅威を感じさせることに向いていて、低ＣＲからつかいやすく高ＣＲまでエネミーアタッカーの主力として活躍できます。ソロボスおよび群れボスのどちらにも向いています。『ＬＨＺ』記載の代表的なエネミーは〈刃のマスカルウィン〉（P４６７）です。";
                break;
            case 7:
                this._str = 3;
                this._dex = 4;
                this._pow = 2;
                this._int = 7;
                this._avoidCoef = 1.1;
                this._avoidFix = 4;
                this._resistCoef = 1.1;
                this._resistFix = 2;
                this._pdCoef = 1.6;
                this._pdFix = 6;
                this._mdCoef = 1.9;
                this._mdFix = 5;
                this._hpCoef = 5.0;
                this._hpFix = 26;
                this._actionFix = 0;
                this._hateCr = 2;
                this._hateFix = 2;
                this._damageAllCoef = 0.9;
                this._aggressionCoef = 0.85;
                this._basicAttackType = AttackType.SHOOTING;
                this._basicAttackRoleFix = 0;
                this._basicAttackRoleDice = 3;
                this._basicAttackTarget = SkillTarget.SINGLE;
                this._basicAttackRange = SkillRange.SQ3;
                this._funtion = "［射撃攻撃］を用い、射程３～４の距離から物理ダメージを与えてくるエネミーです。【魔法防御力】にもやや秀でますが、同一Ｓｑを対象とした攻撃は苦手です。クラスで言うと〈暗殺者〉にちかいでしょう。ＰＣを強制的に移動させる特技や、ダメージ追加特技を与えるべきです。このＥタイプのエネミーは、他のエネミーとの連携をイメージしてデザインするとよいでしょう。スピアタイプと比較した場合、移動の必要なく、集中攻撃が可能であるという特徴があります。作成には注意が必要です。ソロボスおよび群れボスのどちらにも向いています。『ＬＨＺ』記載の代表的なエネミーは〈時計仕掛の蜻蛉〉（P４３３）です。";
                break;
            case 8:
                this._str = 3;
                this._dex = 2;
                this._pow = 5;
                this._int = 7;
                this._avoidCoef = 1.2;
                this._avoidFix = 2;
                this._resistCoef = 1.1;
                this._resistFix = 5;
                this._pdCoef = 1.3;
                this._pdFix = 3;
                this._mdCoef = 1.9;
                this._mdFix = 5;
                this._hpCoef = 4.0;
                this._hpFix = 26;
                this._actionFix = 1;
                this._hateCr = 2;
                this._hateFix = 2;
                this._damageAllCoef = 1;
                this._aggressionCoef = 0.85;
                this._basicAttackType = AttackType.MAGICAL;
                this._basicAttackRoleFix = 0;
                this._basicAttackRoleDice = 3;
                this._basicAttackTarget = SkillTarget.SINGLE;
                this._basicAttackRange = SkillRange.SQ4;
                this._funtion = "単体に対する［魔法攻撃］を用い、遠くから魔法ダメージを与えてくるエネミーです。「攻撃判定」や【行動力】に秀でる反面、【ＨＰ】や【物理防御力】は低くなっています。クラスで言うと〈妖術師〉〈召喚術師〉にちかく、アーチャーに似た特性を持っています。ＢＳや追加ダメージを与える特技を与えるべきです。このＥタイプのエネミーは攻撃を得意とする反面打たれ弱いので、他のエネミーとの連携をイメージしてデザインするとよいでしょう。『ＬＨＺ』記載の代表的なエネミーは〈小牙竜鬼の詠唱師〉（P４２２）です。";
                break;
            case 9:
                this._str = 3;
                this._dex = 2;
                this._pow = 5;
                this._int = 7;
                this._avoidCoef = 1.2;
                this._avoidFix = 2;
                this._resistCoef = 1.1;
                this._resistFix = 5;
                this._pdCoef = 1.3;
                this._pdFix = 3;
                this._mdCoef = 1.9;
                this._mdFix = 5;
                this._hpCoef = 4.0;
                this._hpFix = 26;
                this._actionFix = -2;
                this._hateCr = 2;
                this._hateFix = 2;
                this._damageAllCoef = 0.85;
                this._aggressionCoef = 0.85;
                this._basicAttackType = AttackType.MAGICAL;
                this._basicAttackRoleFix = 0;
                this._basicAttackRoleDice = 3;
                this._basicAttackTarget = SkillTarget.MULTI;
                this._basicAttackRange = SkillRange.SQ4;
                this._funtion = "範囲に対する［魔法攻撃］を用い、遠くから魔法ダメージを与えてくるエネミーです。シューターと同様、「攻撃判定」に秀でる反面【ＨＰ】や【物理防御力】は相応に低くなっています。クラスで言うと〈妖術師〉にちかいでしょう。広範囲（選択）に魔法攻撃を行う特技やBSを与える特技を与えるべきです。このＥタイプのエネミーは戦局を左右する能力がありますから弱点なども含めて設計するとよいでしょう。『ＬＨＺ』記載の代表的なエネミーは〈白姫のヘイグロト〉（P４６５）です。";
                break;
            default:
                this._str = 0;
                this._dex = 0;
                this._pow = 0;
                this._int = 0;
                this._avoidCoef = 0;
                this._avoidFix = 0;
                this._resistCoef = 0;
                this._resistFix = 0;
                this._pdCoef = 0;
                this._pdFix = 0;
                this._mdCoef = 0;
                this._mdFix = 0;
                this._hpCoef = 0;
                this._hpFix = 0;
                this._actionFix = 0;
                this._hateCr = 0;
                this._hateFix = 0;
                this._damageAllCoef = 0;
                this._aggressionCoef = 0;
                this._basicAttackType = AttackType.MELEE;
                this._basicAttackRoleFix = 0;
                this._basicAttackRoleDice = 0;
                this._basicAttackTarget = SkillTarget.SINGLE;
                this._basicAttackRange = SkillRange.SQ0;
                this._funtion = "";
                break;
        }
        EnemyType._values.push(this);
    }
    /**
     * エネミータイプ一覧を取得
     * @static
     * @returns {Array < EnemyType >} エネミータイプ一覧
     */
    static getValues() {
        return this._values;
    }
}
EnemyType._values = new Array();
EnemyType.ARMOROR = new EnemyType("アーマラー", 1);
EnemyType.FENCER = new EnemyType("フェンサー", 2);
EnemyType.GRAPPLER = new EnemyType("グラップラー", 3);
EnemyType.SUPPORTER = new EnemyType("サポーター", 4);
EnemyType.HEALER = new EnemyType("ヒーラー", 5);
EnemyType.SPEAR = new EnemyType("スピア", 6);
EnemyType.ARCHER = new EnemyType("アーチャー", 7);
EnemyType.SHOOTER = new EnemyType("シューター", 8);
EnemyType.BOMMER = new EnemyType("ボマー", 9);
/// <reference path="./types.ts" />
/// <reference path="./EnemyType.ts" />
/**
 * エネミー
 * @class Enemy
 */
class Enemy {
    /**
     * コンストラクタ
     */
    constructor() {
        this._cr = 1;
        this._type = EnemyType.ARMOROR;
        this._popularity = Popularity.R3;
        this._rank = EnemyRank.NORMAL;
        this._race = EnemyRace.DEMI_HUMAN;
    }
    /**
     * 名称を取得
     * @returns {string} NAME
     */
    getName() {
        return this._type.name + " CR：" + this._cr;
    }
    /**
     * キャラクターランクを取得
     * @returns {string} CR
     */
    getCharacterRank() {
        return this._cr;
    }
    /**
     * キャラクターランクを設定
     * @param {number} cr キャラクターランク
     */
    setCharacterRank(cr) {
        this._cr = cr;
    }
    /**
     * エネミータイプを取得
     * @returns {EnemyType} エネミータイプ
     */
    getType() {
        return this._type;
    }
    /**
     * エネミータイプを設定
     * @param {EnemyType} type エネミータイプ
     */
    setType(type) {
        this._type = type;
    }
    /**
     * 知名度を取得
     * @returns {string} 知名度
     */
    getPopularity() {
        return this._popularity;
    }
    /**
     * 知名度を設定
     * @param {Popularity} popularity 知名度
     */
    setPopularity(popularity) {
        this._popularity = popularity;
    }
    /**
     * エネミーランクを取得
     * @returns {string} エネミーランク
     */
    getRank() {
        return this._rank;
    }
    /**
     * エネミーランクを設定
     * @param {EnemyRank} rank エネミーランク
     */
    setRank(rank) {
        this._rank = rank;
    }
    /**
     * 大種族を取得
     * @returns {string} 大種族
     */
    getRace() {
        return this._race;
    }
    /**
     * 大種族を設定
     * @param {EnemyRace} race 大種族
     */
    setRace(race) {
        this._race = race;
    }
    /**
     * タグを取得
     * @returns {Array<string>} タグ
     */
    getTags() {
        let tags = new Array();
        if (this._rank.tag != null) {
            tags.push(this._rank.tag);
        }
        tags.push(this._race.label);
        return tags;
    }
    /**
     * STRを取得
     * ( STR * 1.1 + CR ) / 3
     * @returns {number} STR
     */
    getStr() {
        if (this._race === EnemyRace.GIMIC) {
            return 0;
        }
        return Math.floor((this._type._str * 1.1 + this._cr) / 3);
    }
    /**
     * DEXを取得
     * ( DEX * 1.1 + CR ) / 3
     * @returns {number} DEX
     */
    getDex() {
        if (this._race === EnemyRace.GIMIC) {
            return 0;
        }
        return Math.floor((this._type._dex * 1.1 + this._cr) / 3);
    }
    /**
     * POWを取得
     * ( POW * 1.1 + CR ) / 3
     * @returns {number} POW
     * @memberof Enemy
     */
    getPow() {
        return Math.floor((this._type._pow * 1.1 + this._cr) / 3);
    }
    /**
     * INTを取得
     * ( INT * 1.1 + CR ) / 3
     * @returns {number} INT
     */
    getInt() {
        return Math.floor((this._type._int * 1.1 + this._cr) / 3);
    }
    /**
     * 回避を取得
     * @returns {string} 回避
     */
    getAvoid() {
        if (this._race === EnemyRace.GIMIC || this._rank === EnemyRank.MOB) {
            return format("{0} [固定]", this.getAvoidFix() + this.getAvoidDice() * 3);
        }
        return format("{0}+{1}D", this.getAvoidFix(), this.getAvoidDice());
    }
    /**
     * 回避固定値を取得
     * ( CR * 回避係数 + 回避固定値 ) / 3
      * @returns {number} 回避固定値
    */
    getAvoidFix() {
        return Math.floor((this._cr * this._type._avoidCoef + this._type._avoidFix) / 3);
    }
    /**
     * 回避ダイス数を取得
     * グラップラーのみ3 他は2
     * @returns {number} 回避ダイス数
     */
    getAvoidDice() {
        return this._type === EnemyType.GRAPPLER ? 3 : 2;
    }
    /**
     * 抵抗を取得
     * @returns {string} 抵抗
     */
    getResist() {
        if (this._race === EnemyRace.GIMIC || this._rank === EnemyRank.MOB) {
            return format("{0} [固定]", this.getResistFix() + this.getRegistDice() * 3);
        }
        return format("{0}+{1}D", this.getResistFix(), this.getRegistDice());
    }
    /**
     * 抵抗固定値を取得
     * ( CR * 抵抗係数 + 抵抗固定値 ) / 3
     * @returns {number} 抵抗固定値
    */
    getResistFix() {
        return Math.floor((this._cr * this._type._resistCoef + this._type._resistFix) / 3);
    }
    /**
     * 抵抗ダイス数を取得
     * グラップラーのみ3 他は2
      * @returns {number} 抵抗ダイス数
    */
    getRegistDice() {
        return this._type === EnemyType.GRAPPLER ? 3 : 2;
    }
    /**
     * 物理防御を取得
     * CR * 物防係数 + 物防固定値
     * @returns {number} 物理防御
    */
    getPhysicalDefense() {
        return Math.floor(this._cr * this._type._pdCoef + this._type._pdFix);
    }
    /**
     * 魔法防御を取得
     * CR * 魔防係数 + 魔防固定値
      * @returns {number} 魔法防御
    */
    getMagicDefense() {
        return Math.floor(this._cr * this._type._mdCoef + this._type._mdFix);
    }
    /**
     * ヒットポイントを取得
     * CR * HP係数 + HP固定値
     * @returns {number} ヒットポイント
    */
    getHitPoint() {
        if (this._race === EnemyRace.GIMIC) {
            return Math.floor((this._cr * this._type._hpCoef + this._type._hpFix) / 2);
        }
        return Math.floor((this._cr * this._type._hpCoef + this._type._hpFix) * this._rank.hpCoef);
    }
    /**
     * ヘイト倍率を取得
     * ( CR + ヘイトCR修正) / 6 + ヘイト固定値
     * @returns {number} ヘイト倍率
     */
    getHate() {
        if (this._race === EnemyRace.GIMIC) {
            return "なし";
        }
        return "×" + Math.floor((this._cr + this._type._hateCr) / 6 + this._type._hateFix);
    }
    /**
     * 行動力を取得
     * ( CR * 1.1 + 7) / 3 + ( CR * 1.1 + 3) / 3 + 行動力固定値
     * @returns {number} 行動力
     */
    getAction() {
        var value1 = Math.floor((this._cr * 1.1 + 7) / 3);
        var value2 = Math.floor((this._cr * 1.1 + 3) / 3);
        return value1 + value2 + this._type._actionFix;
    }
    /**
     * 移動力を取得
     * @returns {number} 移動力
     */
    getMove() {
        return 2;
    }
    /**
     * 識別難易度を取得
     * @returns {string} 識別難易度
     */
    getDifficulty() {
        if (this._popularity === Popularity.R1) {
            return "自動";
        }
        else {
            return Math.floor(this._popularity.value + (this._cr - 1) / 3 + 1);
        }
    }
    /**
     * ドロップ期待値を取得
     * @returns {number} ドロップ期待値
     */
    getGold() {
        return Math.floor(((this._cr + 2) * (this._cr + 2) * 0.72 + 17) * this._rank.goldCoef);
    }
    /**
     * エネミータイプ等の説明文を取得
     * @returns {string} エネミータイプ等の説明文
     */
    getFunction() {
        return this._type._funtion;
    }
    /**
     * 判定固定値を取得
     * ( CR * 1.1 + 7) / 3 + タイプによる補正
     * @returns {number} 判定固定値
     */
    getBasicAttackRole() {
        return Math.floor((this._cr * 1.1 + 7) / 3) + this._type._basicAttackRoleFix;
    }
    /**
     * タイプ別巡航ダメージを取得
     * @param {number} rate 倍率
     * @returns {number} タイプ別巡航ダメージ
     */
    getDamage(rate) {
        if (rate === void 0) {
            rate = 1;
        }
        var result = 0;
        switch (this._type) {
            case EnemyType.ARMOROR:
            case EnemyType.FENCER:
            case EnemyType.GRAPPLER:
            case EnemyType.HEALER:
                return Math.floor(this.getPhysicalDamage1() * rate);
            case EnemyType.SUPPORTER:
                return Math.floor(this.getMagicDamage1() * rate);
            case EnemyType.SPEAR:
            case EnemyType.ARCHER:
                return Math.floor(this.getPhysicalDamage2() * rate);
            case EnemyType.SHOOTER:
            case EnemyType.BOMMER:
                return Math.floor(this.getMagicDamage2() * rate);
        }
        return Math.floor(result * rate);
    }
    /**
     * ダメージ固定値を取得
     * @returns {number} ダメージ固定値
     * @memberof TemplateData
     */
    getDamageFix(rate) {
        return this.getDamage(rate) - 7;
    }
    /**
     * ダメージダイス数を取得
     * @returns {number} ダメージダイス数
     * @memberof TemplateData
     */
    getDamageDice() {
        return 2;
    }
    /**
     * 巡航ダメージ(物理・小)を取得
     * @returns {number} 巡航ダメージ(物理・小)
     */
    getPhysicalDamage1() {
        return this.getMagicDamage1() + 8;
    }
    /**
     * 巡航ダメージ(物理・大)を取得
     * @returns {number} 巡航ダメージ(物理・大)
     */
    getPhysicalDamage2() {
        return this.getMagicDamage2() + 8;
    }
    /**
     * 巡航ダメージ(魔法・小)を取得
     * @returns {number} 巡航ダメージ(魔法・小)
     */
    getMagicDamage1() {
        return Math.floor(this._cr * 3.5) + 8;
    }
    /**
     * 巡航ダメージ(魔法・大)を取得
     * @returns {number} 巡航ダメージ(魔法・大)
     */
    getMagicDamage2() {
        return this._cr * 6 + 18;
    }
    /**
     * 諸数値A1を取得
     * @returns {number} A1
     */
    getA1() {
        return Math.floor((this._cr * 2.2 + 10) * 0.3 * 0.75 / 5) * 5;
    }
    /**
     * 諸数値A2を取得
     * @returns {number} A2
     */
    getA2() {
        return Math.floor((this._cr * 2.2 + 10) * 0.7 * 0.75 / 5) * 5;
    }
    /**
     * 特技一覧を取得
     * @returns {number} 特技一覧
     */
    getSkills() {
        let skills = new Array();
        if (this._race === EnemyRace.GIMIC) {
            skills.push(EnemySkill.createGimicSkill(Difficulty.hard(this._cr)));
        }
        skills.push(EnemySkill.createBasicAttackSkill(this._type._basicAttackType, this._type._basicAttackTarget, this._type._basicAttackRange, this.getBasicAttackRole(), this._type._basicAttackRoleDice, this.getDamageFix(1), this.getDamageDice(), this._race === EnemyRace.GIMIC || this._rank === EnemyRank.MOB));
        EnemySkill.createRankSkills(this._rank, this.getA2()).forEach(skill => {
            skills.push(skill);
        });
        return skills;
    }
}
/**
 * エネミー特技
 */
class EnemySkill {
    /**
     * コンストラクタ
     * @param {string} _name 表示名
     * @param {string} _timing タイミング
     */
    constructor(_name, _timing) {
        this._name = _name;
        this._timing = _timing;
        this._tags = new Array;
        this._role = null;
        this._target = SkillTarget.SINGLE;
        this._range = SkillRange.EMPTY;
        this._limit = null;
        this._function = null;
        this._remarks = null;
    }
    /**
     * 名称を取得
     * @returns {string} NAME
     */
    getName() {
        return this._name;
    }
    /**
     * タグを取得
     * @returns {Array<string>} TAGS
     */
    getTags() {
        return this._tags;
    }
    /**
     * タイミングを取得
     * @returns {string} TIMING
     */
    getTiming() {
        return this._timing;
    }
    /**
     * 判定文を取得
     * @returns {string} ROLE
     */
    getRole() {
        return this._role;
    }
    /**
     * 対象を取得
     * @returns {string} TARGET
     */
    getTarget() {
        return this._target;
    }
    /**
     * 範囲を取得
     * @returns {string} RANGE
     */
    getRange() {
        return this._range;
    }
    /**
     * 制限を取得
     * @returns {string} LIMIT
     */
    getLimit() {
        return this._limit;
    }
    /**
     * 説明文を取得
     * @returns {string} FUNCTION
     */
    getFunction() {
        return this._function;
    }
    /**
     * 注釈文を取得
     * @returns {string} REMARKS
     */
    getRemarks() {
        return this._remarks;
    }
    toString() {
        let str = "《" + this.getName() + "》";
        if (this._tags.length > 0) {
            str += "＿";
            for (var _i = 0, _a = this._tags; _i < _a.length; _i++) {
                var tag = _a[_i];
                str += "［" + tag + "］";
            }
        }
        if (this.getTiming() != null) {
            str += "＿" + this.getTiming();
        }
        if (this.getRole() != null) {
            str += "＿" + this.getRole();
        }
        if (this.getTarget() != null) {
            str += "＿" + this.getTarget().label;
        }
        if (this.getRange() != SkillRange.EMPTY) {
            str += "＿" + this.getRange().label;
        }
        if (this.getLimit() != null) {
            str += "＿" + this.getLimit();
        }
        str += "＿";
        str += this.getFunction();
        return str;
    }
    /**
     * ギミックの特技を生成
     * @param {number} destroy 解除難易度
     * @returns {EnemySkill} GIMIC_SKILL
     */
    static createGimicSkill(destroy) {
        let skill = new EnemySkill("意志なき機構", "常時");
        skill._function = format("このエネミーの攻撃ではヘイトダメージが発生せず、［ヘイトアンダー］の防御ボーナスも得られない。また、このエネミーを対象として「解除難易度：{0}」の《プロップ解除》に成功すると、このエネミーは［戦闘不能］となる。さらにこのエネミーはムーブアクションを持たない。", destroy);
        return skill;
    }
    /**
     * 基本攻撃手段を生成
     * @param {AttackType} type 攻撃種別
     * @param {Target} target 攻撃対象
     * @param {string} range 解除難易度
     * @param {number} avoidFix 判定固定値
     * @param {number} avoidFix 判定ダイス数
     * @param {number} damageFix ダメージ固定値
     * @param {number} damageDice ダメージダイス数
     * @param {number} isFix 判定を[固定]にするかどうか
     * @returns {EnemySkill} BASIC_ATTACK_SKILL
     */
    static createBasicAttackSkill(type, target, range, avoidFix, avoidDice, damageFix, damageDice, isFix) {
        let skill = new EnemySkill("基本攻撃手段", "メジャー");
        skill._tags.push(type.tag);
        if (isFix) {
            skill._role = format("対決 ({0}［固定］/ {1})", avoidFix + avoidDice * 3, type.role);
        }
        else {
            skill._role = format("対決 ({0}+{1}D / {2})", avoidFix, avoidDice, type.role);
        }
        skill._target = target;
        skill._range = range;
        skill._function = format("対象に［{0}+{1}D］の{2}ダメージを与える。", damageFix, damageDice, type.type);
        return skill;
    }
    static createRankSkills(rank, damage) {
        let skills = new Array();
        if (rank === EnemyRank.BOSS1) {
            let s1 = new EnemySkill("再行動", "本文");
            s1._limit = "ラウンド1回";
            s1._function = "このエネミーが［行動済］になった時に使用する。即座に［未行動］となり、その後ラウンド終了時まで【行動力】が0となる。";
            skills.push(s1);
            let s2 = new EnemySkill("孤高の一撃", "クリンナップ");
            s2._role = "自動成功";
            s2._target = SkillTarget.MULTI1;
            s2._range = SkillRange.SQ0;
            s2._function = format("{0}点の直接ダメージを与える。このエネミーは自身のBSを1つ解除しても良い。", damage);
            s2._remarks = "タイミングをセットアップに変更してもよい（弱い推奨）。";
            skills.push(s2);
        }
        if (rank === EnemyRank.BOSS2) {
            let s1 = new EnemySkill("再行動Ⅰ", "本文");
            s1._limit = "ラウンド1回";
            s1._function = "このエネミーが［行動済］になった時に使用する。即座に［未行動］となり、その後ラウンド終了時まで【行動力】が0となる。";
            skills.push(s1);
            let s2 = new EnemySkill("再行動Ⅱ", "本文");
            s2._limit = "ラウンド1回";
            s2._function = "対象が［行動済］になった時に使用する。対象は即座に［未行動］となり、その後ラウンド終了時まで【行動力】が0となる。";
            s2._remarks = "《再行動》はいずれかひとつを選択して取得すること。";
            skills.push(s2);
            let s3 = new EnemySkill("近衛兵配置", "常時");
            s3._function = "このエネミーはシーン登場時に、〈通常エネミー名〉（配下エネミーと呼ぶ）2体を任意の位置に配置できる。配下エネミーからはドロップ品を入手できない。";
            s3._remarks = "配下エネミー1体は〈モブエネミー名〉2体に置き換えても良い。";
            skills.push(s3);
        }
        return skills;
    }
}
function format(format, ...args) {
    return format.replace(/\{(\d+)\}/g, (f, i) => {
        return args[i];
    });
}
//# sourceMappingURL=lhz_enemy.js.map