import { Text } from "@chakra-ui/react";
import React from "react";

export default function PrivacyPolicy() { 
  const textStyle = {
    textColor: "#33415C",
    width: "80%",
    fontSize: "15px",
  }
  return (
    <div>
      <Text style={textStyle}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut odit
        voluptatibus assumenda impedit sunt facere at illum reprehenderit vel,
        dolor ab tempora quisquam eius saepe molestias dignissimos sequi. Nobis,
        aliquid!
      </Text>
    </div>
  );
}
