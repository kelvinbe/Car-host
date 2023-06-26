import { Meta, StoryFn } from '@storybook/react'
import EmulationDeck from '.'


export default {
    title: 'Components/Organism/EmulationDeck',
    component: EmulationDeck,
} as Meta<typeof EmulationDeck>

const Template: StoryFn<typeof EmulationDeck> = (args: any) => <EmulationDeck {...args} />

export const Default = Template.bind({})

Default.args = {

}