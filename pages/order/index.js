import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { GoSignOut } from "react-icons/go";
import { useAuth } from "@/firebase/auth";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
const Order = () => {
  const { signOut, authUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push("/login");
    }
    // if (!!authUser) {
    //   fetchTodos(authUser.uid);
    // }
  }, [authUser, isLoading]);
  const [meatPrice, setMeatPrice] = useState(2000);
  const [potatoPrice, setPotatoPrice] = useState(2000);
  const [sumPrice, setSumPrice] = useState(2000);

  const [potatoQuantity, setPotatoQuantity] = useState(1);
  const [meatQuantity, setMeatQuantity] = useState(1);

  function updateMeatQuantity(e) {
    if (e === "") {
      console.log(e, "ebnnn");
      setMeatQuantity("");
    } else {
      setMeatQuantity(Math.floor(e));
      const a = Math.floor(e) * 2000;
      setMeatPrice(a);
      updateSumPrice(a, potatoPrice);
    }
  }

  function updatePotatoQuantity(e) {
    if (e === "") {
      console.log(e, "ebnnn");
      setPotatoQuantity("");
    } else {
      const a = Math.floor(e) * 2000;
      setPotatoQuantity(Math.floor(e));
      setPotatoPrice(a);
      updateSumPrice(a, meatPrice);
    }
  }

  function updateSumPrice(meatPrice, potatoPrice) {
    const newTotalPrice = meatPrice + potatoPrice;
    setSumPrice(newTotalPrice);
  }
  //   console.log(authUser);
  const addToDo = async () => {
    try {
      const docRef = await addDoc(collection(db, "orders"), {
        owner: authUser.username,
        meatQty: meatQuantity,
        potatoQty: potatoQuantity,
        sumPrice: sumPrice,
        completed: false,
      });
      console.log(docRef, "dorec");
    } catch (error) {
      console.error("An error occured", error);
    }
  };

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 mt-10">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0 ">
              {/* <button className="h-10 bg-white border border-gray-100 shadow-sm hover:bg-gray-200 py-2 px-3 rounded-md">
                {"<"}
              </button> */}
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                Захиалгын хэсэг
              </h1>
              <div className="h-1 w-20 bg-blue-400 rounded"></div>
            </div>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Та захиалга хийхийн өмнө сайтар нягталж, тоогоо зөв гаргасны
              дараагаар захиалах товчин дээр дарж үйлчлүүлнэ. Хэрэв нэгэн товчин
              дээр дарагдсан бол захиалгыг буцаах боломжгүйг анхаарна уу.
            </p>
          </div>
          <div className="flex flex-wrap -m-4 justify-center">
            <div className="md:w-1/3 p-4 h-auto w-auto">
              <div className="bg-gray-100 p-6 rounded-lg">
                <img
                  className="h-40 rounded w-full object-cover object-center mb-6"
                  src="https://dummyimage.com/720x400"
                  alt="content"
                />
                <h3 className="tracking-widest text-blue-500 text-xs font-medium title-font">
                  Төрөл
                </h3>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  Махтай
                </h2>
                <div className="flex flex-col space-y-1 flex-grow-0">
                  <label className="text-blue-500 text-xs font-medium title-font tracking-normal">
                    Үнэ болон тоо
                  </label>

                  <div className="flex justify-between item-center">
                    <p className="text-xl font-medium text-gray-800">
                      {meatPrice}₮
                    </p>
                    <input
                      type="number"
                      inputMode="numeric"
                      id="quantity"
                      name="quantity"
                      min="0"
                      step="1"
                      value={meatQuantity}
                      onChange={(e) => updateMeatQuantity(e.target.value)}
                      className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light text-center"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 p-4 w-auto h-auto">
              <div className="bg-gray-100 p-6 rounded-lg">
                <img
                  className="h-40 rounded w-full object-cover object-center mb-6"
                  src="https://dummyimage.com/721x401"
                  alt="content"
                />
                <h3 className="tracking-widest text-blue-500 text-xs font-medium title-font">
                  Төрөл
                </h3>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  Төмстэй
                </h2>
                <div className="flex flex-col space-y-1 flex-grow-0">
                  <label className="text-blue-500 text-xs font-medium title-font tracking-normal">
                    Үнэ болон тоо
                  </label>

                  <div className="flex justify-between item-center">
                    <p className="text-xl font-medium text-gray-800">
                      {potatoPrice}₮
                    </p>
                    <input
                      type="number"
                      inputMode="numeric"
                      id="quantity"
                      name="quantity"
                      min="0"
                      step="1"
                      value={potatoQuantity}
                      onChange={(e) => updatePotatoQuantity(e.target.value)}
                      className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light text-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center -m-4 items-center w-auto my-10 justify-center space-y-2">
            <div className="flex justify-center text-lg">
              <p className="flex flex-wrap">Нийт дүн : </p>
              <p className="text-black font-semibold text-lg">{sumPrice}₮</p>
            </div>
            <button
              onClick={() => addToDo()}
              className=" py-3 px-5 bg-blue-500 text-white rounded-md w-96"
            >
              Захиалах
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Order;

//     /**
//      * Fetches all the todos for a given user ID from Firestore and sets the todos state with the data.
//      *
//      * @param {string} uid - The user ID to fetch todos for.
//      * @return {void}
//      */
//     const fetchTodos = async (uid) => {
//         try {
//             // Create a Firestore query to fetch all the todos for the user with the given ID.
//             const q = query(collection(db, "todos"), where("owner", "==", uid));

//             // Execute the query and get a snapshot of the results.
//             const querySnapshot = await getDocs(q);

//             // Extract the data from each todo document and add it to the data array.
//             let data = [];
//             querySnapshot.forEach((todo) => {
//                 console.log(todo);
//                 data.push({ ...todo.data(), id: todo.id });
//             });

//             // Set the todos state with the data array.
//             setTodos(data);
//         } catch (error) {
//             console.error("An error occured", error);
//         }
//     };

//     const onKeyUp = (event) => {
//         if (event?.key === "Enter" && todoInput?.length > 0) {
//             addToDo();
//         }
//     };

//     const deleteTodo = async (docId) => {
//         try {
//             // Delete the todo document with the given ID from the "todos" collection in Firestore.
//             await deleteDoc(doc(db, "todos", docId));

//             // After deleting the todo, fetch all todos for the current user and update the state with the new data.
//             fetchTodos(authUser.uid);
//         } catch (error) {
//             console.error("An error occured", error);
//         }
//     };

//     const makeAsCompleteHander = async (event, docId) => {
//         try {
//             // Get a reference to the todo document with the given ID in the "todos" collection in Firestore.
//             const todoRef = doc(db, "todos", docId);

//             // Update the "completed" field of the todo document to the value of the "checked" property of the event target.
//             await updateDoc(todoRef, {
//                 completed: event.target.checked,
//             });

//             // After updating the todo, fetch all todos for the current user and update the state with the new data.
//             fetchTodos(authUser.uid);
//         } catch (error) {
//             console.error("An error occured", error);
//         }
//     };

//     return !authUser ? (
//         <Loader />
//     ) : (
//         <main className="">
//             <div
//                 className="bg-black text-white w-44 py-4 mt-10 rounded-lg transition-transform hover:bg-black/[0.8] active:scale-90 flex items-center justify-center gap-2 font-medium shadow-md fixed bottom-5 right-5 cursor-pointer"
//                 onClick={signOut}
//             >
//                 <GoSignOut size={18} />
//                 <span>Logout</span>
//             </div>
//             <div className="max-w-3xl mx-auto mt-10 p-8">
//                 <div className="bg-white -m-6 p-3 sticky top-0">
//                     <div className="flex justify-center flex-col items-center">
//                         <span className="text-7xl mb-10">📝</span>
//                         <h1 className="text-5xl md:text-7xl font-bold">
//                             ToooDooo's
//                         </h1>
//                     </div>
//                     <div className="flex items-center gap-2 mt-10">
//                         <input
//                             placeholder={`👋 Hello ${authUser.username}, What to do Today?`}
//                             type="text"
//                             className="font-semibold placeholder:text-gray-500 border-[2px] border-black h-[60px] grow shadow-sm rounded-md px-4 focus-visible:outline-yellow-400 text-lg transition-all duration-300"
//                             autoFocus
//                             value={todoInput}
//                             onChange={(e) => setTodoInput(e.target.value)}
//                             onKeyUp={(e) => onKeyUp(e)}
//                         />
//                         <button
//                             className="w-[60px] h-[60px] rounded-md bg-black flex justify-center items-center cursor-pointer transition-all duration-300 hover:bg-black/[0.8]"
//                             onClick={addToDo}
//                         >
//                             <AiOutlinePlus size={30} color="#fff" />
//                         </button>
//                     </div>
//                 </div>
//                 <div className="my-10">
//                     {todos.length > 0 &&
//                         todos.map((todo) => (
//                             <div
//                                 key={todo.id}
//                                 className="flex items-center justify-between mt-4"
//                             >
//                                 <div className="flex items-center gap-3">
//                                     <input
//                                         id={`todo-${todo.id}`}
//                                         type="checkbox"
//                                         className="w-4 h-4 accent-green-400 rounded-lg"
//                                         checked={todo.completed}
//                                         onChange={(e) =>
//                                             makeAsCompleteHander(e, todo.id)
//                                         }
//                                     />
//                                     <label
//                                         htmlFor={`todo-${todo.id}`}
//                                         className={`font-medium ${
//                                             todo.completed ? "line-through" : ""
//                                         }`}
//                                     >
//                                         {todo.content}
//                                     </label>
//                                 </div>

//                                 <div className="flex items-center gap-3">
//                                     <MdDeleteForever
//                                         size={24}
//                                         className="text-red-400 hover:text-red-600 cursor-pointer"
//                                         onClick={() => deleteTodo(todo.id)}
//                                     />
//                                 </div>
//                             </div>
//                         ))}

//                     {todos.length < 1 && (
//                         <span className="text-center w-full block text-2xl font-medium text-gray-400 mt-28">{`🥹 You don't have todo's`}</span>
//                     )}
//                 </div>
//             </div>
//         </main>
//     );
// }
