import { MenuItem } from "@/components/navigation/MenuItem";
import { menuItems } from "@/config/menuItemsConfig";
interface MenuItemsProp {
  open: boolean;
}

export default function MenuItems({ open }: MenuItemsProp) {
  return (
    <>
      {menuItems.map((item) => {
        return (
          <MenuItem
            key={item.href}
            label={item.text}
            Icon={item.icon}
            href={item.href}
            open={open}
          />
        );
      })}
    </>
  );
}
