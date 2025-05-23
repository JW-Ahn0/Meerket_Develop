import ProfileUpload from 'assets/ProfileRegistrationForm/profile_upload.svg';
import { Image, ImageUpload, TextButton } from 'components/atoms';
import { ErrorMessage, LabeledInput } from 'components/molecules';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import type { IUser } from 'types';
import { convertToWebP } from 'utils';
import { ProfileImageWrapper, ProfileRegistrationFormWrapper } from './styled';

interface IProfileRegistrationFormProps {
  /** Submit 이벤트 발생 시 실행할 함수 */
  onSubmit: (data: IUser) => void;
  /** User 정보 (가입 => undefined, 프로필 수정 => 로그인한 유저) */
  user?: IUser;
}

export const ProfileRegistrationForm = ({
  onSubmit,
  user,
}: IProfileRegistrationFormProps) => {
  const { control, handleSubmit, setValue } = useForm<IUser>({
    mode: 'onChange',
    defaultValues: {
      nickname: user?.nickname,
      profile: user?.profile,
    },
  });

  const getProfileImageURL = useCallback((profile: IUser['profile']) => {
    if (!profile || typeof profile === 'string') {
      return profile;
    }
    return URL.createObjectURL(profile);
  }, []);

  const onChange = useCallback(
    async (files: File[]) => {
      const resizedFile = await convertToWebP(files[0], 360);
      setValue('profile', resizedFile);
    },
    [setValue],
  );

  return (
    <ProfileRegistrationFormWrapper onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="profile"
        control={control}
        render={({ field: { value } }) => (
          <ProfileImageWrapper>
            <Image
              type="round"
              url={getProfileImageURL(value) || ProfileUpload}
              alt="유저 프로필 사진"
              fetchpriority="high"
            />
            <ImageUpload onFileChange={onChange} />
          </ProfileImageWrapper>
        )}
      />
      <Controller
        name="nickname"
        control={control}
        rules={{
          required: '닉네임은 필수 입력 항목입니다.',
          maxLength: {
            value: 14,
            message: '닉네임은 15자리 미만으로 입력해주세요.',
          },
        }}
        render={({ field: { value }, fieldState: { invalid }, formState }) => (
          <>
            <LabeledInput
              id="profile-nickname"
              label="닉네임"
              value={value || ''}
              setValue={(value) => {
                setValue('nickname', value);
              }}
              placeholder="닉네임을 입력해주세요."
            />
            {invalid && (
              <ErrorMessage
                message={formState.errors.nickname?.message || ''}
              />
            )}
          </>
        )}
      />
      <TextButton
        size="l"
        text={`${!user?.nickname ? '등록' : '수정'} 완료`}
        onClick={() => handleSubmit(onSubmit)}
      />
    </ProfileRegistrationFormWrapper>
  );
};
