import { useQuery } from '@tanstack/react-query';
import { UserService } from '../api/services';
import { User } from '../api/model';

export const USER_QUERY_KEY = ['user', 'me'];

export const useFetchUser = () => {
  const { data: user, isLoading } = useQuery<User>({
    queryKey: USER_QUERY_KEY,
    queryFn: () => UserService.getMe(),
    enabled: true,
  });

  return { user, isLoading };
};
