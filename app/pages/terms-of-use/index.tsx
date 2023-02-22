import { Text } from "@chakra-ui/react";
import React from "react";

export default function TermsOfUse() {
  const textStyle = {
    textColor: "#33415C",
    width: "80%",
    fontSize: "15px",
  };

  return (
    <div>
      <Text style={textStyle}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
        tempore blanditiis dicta dignissimos omnis praesentium possimus nemo,
        consequatur aliquid ratione. Doloremque magni delectus voluptates
        aliquid iste perspiciatis, fugit molestiae necessitatibus!
      </Text>
    </div>
  );
}
