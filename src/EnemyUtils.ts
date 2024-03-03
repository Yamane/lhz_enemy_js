class EnemyUtils {

    private static difficulty = {
        "normal": [0, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10, 10, 12, 12, 12, 13, 13, 13, 14, 14, 14, 15, 15, 15, 16, 16, 17],
        "hard": [0, 9, 9, 10, 10, 10, 12, 12, 12, 13, 13, 13, 14, 15, 15, 16, 16, 16, 17, 17, 18, 19, 19, 19, 20, 20, 21, 22, 22, 23, 23],
        "very_hard": [0, 11, 11, 13, 13, 13, 14, 15, 16, 16, 17, 18, 18, 19, 20, 20, 21, 22, 22, 23, 23, 25, 25, 25, 26, 27, 28, 28, 29, 30, 30],
    };

    public static difficultyNormal(cr :number) :number {
        return EnemyUtils.difficulty.normal[cr]
    }

    public static difficultyHard(cr :number) :number {
        return EnemyUtils.difficulty.hard[cr]
    }

    public static difficultyVeryHard(cr :number) :number {
        return EnemyUtils.difficulty.very_hard[cr]
    }

    public static format(format :string, ...args:any[]) {
        return  format.replace(/\{(\d+)\}/g,  (f, i) => {
            return args[i]
        });
    }
}