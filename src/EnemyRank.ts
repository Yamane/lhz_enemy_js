/**
 * エネミーランク
 * @class EnemyRank
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
    static get values() {
        return this._values
    }
}