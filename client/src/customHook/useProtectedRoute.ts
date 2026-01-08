// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom"
// import { toast } from "sonner";
// import { setRightOpen } from "../redux/slices/uiStates";

// export const useProtectedRoute = ({user, children}: {user: never, children: never}) => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     if(!user){
//         toast.warning("Please login first");
//         dispatch(setRightOpen(true));
//         navigate("/");
//     }

//     return {children}
// }