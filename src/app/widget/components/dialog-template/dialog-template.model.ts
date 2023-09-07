export interface DialogTemplateConfig {
  title: string;
  close: () => void;
  colorToolbar?: MatColor | 'transparent';
  actionButtons: ActionConfig[];
}

export interface ActionConfig {
  label: string;
  color: MatColor;
  type: MatButtonType;
  disabled?: boolean;
  onClick: () => void;
}

export type MatColor = 'primary' | 'accent' | 'warn';

export type MatButtonType = 'raised' | 'stroked' | 'flat' | 'menu';
