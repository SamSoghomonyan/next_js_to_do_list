type PopUpProps = {
  name: string;
  id:number;
  handleClick: (id: number) => void
  handleCancelClick: () => void
};

export default function PopUp({ name,id , handleCancelClick , handleClick}: PopUpProps){
  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded shadow-lg w-80">
        <p className="mb-4">Do you want to delete your task?
          task name - {name}</p>
        <div className="flex justify-end gap-2">
          <button onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleCancelClick()
          }} className="px-3 py-1 bg-gray-300 rounded cursor-pointer">Cancel</button>
          <button onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleClick(id)
          }} className="px-3 py-1 bg-red-500 text-white rounded cursor-pointer ">Delete</button>
        </div>
      </div>
    </div>
  )
}