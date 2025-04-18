import type { Meta, StoryObj } from '@storybook/react';
import { NavermapsProvider } from 'react-naver-maps';
import { ILocation } from 'types';
import { SelectLocationTemplate } from '.';

const meta: Meta<typeof SelectLocationTemplate> = {
  title: 'Templates/SelectLocationTemplate',
  component: SelectLocationTemplate,
  tags: ['autodocs'],
  argTypes: {
    coord: {
      control: {
        type: 'object',
      },
      description: '거래희망장소 좌표 (위도, 경도)',
    },
    onLocationSelect: {
      action: 'onLocationSelect',
      description: '거래희망장소 선택 완료 버튼 클릭 이벤트',
    },
  },
  decorators: (story) => (
    <NavermapsProvider
      ncpClientId={import.meta.env.VITE_NAVER_MAP_CLIENT_ID}
      submodules={['geocoder']}
    >
      <div style={{ maxWidth: '375px', height: '600px', display: 'flex' }}>
        {story()}
      </div>
    </NavermapsProvider>
  ),
};

type Story = StoryObj<typeof meta>;

export const Register: Story = {
  args: {
    onLocationSelect: (location: ILocation) => console.log(location),
  },
  render: (args) => <SelectLocationTemplate {...args} />,
};
export const Edit: Story = {
  args: {
    coord: {
      lat: 37.5666805,
      lng: 126.9784147,
    },
    onLocationSelect: (location: ILocation) => console.log(location),
  },
  render: (args) => <SelectLocationTemplate {...args} />,
};

export default meta;
