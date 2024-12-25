import React from 'react';
import { Button, Input } from 'antd';
import axios from 'axios';

class CustomForm extends React.Component {
  handleFormSubmit = (event, requestType,articleID) => {
    // event.preventDefault(); // Ngăn không cho form submit theo cách thông thường
    const title = event.target.elements.title.value; // Truy cập trực tiếp giá trị của input
    const content = event.target.elements.content.value;

    switch(requestType){
      case 'post':
        return axios.post('http://127.0.0.1:8000/api/',{
          title:title,
          content:content
        })
        .then(res => console.log(res))
        .catch(error => console.err(error));
        break;
      case 'put':
        return axios.put(`http://127.0.0.1:8000/api/${articleID}/`,{
          title:title,
          content:content
        })
        .then(res => console.log(res))
        .catch(error => console.err(error));
        break;
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={ (event) => this.handleFormSubmit(
           event,
           this.props.requestType,// dùng để lấy dữ liệu requestType, articleID từ component cha truyền vào khi gọi CustomForm. 
           this.props.articleID)}>
           <div>
            <label>Title</label>
            <Input name="title" placeholder="Put a title here" />
          </div>
          <div>
            <label>Content</label>
            <Input name="content" placeholder="Enter some content" />
          </div>
          <Button type="primary" htmlType="submit"> {this.props.btnText} </Button>
        </form>
      </div>
    );
  }
}

export default CustomForm;
