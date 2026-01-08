import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";
import { setRightOpen } from "../../redux/slices/uiStates";
import type { RootState } from "../../main";

export const ProtectedRoute = () => {
  const user = useSelector((state: RootState) => state.userState.user);
  const dispatch = useDispatch();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!user && !hasShownToast.current) {
      toast.warning("Please login first");
      dispatch(setRightOpen(true));
      hasShownToast.current = true;
    }
  }, [user, dispatch]);

  // if (user === undefined) {
  //   return null;
  // }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
