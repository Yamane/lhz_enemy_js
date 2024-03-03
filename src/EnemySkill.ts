/// <reference path="./EnemyUtils.ts" />

/**
 * エネミー特技
 * @class EnemySkill
 */
class EnemySkill {

    private _tags: Array<string>
    private _role: string | null
    private _target: Target
    private _range: string | null
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
        this._target = Target.SINGLE
        this._range = null
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
    public getTarget(): Target {
        return this._target
    }

    /**
     * 範囲を取得
     * @returns {string} RANGE
     */
    public getRange(): string | null {
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
        if (this.getRange() != null) {
            str += "＿" + this.getRange();
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
        skill._function = EnemyUtils.format("このエネミーの攻撃ではヘイトダメージが発生せず、［ヘイトアンダー］の防御ボーナスも得られない。また、このエネミーを対象として「解除難易度：{0}」の《プロップ解除》に成功すると、このエネミーは［戦闘不能］となる。さらにこのエネミーはムーブアクションを持たない。", destroy)
        return skill
    }

    /**
     * 基本攻撃手段を生成
     * @param {AttackType} type 攻撃種別
     * @param {string} range 解除難易度
     * @param {Target} Target 攻撃対象
     * @param {number} avoidFix 判定固定値
     * @param {number} avoidFix 判定ダイス数
     * @param {number} damageFix ダメージ固定値
     * @param {number} damageDice ダメージダイス数
     * @param {number} isFix 判定を[固定]にするかどうか
     * @returns {EnemySkill} BASIC_ATTACK_SKILL
     */
    public static createBasicAttackSkill(
        type: AttackType,
        range: string,
        target: Target,
        avoidFix: number,
        avoidDice: number,
        damageFix: number,
        damageDice: number,
        isfix: boolean,
    ): EnemySkill {
        let skill = new EnemySkill("基本攻撃手段", "メジャー");
        skill._tags.push(type.tag)
        if (isfix) {
            skill._role = EnemyUtils.format("対決 ({0}［固定］/ {1})", avoidFix + avoidDice * 3, type.role)
        } else {
            skill._role = EnemyUtils.format("対決 ({0}+{1}D / {2})", avoidFix, avoidDice, type.role)
        }
        skill._target = target
        skill._range = range
        skill._function = EnemyUtils.format("対象に［{0}+{1}D］の{2}ダメージを与える。", damageFix, damageDice, type.type)
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
            s2._target = Target.MULTI1
            s2._range = "至近"
            s2._function = EnemyUtils.format("{0}点の直接ダメージを与える。このエネミーは自身のBSを1つ解除しても良い。", damage)
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