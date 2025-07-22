import PropTypes from "prop-types";
import { Flex, Text, Button } from "@chakra-ui/react";
function ConfirmCard({ title, onConfirm, onCancel }) {
  return (
    <Flex flexDirection="column" bgColor="white" minWidth="24" justifyContent='center' gap='1rem'>
      <Text textStyle='md' textAlign='center' marginTop='2.25rem'>{title}</Text>
      <Flex gap="2rem" width='full' justifyContent='center'>
        <Button colorPalette="red" onClick={() => onConfirm()}>
          Si
        </Button>
        <Button colorPalette="green" onClick={() => onCancel()}>
          No
        </Button>
      </Flex>
    </Flex>
  );
}

ConfirmCard.propTypes = {
  title: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmCard;
