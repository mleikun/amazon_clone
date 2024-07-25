import React, { useContext, useEffect, useState } from "react";
import classes from "./Order.module.css";
import LayOut from "../../Components/LayOut/Layout";
import { db } from "../../Util/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { doc, setDoc, onSnapshot, collection } from "firebase/firestore";

const Order = () => {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        collection(db, "users", user.uid, "orders"),
        { orderBy: ["created", "desc"] },
        (snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        }
      );

      return unsubscribe;
    } else {
      setOrders([]);
    }
  }, [user]);
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.order__container}>
          <h2>Your Orders</h2>
          {orders?.length == 0 && (
            <div style={{ padding: "20px" }}>You dont have ordets</div>
          )}
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID: {eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((orders) => {
                    return (
                      <ProductCard
                        flex={true}
                        product={orders}
                        key={orders.id}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Order;
