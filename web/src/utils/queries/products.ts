import { useQuery } from '@tanstack/react-query'
import { getSale } from '../api'
// import { getPosts, getPost } from "./api";

export const useSale = () =>
  useQuery({
    queryKey: ['sales'],
    queryFn: () => getSale(2),
  })

/* export const usePost = (id: number) =>
  useQuery({ queryKey: ["posts", id], queryFn: () => getPost(id) });
 */
