/// <reference path="./types.ts" />

/**
 * エネミータイプ
 */
class EnemyType {
    private static _values = new Array<EnemyType>()
    public static readonly ARMOROR = new EnemyType("アーマラー", 1)
    public static readonly FENCER = new EnemyType("フェンサー", 2)
    public static readonly GRAPPLER = new EnemyType("グラップラー", 3)
    public static readonly SUPPORTER = new EnemyType("サポーター", 4)
    public static readonly HEALER = new EnemyType("ヒーラー", 5)
    public static readonly SPEAR = new EnemyType("スピア", 6)
    public static readonly ARCHER = new EnemyType("アーチャー", 7)
    public static readonly SHOOTER = new EnemyType("シューター", 8)
    public static readonly BOMMER = new EnemyType("ボマー", 9)

    public readonly label: string
    public readonly num: number
    public readonly name: string

    public readonly _str: number
    public readonly _dex: number
    public readonly _pow: number
    public readonly _int: number
    public readonly _avoidCoef: number
    public readonly _avoidFix: number
    public readonly _resistCoef: number
    public readonly _resistFix: number
    public readonly _pdCoef: number
    public readonly _pdFix: number
    public readonly _mdCoef: number
    public readonly _mdFix: number
    public readonly _hpCoef: number
    public readonly _hpFix: number
    public readonly _actionFix: number
    public readonly _hateCr: number
    public readonly _hateFix: number
    public readonly _damageAllCoef: number
    public readonly _aggressionCoef: number
    public readonly _basicAttackType: AttackType
    public readonly _basicAttackRoleFix: number
    public readonly _basicAttackRoleDice: number
    public readonly _basicAttackTarget: SkillTarget
    public readonly _basicAttackRange: SkillRange
    public readonly _funtion: string

    /**
     * コンストラクタ
     * @param {string} label 表示名
     * @param {string} num ナンバー
     */
    private constructor(label: string, num: number) { 
        this.label = label
        this.num = num
        this.name = "Type-" + this.num + " " + this.label

        switch(num) {
            case 1:
                this._str = 7  
                this._dex = 3  
                this._pow = 4  
                this._int = 2  
                this._avoidCoef = 1.2  
                this._avoidFix = 4  
                this._resistCoef = 1.1  
                this._resistFix = 2  
                this._pdCoef = 2.2  
                this._pdFix = 8  
                this._mdCoef = 1.7  
                this._mdFix = 2  
                this._hpCoef = 8.5  
                this._hpFix = 48  
                this._actionFix = -2  
                this._hateCr = 0  
                this._hateFix = 1  
                this._damageAllCoef = 1  
                this._aggressionCoef = 0.55  
                this._basicAttackType = AttackType.MELEE  
                this._basicAttackRoleFix = 2  
                this._basicAttackRoleDice = 2  
                this._basicAttackTarget = SkillTarget.SINGLE  
                this._basicAttackRange = SkillRange.SQ0
                this._funtion = "【物理防御力】と【最大ＨＰ】に秀でる反面【行動力】は低いエネミーです。クラスで言うと〈守護戦士〉にちかいでしょう。仲間を守る特技やＰＣの移動を阻害する特技を与えるべきです。このＥタイプのエネミーは倒しにくい反面、ＰＣに脅威を感じさせることには向いていません。過剰に出すとセッションが停滞します。またソロボスにも向きません。『ＬＨＺ』記載の代表的なエネミーは〈鉄躯緑鬼〉（P４４４）です。"
                break  
            case 2:
                this._str = 7  
                this._dex = 4  
                this._pow = 2  
                this._int = 3  
                this._avoidCoef = 1.1  
                this._avoidFix = 4  
                this._resistCoef = 1.1  
                this._resistFix = 2  
                this._pdCoef = 1.7  
                this._pdFix = 5  
                this._mdCoef = 1.7  
                this._mdFix = 1  
                this._hpCoef = 8.4  
                this._hpFix = 45  
                this._actionFix = -2  
                this._hateCr = 2  
                this._hateFix = 1  
                this._damageAllCoef = 1  
                this._aggressionCoef = 0.55  
                this._basicAttackType = AttackType.MELEE  
                this._basicAttackRoleFix = 2  
                this._basicAttackRoleDice = 2  
                this._basicAttackTarget = SkillTarget.SINGLE  
                this._basicAttackRange = SkillRange.SQ0
                this._funtion = "アーマラーほどではありませんが、【物理防御力】と【最大ＨＰ】に秀で、【行動力】は低いエネミーです。クラスで言うと〈武士〉にちかいでしょう。仲間を守る特技や反撃する特技を与えるべきです。このＥタイプのエネミーはＰＣに先に倒してしまおうと思わせることに向いています。比較的ソロボスにむいています。『ＬＨＺ』記載の代表的なエネミーは〈吸血鬼〉（P４５７）です。"
                break  
            case  3: 
                this._str = 7  
                this._dex = 4  
                this._pow = 2  
                this._int = 3  
                this._avoidCoef = 1.1  
                this._avoidFix = 2  
                this._resistCoef = 1.1  
                this._resistFix = 4  
                this._pdCoef = 0.9  
                this._pdFix = 2  
                this._mdCoef = 1.3  
                this._mdFix = 3  
                this._hpCoef = 7.5  
                this._hpFix = 45  
                this._actionFix = 0  
                this._hateCr = 0  
                this._hateFix = 1  
                this._damageAllCoef = 1  
                this._aggressionCoef = 0.55  
                this._basicAttackType = AttackType.MELEE  
                this._basicAttackRoleFix = 2  
                this._basicAttackRoleDice = 2  
                this._basicAttackTarget = SkillTarget.SINGLE  
                this._basicAttackRange = SkillRange.SQ0
                this._funtion = "【最大ＨＰ】と［防御判定］に秀でる反面、【防御力】が低いエネミーです。仲間を守る特技やＰＣの妨害、反撃をする特技を与えるべきです。このＥタイプのエネミーはかなり倒しにくい反面、ＰＣに脅威を感じさせることには向いていません。過剰に出すとセッションが停滞します。〈武闘家〉と似た特性をもっていますが、ヘイトルールの存在もありエネミーの役割やデザインは〈武闘家〉からはなれ、ある種の妨害役と考えるべきです。またボスそのものにも向いていません。『ＬＨＺ』記載の代表的なエネミーは〈屍食少女〉（P４３６）です。"
                break  
            case 4:
                this._str = 4  
                this._dex = 2  
                this._pow = 7  
                this._int = 3  
                this._avoidCoef = 1.2  
                this._avoidFix = 2  
                this._resistCoef = 1.1  
                this._resistFix = 7  
                this._pdCoef = 1.5  
                this._pdFix = 3  
                this._mdCoef = 1.8  
                this._mdFix = 5  
                this._hpCoef = 5.0  
                this._hpFix = 35  
                this._actionFix = 2  
                this._hateCr = 0  
                this._hateFix = 1  
                this._damageAllCoef = 1  
                this._aggressionCoef = 0.55  
                this._basicAttackType = AttackType.MAGICAL  
                this._basicAttackRoleFix = 2  
                this._basicAttackRoleDice = 2  
                this._basicAttackTarget = SkillTarget.SINGLE  
                this._basicAttackRange = SkillRange.SQ4
                this._funtion = "【抵抗値】と【行動力】に秀でる反面、物理的な攻撃に弱いエネミーです。クラスで言うと〈吟遊詩人〉〈付与術師〉にちかいでしょう。仲間をサポートする特技やＰＣにさまざまな妨害を行なう特技を与えるべきです。CR３以上の環境では、強力なBSや地形支配の要素をもつこともあります。このＥタイプのエネミーは、単体でＰＣに脅威を感じさせることは難しいでしょう。群れボスに向いています。『ＬＨＺ』記載の代表的なエネミーは〈棘茨イタチ〉（P４２４）です。"
                break  
            case 5:
                this._str = 3  
                this._dex = 2  
                this._pow = 7  
                this._int = 4  
                this._avoidCoef = 1.2  
                this._avoidFix = 2  
                this._resistCoef = 1.1  
                this._resistFix = 7  
                this._pdCoef = 1.8  
                this._pdFix = 8  
                this._mdCoef = 1.7  
                this._mdFix = 1  
                this._hpCoef = 6.0  
                this._hpFix = 30  
                this._actionFix = -2  
                this._hateCr = 0  
                this._hateFix = 1  
                this._damageAllCoef = 1  
                this._aggressionCoef = 0.55  
                this._basicAttackType = AttackType.MELEE  
                this._basicAttackRoleFix = 2  
                this._basicAttackRoleDice = 2  
                this._basicAttackTarget = SkillTarget.SINGLE  
                this._basicAttackRange = SkillRange.SQ2
                this._funtion = "【抵抗値】に秀で、【防御力】もやや高いものの、トータルではあまり打たれづよくないエネミーです。仲間を守る特技を中心に与えるべきです。このＥタイプのエネミーは攻撃が得意ではないため、単体でＰＣに脅威を感じさせることは難しいでしょう。〈施療神官〉〈森呪使い〉〈神祇官〉にちかいEタイプですが過剰な回復能力は戦闘に停滞をもたらす可能性もあります。支援系の能力に切り替えるなどの工夫が必要でしょう。群れボスに向いています。『ＬＨＺ』記載の代表的なエネミーは〈一角獣〉（P４４９）です。"
                break  
            case 6:
                this._str = 4  
                this._dex = 7  
                this._pow = 2  
                this._int = 3  
                this._avoidCoef = 1.2  
                this._avoidFix = 7  
                this._resistCoef = 1.1  
                this._resistFix = 2  
                this._pdCoef = 1.7  
                this._pdFix = 5  
                this._mdCoef = 1.5  
                this._mdFix = 3  
                this._hpCoef = 6.0  
                this._hpFix = 30  
                this._actionFix = 0  
                this._hateCr = 0  
                this._hateFix = 2  
                this._damageAllCoef = 1  
                this._aggressionCoef = 0.85  
                this._basicAttackType = AttackType.MELEE  
                this._basicAttackRoleFix = 1  
                this._basicAttackRoleDice = 3  
                this._basicAttackTarget = SkillTarget.SINGLE  
                this._basicAttackRange = SkillRange.SQ0
                this._funtion = "【回避値】が高く、もっとも高い物理ダメージを与えることができるエネミーです。クラスで言うと〈暗殺者〉〈盗剣士〉にちかいでしょう。ＢＳや追加ダメージを与える特技、自身の移動を強化する特技を与えるべきです。このＥタイプのエネミーは、ＰＣに脅威を感じさせることに向いていて、低ＣＲからつかいやすく高ＣＲまでエネミーアタッカーの主力として活躍できます。ソロボスおよび群れボスのどちらにも向いています。『ＬＨＺ』記載の代表的なエネミーは〈刃のマスカルウィン〉（P４６７）です。"
                break  
            case 7:
                this._str = 3  
                this._dex = 4  
                this._pow = 2  
                this._int = 7  
                this._avoidCoef = 1.1  
                this._avoidFix = 4  
                this._resistCoef = 1.1  
                this._resistFix = 2  
                this._pdCoef = 1.6  
                this._pdFix = 6  
                this._mdCoef = 1.9  
                this._mdFix = 5  
                this._hpCoef = 5.0  
                this._hpFix = 26  
                this._actionFix = 0
                this._hateCr = 2  
                this._hateFix = 2  
                this._damageAllCoef = 0.9  
                this._aggressionCoef = 0.85  
                this._basicAttackType = AttackType.SHOOTING  
                this._basicAttackRoleFix = 0  
                this._basicAttackRoleDice = 3  
                this._basicAttackTarget = SkillTarget.SINGLE  
                this._basicAttackRange = SkillRange.SQ3
                this._funtion = "［射撃攻撃］を用い、射程３～４の距離から物理ダメージを与えてくるエネミーです。【魔法防御力】にもやや秀でますが、同一Ｓｑを対象とした攻撃は苦手です。クラスで言うと〈暗殺者〉にちかいでしょう。ＰＣを強制的に移動させる特技や、ダメージ追加特技を与えるべきです。このＥタイプのエネミーは、他のエネミーとの連携をイメージしてデザインするとよいでしょう。スピアタイプと比較した場合、移動の必要なく、集中攻撃が可能であるという特徴があります。作成には注意が必要です。ソロボスおよび群れボスのどちらにも向いています。『ＬＨＺ』記載の代表的なエネミーは〈時計仕掛の蜻蛉〉（P４３３）です。"
                break  
            case 8:
                this._str = 3  
                this._dex = 2  
                this._pow = 5  
                this._int = 7  
                this._avoidCoef = 1.2  
                this._avoidFix = 2  
                this._resistCoef = 1.1  
                this._resistFix = 5  
                this._pdCoef = 1.3  
                this._pdFix = 3  
                this._mdCoef = 1.9  
                this._mdFix = 5  
                this._hpCoef = 4.0  
                this._hpFix = 26  
                this._actionFix = 1  
                this._hateCr = 2  
                this._hateFix = 2  
                this._damageAllCoef = 1  
                this._aggressionCoef = 0.85  
                this._basicAttackType = AttackType.MAGICAL  
                this._basicAttackRoleFix = 0  
                this._basicAttackRoleDice = 3  
                this._basicAttackTarget = SkillTarget.SINGLE  
                this._basicAttackRange = SkillRange.SQ4
                this._funtion = "単体に対する［魔法攻撃］を用い、遠くから魔法ダメージを与えてくるエネミーです。「攻撃判定」や【行動力】に秀でる反面、【ＨＰ】や【物理防御力】は低くなっています。クラスで言うと〈妖術師〉〈召喚術師〉にちかく、アーチャーに似た特性を持っています。ＢＳや追加ダメージを与える特技を与えるべきです。このＥタイプのエネミーは攻撃を得意とする反面打たれ弱いので、他のエネミーとの連携をイメージしてデザインするとよいでしょう。『ＬＨＺ』記載の代表的なエネミーは〈小牙竜鬼の詠唱師〉（P４２２）です。"
                break  
            case 9:
                this._str = 3  
                this._dex = 2  
                this._pow = 5  
                this._int = 7  
                this._avoidCoef = 1.2  
                this._avoidFix = 2  
                this._resistCoef = 1.1  
                this._resistFix = 5  
                this._pdCoef = 1.3  
                this._pdFix = 3  
                this._mdCoef = 1.9  
                this._mdFix = 5  
                this._hpCoef = 4.0  
                this._hpFix = 26  
                this._actionFix = -2  
                this._hateCr = 2  
                this._hateFix = 2  
                this._damageAllCoef = 0.85  
                this._aggressionCoef = 0.85  
                this._basicAttackType = AttackType.MAGICAL  
                this._basicAttackRoleFix = 0  
                this._basicAttackRoleDice = 3  
                this._basicAttackTarget = SkillTarget.MULTI  
                this._basicAttackRange = SkillRange.SQ4
                this._funtion = "範囲に対する［魔法攻撃］を用い、遠くから魔法ダメージを与えてくるエネミーです。シューターと同様、「攻撃判定」に秀でる反面【ＨＰ】や【物理防御力】は相応に低くなっています。クラスで言うと〈妖術師〉にちかいでしょう。広範囲（選択）に魔法攻撃を行う特技やBSを与える特技を与えるべきです。このＥタイプのエネミーは戦局を左右する能力がありますから弱点なども含めて設計するとよいでしょう。『ＬＨＺ』記載の代表的なエネミーは〈白姫のヘイグロト〉（P４６５）です。"
                break  
            default:
                this._str = 0  
                this._dex = 0  
                this._pow = 0  
                this._int = 0  
                this._avoidCoef = 0  
                this._avoidFix = 0  
                this._resistCoef = 0  
                this._resistFix = 0  
                this._pdCoef = 0  
                this._pdFix = 0  
                this._mdCoef = 0  
                this._mdFix = 0  
                this._hpCoef = 0  
                this._hpFix = 0  
                this._actionFix = 0  
                this._hateCr = 0  
                this._hateFix = 0  
                this._damageAllCoef = 0  
                this._aggressionCoef = 0  
                this._basicAttackType = AttackType.MELEE  
                this._basicAttackRoleFix = 0  
                this._basicAttackRoleDice = 0  
                this._basicAttackTarget = SkillTarget.SINGLE  
                this._basicAttackRange = SkillRange.SQ0
                this._funtion = ""
                break  
        }
        EnemyType._values.push(this)
    }
      
    /**
     * エネミータイプ一覧を取得
     * @static
     * @returns {Array < EnemyType >} エネミータイプ一覧
     */
    public static getValues() {
        return this._values
    }
}