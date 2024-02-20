import { authState } from "../store/Auth";
import { useRecoilValue } from "recoil";

const TopBar = () => {
  const { isAuthenticated, userEmail } = useRecoilValue(authState);

  return (
    <div className="flex justify-between sticky top-0 z-50 bg-yellow-200 p-4">
      <div className="flex items-center">Your Todos</div>
      {isAuthenticated ? (
        <div>
          <div className="">{userEmail}</div>
        </div>
      ) : (
        <button className="p-1 bg-yellow-300">Login</button>
      )}
    </div>
  );
};

export default TopBar;
