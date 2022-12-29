# Крафт

Создадим класс `CraftingRegister`.

```java
public class CraftingRegister
{
    public static void register()
    {
        registerRecipes("key");
    }

    private static void registerRecipes(String name)
    {
        CraftingHelper.register(new ResourceLocation("tut", name), (IRecipeFactory) (context, json) -> CraftingHelper.getRecipe(json, context));
    }
}
```

* `registerRecipes(name)` - с помощью данного метода вы сможете гораздо быстрее прописывать регистрацию рецептов.
* `tut` - modid нашего мода.

Далее нам нужно добавить в CommonProxy, в метод Init такую строку кода `CraftingRegister.register();`. В ClientProxy добавлять ничего не нужно, в последствии выдаст краш с ошибкой, `java.lang.IllegalStateException: Duplicate recipe factory: modi:ваш предмет`.

Перейдём в папку:
```md
└── src    
    └── main
        └── resources
            └── assets
                └── tut
                    └── recipes
```

И создадим в папке `recipes` файл `key.json`. (`json` - это формат файла!)

* `type` - это тип крафта. Всего существует два вида:
  - `crafting_shaped` - в этом типе крафта мы можем задать позицию крафта, т.е. предмет будет скрафчен только если предметы содержатся на этих позициях.
  - `crafting_shapeless` - в этом типе крафта блок/предмет может быть размещен на любой позиции в слотах крафта. Пример: мы можем положить в любой слот крафта сахарный тростник и получить сахар.
* `pattern` - это шаблон крафта, существует только у `crafting_shaped` типа.
* `key` - это ключи, существует только у `crafting_shaped` типа. Допустим мы указали `L` в шаблоне, теперь нам нужно сказать игре, что `L` - это золотой слиток
  - `item` - это наш предмет. Указание modid обязательно!
  - `data` - это метадата предмета. Внимание! Если вы хотите использовать к примеру белую шерсть, вам нужно указать `data: 0` в противном случаи, у вас не будет крафтится предмет/блок!
* `ingredients` - это ключи, существует только у `crafting_shapeless` типа.
* `result` - это результат крафта.
  - `item` - это наш предмет. Указание modid обязательно!
  - `count` - это число предметов, которое будет выдано при крафте. Допустим мы хотим, чтобы при крафте нам давался не один ключ, а пять. Значит нам нужно указать `count: 5`

Пример `shaped` крафта:
```json
{
    "type": "minecraft:crafting_shaped",
    "pattern": [
        " L ",
        " L ",
        " D "
    ],
    "key": {
        "L": {
            "item": "tut:best_sword"
        },
        "D": {
            "item": "minecraft:wool",
            "data": 2
        }
    },
    "result": {
        "item": "tut:key",
        "count": 5
    }
}
```

Пример `shapeless` крафта:
```json
{
    "type": "minecraft:crafting_shapeless",
    "ingredients": [
        {
            "item": "minecraft:gold_ingot"
        },
        {
            "item": "minecraft:dye",
            "data": 11
        }
    ],
    "result": {
        "item": "tut:key"
    }
}
```

Также некоторые из вас спрашивали на форуме "Как добавить свои рецепты в книгу рецептов?", отвечаем! Рецепты в книгу добавлять не нужно, Minecraft сам всё сделает, вам лишь нужно создать сам рецепт.
