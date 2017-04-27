# Инструменты

### Что надо знать
* [Создание предмета](../creating_item)

---

Все инструменты имеют определенный материал. Его называют `Tool Material`. От материала предмета зависят все его
характеристики: скорость добычи блоков, урон по мобам и так далее.

Для создания своего материала добавим в файл наших предметов `Items.java` строку:

```java
// Items.java

public static Item.ToolMaterial TUTORIAL = EnumHelper.addToolMaterial(name, harvestLevel, maxUses, efficiency, damage, enchantability);
```

Разберем аргументы:
* `name` (строка) — название материала предмета
* `harvestLevel` (число) — уровень блоков, которые можно добыть
* `maxUses` (число) — сколько раз инструмент можно использовать. **Важно:** инструмент можно будет использовать на один раз
больше, чем вы укажите здесь
* `efficiency` (вещественное число) — скорость добычи блоков.

TODO

## Редкость предмета

### Регистрация редкости

Добавим в файл предметов строку:

```java
// Items.java

public static EnumRarity TUTORIAL_RARITY = EnumHelper.addRarity(name, color, displayName);
```

Аргументы следующие:
* `name` (строка) — название класса предмета
* `color` (`TextFormatting`) — цвет названия предмета
* `displayName` (строка) — название редкости предмета

Добавим "Легендарную" редкость предметов. Названия должны окрашиваться в золотой цвет:

```java
// Items.java

public static EnumRarity RARITY_LEGENDARY = EnumHelper.addRarity("RARITY_LEGENDARY", TextFormatting.GOLD, "Legendary");
```

### Применение к предмету

