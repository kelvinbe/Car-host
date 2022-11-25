import { storiesOf } from "@storybook/react-native";
import CreditCard from "./CreditCard";


storiesOf("Molecules/CreditCard", module)
.add("Default", ()=><CreditCard cardType={"visa"} last4Digits={"1234"} cardHolderName={"Sarah Lane"} />)