import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { usersStore } from "@/stores/UsersStore"
import { UserModal } from "@/components/UserModal/UserModal";
import { UserTable } from "./components/UserTable/UserTable";


const App = observer(() => {
  useEffect(() => {
    usersStore.fetchUsers();
  }, []);


  return (
    <>
    <div className="h-block">
      <h1>User table</h1>
      <input
        className="search"
        placeholder="Поиск..."
        onChange={(e) => usersStore.setSearchQuery(e.target.value)}
      />
    </div>
    {usersStore.isLoading && <p>Loading...</p>}
    {usersStore.error && <p>{usersStore.error}</p>}

    {!usersStore.isLoading && !usersStore.error && (
    <>
    <UserTable />

    <div className="pagination">
       <button disabled={usersStore.page === 1} onClick={() => usersStore.setPage(usersStore.page - 1)}>
          Назад
        </button>
        <span>{usersStore.page} / {usersStore.totalPages}</span>
        <button disabled={usersStore.page === usersStore.totalPages} onClick={() => usersStore.setPage(usersStore.page + 1)}>
          Вперёд
        </button>
    </div>
    </> 
    )}
    <UserModal />
  </>
  );
});


export default App;
