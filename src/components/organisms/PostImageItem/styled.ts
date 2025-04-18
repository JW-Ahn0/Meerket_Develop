import styled from '@emotion/styled';
import { IconButtonWrapper } from 'components/atoms/Button/IconButton/styled';
import { TitleRegularWrapper } from 'components/atoms/Text/styled';

export const PostImageItemWrapper: ReturnType<typeof styled.div> = styled.div`
  position: relative;
  overflow: hidden;

  ${IconButtonWrapper} {
    position: absolute;
    top: 0;
    right: 0;
    color: ${({ theme }) => theme.colors.grey600};
  }

  ${TitleRegularWrapper} {
    background-color: ${({ theme }) => `${theme.colors.grey600}60`};
    width: 100%;
    height: 25%;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0%);
    white-space: nowrap;

    display: flex;
    justify-content: center;
    align-items: center;

    // TODO: text에 variant를 주니까 레이아웃이 틀어지는 버그 수정
    color: ${({ theme }) => theme.colors.grey100};

    /* 가이드/regular */
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 145%; /* 18.85px */
    letter-spacing: -0.325px;
  }
`;
