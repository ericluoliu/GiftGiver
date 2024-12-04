import React from "react";
import { CheckboxGroup, Flex, Text, Card} from "@chakra-ui/react"

export default Card = (props) => {
  return (
    <Card
      label={props.title}
      //description={props.description}
      key={props.value}
      // value={item.value}
    />
  )
}

