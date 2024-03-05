/// <reference path="./types.ts" />
/// <reference path="./EnemyType.ts" />

/**
 * エネミー
 * @class Enemy
 */
class Enemy {
    private _cr: number
    private _type: EnemyType
    private _popularity: Popularity
    private _rank: EnemyRank
    private _race: EnemyRace

    /**
     * コンストラクタ
     */
    public constructor() {
        this._cr = 1
        this._type = EnemyType.ARMOROR
        this._popularity = Popularity.R3
        this._rank = EnemyRank.NORMAL
        this._race = EnemyRace.DEMI_HUMAN
    }

    /**
     * 名称を取得
     * @returns {string} NAME
     */
    public getName(): string {
        return this._type.name + " CR：" + this._cr
    }

    /**
     * キャラクターランクを取得
     * @returns {string} CR
     */
    public getCharacterRank(): number {
        return this._cr
    }

    /**
     * キャラクターランクを設定
     * @param {number} cr キャラクターランク
     */
    public setCharacterRank(cr: number) {
        this._cr = cr
    }

    /**
     * エネミータイプを取得
     * @returns {EnemyType} エネミータイプ
     */
    public getType(): EnemyType {
        return this._type
    }

    /**
     * エネミータイプを設定
     * @param {EnemyType} type エネミータイプ
     */
    public setType(type: EnemyType) {
        this._type = type
    }

    /**
     * 知名度を取得
     * @returns {string} 知名度
     */
    public getPopularity(): Popularity {
        return this._popularity
    }

    /**
     * 知名度を設定
     * @param {Popularity} popularity 知名度
     */
    public setPopularity(popularity: Popularity) {
        this._popularity = popularity
    }

    /**
     * エネミーランクを取得
     * @returns {string} エネミーランク
     */
    public getRank(): EnemyRank {
        return this._rank;
    }

    /**
     * エネミーランクを設定
     * @param {EnemyRank} rank エネミーランク
     */
    public setRank(rank: EnemyRank) {
        this._rank = rank
    }

    /**
     * 大種族を取得
     * @returns {string} 大種族
     */
    public getRace(): EnemyRace {
        return this._race;
    }

    /**
     * 大種族を設定
     * @param {EnemyRace} race 大種族
     */
    public setRace(race: EnemyRace) {
        this._race = race
    }

    /**
     * タグを取得
     * @returns {Array<string>} タグ
     */
    public getTags(): Array<string> {
        let tags = new Array<string>()
        if (this._rank.tag != null) {
            tags.push(this._rank.tag)
        }
        tags.push(this._race.label)
        return tags
    }

    /**
     * STRを取得
     * ( STR * 1.1 + CR ) / 3
     * @returns {number} STR
     */
    public getStr(): number {
        if (this._race === EnemyRace.GIMIC) {
            return 0;
        }
        return Math.floor((this._type._str * 1.1 + this._cr) / 3)
    }

    /**
     * DEXを取得
     * ( DEX * 1.1 + CR ) / 3
     * @returns {number} DEX
     */
    public getDex(): number {
        if (this._race === EnemyRace.GIMIC) {
            return 0;
        }
        return Math.floor((this._type._dex * 1.1 + this._cr) / 3)
    }

    /**
     * POWを取得
     * ( POW * 1.1 + CR ) / 3
     * @returns {number} POW
     * @memberof Enemy
     */
    public getPow(): number {
        return Math.floor((this._type._pow * 1.1 + this._cr) / 3)
    }

    /**
     * INTを取得
     * ( INT * 1.1 + CR ) / 3
     * @returns {number} INT
     */
    public getInt(): number {
        return Math.floor((this._type._int * 1.1 + this._cr) / 3)
    }

    /**
     * 回避を取得
     * @returns {string} 回避
     */
    public getAvoid(): string {
        if (this._race === EnemyRace.GIMIC || this._rank === EnemyRank.MOB) {
            return format("{0} [固定]", this.getAvoidFix() + this.getAvoidDice() * 3)
        }
        return format("{0}+{1}D", this.getAvoidFix(), this.getAvoidDice())
    }

    /**
     * 回避固定値を取得
     * ( CR * 回避係数 + 回避固定値 ) / 3
      * @returns {number} 回避固定値
    */
    private getAvoidFix(): number {
        return Math.floor((this._cr * this._type._avoidCoef + this._type._avoidFix) / 3)
    }

    /**
     * 回避ダイス数を取得
     * グラップラーのみ3 他は2
     * @returns {number} 回避ダイス数
     */
    private getAvoidDice(): number {
        return this._type === EnemyType.GRAPPLER ? 3 : 2
    }

    /**
     * 抵抗を取得
     * @returns {string} 抵抗
     */
    public getResist(): string {
        if (this._race === EnemyRace.GIMIC || this._rank === EnemyRank.MOB) {
            return format("{0} [固定]", this.getResistFix() + this.getRegistDice() * 3)
        }
        return format("{0}+{1}D", this.getResistFix(), this.getRegistDice())
    }

    /**
     * 抵抗固定値を取得
     * ( CR * 抵抗係数 + 抵抗固定値 ) / 3
     * @returns {number} 抵抗固定値
    */
    private getResistFix(): number {
        return Math.floor((this._cr * this._type._resistCoef + this._type._resistFix) / 3);
    }

    /**
     * 抵抗ダイス数を取得
     * グラップラーのみ3 他は2
      * @returns {number} 抵抗ダイス数
    */
    private getRegistDice(): number {
        return this._type === EnemyType.GRAPPLER ? 3 : 2
    }

    /**
     * 物理防御を取得
     * CR * 物防係数 + 物防固定値
     * @returns {number} 物理防御
    */
    public getPhysicalDefense(): number {
        return Math.floor(this._cr * this._type._pdCoef + this._type._pdFix)
    }

    /**
     * 魔法防御を取得
     * CR * 魔防係数 + 魔防固定値
      * @returns {number} 魔法防御
    */
    public getMagicDefense(): number {
        return Math.floor(this._cr * this._type._mdCoef + this._type._mdFix)
    }

    /**
     * ヒットポイントを取得
     * CR * HP係数 + HP固定値
     * @returns {number} ヒットポイント
    */
    public getHitPoint(): number {
        if (this._race === EnemyRace.GIMIC) {
            return Math.floor((this._cr * this._type._hpCoef + this._type._hpFix) / 2)
        }
        return Math.floor((this._cr * this._type._hpCoef + this._type._hpFix) * this._rank.hpCoef)
    }

    /**
     * ヘイト倍率を取得
     * ( CR + ヘイトCR修正) / 6 + ヘイト固定値
     * @returns {number} ヘイト倍率
     */
    public getHate(): string {
        if (this._race === EnemyRace.GIMIC) {
            return "なし"
        }
        return "×" + Math.floor((this._cr + this._type._hateCr) / 6 + this._type._hateFix)
    }

    /**
     * 行動力を取得
     * ( CR * 1.1 + 7) / 3 + ( CR * 1.1 + 3) / 3 + 行動力固定値
     * @returns {number} 行動力
     */
    getAction(): number {
        var value1 = Math.floor((this._cr * 1.1 + 7) / 3)
        var value2 = Math.floor((this._cr * 1.1 + 3) / 3)
        return value1 + value2 + this._type._actionFix
    }

    /**
     * 移動力を取得
     * @returns {number} 移動力
     */
    getMove(): number {
        return 2
    }

    /**
     * 識別難易度を取得
     * @returns {string} 識別難易度
     */
    getDifficulty(): number | string {
        if (this._popularity === Popularity.R1) {
            return "自動"
        } else {
            return Math.floor(this._popularity.value + (this._cr - 1) / 3 + 1)
        }
    }

    /**
     * ドロップ期待値を取得
     * @returns {number} ドロップ期待値
     */
    getGold(): number {
        return Math.floor(((this._cr + 2) * (this._cr + 2) * 0.72 + 17) * this._rank.goldCoef)
    }

    /**
     * エネミータイプ等の説明文を取得
     * @returns {string} エネミータイプ等の説明文
     */
    getFunction(): string {
        return this._type._funtion
    }

    /**
     * 判定固定値を取得
     * ( CR * 1.1 + 7) / 3 + タイプによる補正
     * @returns {number} 判定固定値
     */
    private getBasicAttackRole(): number {
        return Math.floor((this._cr * 1.1 + 7) / 3) + this._type._basicAttackRoleFix
    }

    /**
     * タイプ別巡航ダメージを取得
     * @param {number} rate 倍率
     * @returns {number} タイプ別巡航ダメージ
     */
    private getDamage(rate: number): number {
        if (rate === void 0) { rate = 1; }
        var result = 0;
        switch (this._type) {
            case EnemyType.ARMOROR:
            case EnemyType.FENCER:
            case EnemyType.GRAPPLER:
            case EnemyType.HEALER:
                return Math.floor(this.getPhysicalDamage1() * rate)
            case EnemyType.SUPPORTER:
                return Math.floor(this.getMagicDamage1() * rate)
            case EnemyType.SPEAR:
            case EnemyType.ARCHER:
                return Math.floor(this.getPhysicalDamage2() * rate)
            case EnemyType.SHOOTER:
            case EnemyType.BOMMER:
                return Math.floor(this.getMagicDamage2() * rate)
        }
        return Math.floor(result * rate);
    }

    /**
     * ダメージ固定値を取得
     * @returns {number} ダメージ固定値
     * @memberof TemplateData
     */
    private getDamageFix(rate: number) {
        return this.getDamage(rate) - 7
    }

    /**
     * ダメージダイス数を取得
     * @returns {number} ダメージダイス数
     * @memberof TemplateData
     */
    private getDamageDice() {
        return 2;
    }

    /**
     * 巡航ダメージ(物理・小)を取得
     * @returns {number} 巡航ダメージ(物理・小)
     */
    private getPhysicalDamage1() {
        return this.getMagicDamage1() + 8
    }

    /**
     * 巡航ダメージ(物理・大)を取得
     * @returns {number} 巡航ダメージ(物理・大)
     */
    private getPhysicalDamage2() {
        return this.getMagicDamage2() + 8
    }

    /**
     * 巡航ダメージ(魔法・小)を取得
     * @returns {number} 巡航ダメージ(魔法・小)
     */
    private getMagicDamage1() {
        return Math.floor(this._cr * 3.5) + 8
    }

    /**
     * 巡航ダメージ(魔法・大)を取得
     * @returns {number} 巡航ダメージ(魔法・大)
     */
    private getMagicDamage2() {
        return this._cr * 6 + 18
    }

    /**
     * 諸数値A1を取得
     * @returns {number} A1
     */
    private getA1(): number {
        return Math.floor((this._cr * 2.2 + 10) * 0.3 * 0.75 / 5) * 5;
    }

    /**
     * 諸数値A2を取得
     * @returns {number} A2
     */
    private getA2(): number {
        return Math.floor((this._cr * 2.2 + 10) * 0.7 * 0.75 / 5) * 5;
    }

    /**
     * 特技一覧を取得
     * @returns {number} 特技一覧
     */
    public getSkills(): Array<EnemySkill> {
        let skills = new Array<EnemySkill>()
        if (this._race === EnemyRace.GIMIC) {
            skills.push(EnemySkill.createGimicSkill(Difficulty.hard(this._cr)))
        }
        skills.push(EnemySkill.createBasicAttackSkill(
            this._type._basicAttackType,
            this._type._basicAttackTarget,
            this._type._basicAttackRange,
            this.getBasicAttackRole(),
            this._type._basicAttackRoleDice,
            this.getDamageFix(1),
            this.getDamageDice(),
            this._race === EnemyRace.GIMIC || this._rank === EnemyRank.MOB
        ))
        EnemySkill.createRankSkills(this._rank, this.getA2()).forEach(skill => {
            skills.push(skill)
        });
        return skills
    }
}

/**
 * エネミー特技
 */
class EnemySkill {

    private _tags: Array<string>
    private _role: string | null
    private _target: SkillTarget
    private _range: SkillRange
    private _limit: string | null
    private _function: string | null
    private _remarks: string | null

    /**
     * コンストラクタ
     * @param {string} _name 表示名
     * @param {string} _timing タイミング
     */
    public constructor(
        private readonly _name: string,
        private readonly _timing: string,
    ) {
        this._tags = new Array<string>
        this._role = null
        this._target = SkillTarget.SINGLE
        this._range = SkillRange.EMPTY
        this._limit = null
        this._function = null
        this._remarks = null
    }

    /**
     * 名称を取得
     * @returns {string} NAME
     */
    public getName(): string {
        return this._name
    }

    /**
     * タグを取得
     * @returns {Array<string>} TAGS
     */
    public getTags(): Array<string> {
        return this._tags
    }

    /**
     * タイミングを取得
     * @returns {string} TIMING
     */
    public getTiming(): string {
        return this._timing
    }

    /**
     * 判定文を取得
     * @returns {string} ROLE
     */
    public getRole(): string | null {
        return this._role
    }

    /**
     * 対象を取得
     * @returns {string} TARGET
     */
    public getTarget(): SkillTarget {
        return this._target
    }

    /**
     * 範囲を取得
     * @returns {string} RANGE
     */
    public getRange(): SkillRange {
        return this._range
    }

    /**
     * 制限を取得
     * @returns {string} LIMIT
     */
    public getLimit(): string | null {
        return this._limit
    }

    /**
     * 説明文を取得
     * @returns {string} FUNCTION
     */
    public getFunction(): string | null {
        return this._function
    }

    /**
     * 注釈文を取得
     * @returns {string} REMARKS
     */
    public getRemarks(): string | null {
        return this._remarks
    }

    public toString(): string {
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
    public static createGimicSkill(destroy: number): EnemySkill {
        let skill = new EnemySkill("意志なき機構", "常時");
        skill._function = format("このエネミーの攻撃ではヘイトダメージが発生せず、［ヘイトアンダー］の防御ボーナスも得られない。また、このエネミーを対象として「解除難易度：{0}」の《プロップ解除》に成功すると、このエネミーは［戦闘不能］となる。さらにこのエネミーはムーブアクションを持たない。", destroy)
        return skill
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
    public static createBasicAttackSkill(
        type: AttackType,
        target: SkillTarget,
        range: SkillRange,
        avoidFix: number,
        avoidDice: number,
        damageFix: number,
        damageDice: number,
        isFix: boolean,
    ): EnemySkill {
        let skill = new EnemySkill("基本攻撃手段", "メジャー");
        skill._tags.push(type.tag)
        if (isFix) {
            skill._role = format("対決 ({0}［固定］/ {1})", avoidFix + avoidDice * 3, type.role)
        } else {
            skill._role = format("対決 ({0}+{1}D / {2})", avoidFix, avoidDice, type.role)
        }
        skill._target = target
        skill._range = range
        skill._function = format("対象に［{0}+{1}D］の{2}ダメージを与える。", damageFix, damageDice, type.type)
        return skill;
    }

    public static createRankSkills(rank: EnemyRank, damage: number | null): Array<EnemySkill> {
        let skills = new Array<EnemySkill>()
        if (rank === EnemyRank.BOSS1) {
            let s1 = new EnemySkill("再行動", "本文")
            s1._limit = "ラウンド1回"
            s1._function = "このエネミーが［行動済］になった時に使用する。即座に［未行動］となり、その後ラウンド終了時まで【行動力】が0となる。"
            skills.push(s1)
            let s2 = new EnemySkill("孤高の一撃", "クリンナップ")
            s2._role = "自動成功"
            s2._target = SkillTarget.MULTI1
            s2._range = SkillRange.SQ0
            s2._function = format("{0}点の直接ダメージを与える。このエネミーは自身のBSを1つ解除しても良い。", damage)
            s2._remarks = "タイミングをセットアップに変更してもよい（弱い推奨）。"
            skills.push(s2);
        }
        if (rank === EnemyRank.BOSS2) {
            let s1 = new EnemySkill("再行動Ⅰ", "本文")
            s1._limit = "ラウンド1回"
            s1._function = "このエネミーが［行動済］になった時に使用する。即座に［未行動］となり、その後ラウンド終了時まで【行動力】が0となる。"
            skills.push(s1)
            let s2 = new EnemySkill("再行動Ⅱ", "本文");
            s2._limit = "ラウンド1回"
            s2._function = "対象が［行動済］になった時に使用する。対象は即座に［未行動］となり、その後ラウンド終了時まで【行動力】が0となる。"
            s2._remarks = "《再行動》はいずれかひとつを選択して取得すること。"
            skills.push(s2);
            let s3 = new EnemySkill("近衛兵配置", "常時");
            s3._function = "このエネミーはシーン登場時に、〈通常エネミー名〉（配下エネミーと呼ぶ）2体を任意の位置に配置できる。配下エネミーからはドロップ品を入手できない。"
            s3._remarks = "配下エネミー1体は〈モブエネミー名〉2体に置き換えても良い。"
            skills.push(s3);
        }
        return skills
    }
}

function format(format :string, ...args:any[]) {
    return  format.replace(/\{(\d+)\}/g,  (f, i) => {
        return args[i]
    });
}