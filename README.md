# ログ・ホライズンTRPG エネミー諸数値計算ツール

ログ・ホライズンTRPGのエネミーデータを作成する際にベースとなる諸数値を計算するJavaScriptです。
TypeScriptの勉強がてら作ったので、コードにいろいろ突っ込みどころはあるかもしれませんがご勘弁を。

## つかいかた

だいたいこんな感じ。

```js
let enemy = new Enemy();
// キャラクターランクを設定
enemy.setCharacterRank(9);
// エネミータイプを設定
enemy.setEnemyType(EnemyType.ARMOROR);
// エネミーランクを設定
enemy.setRank(EnemyRank.NORMAL);
// 大種族を設定
enemy.setRace(EnemyRace.DEMI_HUMAN);
// 知名度を設定
enemy.setPopularity(Popularity.R1);

// 出力
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
```

## サンプルとか

動作サンプルは[こちら](https://yamane.github.io/lhz_enemy_js/)。

イマイチ役に立ちそうにないAPIドキュメントは[こちら](https://yamane.github.io/lhz_enemy_js/docs/)。