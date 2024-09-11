import { useCallback, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Box } from '@mui/material';

import { getAccounts, addAccount, getAccountsCount } from 'src/api/accounts';
import { useSnackbar } from 'src/providers/snackbar';
import { AccountData } from 'src/types/accounts';
import { usePopup } from 'src/utils/hooks/usePopup';
import { AddAccountModal } from '@/views/Accounts/AddAccountForm';
import { AccountsListView } from '@/views/Accounts/List/View';

export function AccountsList() {
  const showMessage = useSnackbar();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const { isLoading, data, refetch } = useQuery({
    queryKey: ['accounts', paginationModel.page],
    queryFn: () =>
      getAccounts({
        page: paginationModel.page,
        pageSize: paginationModel.pageSize,
      }),
  });

  const {
    isLoading: isLoadingCount,
    data: countData,
    refetch: refetchCount,
  } = useQuery({
    queryKey: ['accounts/count'],
    queryFn: () => getAccountsCount({}),
  });

  const { handleClose, handleOpen, open } = usePopup();
  const { isPending: addReviewLoading, mutateAsync } = useMutation({
    mutationKey: ['addAccount'],
    mutationFn: addAccount,
    onSuccess: () => {
      refetch();
      refetchCount();
    },
  });

  const handleSubmit = useCallback(
    async (payload: AccountData) => {
      await mutateAsync({
        accountData: payload,
      });
      showMessage('Account has been added', 'success');
      handleClose();
    },
    [handleClose, mutateAsync, showMessage]
  );

  const handleAddAccountClick = useCallback(() => {
    handleOpen();
  }, [handleOpen]);

  return (
    <Box>
      <AccountsListView
        accounts={data}
        onAddAccountClick={handleAddAccountClick}
        loading={isLoading || isLoadingCount}
        onPaginationModelChange={setPaginationModel}
        paginationModel={paginationModel}
        rowCount={countData?.count || 0}
      />
      <AddAccountModal
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        loading={addReviewLoading}
      />
    </Box>
  );
}
