## Конфигурация - Простой вариант

В конфигурации мы будем хранить данные доступные для обычных админов, которые не сильны в программировании, да и для более гибкой настройки самого плагина.

Для начала добавим в главном классе, в метод `onEnable` такой код:

```Java
//Данный метод копирует данные из файла
getConfig().options().copyDefaults(true);
//Данный метод сохраняет данные конфигурации.
saveConfig();
```

В папке resources создадим файл `config.yml`(Только такое название!) и добавим туда такие данные:

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

Для начала создадим класс ConfigManager.

```Java
public class ConfigManager
{
    private TuTPlugin core;
    private File configFile;
    private FileConfiguration configuration;

    public ConfigManager(TuTPlugin core)
    {
        this.core = core;
        loadConfiguration();
    }

    public FileConfiguration getConfiguration()
    {
        return this.configuration;
    }

    public void loadConfiguration()
    {
        configFile = new File(new File(this.core.getDataFolder(), "/config"), "configuration.yml");
        configuration = YamlConfiguration.loadConfiguration(checkpointFile);
    }

    public void saveConfig()
    {
        if(this.configuration == null || this.configFile == null) return;

        try {
            this.configuration.save(configFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

Конструктор будет загружать наш конфиг во время инициализации. Метод `loadConfiguration` будет загружать нашу конфигурацию, `saveConfig` будет сохранять нашу конфигурацию, а функция `getConfiguration` будет получать конфигурацию. Перейдём в главный класс плагина и пропишем туда переменную
```Java
private ConfigManager configManager;
```

в метод `onEnable` такой код:

```Java
//Инициализируем ConfigManger, чтобы он мог загрузить наш конфиг.
configManager = new ConfigManager(this);
//Сохраняем конфиг
configManager.saveConfig();
```

в метод `onDisable` такой код:

```Java
configManager.saveConfig();
```

С настройкой закончено! А сейчас давайте создадим папку в `resources` под названием `config` и в ней файл `configuration`, и пропишем в него такие данные:
```YAML
//Это логическое поле
boolean_param: true

//Это цело-численно поле
int_param: 25

//Это текстовое поле
string_param: 'This is text!'

section:
  param_1: 'Param 1'
  param_2: 2
  section_2:
    param_1: 'Section 2 -> param 1'
    param_2: false

//Теперь мы может оставлять комментарии и ничего с ними не случится.
array_param:
- 'Hello, my friend!'
- 'My name TuTPlugin'
```

Но как же теперь нам использовать нашу конфигурацию? Очень просто, так же как в прошлой статье, но только с небольшими изменениями. Выбираем нужный нам класс и создаём там переменную:
```Java
private ConfigManager configManager;
```

и в конструкторе добавляем параметр `ConfigManager manager` и прописываем такой код:

```Java
this.manager = manager;
```

Осталось дело за малым! В любом нужном нам месте этого класса прописываем:
```Java
this.manager.getConfiguration()
```

И теперь нам достаточно сделать всё так же как и с `getConfig` в предыдущей статье.
P.s. Да, данный способ не очень хорош и довольно сложен, но таким способом вы сможете создать больше файлов для конфигурации, хранения информации и т.д. А так же все комментарии будут сохранятся и с конфигом ничего особо криминального не произойдёт, как это может случится с конфигом из первой статьи.
