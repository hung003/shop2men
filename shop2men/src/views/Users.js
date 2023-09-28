import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "../firebase/FireBaseConfig";

function User() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);

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
      } else {
        setCurrentUser(null);
        setUserData(null);
        console.log("Người dùng chưa đăng nhập.");
      }
    });
  }, []);

  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Thông tin người dùng</h2>
              {currentUser && (
                <div>
                  <p><strong>Email:</strong> {currentUser.email}</p>
                  <p><strong>Tên:</strong> {userData?.name || "N/A"}</p>
                  {/* Hiển thị thông tin khác về người dùng tại đây */}
                  <button
                    className="btn btn-primary"
                    onClick={handleSignOut}
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
              {!currentUser && (
                <p>Bạn chưa đăng nhập.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
