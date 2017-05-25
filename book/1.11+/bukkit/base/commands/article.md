## Команды

Команды, каждый хотел бы хоть раз да сделать свою команду, которая даёт ту или иную способность, преимущество.

Создадим класс CommandFly:
```Java
public class CommandFly implements CommandExecutor
{
    @Override
    public boolean onCommand(CommandSender commandSender, Command command, String s, String[] strings)
    {
        /** Если отправитель игрок. Если убрать то команду можно будет вводить и через консоль. */
        if(commandSender instanceof Player)
        {
            Player player = (Player) commandSender;
            /** Игрок летает, то после ввода команды он перестанет летать. Если же нет, то ему будет выдан fly. */
            if(player.isFlying()) {
                player.setFlying(false);
            } else {
                player.setFlying(true);
            }
            return true;
        }
        /** Если false то будет выводиться сообщение о том, что неверно введена команда. См. статью "Главный класс", чтобы узнать о сообщениях для команд. */
        return false;
    }
}
```

Вы так же можете добавить аргументы для команды.
```Java
public class CommandFly implements CommandExecutor
{
    @Override
    public boolean onCommand(CommandSender commandSender, Command command, String s, String[] strings)
    {
        /*
         * Если аргуметов больше или равен одному, то запускаем проверку.
         */
        if(strings.length >= 1)
        {
            /*
             * Если введена команда /fly arg_1 то выводим сообщение об этом.
             */
            if(strings[0] == "arg_1")
            {
                player.sendMessage("/fly arg_1");

                /*
                 * Если введена команда /fly arg_1 arg_2 то выводим сообщение об этом.
                 */
                if(strings[1] == "arg_2")
                {
                    player.sendMessage("/fly arg_1 arg_2");
                    return true;
                }
            }
            return true;
        }
        /*
         * Если аргументов нет, то выводим сообщение.
         */
        else if(strings.length == 0)
        {
            player.sendMessage("Вы не ввели аргумент для команды /fly !");
            return true;
        }
        return false;
    }
}
```

Теперь перейдём в главный класс и добавим в метод onEnable такой код:
```Java
getCommand("fly").setExecutor(new CommandFly());
```
