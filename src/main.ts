/// <reference path="./Enemy.ts" />

let enemy = new Enemy();
enemy.setCharacterRank(9);
console.log(enemy.getName());
console.log("STR:" + enemy.getStr());
console.log("DEX:" + enemy.getDex());
console.log("POW:" + enemy.getPow());
console.log("INT:" + enemy.getInt());
console.log("回避:" + enemy.getAvoid());
console.log("抵抗:" + enemy.getResist());

console.log("物理防御力:" + enemy.getPhysicalDefense());
console.log("魔法防御力:" + enemy.getMagicDefense());
console.log("最大ＨＰ:" + enemy.getHitPoint());
console.log("ヘイト倍率:" + enemy.getHate());
console.log("行動力:" + enemy.getAction());
console.log("移動力:" + enemy.getMove());
console.log("識別難易度:" + enemy.getDifficulty());
console.log("ドロップ期待値:" + enemy.getGold() +"G");

for(let skill of enemy.getSkills()) {
    console.log(skill.toString())
}

