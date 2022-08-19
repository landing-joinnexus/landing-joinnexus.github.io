import { CircularProgress } from "@mui/material";
import { GalacticWallpaper } from "hoc";
import PermissionsIssues from "components/permissions-issues/permissions-issues";
import { useEffect, useState } from "react";

interface Props {
  children?: React.ReactNode;
}

export const UserMediaWrapper = (props: Props) => {
  const [ready, setReady] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        setReady(true);
      } catch (e) {
        setReady(false);
      }
    })();
  }, []);

  if (ready === null) {
    return (
      <GalacticWallpaper isContentHorizontallyCentered={true} isContentVerticallyCentered={true}>
        <CircularProgress />
      </GalacticWallpaper>
    )
  }
  if (!ready) {
    return <PermissionsIssues />;
  }
  return <>{props.children}</>;
};
