import { ComponentStory, ComponentMeta } from '@storybook/react'
import BaseInput from './BaseInput'


const Template: ComponentStory<typeof BaseInput> = (args) => <BaseInput {...args} />

export const Default = Template.bind({
    placeholder: 'Enter your email',	
    formLabel: 'Email',
})


export default {
    title: 'Molecules/Input/BaseInput',
    component: BaseInput,
    argTypes: {
        onChangeText: {
            action: 'onChangeText'	
        }
    }
} as ComponentMeta<typeof BaseInput>