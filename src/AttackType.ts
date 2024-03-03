/**
 * 基本攻撃手段の攻撃種別
 * @class AttackType
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