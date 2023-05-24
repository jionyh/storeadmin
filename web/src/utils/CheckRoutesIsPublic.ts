import { RoutesPaths } from './routes'

export const checkIsPublicRoute = (path: string) => {
  const appPublicRoutes = Object.values(RoutesPaths.public)

  return appPublicRoutes.includes(path)
}
