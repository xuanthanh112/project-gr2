// tải npm install axios   --save
// chuyển data từ Article sang để bên này, chỉnh source data thành dạng props.data

import Articles from "../components/Article";
import React from "react";
import axios from 'axios';
import CustomForm from "../components/Form";
const listData = Array.from({
    length: 23,
  }).map((_, i) => ({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  }));
class ArticleList extends React.Component{
    //state là một đối tượng trong React giúp lưu trữ các dữ liệu thay đổi của component, 
    //và setState được sử dụng để thay đổi giá trị này. a
    //Khi gọi this.setState, React sẽ cập nhật giao diện người dùng dựa trên dữ liệu mới mà bạn vừa thay đổi.
    state={
        articles:[]
    }
    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/')
            .then(res => {
                this.setState({ articles: res.data });//lưu dữ liệu mới vào state để React sẽ re-render component, tức là hiển thị lại giao diện với dữ liệu mới. 
                console.log("API Response Data:", res.data); // In dữ liệu nhận được từ API
            })
            .catch(err => {
                console.error("Error fetching data:", err);
            });
    }
    

    render(){
        return(
            <div>
                <Articles data={this.state.articles} />
                <br />
                <h2>Create an article</h2>
                <CustomForm 
                        requestType="post"
                        articleID={null}
                        btnText="Create"/>
            </div>
        )
    }
}

export default ArticleList;