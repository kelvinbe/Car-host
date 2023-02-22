import React from "react";
import { Text } from "@chakra-ui/react";

export default function GettingStarted() {
    const textStyle = {
        textColor: "#33415C",
        width: "80%",
        fontSize: "15px",
      };

    const divStyle={
        margin: "0px auto",
    }
  return (
    <div style={divStyle}>
      <Text style={textStyle}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi eos
        expedita, omnis vitae, veniam quia enim doloribus quae sunt quibusdam,
        possimus fugiat! Nihil accusantium saepe id doloribus, aspernatur
        adipisci! Sapiente.
      </Text>
    </div>
  );
}
