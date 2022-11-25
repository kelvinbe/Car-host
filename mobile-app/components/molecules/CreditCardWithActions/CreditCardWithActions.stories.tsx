import { storiesOf } from "@storybook/react-native";
import CreditCardWithActions from "./CreditCardWithActions";



storiesOf("Molecules/CreditCardWithActions", module)
.add("Default", ()=><CreditCardWithActions cardType={"visa"} last4Digits={"1234"} cardHolderName={"Sarah Lane"} actionTitle={"Remove Card"} />)
