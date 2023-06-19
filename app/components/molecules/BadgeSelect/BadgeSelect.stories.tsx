import React, { useState } from "react";
import { ComponentMeta, ComponentStory, Story } from "@storybook/react";
import BadgeSelect from "./BadgeSelect";

export default {
  title: "Components/molecules/BadgeSelect/BadgeSelect",
  component: BadgeSelect,
} as ComponentMeta<typeof BadgeSelect>;

const mealss = [
    {
      name: 'Pepperoni',
      selected: false,
    },
    {
      name: 'Margherita',
      selected: false,
    },
    {
      name: 'BBQ',
      selected: false,
    },
    {
      name: 'Hawaiian',
      selected: false,
    },
    {
      name: 'Vegetarian',
      selected: false,
    },
    {
      name: 'Mushroom',
      selected: false,
    },
    {
      name: 'Supreme',
      selected: false,
    },
    {
      name: 'Cheese',
      selected: false,
    },
    {
      name: 'Spinach',
      selected: false,
    },
    {
      name: 'Buffalo Chicken',
      selected: false,
    }
  ];
  

export const Badge: Story = ()=>{
    const [meals, setMeals] = useState<{name: string, selected: boolean}[]>(mealss);
    const [selectedData, setSelectedData] = useState<{name: string, selected: boolean}[]>([])
    console.log(selectedData)
    return(
      <BadgeSelect data={meals} setData={setMeals} selectedData={selectedData} setSelectedData={setSelectedData} />
    )
};

Badge.args = {};
