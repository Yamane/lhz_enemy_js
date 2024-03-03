/**
 * 攻撃対象
 * @class AttackType
 */
class Target {
    public static readonly SINGLE = new Target("単体")
    public static readonly TARGET2 = new Target("2体")
    public static readonly TARGET3 = new Target("3体")
    public static readonly TARGET4 = new Target("4体")
    public static readonly MULTI = new Target("範囲（選択）")
    public static readonly MULTI1 = new Target("広範囲1（選択）")
    public static readonly MULTI20 = new Target("広範囲20（選択）")

    /**
     * コンストラクタ
     * @param {string} label 表示名
     */
    private constructor(public readonly label: string) {}
}