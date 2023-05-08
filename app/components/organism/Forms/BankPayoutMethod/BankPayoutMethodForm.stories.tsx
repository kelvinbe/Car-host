import { type ComponentMeta, type ComponentStory } from '@storybook/react';

import BankPayoutMethodForm from './index';

export default {
    title: "Components/Organism/Forms/PayoutMethod/BankPayoutMethodForm",
    component: BankPayoutMethodForm,
    argTypes: {
        fullName: {
            defaultValue: "Jeff Bezos",
            description: "The full name of the host, to be fetched from the user slice",
            type: "string"
        },
        onCancel: {
            description: "The callback to be called when the user cancels the form",
            type: "function"
        },
        onDone: {
            description: "The callback to be called when the user submits the form",
            type: "function"
        }
    }
} as ComponentMeta<typeof BankPayoutMethodForm>;


const Template: ComponentStory<typeof BankPayoutMethodForm> = (args: any) => <BankPayoutMethodForm {...args} />;

export const Default = Template.bind({});

Default.args = {

}