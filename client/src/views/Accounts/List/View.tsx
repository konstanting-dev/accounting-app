import { DataGrid, GridSlots } from '@mui/x-data-grid';
import { DataGridPropsWithoutDefaultValue } from '@mui/x-data-grid/models/props/DataGridProps';

import { accountsListColumns } from './accountsListColumns';
import { EditToolbar } from './EditToolbar';

import { LoadingIndicator } from 'src/components/LoadingIndicator';
import { Account } from 'src/types/accounts';

interface AccountsListProps {
  accounts?: Account[];
  onAddAccountClick: () => void;
  paginationModel: DataGridPropsWithoutDefaultValue['paginationModel'];
  onPaginationModelChange: DataGridPropsWithoutDefaultValue['onPaginationModelChange'];
  loading: boolean;
  rowCount: number;
}

export function AccountsListView({
  accounts,
  onAddAccountClick,
  onPaginationModelChange,
  loading,
  rowCount,
  paginationModel,
}: AccountsListProps) {
  return loading ? (
    <LoadingIndicator />
  ) : (
    <DataGrid
      columns={accountsListColumns}
      rows={accounts}
      pagination
      paginationMode="server"
      pageSizeOptions={[5, 10, 20, 100]}
      paginationModel={paginationModel}
      onPaginationModelChange={onPaginationModelChange}
      loading={loading}
      rowCount={rowCount}
      slots={{
        toolbar: EditToolbar as GridSlots['toolbar'],
      }}
      slotProps={{
        toolbar: { onClick: onAddAccountClick },
      }}
      getRowId={(row) => row._id}
    />
  );
}
