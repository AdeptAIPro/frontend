
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppCredentials, CredentialsContextType, AWSCredentials } from '@/types/credentials';
import { useCredentialsStorage } from '@/hooks/use-credentials-storage';
import { useInfrastructureCheck } from '@/hooks/use-infrastructure-check';

const CredentialsContext = createContext<CredentialsContextType>({
  credentials: null,
  setCredentials: () => {},
  isBackendReady: false,
  checkBackendStatus: async () => false,
  testAwsConnection: async () => false,
  checkInfrastructure: async () => ({ ready: false, issues: [], lastChecked: '' }),
  clearCredentials: () => {}
});

export const CredentialsProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [credentials, setCredentialsState] = useState<AppCredentials | null>(null);
  const [isBackendReady, setIsBackendReady] = useState<boolean>(false);
  
  const credentialsStorage = useCredentialsStorage();
  const { checkBackendStatus, checkInfrastructure } = useInfrastructureCheck(!!credentials?.aws);
  
  // Load credentials from secure storage on mount
  useEffect(() => {
    const savedCredentials = credentialsStorage.loadStoredCredentials();
    if (savedCredentials) {
      setCredentialsState(savedCredentials);
      checkBackendStatus().then(setIsBackendReady);
    }
  }, []);
  
  // When credentials change, update backend ready status
  useEffect(() => {
    if (credentials) {
      checkBackendStatus().then(setIsBackendReady);
    } else {
      setIsBackendReady(false);
    }
  }, [credentials]);
  
  const setCredentials = (creds: AppCredentials) => {
    credentialsStorage.storeCredentials(creds);
    setCredentialsState(creds);
  };
  
  const clearCredentials = () => {
    credentialsStorage.clearStoredCredentials();
    setCredentialsState(null);
    setIsBackendReady(false);
  };
  
  return (
    <CredentialsContext.Provider 
      value={{
        credentials,
        setCredentials,
        isBackendReady,
        checkBackendStatus,
        checkInfrastructure,
        clearCredentials
      }}
    >
      {children}
    </CredentialsContext.Provider>
  );
};

export const useCredentials = () => useContext(CredentialsContext);
