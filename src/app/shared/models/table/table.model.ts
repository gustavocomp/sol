export type CustomTableData = {
  columns: CustomColumnData[];
  pageSize: number;
  hasColumnAction: boolean;
  actions?: CustomAction[];
};

export type CustomColumnData = {
  label: string;
  propertyKey: string;
  icon?: string;
  colorText?: string;
};

export type CustomAction = {
  label: string;
  onClick: (row: any) => void;
};

export type AuxiliaryColumns = 'actions' | 'more';
