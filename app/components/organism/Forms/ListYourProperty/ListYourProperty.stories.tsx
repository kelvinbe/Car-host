import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ListYourProperty from "./ListYourProperty";
import { Provider } from "react-redux";
import store from "../../../../redux/store";

export default{
    title: 'Components/Organism/Forms/ListYourProperty/ListYourProperty',
    component: ListYourProperty
} as ComponentMeta<typeof ListYourProperty> 

const Template: ComponentStory<typeof ListYourProperty> = ()=> <Provider store={store}><ListYourProperty handleBackClick={()=>null} handleContinueClick={()=>null} current={1}/></Provider>

export const PropertyForm = Template.bind({})
PropertyForm.args={

}

