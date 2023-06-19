import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ListYourPropertyAmenities from "./ListYourPropertyAmenities";
import store from "../../../../redux/store";
import { Provider } from "react-redux";

export default {
    title: 'Components/Organism/Forms/ListYourProperty/PropertyAmenities',
    component: ListYourPropertyAmenities
} as ComponentMeta<typeof ListYourPropertyAmenities> 

const Template: ComponentStory<typeof ListYourPropertyAmenities> =()=><Provider store={store}><ListYourPropertyAmenities handleBackClick={()=>null} handleContinueClick={()=>null}/></Provider>;

export const Amenities = Template.bind({}); 
Amenities.args={

}