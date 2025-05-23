import { PostRegisterTemplate } from 'components/templates';
import { useFetchProduct, useProductMutation } from 'hooks';
import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormDataStore, useTopBarStore } from 'stores';
import type { Category, IProductForm, IProductPost } from 'types';
import { formatPrice, getExpiredDate } from 'utils';

const createProductData = (
  formData: IProductForm,
  coordinates: { lat: number; lng: number; address: string },
): IProductPost => ({
  title: formData.title!,
  content: formData.content!,
  minimumPrice: Number(formData.minimumPrice!.replace(/,/g, '')),
  category: formData.category!,
  latitude: coordinates.lat,
  longitude: coordinates.lng,
  address: coordinates.address,
  location: formData.location!,
  images: formData.imgUrls!.map((img) => img.file!),
  expiredTime: getExpiredDate(formData.expiredTime as string),
});

export const PostRegisterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setTitle } = useTopBarStore();

  const queryParams = new URLSearchParams(location.search);
  const PRODUCT_ID = queryParams.get('productId') || '';
  const formData = useFormDataStore((state) => state.formData);
  const productId = useFormDataStore((state) => state.productId);
  const { latitude: lat, longitude: lng, address } = formData;
  const { setProductId, setFormData, clear } = useFormDataStore();
  const { product } = useFetchProduct(
    PRODUCT_ID && !productId ? PRODUCT_ID : '',
  );
  const { mutate, isPending } = useProductMutation({
    type: PRODUCT_ID ? 'edit' : 'register',
    productId: PRODUCT_ID,
    onSuccess: clear,
  });

  useEffect(() => {
    if (product && PRODUCT_ID && !productId) {
      setProductId(PRODUCT_ID);
      setFormData({
        title: product.title,
        content: product.content,
        minimumPrice: formatPrice(product.minimumPrice),
        category: product.category as Category,
        latitude: product.productLocation.latitude,
        longitude: product.productLocation.longitude,
        address: product.productLocation.address,
        location: product.productLocation.location,
        imgUrls: product.images.map((img) => ({ url: img })),
        expiredTime: product.expiredTime,
      });
    }
  }, [product, PRODUCT_ID, productId, setFormData, setProductId]);

  const handleSubmit = useCallback(
    async (formData: IProductForm) => {
      const productData = createProductData(formData, {
        lat: lat!,
        lng: lng!,
        address: address!,
      });

      if (isPending) return;

      if (!PRODUCT_ID) {
        mutate(productData);
      } else {
        const updateData = { ...productData };
        delete updateData.images;
        delete updateData.expiredTime;
        mutate(updateData);
      }
    },
    [lat, lng, address, PRODUCT_ID, mutate, isPending],
  );

  const handleClick = useCallback(
    (formData: IProductForm) => {
      setFormData(formData);
      navigate('/location-selection');
    },
    [navigate, setFormData],
  );

  useEffect(() => {
    setTitle('내 물건 판매하기');
  }, [setTitle]);

  return (
    <PostRegisterTemplate
      productId={PRODUCT_ID}
      postForm={formData}
      onClick={handleClick}
      onSubmit={handleSubmit}
    />
  );
};

export default PostRegisterPage;

/**
 * 이미지 업로드 시 응답 받는 타입 (고도화에서 사용)
 */
// interface IImageResponse extends IResponse {
//   result: {
//     url: string;
//   };
// }

/**
 * 파일을 업로드하고 URL을 반환하는 함수 (고도화에서 사용)
 * @param file
 * @returns
 */
// const uploadImage = async (file: File): Promise<string> => {
//   const imgFormData = new FormData();
//   imgFormData.append("imageFile", file);

//   try {
//     const response = await http.post<IImageResponse, FormData>(
//       "/products/image",
//       imgFormData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data"
//         }
//       }
//     );
//     if (response.success && response.code === "COMMON200") {
//       return response.result.url;
//     }
//   } catch (error) {
//     console.error("Failed to fetch messages:", error);
//   }
//   return "";
// };

/**
 * 이미지 업로드를 처리하는 함수 (수정할 때 사용 - 현재 이미지 수정 불가능)
 * @param imgInfos
 * @returns
 */
// const handleImageUpload = async (
//   imgInfos: IImageInfo[]
// ): Promise<IImgUrl[]> => {
//   const uploadPromises = imgInfos.map(async (imgInfo) => {
//     if (imgInfo.url) {
//       return { url: imgInfo.url } as IImgUrl;
//     } else if (imgInfo.file) {
//       const url = await uploadImage(imgInfo.file);
//       return { url } as IImgUrl;
//     } else {
//       throw new Error("이미지 정보가 유효하지 않습니다.");
//     }
//   });

//   const images = await Promise.all(uploadPromises);
//   return images;
// };
