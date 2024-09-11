import { Button } from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { useCallback } from 'react';

interface EditToolbarProps {
  onClick: () => void;
}

export function EditToolbar({ onClick }: EditToolbarProps) {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add account
      </Button>
    </GridToolbarContainer>
  );
}
