import { signOut } from "firebase/auth";
import { createBrowserHistory } from 'history';
import React from "react";
import { Link } from "react-router-dom";
import { db } from '../firebase/FireBaseConfig';


const history = createBrowserHistory();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registered: false // Khởi tạo trạng thái registered với giá trị mặc định là false
    };
    
  }

  handleClick = () => {
    signOut(db)
      .then(val => {
        console.log(val, 'val');
        this.setState({ registered: true }, () => {
         history.push('/'); // Sau khi đăng xuất, cập nhật trạng thái và điều hướng đến trang chính
         window.location.reload();
        });
      })
      .catch(error => {
        console.error("Lỗi đăng xuất:", error);
      });
  }

  render() {
    // Kiểm tra nếu đã đăng xuất, điều hướng đến trang chính
    if (this.state.registered) {
      history.push('/');
      return null; // Trả về null hoặc bất kỳ gì bạn muốn ở đây
    }

    return (
      <>
        <h1>Hung</h1>
        <button onClick={this.handleClick}>Đăng xuất</button>
         <p><Link to="/product-menu">Menu Sản Phẩm</Link></p>
      </>
    );
  }
}

export default Home;
