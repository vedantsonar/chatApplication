import Sidebar from "../components/sidebar/Slidebar.jsx";
import MessageContainer from "../components/message/MessageContainer.jsx";

const Home = () => {
	return (
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-stone-500 bg-clip-padding backdrop-filter backdrop-blur-lg'>
			<Sidebar />
			<MessageContainer />
		</div>
	);
};
export default Home;