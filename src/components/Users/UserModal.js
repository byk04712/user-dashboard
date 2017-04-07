import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
// import styles from './UserModal.css';

const FormItem = Form.Item;

class UserEditModal extends Component {

  state = {
    visible: false
  };

  showModalHandler = e => {
    if (e) e.stopPropagation();

    this.setState({
      visible: true
    });
  };

  hideModalHandler = () => {
    this.setState({
      visible: false
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModalHandler();
      }
    });
  };

  render() {
    const { children, form, record } = this.props;
    const { getFieldDecorator } = form;
    const { name, email, website } = record;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };

    return (
      <span>
        <span onClick={this.showModalHandler}>
          {children}
        </span>
        <Modal title='Edit User' visible={this.state.visible} onOk={this.okHandler} onCancel={this.hideModalHandler}>
          <Form onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label='Name'>
              {
                getFieldDecorator('name', { initialValue: name })(<Input/>)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='Email'>
              {
                getFieldDecorator('email', { initialValue: email })(<Input/>)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='Website'>
              {
                getFieldDecorator('website', { initialValue: website })(<Input/>)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }

}

// function UserModal() {
//   return (
//     <div className={styles.normal}>
//       Component: UserModal
//     </div>
//   );
// }

export default Form.create()(UserEditModal);
