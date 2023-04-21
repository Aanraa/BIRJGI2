import Layout from "@/components/Layout";
import { db } from "@/firebase/firebase";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Admin(params) {
  useEffect(() => {
    fetchOrders();
  }, []);

  const [orderDtl, setOrderDtl] = useState([]);

  const fetchOrders = async () => {
    try {
      // Create a Firestore query to fetch all the todos for the user with the given ID.
      const q = query(collection(db, "orders"));

      // Execute the query and get a snapshot of the results.
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot, "qry");
      let data = [];
      querySnapshot.forEach((order) => {
        console.log(order);
        data.push({ ...order.data(), id: order.id });
      });

      setOrderDtl(data);
    } catch (error) {
      console.error("An error occured", error);
    }
  };

  const makeAsCompleteHander = async (event, docId) => {
    try {
      console.log(event, "unen uu?");
      const ordersRef = doc(db, "orders", docId);
      await updateDoc(ordersRef, {
        completed: event.target.checked,
      });

      fetchOrders();
    } catch (error) {
      console.error("An error occured", error);
    }
  };

  return (
    <div>
      <div className="container  max-w-5xl my-24 mx-auto">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-all-search" className="sr-only">
                      Completed
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Хэрэглэгчийн нэр
                </th>
                <th scope="col" className="px-6 py-3">
                  Мах
                </th>
                <th scope="col" className="px-6 py-3">
                  Төмс
                </th>
                <th scope="col" className="px-6 py-3">
                  Нийт дүн
                </th>
              </tr>
            </thead>
            <tbody>
              {orderDtl.length > 0 &&
                orderDtl.map((order) => (
                  <tr
                    key={order.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          onChange={(e) => makeAsCompleteHander(e, order.id)}
                          id={`order-${order.id}`}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          for="checkbox-table-search-3"
                          className="sr-only"
                          htmlFor={`order-${order.id}`}
                        >
                          {order.completed}
                        </label>
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-sm text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {order.owner}
                    </th>
                    <td className="px-6 py-4">{order.meatQty}</td>
                    <td className="px-6 py-4">{order.potatoQty}</td>
                    <td className="px-6 py-4">{order.sumPrice}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
