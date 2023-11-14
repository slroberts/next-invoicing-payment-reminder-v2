import { FC, RefObject } from 'react';
import { Check, ChevronDown, ChevronUp } from 'react-feather';

const rowsPerPageOptions = [5, 10, 15, 20, 25];

interface IRowsPerPageDropdownProps {
  popUpRef: RefObject<HTMLDivElement>;
  togglePopUp: () => void;
  itemsPerPage: number;
  isPopUpOpen: boolean;
  selectedItemsPerPage: number;
  handleOptionClick: (option: number) => void;
}

const RowsPerPageDropdown: FC<IRowsPerPageDropdownProps> = ({
  popUpRef,
  togglePopUp,
  itemsPerPage,
  isPopUpOpen,
  selectedItemsPerPage,
  handleOptionClick,
}) => {
  return (
    <div className='relative flex items-center gap-3 text-slate-300'>
      Rows per page
      <div
        ref={popUpRef}
        className='flex items-center gap-2 px-3 py-1 border border-slate-700 rounded-md text-slate-300 bg-transparent cursor-pointer'
        onClick={togglePopUp}
      >
        {itemsPerPage}{' '}
        <div>
          <ChevronUp className='w-3 h-3' />
          <ChevronDown className='w-3 h-3 -mt-1' />
        </div>
      </div>
      {isPopUpOpen && (
        <div className='absolute -top-[10.25rem] right-0 mt-2 w-24 bg-slate-950 text-slate-300 border border-slate-700 rounded-lg shadow-lg'>
          <div className='flex flex-col p-1'>
            {rowsPerPageOptions.map((option) => (
              <div
                key={option}
                className={`flex justify-between items-center cursor-pointer px-4 py-1 text-sm hover:bg-gray-700 hover:rounded-md popup-option ${
                  selectedItemsPerPage === option ? 'selected' : ''
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}{' '}
                {selectedItemsPerPage === option && (
                  <Check className='w-4 h-4' />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RowsPerPageDropdown;
