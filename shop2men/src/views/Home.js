import { signOut } from "firebase/auth";
import { createBrowserHistory } from 'history';
import React from "react";
import { database } from './FireBaseConfig';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registered: false // Khởi tạo trạng thái registered với giá trị mặc định là false
    };
    this.history = createBrowserHistory();
  }

  handleClick = () => {
    signOut(database)
      .then(val => {
        console.log(val, 'val');
        this.setState({ registered: true }, () => {
          this.history.push('/'); // Sau khi đăng xuất, cập nhật trạng thái và điều hướng đến trang chính
        });
      })
      .catch(error => {
        console.error("Lỗi đăng xuất:", error);
      });
  }

  render() {
    // Kiểm tra nếu đã đăng xuất, điều hướng đến trang chính
    if (this.state.registered) {
      this.history.push('/');
      return null; // Trả về null hoặc bất kỳ gì bạn muốn ở đây
    }

    return (
      <>
        <h1>Hung</h1>
        <button onClick={this.handleClick}>Đăng xuất</button>
      </>
    );
  }
}

export default Home;
