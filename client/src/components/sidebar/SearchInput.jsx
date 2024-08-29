// FIXME: change icon -> icon-image

const SearchInput = () => {
	return (
		<form className='flex items-center gap-2'>
			<input type='text' placeholder='Search…' className='input input-bordered rounded-full' />
			<button type='submit' className='btn rounded-3xl bg-sky-500 text-white'>
				Icon
			</button>
		</form>
	);
};
export default SearchInput;