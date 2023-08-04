import { useEffect, useMemo, useState } from 'react';
import { Person, Sorting } from './types';
import Header from './Header';

const UsersTable = () => {
  const [users, setUsers] = useState<Person[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [sorting, setSorting] = useState<Sorting>({
    sortKey: 'id',
    order: 'asc'
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const url = 'https://jsonplaceholder.typicode.com/users';

    fetch(url)
      .then(result => result.json())
      .then(data => {
        const filteredEntries = Object.fromEntries(
          Object.entries(data[0]).filter(
            entry => typeof data[0][entry[0]] !== 'object'
          )
        );
        setColumns(Object.keys(filteredEntries));
        setUsers(data);
      });
  }, []);

  const handleSort = (incomingSortKey: string) => {
    const isDescendingSort = sorting.order === 'asc';

    if (sorting.sortKey === incomingSortKey) {
      setSorting({
        sortKey: incomingSortKey,
        order: isDescendingSort ? 'desc' : 'asc'
      });
    } else {
      setSorting({
        sortKey: incomingSortKey,
        order: 'asc'
      });
    }

    const sortedUsers = [...users].sort((a, b) => {
      const internalSortKey = incomingSortKey as keyof typeof a;
      const valueOfA = a[internalSortKey];
      const valueOfB = b[internalSortKey];

      if (typeof valueOfA === 'number' || typeof valueOfB === 'number') {
        return isDescendingSort ? +valueOfB - +valueOfA : +valueOfA - +valueOfB;
      }
      if (isDescendingSort) {
        return valueOfA.localeCompare(valueOfB);
      }
      return valueOfB.localeCompare(valueOfA);
    });

    setUsers(sortedUsers);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const normalisedUsers = useMemo(() => {
    if (searchQuery.trim().length === 0) {
      return users;
    }
    const filteredUsers = users.filter(user => {
      for (const key in user) {
        const personKey = key as keyof typeof user;
        if (
          user[personKey]
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        ) {
          return user;
        }
      }
    });

    return filteredUsers;
  }, [searchQuery, users]);

  return (
    <div>
      <h1>Users Table</h1>
      <input
        value={searchQuery}
        onChange={handleSearch}
        type="text"
        className="users-search"
      />
      <table className="users-table">
        <Header columns={columns} sorting={sorting} handleSort={handleSort} />

        <tbody>
          {normalisedUsers.map(user => (
            <tr key={user.id}>
              {columns.map(column => (
                <td key={column} className="table-cell">
                  {user[column as keyof typeof user]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
