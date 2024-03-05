/**
 * 識別難易度計算機
 */
class Difficulty {
    private static values = {
        "normal": [0, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10, 10, 12, 12, 12, 13, 13, 13, 14, 14, 14, 15, 15, 15, 16, 16, 17],
        "hard": [0, 9, 9, 10, 10, 10, 12, 12, 12, 13, 13, 13, 14, 15, 15, 16, 16, 16, 17, 17, 18, 19, 19, 19, 20, 20, 21, 22, 22, 23, 23],
        "very_hard": [0, 11, 11, 13, 13, 13, 14, 15, 16, 16, 17, 18, 18, 19, 20, 20, 21, 22, 22, 23, 23, 25, 25, 25, 26, 27, 28, 28, 29, 30, 30],
    }

    public static normal(cr :number) :number {
        return Difficulty.values.normal[cr]
    }

    public static hard(cr :number) :number {
        return Difficulty.values.hard[cr]
    }

    public static veryHard(cr :number) :number {
        return Difficulty.values.very_hard[cr]
    }
}

/**
 * 基本攻撃手段の攻撃種別
 */
class AttackType {
    public static readonly MELEE = new AttackType("白兵攻撃", "回避", "物理")
    public static readonly SHOOTING = new AttackType("射撃攻撃", "回避", "物理")
    public static readonly MAGICAL = new AttackType("魔法攻撃", "抵抗", "魔法")

    /**
     * コンストラクタ
     * @param {string} tag 付加されるタグ
     * @param {string} role 対抗手段
     * @param {string} type 攻撃種別
     * @memberof AttackType
     */
    private constructor(
      public readonly tag: string,
      public readonly role: string,
      public readonly type: string
    ) {}
}

/**
 * 攻撃対象
 */
class SkillTarget {
    public static readonly SINGLE = new SkillTarget("単体")
    public static readonly TARGET2 = new SkillTarget("2体")
    public static readonly TARGET3 = new SkillTarget("3体")
    public static readonly TARGET4 = new SkillTarget("4体")
    public static readonly MULTI = new SkillTarget("範囲（選択）")
    public static readonly MULTI1 = new SkillTarget("広範囲1（選択）")
    public static readonly MULTI20 = new SkillTarget("広範囲20（選択）")

    /**
     * コンストラクタ
     * @param {string} label 表示名
     */
    private constructor(public readonly label: string) {}
}

/**
 * 射程
 */
class SkillRange {
    public static readonly EMPTY = new SkillRange("", -1)
    public static readonly SQ0 = new SkillRange("至近", 0)
    public static readonly SQ1 = new SkillRange("1Sq", 1)
    public static readonly SQ2 = new SkillRange("2Sq", 2)
    public static readonly SQ3 = new SkillRange("3Sq", 3)
    public static readonly SQ4 = new SkillRange("4Sq", 4)

    /**
     * コンストラクタ
     * @param {string} label 表示名
     * @param {string} label 射程
     */
        private constructor(
            public readonly label: string,
            public readonly value: number
        ) {}
}

/**
 * エネミーランク
 */
class EnemyRank {
    private static _values = new Array<EnemyRank>()
    public static readonly MOB = new EnemyRank("モブ", "モブ", 0.5, 0.5)
    public static readonly NORMAL = new EnemyRank("ノーマル", null, 1, 1)
    public static readonly BOSS1 = new EnemyRank("ボス（ソロ）", "ボス", 4, 4)
    public static readonly BOSS2 = new EnemyRank("ボス（群れ）", "ボス", 2, 4)

    /**
     * コンストラクタ
     * @param {string} label 表示名
     * @param {string} tag 付加されるタグ
     * @param {number} hpCoef HP係数
     * @param {number} goldCoef Gold係数
     */
    private constructor(
        public readonly label: string,
        public readonly tag: string|null,
        public readonly hpCoef: number,
        public readonly goldCoef: number,
    ) {
        EnemyRank._values.push(this)
    }

    /**
     * エネミーランク一覧を取得
     * @static
     * @returns {Array < EnemyRank >} エネミーランク一覧
     */
    static getValues() {
        return this._values
    }
}

/**
 * 大種族
 */
class EnemyRace {
    private static _values = new Array<EnemyRace>()
    public static readonly DEMI_HUMAN = new EnemyRace("人型")
    public static readonly NATURE = new EnemyRace("自然")
    public static readonly SPILIT = new EnemyRace("精霊")
    public static readonly CRYPTID = new EnemyRace("幻獣")
    public static readonly UNDEAD = new EnemyRace("不死")
    public static readonly ARTIFICIAL = new EnemyRace("人造")
    public static readonly HUMAN = new EnemyRace("人間")
    public static readonly GIMIC = new EnemyRace("ギミック")

    /**
     * コンストラクタ
     * @param {string} label 表示名
     */
    private constructor(public readonly label: string) {
        EnemyRace._values.push(this)
    }

    /**
     * 大種族一覧を取得
     * @static
     * @returns {Array < EnemyRace >} 大種族一覧
     */
    static getValues() {
        return this._values
    }
}

/**
 * 知名度
 */
class Popularity {
    private static _values = new Array<Popularity>()
    public static readonly R1 = new Popularity("超有名", 0)
    public static readonly R2 = new Popularity("有名", 2)
    public static readonly R3 = new Popularity("一般的", 4)
    public static readonly R4 = new Popularity("普通", 6)
    public static readonly R5 = new Popularity("珍しい", 7)
    public static readonly R6 = new Popularity("無名", 9)
    public static readonly R7 = new Popularity("秘密", 12)

    /**
     * コンストラクタ
     * @param {string} label 表示名
     * @param {number} value 識別難易度の基本値
     */
    private constructor(
        public readonly label: string, 
        public readonly value: number
    ) { 
        Popularity._values.push(this)
    }

    /**
     * 識別難易度を取得
     * @param {number} cr 対象エネミーのCR
     * @returns {string} 識別難易度
     */
    getDifficulty(cr: number): string|number {
        if (this === Popularity.R1) {
            return "自動";
        } else {
            return Math.floor(this.value + (cr - 1) / 3 + 1);
        } 
    }
      
    /**
     * 知名度一覧を取得
     * @static
     * @returns {Array < Popularity >} 知名度一覧
     */
    static getValues() {
        return this._values
    }
}