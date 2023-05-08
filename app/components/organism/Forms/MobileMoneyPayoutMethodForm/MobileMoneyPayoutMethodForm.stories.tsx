import { type ComponentMeta, type ComponentStory } from "@storybook/react"
import MobileMoneyPayoutMethodForm from "./index"

export default {
    title: "Components/Organism/Forms/PayoutMethod/MobileMoneyPayoutMethodForm",
    component: MobileMoneyPayoutMethodForm,
} as ComponentMeta<typeof MobileMoneyPayoutMethodForm>

const Template: ComponentStory<typeof MobileMoneyPayoutMethodForm> = (args: any) => <MobileMoneyPayoutMethodForm {...args} />

export const Default = Template.bind({})

Default.args = {}


