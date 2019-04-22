import React, { Component } from 'react';
import './menu.less'
import { Button, Modal, Form, Input } from 'antd'

class MenuPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }
  handleShowAdd = () => {
    this.setState({
      visible: true
    })
  }
  handleAddOk = () => {
    this.setState({
      visible: false
    })
  }
  handleAddCancel = () => {
    this.setState({
      visible: false
    })
  }

  render () {

    return (
      <div className="menu__content">
        <div>
          <Button onClick={this.handleShowAdd.bind(this)} type="primary">添加菜单</Button>
        </div>

        <Modal
          title="添加菜单"
          okText="添加"
          cancelText="取消"
          visible={this.state.visible}
          onOk={this.handleAddOk}
          onCancel={this.handleAddCancel}
        >
          
        </Modal>
      </div>
    )
  }
}

export default MenuPage