import { observer } from "mobx-react-lite";
import { usersStore } from "@/stores/UsersStore";
import { Highlight } from "@/components/Highlight/Highlight";
import { ColumnFilter } from "@/components/ColumnFilter/ColumnFilter";
import { useState } from "react";
import styles from "./UserTable.module.css"


function renderSortIcon(field: string) {
  if (usersStore.sortBy !== field) return null;
  return usersStore.order === 'asc' ? ' ▲' : ' ▼';
}



const UserTable = observer(() => {
  

  const [widths, setWidths] = useState<Record<string, number>>({
    lastName: 120, firstName: 120, age: 80, gender: 80,
    phone: 140, email: 200, country: 120, city: 120,
  })
  
  
  function handleResize(field: string, startX: number, startWidth: number) {
    function onMouseMove(e: MouseEvent) {
      const newWidth = Math.max(50, startWidth + (e.clientX - startX));
      setWidths((prev) => ({ ...prev, [field]: newWidth }));
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }


  return (
        <table>
      <thead>
          <tr>
             <th style={{ width: widths.lastName, position: 'relative' }} onClick={() => usersStore.setSort('lastName')} >
               Фамилия{renderSortIcon('lastName')}
               <span
                  className={styles.resizer}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    handleResize('lastName',e.clientX,widths.lastName);
                  }}
                />
              </th>
             <th style={{ width: widths.lastName, position: 'relative' }} onClick={() => usersStore.setSort('firstName')}>
               Имя{renderSortIcon('firstName')}
                <span
                  className={styles.resizer}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    handleResize('lastName',e.clientX,widths.lastName);
                  }}
                />
             </th>
             <th style={{ width: widths.lastName, position: 'relative' }}  onClick={() => usersStore.setSort('age')}>
               Возраст{renderSortIcon('age')} <ColumnFilter field="age" />
                <span
                  className={styles.resizer}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    handleResize('lastName',e.clientX,widths.lastName);
                  }}
                />

             </th>
             <th style={{ width: widths.lastName, position: 'relative' }} onClick={() => usersStore.setSort('gender')}>
               Пол{renderSortIcon('gender')}
                <span
                  className={styles.resizer}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    handleResize('lastName',e.clientX,widths.lastName);
                  }}
                />

             </th>
             <th  style={{ width: widths.lastName, position: 'relative' }} onClick={() => usersStore.setSort('phone')}>
               Телефон{renderSortIcon('phone')} <ColumnFilter field="phone" />
                <span
                  className={styles.resizer}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    handleResize('lastName',e.clientX,widths.lastName);
                  }}
                />

             </th>
             <th style={{ width: widths.lastName, position: 'relative' }} >
              Email
                <span
                  className={styles.resizer}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    handleResize('lastName',e.clientX,widths.lastName);
                  }}
                />

             </th>
             <th style={{ width: widths.lastName, position: 'relative' }} >
              Страна
                <span
                  className={styles.resizer}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    handleResize('lastName',e.clientX,widths.lastName);
                  }}
                />

              </th>
             <th style={{ width: widths.lastName, position: 'relative' }} >
              Город
                <span
                  className={styles.resizer}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    handleResize('lastName',e.clientX,widths.lastName);
                  }}
                />

              </th>
        </tr>
      </thead>
      <tbody>
        {usersStore.filteredUsers.map((user) => (
          <tr key={user.id} onClick={() => usersStore.selectUser(user)}> 
            <td><Highlight text={user.lastName} query={usersStore.searchQuery} /></td>
            <td><Highlight text={user.firstName} query={usersStore.searchQuery} /></td>
            <td><Highlight text={String(user.age)} query={usersStore.searchQuery} /></td>
            <td><Highlight text={user.gender} query={usersStore.searchQuery} /></td>
            <td><Highlight text={user.phone} query={usersStore.searchQuery} /></td>
            <td><Highlight text={user.email} query={usersStore.searchQuery} /></td>
            <td><Highlight text={user.address.country} query={usersStore.searchQuery} /></td>
            <td><Highlight text={user.address.city} query={usersStore.searchQuery} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

export { UserTable };
