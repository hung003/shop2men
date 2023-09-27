import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/FireBaseConfig";

function User() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, "users", userId);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          setUserData(userDocSnapshot.data());
        } else {
          console.error("Người dùng không tồn tại.");
        }
      } catch (error) {
        console.error("Lỗi lấy dữ liệu người dùng:", error);
      }
    };
    fetchUserData();
  }, [userId]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Thông tin người dùng</h2>
      <p>Tên: {userData.name}</p>
      <p>Email: {userData.email}</p>
      {/* Hiển thị thông tin khác về người dùng tại đây */}
    </div>
  );
}

export default User;
