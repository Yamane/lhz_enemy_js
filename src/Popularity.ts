/**
 * 知名度
 * @class Popularity
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
    static get values() {
        return this._values
    }
}