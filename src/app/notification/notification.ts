export interface Alert {
  type: AlertType
  message: string
  hidden: boolean
}

export enum AlertType {
  success = 'success',
  info = 'info',
  warning = 'warning',
  danger = 'danger',
  primary = 'primary',
  secondary = 'secondary',
  light = 'light',
  dark = 'dark'
}
