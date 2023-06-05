import { type Meta, type StoryFn } from '@storybook/react';
import AuthCodeRequestForm  from '.'


export default {
    title: 'Components/Organism/Forms/AuthCodeRequest',
    component: AuthCodeRequestForm,
    argTypes: {}
} as Meta<typeof AuthCodeRequestForm>


const Template: StoryFn<typeof AuthCodeRequestForm> = (args: any) => <AuthCodeRequestForm {...args} />

export const Default = Template.bind({})

Default.args = {
    
}