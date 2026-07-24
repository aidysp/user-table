import { observer } from "mobx-react-lite";
import { usersStore } from "@/stores/UsersStore";
import styles from "./UserModal.module.css";


const UserModal = observer(() => {
  const user = usersStore.selectedUser;
  if (!user) return null;

  return (
    <div className={styles.modalOverlay} onClick={() => usersStore.closeModal()}> 
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
         <button onClick={() => usersStore.closeModal()}>x</button>
         <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />
         <h2>{user.lastName} {user.firstName}</h2>
         <p>Возраст: {user.age}</p>
         <p>Рост: {user.height} см</p>
         <p>Вес: {user.weight} кг</p>
         <p>Телефон: {user.phone}</p>
         <p>Email: {user.email}</p>
         <p>Адрес: {user.address.address}, {user.address.city}, {user.address.country}</p>
      </div>
    </div>
  );
});

export { UserModal };
