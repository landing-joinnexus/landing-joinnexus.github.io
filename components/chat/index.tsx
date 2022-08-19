import NeonBox from "components/neon-box/neon-box";
import Input from "./input/input";
import Messages from "./messages/messages";

interface Props {
  defaultLabel?: string;
  canAddMessage: boolean;
  sendMessage: (
    roomPin: string,
    userId: number,
    message: string,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
  ) => void;
}

const Chat = (props: Props) => {
  return (
    <NeonBox>
      <Messages />
      <Input
        sendMessage={props.sendMessage}
        canAddMessage={props.canAddMessage}
        defaultLabel={props.defaultLabel}
      />
    </NeonBox>
  );
};

export default Chat;
