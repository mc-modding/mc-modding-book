# Система лута

## Сундуки

Перейдём в наш класс EventsHandler и добавим такой метод:
```java
@SubscribeEvent
public void onLoot(LootTableLoadEvent e)
{
    if (LootTableList.CHESTS_SPAWN_BONUS_CHEST.equals(e.getName()))
    {
        ResourceLocation loc = new ResourceLocation("tut", "chests/tut_spawn_bonus_chest");
        LootTable customLootTable = e.getLootTableManager().getLootTableFromLocation(loc);
        e.setTable(customLootTable);
    }
}
```

В условии мы получаем лист со всеми Loot таблицами, которые существуют в Minecraft. В данном случаи мы получаем LootTable бонусного сундука. (Это тот, что спавнится рядом с нами если при создании мира выбрана опция спавна бонусного сундуку)

Перейдём по пути:
```md
└── src    
    └── main
        └── resources
            └── assets
                └── tut
```
И создадим в папке `tut` папку `loot_tables` и в ней ещё одну папку `chests`. Создадим в папке `chests` файл с таким название `tut_spawn_bonus_chest` и форматом `.json`.

Содержание файла:
```Json
{
    "pools": [
        {
            "name": "chest_1",
            "rolls": 2,
            "entries": [
                {
                    "type": "item",
                    "name": "minecraft:dimond",
                    "weight": 24
                },
                {
                    "type": "item",
                    "name": "minecraft:golden_apple",
                    "weight": 15,
                    "functions": [
                        {
                            "function": "minecraft:set_data",
                            "data": 1
                        },
                        {
                            "function": "minecraft:set_count",
                            "count": {
                                "min": 1,
                                "max": 2
                            }
                        }
                    ]
                },
                {
                    "type": "block",
                    "name": "minecraft:wool",
                    "weight": 5,
                    "functions": [
                        {
                            "function": "minecraft:set_data",
                            "data": {
                                "min": 0,
                                "max": 5
                            }
                        }
                    ]
                }
            ]
        }
    ]
}
```

`name` - это название нашего сундука/категории предметов.
`rolls` - это то сколько предметов будет находится в сундуке. Если в `entries` будет указано больше, чем в `rolls`, то minecraft будет случайно доставать 2 вещи из списка.
`type` - это тип нашего предмета, всего их два (`block` и `item`).
`name` - это сам предмет, его обязательно нужно указывать с modid'ом!
`weight` - это количество наших предметов. К примеру мы указали, что у `diamond`, `weight` равен 24, значит в сундуке у нас будет лежать 24 алмаза.
`set_data` - это функция установки метадаты.
`data` - это сама метадата. Пример: Золотое яблоко существует в двух версия (обычное = 0, зачарованное = 1). Чтобы получить зачарованное нужно прописать 1. Так же вы можете задать `min` и `max`, если минимум 2 и максимум 4, то метадата будет браться от 2 до 4.
`set_count` - это функция количества.
`count` - это диапазон от 0 до n. К примеру если мы укажем минимум 1 и максимум 4, то количество предметов будет от 1 до 4. Так же `weight` должен быть либо больше, либо равен count иначе будет ошибка.

## Сущности

TODO

## Рыбалка

TODO
