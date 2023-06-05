import { type Meta, type StoryFn } from '@storybook/react'

import AuthCodeTable from '.'


export default {
    title: 'Components/Organism/Table/AuthCodeTable',
    component: AuthCodeTable,
    argTypes: {},
} as Meta<typeof AuthCodeTable>

const Template: StoryFn<typeof AuthCodeTable> = (args: any) => <AuthCodeTable {...args} />

export const Default = Template.bind({})

Default.args = {

}