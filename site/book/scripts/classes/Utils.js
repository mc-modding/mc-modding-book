/** Useful functions */
class Utils {
    /**
     * Находится ли заданное число между границами. Порядок границ не имеет значения
     *
     * @param value Число для проверки
     * @param range_a Граница 1
     * @param range_b Граница 2
     * @returns {boolean}
     */
    static between(value, range_a, range_b) {
        let min, max;

        if(range_a > range_b) {
            min = range_b;
            max = range_a;
        } else {
            min = range_a;
            max = range_b;
        }

        return value >= min && value <= max;
    }
}