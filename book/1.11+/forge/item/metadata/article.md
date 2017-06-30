# Метадата

Метадата в предмете - это некие подтипы предмета, т.е. мы можем зарегистрировать один предмет и потом добавить к нему подтипы. Метадата облегчит создание большого количества предметов. К примеру вы захотели сделать мод со множеством еды, и чтобы не городить много классов с постоянным унаследованием от `ItemFood`, вы можете сделать под типы для одного предмета, меняя лишь продолжительность сытости и количество восстанавливаемого голода.

Создадим класс `ItemFoods` унаследованный от `ItemFood`.

```Java
public class ItemFoods extends 'ItemFood'
{
      public ItemFoods()
      {
          super(0, 0, false);
          this.setRegistryName("food");
          this.setUnlocalizedName("food");
          this.setCreativeTab(CreativeTabs.FOOD);
          this.setHasSubtypes(true);
      }
}
```

`this.setHasSubtypes(true);` - устанавливает подтипы для предмета.

Теперь создадим enum класс `FoodType` с таким содержимым.

```Java
public enum FoodType implements IStringSerializable
{
    /** Это наши типы еды
     *  @param meta - это мета предмета. Всегда с нуля начинается.
     *  @param name - это имя нашего подтипа.
     *  @param amount - это количество восполняемой сытости.
     *  @param saturation - это длительность сытости.
     *  @param isWolfFood - может ли есть эту еду волк.
     */
    TOMATO(0, "tomato", 1, 0.2F),
    CHICKENLEG(1, "chikenLeg", 2, 0.7F),
    CORN(2, "corn", 1, 0.5F),
    DUCKLEG(3, "duckLeg", 2, 0.4F);

    private static final FoodType[] META_LOOKUP = new FoodType[values().length];
    private int meta, amount;
    private String name;
    private float saturation;
    private boolean isWolfFood;

    FoodType(int meta, String name, int amount, float saturation)
    {
        this.meta = meta;
        this.name = name;
        this.amount = amount;
        this.saturation = saturation;
    }

    public int getMeta()
    {
        return this.meta;
    }

    public int getAmount()
    {
        return this.amount;
    }

    public float getSaturation()
    {
        return this.saturation;
    }

    @Override
    public String getName()
    {
        return this.name;
    }

    public static FoodType byMetadata(int meta)
    {
        if (meta < 0 || meta >= META_LOOKUP.length) meta = 0;
        return META_LOOKUP[meta];
    }

    static
    {
        for(FoodType food : values())
        {
            META_LOOKUP[food.getMeta()] = food;
        }
    }
}
```

Добавим в класс `ItemFoods` методы: `getSubItems`, `getHealAmount`, `getSaturationModifier`, `getUnlocalizedName`:

```Java
    @Override
    public void getSubItems(final Item itemIn, final CreativeTabs tab, final NonNullList<ItemStack> subItems)
    {
        for(FoodType foodType : FoodType.values())
        {
            subItems.add(new ItemStack(itemIn, 1, foodType.getMeta()));
        }
    }

    @Override
    public int getHealAmount(final ItemStack stack)
    {
        return FoodType.byMetadata(stack.getMetadata()).getAmount();
    }

    @Override
    public float getSaturationModifier(final ItemStack stack)
    {
        return FoodType.byMetadata(stack.getMetadata()).getSaturation();
    }

    @Override
    public String getUnlocalizedName(final ItemStack stack)
    {
        return super.getUnlocalizedName() + "." + FoodType.byMetadata(stack.getMetadata()).getName();
    }
```

Метод `getSubItems` будет создавать подтипы для предмета, метод `getHealAmount` будет задавать количество восполняемой сытости, метод `getSaturationModifier` будет задавать длительность сытости. А метод `getUnlocalizedName` будет заменять обычный unlocalizedName = "food" на unlocalizedName = "food.*имя подтипа*", чтобы мы могли перевести наш предмет.
