import { useQuery } from '@tanstack/react-query';
import { LoginService, UserLoginDetail } from '../api';

const KEYS = ['GetUserLoginDetails'];

export const useFetchLoginDetails = (
  email?: string | null
): { loginDetails?: UserLoginDetail | null; isPending: boolean; isLoading: boolean } => {
  const fetchLoginDetails = () => {
    if (email) {
      return LoginService.getUserLoginDetails(email);
    }

    return Promise.reject(null);
  };

  const {
    data: loginDetails,
    isPending,
    isLoading,
  } = useQuery({
    queryKey: [...KEYS, email],
    queryFn: () => fetchLoginDetails(),
    enabled: !!email,
  });

  return { loginDetails, isPending, isLoading };
};
