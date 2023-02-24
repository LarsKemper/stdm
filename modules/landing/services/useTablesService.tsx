import { useState } from 'react';

function useTablesService() {
  const [loading, setLoading] = useState<boolean>(false);

  return {
    loading,
  };
}

export default useTablesService;
