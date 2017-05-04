# Клиент и сервер

То, что будет делать наш мод в майнкрафте можно разделить на две части: 
клиентскую(то, что мы видим) и серверную(механика игры)
Некоторая часть кода должна выполнять как на сервере, так и на клиенте(регистрация предметов, блоков, сущностей).
Исходя из этого нужно как-то разделить мод.
Forge предлагает три способа.

## Прокси

Создадим в главном классе поле:
```java
@Mod(modid="testMod",name="Test Mod",version="1.0")
public class Main {
	//Это поле forge наполнит сам, исходя из аннотации
	@SidedProxy(clientSide = "testmod.ClientProxy", serverSide = "testmod.ServerProxy")
	public static CommonProxy commonProxy;

}
```

После создадим три нехватающих класса:
```java
public class CommonProxy {//То, что выполняется и на клиенте и на сервере

    public void preInit(FMLPreInitializationEvent event) {
        
    }

    public void init(FMLInitializationEvent event) {
        
    }

    public void postInit(FMLPostInitializationEvent event) {

    }

}

public class ClientProxy extends CommonProxy {//Клиентские действия: регистрация рендеров, загрузка моделей
    
    public void preInit(FMLPreInitializationEvent event) {
        super.preInit(event);//Мы расширили клиенское прокси от общего и теперь нужно выполнить на клиенте общий функционал
        
    }

    
    public void init(FMLInitializationEvent event) {
        super.init(event);

    }

    
    public void postInit(FMLPostInitializationEvent event) {
        super.postInit(event);
        
    }
}

public class ServerProxy extends CommonProxy {//Серверные действия
    
    public void preInit(FMLPreInitializationEvent event) {
        super.preInit(event);
        
    }

    
    public void init(FMLInitializationEvent event) {
        super.init(event);
        
    }

    
    public void postInit(FMLPostInitializationEvent event) {
        super.postInit(event);
        
    }
}
```

Теперь вызовем методы инициализации прокси из главного класса:

```java
	@EventHandler
	public void preInit(FMLPreInitializationEvent event) {
		proxy.preInit(event);//Таким образом, мы разделили функционал на серверную и клиентскую части
	}

	@EventHandler
	public void init(FMLInitializationEvent event) {
		proxy.init(event);
	}
	@EventHandler
	public void postInit(FMLPostInitializationEvent event) {
		proxy.postInit(event);
	}
```
## @SideOnly
Это аннотация, которая указывает forge, что данный метод, поле или класс может существовать только на клиенте/сервере.
```java
@SideOnly(Side.CLIENT)//Этот класс существует только на клиенте
public class ModelIndex{//Допустим, мы храним модели централизованно
	public ModelBase getModelFor(String name)
    {
    }
}
```
Можно использовать эту аннотацию вместо прокси:
```java
@Mod(modid="testMod2",name="Test Mod2",version="1.0")
public class Main2 {
	@EventHandler
	public void preInit(FMLPreInitializationEvent event) {
	}

	@EventHandler
	public void init(FMLInitializationEvent event) {
	}
	@EventHandler
	public void postInit(FMLPostInitializationEvent event) {
	}


	@SideOnly(Side.CLIENT)
	@EventHandler
	public void preInitClient(FMLPreInitializationEvent event) {
		//Все методы, помеченные @EventHandler будут выполнены, поэтому не нужно вызывать preInit из preInitClient и preInitServer
	}
	
	@SideOnly(Side.CLIENT)
	@EventHandler
	public void initClient(FMLInitializationEvent event) {
	}
	
	@SideOnly(Side.CLIENT)
	@EventHandler
	public void postInitClient(FMLPostInitializationEvent event) {
		
	}
	
	
	@SideOnly(Side.SERVER)
	@EventHandler
	public void preInitServer(FMLPreInitializationEvent event) {
	}
	
	@SideOnly(Side.SERVER)
	@EventHandler
	public void initServer(FMLInitializationEvent event) {
	}
	
	@SideOnly(Side.SERVER)
	@EventHandler
	public void postInitServer(FMLPostInitializationEvent event) {
	}
}
```

## World.isRemote
Например, вы создали свой предмет и хотите, чтобы по правому клику че-то происходило со стороны сервера. Для этого нужно определить, с какой стороны вызывается метод.
Если в соответствующем методе доступен объект мира, то можно проверить значение поля isRemote этого объекта.
```java
public class TestItem extends Item{
	public ItemStack onItemRightClick(ItemStack stack, World world, EntityPlayer player)
    {
		if(!world.isRemote){//isRemote==true, если это клиент
			//Что-то делаем на сервере
		}
        return stack;
    }
}
```

## FMLCommonHandler.instance().getEffectiveSide()
Не всегда в нужной точке кода есть объект мира.
В этом случае можно использовать FMLCommonHandler
```java
public class TestItem extends Item{
	public void testClick(ItemStack stack){
		if(FMLCommonHandler.instance().getEffectiveSide()==Side.SERVER){
			//Что-то делаем на сервере
		}
		if(FMLCommonHandler.instance().getEffectiveSide()==Side.CLIENT){
			//Что-то делаем на клиенте
		}
	
	}
	public ItemStack onItemRightClick(ItemStack stack, World world, EntityPlayer player)
    {
		testClick(stack);//Допустим, для осуществления нашего действия нам нужен только стак
        return stack;
    }
}
```