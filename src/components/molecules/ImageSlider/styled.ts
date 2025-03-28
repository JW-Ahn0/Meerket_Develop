import styled from '@emotion/styled';

export const ImageSliderWrapper: ReturnType<typeof styled.div> = styled.div`
  cursor: pointer;

  .swiper {
    width: 100%;
    //402px;
    height: 25.125rem;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: ${({ theme }) => theme.colors.white};
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .swiper-pagination-fraction {
    top: 1rem;
    bottom: initial;
    left: initial;
    right: 1rem;
    width: fit-content;
    padding: 4px 10px;
    background-color: ${({ theme }) => `${theme.colors.black}4c`};
    color: white;
    border-radius: ${({ theme }) => theme.radius.xl};
    font-size: 12px;
  }
`;
