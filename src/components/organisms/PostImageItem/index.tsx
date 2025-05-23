import { IconButton, Image, Text } from 'components/atoms';
import { XIcon } from 'components/atoms/Icon';
import { PostImageItemWrapper } from './styled';

interface IPostImageItemProps {
  /** 이미지 경로 */
  imgUrl: string;
  /** 대표사진 유무 */
  isThumbnail: boolean;
  /** X 버튼 onClick 이벤트 */
  onClick: () => void;
}

export const PostImageItem = ({
  imgUrl,
  isThumbnail,
  onClick,
}: IPostImageItemProps) => {
  return (
    <PostImageItemWrapper>
      <Image url={imgUrl} />
      <IconButton
        icon={XIcon}
        onClick={onClick}
        backgroundColor="transparent"
      />
      {isThumbnail && <Text variant="title_regular">대표 사진</Text>}
    </PostImageItemWrapper>
  );
};
