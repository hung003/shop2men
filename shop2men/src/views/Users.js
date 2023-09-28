import { getAuth, signOut } from "firebase/auth"; // Thêm import này để sử dụng Firebase Auth
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "../firebase/FireBaseConfig";

function User() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const Navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth(); // Lấy đối tượng auth từ Firebase

    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);

        // Lấy thông tin người dùng từ Firestore
        const fetchUserData = async () => {
          try {
            const userDocRef = doc(db, "users", user.uid);
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
      } else {
        setCurrentUser(null);
        setUserData(null);
        console.log("Người dùng chưa đăng nhập.");
      }
    });
  }, []);

  if (!currentUser) {
    return <div>Bạn chưa đăng nhập.</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }


  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      // Sau khi đăng xuất thành công, điều hướng đến trang đăng nhập
      Navigate("/login");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };
  return (
    <div>
      <h2>Thông tin người dùng</h2>
      <p>Email: {currentUser.email}</p>
      <p>Tên: {currentUser.password}</p>
      <button onClick={handleSignOut}>Đăng xuất</button>
      {/* Hiển thị thông tin khác về người dùng tại đây */}
    </div>
  );
}

export default User;
