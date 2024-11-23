import React from "react";
import { CheckboxGroup, Flex, Text, Card} from "@chakra-ui/react"

export default Card = (props) => {
  return (
    <CheckboxGroup defaultValue={["next"]}>
      <Text textStyle="sm" fontWeight="medium">
        Select framework(s)
      </Text>
      <Flex gap="2">
        
          <Card
            label={props.items}
            //description={props.description}
            // key={item.value}
            // value={item.value}
          />
        
      </Flex>
    </CheckboxGroup>
  )
}

