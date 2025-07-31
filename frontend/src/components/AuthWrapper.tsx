import React from 'react';
import { ClerkProvider, SignIn, SignUp, useUser } from '@clerk/clerk-react';
import { UserButton } from '@clerk/clerk-react';

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_your_actual_clerk_key_here';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthenticatedContent: React.FC<AuthWrapperProps> = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen terminal-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen terminal-bg">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-blue-400">
              AgentForge
            </h1>
            <div className="agent-card rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-400 mb-4 text-center">
                Sign in to your personal AgentForge
              </h2>
              <p className="text-gray-400 text-center mb-6">
                Get your own AI agents that learn from your coding patterns
              </p>
              <div className="space-y-4">
                <SignIn />
                <div className="text-center">
                  <span className="text-gray-400">Don't have an account? </span>
                  <SignUp mode="modal" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10">
        <UserButton />
      </div>
      {children}
    </div>
  );
};

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <AuthenticatedContent>
        {children}
      </AuthenticatedContent>
    </ClerkProvider>
  );
}; 