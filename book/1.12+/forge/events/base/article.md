# Использование событий

События в Minecraft это тоже, что и у нас. К примеру "Пошёл дождь", только в Minecraft событий не так много, как существует у нас в жизни. В данной статье вы научитесь использовать события.

Создадим класс EventsHandler.
```java
public class EventsHandler
{
    @SubscribeEvent
    public void onJoin(EntityJoinWorldEvent e)
    {
        if (e.getEntity() instanceof EntityPlayer)
        {
            EntityPlayer player = (EntityPlayer) e.getEntity();
            player.sendMessage(new TextComponentString("Hello, %p!".replace("%p", player.getName())));
        }
    }

    @SubscribeEvent
    public void onDeath(LivingDeathEvent e)
    {
        if (e.getEntity() instanceof EntityPlayer)
        {
            EntityPlayer player = (EntityPlayer) e.getEntity();

            if (player.getName().equals("_Ivasik_"))
            {
                player.dropItem(new ItemStack(Items.GOLDEN_APPLE, 1, 1), false);
            }
        }
    }
}
```

В первом методе, при заходе сущности(Игрока) в мир, ему будет высвечиваться приветствие. А во втором методе, если игрок `_Ivasik_` погибает, то на его месте дропается золотое яблоко. Вы так же можете отменить событие используя метод `e.setCanceled(true)`, но не все события можно отменять. Подробнее смотрите в статье `Таблица событий`

Приступим к регистрации, перейдём в CommonProxy и в метод preInit добавим шину регистрации. Рекомендуется использовать именно эту шину, а не FMLCommonHandler, который устарела и используется только на 1.7 и ниже версиях!
```java
MinecraftForge.EVENT_BUS.register(new EventsHandler());
```

Переходим в игру и смотрим на получившийся результат!
