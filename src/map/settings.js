import { token } from './token'

export const mapSettings = {
  style: 'mapbox://styles/mapbox/streets-v12',
  apiToken: token || import.meta.env.VITE_TOKEN,
}
