## Конфигурация - Простой вариант

В конфигурации мы будем хранить данные доступные для обычных админов, которые не сильны в программировании, да и для более гибкой настройки самого плагина.

Для начала добавим в главном классе, в метод onEnable такой код:

```Java
//Данный метод копирует данные из файла
getConfig().options().copyDefaults(true);
//Данный метод сохраняет данные конфигурации.
saveConfig();
```

В папке resources создадим файл config.yml (Только такое название!) и добавим туда такие данные:

```YAML
boolean_param: true
int_param: 25
string_param: 'This is text!'
section:
  param_1: 'Param 1'
  param_2: 2
  section_2:
    param_1: 'Section 2 -> param 1'
    param_2: false
array_param:
- 'Hello, my friend!'
- 'My name TuTPlugin'
```

А сейчас мы попробуем использовать данные из конфигурации. Пример использования:

```Java
    @EventHandler
    public void onJoin(PlayerJoinEvent e)
    {
        //Получаем из конфигурации секцию
        ConfigurationSection section = TuTPlugin.getInstance().getConfig().getConfigurationSection("section");
        //Получаем из конфигурации секцию второго уровня. Уровней может быть много, но это уже на Ваше усмотрение.
        ConfigurationSection section_two_level = section.getConfigurationSection("section_2");

        //Игрок отправит сообщение с текстом из секции первого уровня из параметра 1
        e.getPlayer().sendMessage(section.getString("param_1"));
        //Игрок отправит сообщение с текстом из секции второго уровня из параметра 1
        e.getPlayer().sendMessage(String.valueOf(section_two_level.getBoolean("param_1")));
    }

    @EventHandler
    public void onBreak(BlockBreakEvent e)
    {
        Player player = e.getPlayer();
        //Получаем логическое значение из boolean_param.
        boolean isCanceled = TuTPlugin.getInstance().getConfig().getBoolean("boolean_param");

        if(e.getBlock().getType() == Material.DIRT)
        {
            //Если параметр isCanceled вернёт true, то событие будет отменено.
            e.setCancelled(isCanceled);
            player.sendMessage("Блок запривачен!");
        }
    }
```

## Конфигурация - Продвинутый вариант
TODO
