// tải npm install axios   --save
// chuyển data từ Article sang để bên này, chỉnh source data thành dạng props.data

import Articles from "../components/Article";
import React from "react";
import axios from 'axios';
import {Button, Card, Form} from 'antd';
import CustomForm from "../components/Form";
import { withRouter } from 'react-router-dom';

class ArticleDetail extends React.Component{
    state={
        article:{}
    }
    componentDidMount() {
        const articleID =this.props.match.params.articleID;
        console.log("Article ID:", articleID); // Kiểm tra giá trị articleID
        axios.get(`http://127.0.0.1:8000/api/${articleID}/`)
            .then(res => {
                this.setState({ article: res.data });
                console.log("API Response Data:", res.data); // In dữ liệu nhận được từ API
            })
            .catch(err => {
                console.error("Error fetching data:", err);
            });
    }
    handleDelete = (event) => {
        const articleID = this.props.match.params.articleID;
        axios.delete(`http://127.0.0.1:8000/api/${articleID}/`)
             .then(res => {
                 console.log('Article deleted', res);
                 this.props.history.push('/');
                 
             })
             .catch(err => {
                 console.error("Error deleting the article:", err);
                 // Hiển thị thông báo lỗi cho người dùng
             });
    }
    
    

    render(){
        return(
            <div>
                <Card title={this.state.article.title}>
                <p> {this.state.article.content}  </p>
                </Card>
                <CustomForm
                        requestType= 'put'
                        articleID=  {this.props.match.params.articleID} 
                        btnText="Update"/>
                <Form onFinish={this.handleDelete}>
                        <Form.Item>
                        <Button type="danger" htmlType="submit">Delete</Button>
                        </Form.Item>
                </Form>
            </div>
            
        )
    }
}
// render(){
//     return(
//         <Articles data={[this.state.article]} />
//     )
// }
// }


export default withRouter(ArticleDetail);
    