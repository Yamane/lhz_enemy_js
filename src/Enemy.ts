/// <reference path="./AttackType.ts" />
/// <reference path="./EnemyType.ts" />
/// <reference path="./Popularity.ts" />
/// <reference path="./EnemyRank.ts" />
/// <reference path="./EnemyRace.ts" />
/// <reference path="./Target.ts" />
/// <reference path="./EnemySkill.ts" />
/// <reference path="./EnemyUtils.ts" />

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
     * @returns {EnemyType} TYPE
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
     * @returns {string} NAME
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
     * @returns {string} NAME
     */
    public getRank(): EnemyRank {
        return this._rank;
    }

    /**
     * エネミーランクを設定
     * @param {Popularity} popularity 知名度
     */
    public setRank(rank: EnemyRank) {
        this._rank = rank
    }

    /**
     * 大種族を取得
     * @returns {string} NAME
     */
    public getRace(): EnemyRace {
        return this._race;
    }

    /**
     * 大種族を設定
     * @param {Popularity} popularity 知名度
     */
    public setRace(race: EnemyRace) {
        this._race = race
    }

    /**
     * タグを取得
     * @returns {Array<string>} TAGS
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
     * @returns {string} AVOID
     */
    public getAvoid(): string {
        if (this._race === EnemyRace.GIMIC || this._rank === EnemyRank.MOB) {
            return EnemyUtils.format("{0} [固定]", this.getAvoidFix() + this.getAvoidDice() * 3)
        }
        return EnemyUtils.format("{0}+{1}D", this.getAvoidFix(), this.getAvoidDice())
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
     * @returns {string} REGIST
     */
    public getResist(): string {
        if (this._race === EnemyRace.GIMIC || this._rank === EnemyRank.MOB) {
            return EnemyUtils.format("{0} [固定]", this.getResistFix() + this.getRegistDice() * 3)
        }
        return EnemyUtils.format("{0}+{1}D", this.getResistFix(), this.getRegistDice())
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
     * @returns {string} エネミータイプ等の説明文を取得
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
     * @param {rate} 倍率
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

    private getA1(): number {
        return Math.floor((this._cr * 2.2 + 10) * 0.3 * 0.75 / 5) * 5;
    }

    private getA2(): number {
        return Math.floor((this._cr * 2.2 + 10) * 0.7 * 0.75 / 5) * 5;
    }

    public getSkills(): Array<EnemySkill> {
        let skills = new Array<EnemySkill>()
        if (this._race === EnemyRace.GIMIC) {
            skills.push(EnemySkill.createGimicSkill(EnemyUtils.difficultyHard(this._cr)))
        }
        skills.push(EnemySkill.createBasicAttackSkill(
            this._type._basicAttackType,
            this._type._basicAttackRange,
            this._type._basicAttackTarget,
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