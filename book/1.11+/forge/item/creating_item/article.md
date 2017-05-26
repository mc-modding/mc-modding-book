# Создание предмета

Для начала в пакете мода создадим пакет item. Таким образом все, что связано с предметами нашего мода, будет находиться
в этом пакете. Есть и еще одна причина. Такой иерархии пакетов придерживаются и разработчики Minecraft.

## Класс предметов

Теперь нам нужен файл, в котором мы будем объявлять и регистрировать все предметы. Можно конечно делать это в CommonProxy, но
если у нас в моде будут предметы, блоки, мобы и т.д., то очень скоро файл разрастется и работать с ним будет очень трудно.

Создадим в пакете item файл Items.java (или ModItems.java). Название может быть любым. В классе создадим два метода:

* registerItems — для регистрации предметов на клиенте и сервере. Ведь обе стороны должны знать, что такой предмет существует
* registerItemsRender — для регистрации рендера предметов на клиенте

```java
package ru.mcmodding.testmod.item;

public class Items {

    public static void registerItems() {

    }

    public static void registerItemsRender() {

    }

}
```

Теперь перейдем в CommonProxy и в метод `preInit` добавим вызов метода `registerItems`:

```java
// CommonProxy.java

public void preInit(FMLPreInitializationEvent event) {
    Items.registerItems();
}
```

А регистрацию рендера добавим в метод `init` в файл ClientProxy:

```java
// ClientProxy.java

@Override
public void init(FMLInitializationEvent event) {
    super.init(event);

    Items.registerItemsRender();
}
```

Заметьте, что сначала мы регистрируем предметы (в `preInit`), а только потом назначаем рендер (в `init`).

## Файл предмета

Теперь пора создать файл самого предмета.

В Minecraft применяется следующий способ именования предметов: `Item...`. Если наш предмет называется `Test`, то название файла:
`ItemTest.java`, а не `TestItem.java`.

Никакой принципиальной роли это не играет.

Создадим файл `ItemTest.java`, который наследует класс `Item`.

```java
package ru.mcmodding.testmod.item;

import net.minecraft.creativetab.CreativeTabs;
import net.minecraft.item.Item;

public class ItemTest extends Item {
    public ItemTest() {
        this.setRegistryName("item_test");
        this.setUnlocalizedName("itemTest");

        this.setCreativeTab(CreativeTabs.MATERIALS);
    }
}
```

Разберем код конструктора:

`this.setRegistryName("item_test");` — установка уникального имени нашего предмета. **Не используйте буквы в верхнем регистре!**
Только английские маленькие буквы, цифры и нижние подчеркивания!

`this.setUnlocalizedName("itemTest");` — установка имени предмета для последующей локализации. Можно использовать буквы в верхнем регистре.

`this.setCreativeTab(CreativeTabs.MATERIALS);` — добавление нашего предмета во вкладку "Материалы" в креативе.

## Регистрация предмета

Если вы сейчас запустите Minecraft, то не увидите никакого предмета. Нужно сообщить Forge, что мы добавляем в игру новый предмет.

Для этого перейдем в класс предметов и добавим новую переменную в тело класса:

```java
public static ItemTest testItem = new ItemTest();
```

Теперь зарегистрируем наш предмет в игре с помощью метода `registerItems()`:

```java
public static void registerItems() {
    GameRegistry.register(testItem);
}
```

Теперь игра знает о нашем предмете. Можете запустить клиент и найти во вкладке "Материалы" созданный предмет.

![Демонстрация зарегистрированного предмета 1](images/itemWithoutTexture.png)

![Демонстрация зарегистрированного предмета 2](images/itemWithoutModel.png)

## Модель и текстура предмета

В классе предметов в методе `registerItemsRender()` впишите:

```java
public static void registerItemsRender() {
    Minecraft.getMinecraft().getRenderItem().getItemModelMesher().register(testItem, 0, new ModelResourceLocation(testItem.getRegistryName(), "inventory"));
}
```

С помощью этого кода мы зарегистрировали модель для нашего предмета. Теперь эту модель необходимо создать.

Создайте файл `item_test.json` по пути `resources/assets/*ваш modid*/models/item`. Имя этого файла
должно **полностью** совпадать со значением, которое вы указали в строке `this.setRegistryName("item_test");`. Для самого простого
предмета содержимое этого файла должно быть следующим:

```json
{
  "parent": "item/generated",
  "textures": {
    "layer0": "testmod:items/item_test"
  }
}
```

Здесь параметр `"parent"` указыват, откуда унаследовать параметры отображения модели. Массив текстур `"textures` указывает
пути к текстурам. Базовая текстура указывается через параметр `"layer0"`, значение которого указывает путь к текстуре.

Более подробно о настройках модели и отображения предмета есть отдельная статья.

Обратите внимание, что путь выглядит следующим образом: `testmod:items/item_test`. Первая часть этой строчки "testmod" должна
равняться modid вашего мода. Затем идет путь. В данном случае текстура с именем `item_test.png` должна лежать по следующему пути:

`resources/assets/*ваш modid*/textures/items/`

![Текстура предмета](images/item_test.png)

Название файла — `item_test.png` — должно быть таким же, какое значение было указано в методе `this.setRegistryName("item_test");`.

![Демонстрация предмета с текстурой](images/itemWithTexture.png)

## Локализация

Создадим папку `lang` в ассетах мода (`resources/assets/*ваш modid*/`).

В папке lang создадим файл `en_US.lang`. Внутри запишем следующее:

```markdown
item.itemTest.name=Test item
```

Слева записывается название, которые мы переводим. Для предметов формат следующий: `item.*ИМЯ*.name`, где \*Имя\* — то, что
мы указали в `this.setUnlocalizedName("itemTest");`.

Заметьте, что пробелов до знака равенства и после него **не** должно быть.

Для добавления русского перевода создадим в папке lang файл `ru_RU.lang`:

```markdown
item.itemTest.name=Тестовый предмет
```

Остальные коды для других языков можно [найти](http://minecraft.gamepedia.com/Language) на официальной Minecraft вики.
