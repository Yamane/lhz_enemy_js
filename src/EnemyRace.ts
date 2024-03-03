/**
 * 大種族
 * @class EnemyRace
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
    static get values() {
        return this._values
    }
}