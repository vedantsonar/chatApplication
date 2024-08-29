// import useLogout from "../../hooks/useLogout";

// const LogoutButton = () => {
//   const { loading, logout } = useLogout();

//   return (
//     <div className="mt-auto">
//       {!loading ? (
//         <button className="w-6 h-6 text-white cursor-pointer" onClick={logout}>
//           Logout
//         </button>
//       ) : (
//         <span className="loading loading-spinner"></span>
//       )}
//     </div>
//   );
// };
// export default LogoutButton;


const LogoutButton = () => {

  return (
    <div className="mt-auto">

        <button className="w-6 h-6 text-white cursor-pointer hover:text-gray-400" >
          Logout
        </button>

    </div>
  );
};
export default LogoutButton;
