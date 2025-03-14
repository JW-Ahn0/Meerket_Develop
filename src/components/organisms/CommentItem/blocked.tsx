import { CommentItemWrapper } from "./styled";
import { Text } from "components/atoms";

export const BlockedComment = () => {
  return (
    <CommentItemWrapper className="blocked">
      <Text variant="desc_regular">차단된 댓글입니다.</Text>
    </CommentItemWrapper>
  );
};
