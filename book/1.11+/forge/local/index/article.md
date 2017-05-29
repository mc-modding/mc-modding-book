# Локализация

Создадим папку `lang` в ресурсах мода (`resources/assets/*ваш modid*/`). В папке `lang` создадим файл `ru_RU.lang` и внутри запишем:

Для предмета:

```markdown
item.*название предмета*.name=Мой предмет
```

Для блока:

```markdown
tile.*название блока*.name=Мой блок
```

Для вкладки в творческом режиме:

```markdown
itemGroup.*Название вкладки*
```

Так же если вы пишете свой текст внутри кода, например для подсказки

```java
   @Override
   public void addInformation(ItemStack stack, EntityPlayer playerIn, List<String> tooltip, boolean advanced)
   {
       tooltip.add("Все будут видеть этот русский текст");
   }
```

то лучше не делать так. Спросите почему? Потому что ваш текст не смогут прочитать иностранные игроки и таким образом усложнится перевод мода(Если такой будет). Чтобы избежать данной проблемы лучше писать так:

```java
   @Override
   public void addInformation(ItemStack stack, EntityPlayer playerIn, List<String> tooltip, boolean advanced)
   {
       tooltip.add(I18n.format("tooltip.sphere"));
   }
```

и теперь нам достаточно добавить в ru_RU.lang такой код:

```markdown
tooltip.sphere=Этот текст могут видеть только русскоговорящие игроки.
```

или в en_US.lang:

```markdown
tooltip.sphere=This text can see only English-speaking players.
```

Остальные коды для других языков можно [найти](http://minecraft.gamepedia.com/Language) на официальной Minecraft вики.
