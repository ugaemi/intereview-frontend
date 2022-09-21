import * as React from "react";
import { Navigation } from "baseui/side-navigation";
import {useState} from "react";
import {useStyletron} from "baseui";

export default function SideNavigation() {
  const [css] = useStyletron();
  const [activeItemId, setActiveItemId] = useState(
    "#primary"
  );

  return (
    <div>
    <Navigation
      items={[
        {
          title: "Colors",
          itemId: "#colors",
          subNav: [
            { title: "Primary", itemId: "#primary" },
            {
              title: "Shades",
              itemId: "#shades",
              subNav: [
                { title: "Dark", itemId: "#dark" },
                {
                  title: "Disabled",
                  itemId: "#disabled",
                  disabled: true
                }
              ]
            }
          ]
        }
      ]}
      activeItemId={activeItemId}
      onChange={({ item }) =>
        setActiveItemId(item.itemId)
      }
    /></div>
  );
}
