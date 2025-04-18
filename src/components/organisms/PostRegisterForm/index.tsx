import { zodResolver } from '@hookform/resolvers/zod';
import { Text, TextButton } from 'components/atoms';
import {
  ErrorMessage,
  LabeledInput,
  LabeledSelect,
  LabeledTextarea,
} from 'components/molecules';
import { PostImageManager } from 'components/organisms';
import { CATEGORY_OPTIONS, EXPIRED_TIMES } from 'constants/options';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { colors } from 'styles';
import type { IImageInfo, IProductForm } from 'types';
import { formatToDateTime, isISOFormat } from 'utils';
import * as z from 'zod';
import { DivWrapper, PostRegisterFormWrapper } from './styled';

interface IPostRegisterFormProps {
  /** product Id */
  productId: string;
  /** 글 등록할 때 필요한 form 데이터 */
  postForm?: IProductForm;
  /** Submit 이벤트 발생 시 실행할 함수 */
  onSubmit: (data: IProductForm) => void;
  /** 거래 희망 장소 클릭 시 실행할 함수 */
  onClick: (data: IProductForm) => void;
}

export const PostRegisterForm = ({
  productId,
  postForm,
  onSubmit,
  onClick,
}: IPostRegisterFormProps) => {
  const [imageInfos, setImageInfos] = useState<IImageInfo[]>(
    postForm?.imgUrls || [],
  );

  const postRegisterSchema = z.object({
    title: z.string().min(2, { message: '제목은 2자 이상 입력해주세요.' }),
    content: z.string().min(10, { message: '설명은 10자 이상 입력해주세요.' }),
    minimumPrice: z
      .string({ required_error: '최저 입찰가는 필수 입력 항목입니다.' })
      .refine((val: string) => Number(val.replace(/,/g, '')) <= 2000000000, {
        message: '최저 입찰가는 20억 이하로 입력해주세요.',
      }),
    category: z.string({ required_error: '카테고리는 필수 입력 항목입니다.' }),
    expiredTime: z.string({
      required_error: '경매 마감 일시는 필수 입력 항목입니다.',
    }),
    location: z
      .string()
      .min(1, { message: '거래 희망 장소는 필수 입력 항목입니다.' }),
    imgUrls: z
      .array(z.any())
      .min(1, { message: '이미지를 1개 이상 업로드해주세요.' }),
  });

  const { control, handleSubmit, setValue, getValues } = useForm<IProductForm>({
    mode: 'onBlur',
    resolver: zodResolver(postRegisterSchema),
    defaultValues: {
      title: postForm?.title,
      content: postForm?.content,
      minimumPrice: postForm?.minimumPrice,
      category: postForm?.category,
      expiredTime: postForm?.expiredTime,
      location: postForm?.location,
    },
  });

  useEffect(() => {
    setImageInfos(postForm?.imgUrls || []);
    setValue('title', postForm?.title);
    setValue('content', postForm?.content);
    setValue('minimumPrice', postForm?.minimumPrice);
    setValue('category', postForm?.category);
    setValue('expiredTime', postForm?.expiredTime);
    setValue('location', postForm?.location);
  }, [postForm, setValue]);

  useEffect(() => {
    setValue('imgUrls', imageInfos);
  }, [imageInfos, setValue]);

  return (
    <PostRegisterFormWrapper onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="imgUrls"
        control={control}
        render={({ fieldState: { invalid, error } }) => (
          <DivWrapper>
            <PostImageManager
              imageInfos={imageInfos}
              setImageInfos={setImageInfos}
              disabled={!!productId}
            />
            {invalid && <ErrorMessage message={error?.message || ''} />}
          </DivWrapper>
        )}
      />
      <Controller
        name="category"
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { invalid },
          formState,
        }) => (
          <DivWrapper>
            <LabeledSelect
              id="product-category"
              label="카테고리"
              options={CATEGORY_OPTIONS}
              value={CATEGORY_OPTIONS.find((option) => option.value === value)}
              onChange={(option) => onChange(option?.value)}
              placeholder="카테고리를 검색해보세요!"
            />
            {invalid && (
              <ErrorMessage
                message={formState.errors.category?.message || ''}
              />
            )}
          </DivWrapper>
        )}
      />
      <Controller
        name="title"
        control={control}
        render={({ field: { value }, fieldState: { invalid }, formState }) => (
          <DivWrapper>
            <LabeledInput
              id="product-title"
              label="제목"
              value={value || ''}
              setValue={(value) => {
                setValue('title', value);
              }}
              placeholder="제목을 입력해주세요."
            />
            {invalid && (
              <ErrorMessage message={formState.errors.title?.message || ''} />
            )}
          </DivWrapper>
        )}
      />
      <Controller
        name="content"
        control={control}
        render={({ field: { value }, fieldState: { invalid }, formState }) => (
          <DivWrapper>
            <LabeledTextarea
              id="product-content"
              label="설명"
              value={value || ''}
              setValue={(value) => {
                setValue('content', value);
              }}
              placeholder={
                '이 상품은 어떤 특징을 가지고 있나요? \n상세한 설명을 입력해주세요.'
              }
            />
            {invalid && (
              <ErrorMessage message={formState.errors.content?.message || ''} />
            )}
          </DivWrapper>
        )}
      />
      <Controller
        name="minimumPrice"
        control={control}
        render={({ field: { value }, fieldState: { invalid }, formState }) => (
          <DivWrapper>
            <LabeledInput
              type="number"
              id="product-minimumPrice"
              label="최저 입찰가"
              value={value || ''}
              setValue={(value) => {
                setValue('minimumPrice', value);
              }}
              placeholder="최저 입찰가를 입력해주세요."
            />
            {invalid && (
              <ErrorMessage
                message={formState.errors.minimumPrice?.message || ''}
              />
            )}
          </DivWrapper>
        )}
      />
      <Controller
        name="expiredTime"
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { invalid },
          formState,
        }) => {
          const expiredTimeDisabled = isISOFormat(
            postForm?.expiredTime as string,
          );

          const formattedTime = expiredTimeDisabled
            ? formatToDateTime(postForm?.expiredTime as string)
            : '';

          return (
            <DivWrapper>
              <LabeledSelect
                id="product-expiredTime"
                label="경매 마감 일시"
                options={
                  expiredTimeDisabled
                    ? [
                        {
                          value: formattedTime,
                          label: formattedTime,
                        },
                      ]
                    : EXPIRED_TIMES
                }
                value={
                  expiredTimeDisabled
                    ? {
                        value: formattedTime,
                        label: formattedTime,
                      }
                    : EXPIRED_TIMES.find((option) => option.value === value)
                }
                onChange={(option) => onChange(option?.value)}
                placeholder="경매 마감 일시를 선택해주세요."
              />
              {!productId && (
                <Text variant="guide_regular" color={colors.grey500}>
                  포스팅이 등록될 때 경매 마감 시간이 카운트됩니다.
                </Text>
              )}
              {invalid && (
                <ErrorMessage
                  message={formState.errors.expiredTime?.message || ''}
                />
              )}
            </DivWrapper>
          );
        }}
      />
      <Controller
        name="location"
        control={control}
        render={({ field: { value }, fieldState: { invalid }, formState }) => (
          <DivWrapper>
            <LabeledInput
              id="product-location"
              label="거래 희망 장소"
              value={value || ''}
              onClick={() => {
                const formData = getValues();
                onClick(formData);
              }}
              placeholder="거래 희망 장소를 입력해주세요."
            />
            {invalid && (
              <ErrorMessage
                message={formState.errors.location?.message || ''}
              />
            )}
          </DivWrapper>
        )}
      />
      <TextButton
        size="l"
        text={`${productId ? '수정' : '등록'} 완료`}
        onClick={() => handleSubmit(onSubmit)}
      />
    </PostRegisterFormWrapper>
  );
};
