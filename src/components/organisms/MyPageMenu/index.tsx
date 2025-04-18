import { Text } from "components/atoms";
import { IconWithText } from "components/molecules";
import { MY_PAGE_MENUS } from "constants/myPageMenus";
import {
  MainMenuWrapper,
  MyPageMenuWrapper,
  SubMenuWrapper,
  ColorWrapper,
  TextContainer,
} from "./styled";

interface IMyPageMenuProps {
  /** 메뉴 클릭 시 실행 될 함수 */
  onMenuClick: (pathname: string) => void;
}

export const MyPageMenu = ({ onMenuClick }: IMyPageMenuProps) => {
  return (
    <MyPageMenuWrapper>
      {MY_PAGE_MENUS.map(({ title, menus }, idx) =>
        <MainMenuWrapper key={`m_root_${idx}`}>
          <ColorWrapper>
            <Text variant="title_semibold">
              {title}
            </Text>
          </ColorWrapper>
          <SubMenuWrapper>
            {menus.map(({ icon, name, desc, pathname }, i) =>
              <TextContainer
                key={`m_${idx}_${i}`}
                onClick={() => onMenuClick(pathname)}
              >
                <IconWithText>
                  <IconWithText.Icon icon={icon} size="s" />
                  <IconWithText.Content
                    content={name}
                    contentVariant="title_semibold"
                  />
                </IconWithText>
                <Text variant="guide_regular">
                  {desc}
                </Text>
              </TextContainer>
            )}
          </SubMenuWrapper>
        </MainMenuWrapper>
      )}
    </MyPageMenuWrapper>
  );
};
