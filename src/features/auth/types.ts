export type AdminUser = {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  role: "owner" | "admin" | "reviewer";
};

export type GmailConnectionSummary = {
  connected: boolean;
  googleEmail: string | null;
  scopes: string[];
  lastSuccessfulScanAt: string | null;
  connectionStatus: "active" | "revoked" | "expired" | "error" | null;
};

export type AuthSessionResponse =
  | {
      authenticated: true;
      user: AdminUser;
      gmailConnection: GmailConnectionSummary | null;
    }
  | {
      authenticated: false;
      user: null;
      gmailConnection: null;
    };

export type AuthState =
  | {
      status: "loading";
      session: null;
    }
  | {
      status: "authenticated";
      session: Extract<AuthSessionResponse, { authenticated: true }>;
    }
  | {
      status: "unauthenticated";
      session: null;
    };
