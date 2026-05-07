import { useQuery } from '@tanstack/react-query';
import { UserService } from '../api/services';
import { User } from '../api/model';
import { useStore } from '../store';

export const USER_QUERY_KEY = ['user', 'me'];

export const useFetchUser = () => {
  // const token = useStore((state) => state.token);

  console.log('fetch');
  const { data: user, isLoading } = useQuery<User>({
    queryKey: USER_QUERY_KEY,
    queryFn: () => UserService.getMe(),
    enabled: true,
  });

  return { user, isLoading };
};
