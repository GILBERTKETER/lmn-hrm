import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
// import { useAuth } from "@/hooks/Auth";
import _ from "lodash";
import { useSearchParams, useNavigate, useLocation } from "react-router";
import type { Breadcrumb } from "@/types/navigation";

type WorkspaceContextType = {
  profiles: any[];
  currentProfile: any;
  setCurrentProfile: any;
  hasNoProfiles: boolean;
  breadcrumbs: Breadcrumb[];
  setBreadcrumbs: any;
};

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined
);

type UseAuthProps = {
  children: ReactNode;
};

const WorkspaceProvider = ({ children }: UseAuthProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  //   const { user, getMe } = useAuth();

  const [profiles, setProfiles] = useState<any[]>([]);
  const [currentProfile, setCurrentProfile] = useState<null>(null);
  const [hasNoProfiles, setHasNoProfiles] = useState<boolean>(false);
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

  //   const getUserProfiles = useCallback(async () => {
  //     const rawProfile: any[] = [];
  //     _.forEach(
  //       user?.profiles || [],
  //       async ({ profiles_id: profile }: Record<string, any>) => {
  //         rawProfile.push(profile);
  //       }
  //     );
  //     if (rawProfile.length === 0) {
  //       setHasNoProfiles(true);
  //     }
  //     if (searchParams.get("profile")) {
  //       const profile = rawProfile.find(
  //         (org) => org.id === searchParams.get("profile")
  //       );
  //       if (profile) {
  //         setCurrentProfile(profile);
  //       } else {
  //         setCurrentProfile(rawProfile[0]);
  //       }
  //       searchParams.delete("profile");
  //       console.log("searchParams", searchParams.toString());
  //     } else {
  //       setCurrentProfile(rawProfile[0]);
  //     }
  //     setProfiles(rawProfile);
  //   }, [user]);

  //   useEffect(() => {
  //     getUserProfiles();
  //   }, [user]);

  //   useEffect(() => {
  //     if ((user.profiles ?? []).length === 0) {
  //       // Redirect to create profile if user has no profiles
  //       // navigate('/profiles/+')
  //       // Use window.location.pathname to avoid 404 page
  //       // TODO: fix this
  //       if (location.pathname !== "/profiles/+") {
  //         window.location.pathname = "/profiles/+";
  //       }
  //     }
  //   }, [user.profiles]);

  return (
    <WorkspaceContext.Provider
      value={{
        profiles,
        currentProfile,
        hasNoProfiles,
        setCurrentProfile,
        breadcrumbs,
        setBreadcrumbs,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

// Custom hook for accessing the auth context
export const useWorkspace = (): WorkspaceContextType => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useAuth must be used within a UseAuth provider");
  }
  return context;
};

export default WorkspaceProvider;
