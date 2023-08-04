import { Sorting } from './types';

type HeaderProps = {
  columns: string[];
  sorting: Sorting;
  handleSort: (arg: string) => void;
};

const Header = ({ columns, sorting, handleSort }: HeaderProps) => {
  return (
    <thead>
      <tr>
        {columns.map(column => {
          const isAscending =
            column === sorting.sortKey && sorting.order === 'asc';
          const isDescending =
            column === sorting.sortKey && sorting.order === 'desc';

          return (
            <th
              key={column}
              className="table-cell"
              onClick={() => {
                handleSort(column);
              }}
            >
              <button className="cell-cta">
                {column}
                {isDescending && <span className="arrow">&#8595;</span>}
                {isAscending && <span className="arrow">&#8593;</span>}
              </button>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default Header;
